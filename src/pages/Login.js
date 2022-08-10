import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';
import {
  BsPlayCircleFill,
  BsFillGearFill,
  BsFillSunFill,
  BsFillMoonFill,
} from 'react-icons/bs';

import getToken from '../services/fetchToken';
import {
  setPlayerName,
  setPlayerEmail,
  resetState,
  changeTheme,
} from '../redux/actions';
import createHash from '../services/userHash';

import LoginPage, {
  LoginForm,
  LoginFormTitleContainer,
  LoginFormDataContainer,
  LoginFormLabel,
  LoginFormInput,
  LoginFormSubmit,
  SettingContainer,
  SettingsLink,
  ThemeChangerButton,
} from './Login.styles';

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

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(resetState());
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
    const { dispatch, theme } = this.props;

    if (redirect) return <Redirect to="/game" />;

    return (
      <LoginPage>
        <LoginForm>
          <LoginFormTitleContainer>
            <h1>
              Ninth
              <span>Game</span>
            </h1>
          </LoginFormTitleContainer>

          <LoginFormDataContainer>
            <LoginFormLabel htmlFor="name">
              Nome:
              <LoginFormInput
                type="text"
                id="name"
                name="name"
                data-testid="input-player-name"
                value={ name }
                onChange={ this.handleChange }
                placeholder="Digite seu nome"
              />
            </LoginFormLabel>

            <LoginFormLabel htmlFor="email">
              E-mail:
              <LoginFormInput
                type="email"
                id="email"
                name="email"
                data-testid="input-gravatar-email"
                value={ email }
                onChange={ this.handleChange }
                placeholder="Digite seu email"
              />
            </LoginFormLabel>
          </LoginFormDataContainer>

          <LoginFormSubmit
            type="submit"
            disabled={ submitButtonIsDisabled }
            data-testid="btn-play"
            onClick={ this.handleClick }
          >
            Start
            <BsPlayCircleFill />
          </LoginFormSubmit>
        </LoginForm>

        <SettingContainer>
          <SettingsLink
            to="/settings"
            data-testid="btn-settings"
            title="Configurações"
          >
            <BsFillGearFill />
          </SettingsLink>

          <ThemeChangerButton
            type="button"
            title="Mudar tema"
            onClick={ () => dispatch(changeTheme()) }
          >
            { theme === 'dark' ? <BsFillSunFill /> : <BsFillMoonFill /> }
          </ThemeChangerButton>
        </SettingContainer>
      </LoginPage>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  theme: string.isRequired,
};

const mapStateToProps = (state) => ({
  theme: state.player.theme,
});

const mapDispatchToProps = (dispatch) => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(Login);
