import React from 'react';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      offButton: true,
    };
  }

  enableButton = () => {
    const { name, email } = this.state;

    this.setState({ offButton: !(name.length > 0 && email.length > 0) });
  }

  onInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.enableButton());
  }

  render() {
    const { name, email, offButton } = this.state;

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

        <button type="submit" disabled={ offButton } data-testid="btn-play">Play</button>
      </form>
    );
  }
}

export default Login;
