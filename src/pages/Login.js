import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import getToken from '../services/fetchToken';
import { setPlayerName, setPlayerEmail } from '../redux/actions';
import createHash from '../services/userHash';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      submitButtonIsDisabled: true,
      redirect: false,
    };
  }

  validateForm = () => {
    const { name, email } = this.state;

    const hasValidName = name.length > 1;
    const hasValidEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);

    this.setState({ submitButtonIsDisabled: !(hasValidName && hasValidEmail) });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateForm());
  }

  handleClick = (event) => {
    event.preventDefault();

    const { name, email } = this.state;
    const { dispatch } = this.props;

    getToken().then(() => {
      dispatch(setPlayerName(name));
      dispatch(setPlayerEmail(createHash(email)));
      this.setState({ redirect: true });
    });
  }

  render() {
    const { name, email, submitButtonIsDisabled, redirect } = this.state;

    if (redirect) return <Redirect to="/game" />;

    return (
      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            data-testid="input-player-name"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="submit"
          disabled={ submitButtonIsDisabled }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play
        </button>

        <Link to="/settings">
          <button
            type="button"
            data-testid="btn-settings"
          >
            Settings
          </button>
        </Link>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(Login);
