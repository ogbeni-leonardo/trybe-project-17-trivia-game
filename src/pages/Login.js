import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import getToken from '../services/fetchToken';
import { setPlayerName, setPlayerEmail } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      offButton: true,
      redirect: false,
    };
  }

  enableButton = () => {
    const { name, email } = this.state;

    this.setState({ offButton: !(name.length > 0 && email.length > 0) });
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.enableButton());
  }

  handleClick = async (event) => {
    event.preventDefault();

    const { name, email } = this.state;
    const { dispatch } = this.props;

    await getToken();
    dispatch(setPlayerName(name));
    dispatch(setPlayerEmail(email));

    this.setState({ redirect: true });
  }

  render() {
    const { name, email, offButton, redirect } = this.state;

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
            onChange={ this.onInputChange }
          />
        </label>

        <label htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.onInputChange }
          />
        </label>

        <button
          type="submit"
          disabled={ offButton }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Play

        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(Login);
