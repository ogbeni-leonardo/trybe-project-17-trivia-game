import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = styled.main`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  min-height: 500px;
  position: relative;
`;

export const LoginForm = styled.form`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 8px;
  box-shadow: 0 0 20px rgba(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  row-gap: 5px;
`;

export const LoginFormTitleContainer = styled.div`
  align-self: stretch;
  background-color: ${({ theme }) => theme.secondary};
  padding: 45px 25px;
  position: relative;

  & h1 {
    font-size: 2rem;
    & span {
      color: ${({ theme }) => theme.theme};
    }
  }

  &:after {
    background-color: ${({ theme }) => theme.theme};
    border-radius: 5px;
    content: '';
    height: 4px;
    position: absolute;
    width: 35px;
  }
`;

export const LoginFormDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 160px;
  justify-content: center;
  row-gap: 16px;
`;

export const LoginFormLabel = styled.label`
  display: flex;
  flex-direction: column;
  padding-inline: 20px;
  row-gap: 8px;
`;

export const LoginFormInput = styled.input`
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid transparent;
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
  height: 35px;
  padding-inline: 15px;
  width: 250px;

  &:focus {
    border-color: ${({ theme }) => theme.theme};
  }
`;

export const LoginFormSubmit = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.lightColor};
  column-gap: 5px;
  cursor: pointer;
  display: flex;
  margin-bottom: 25px;
  margin-top: 15px;
  opacity: 0.8;
  padding: 12px 25px;
  text-transform: uppercase;

  &:hover {
    opacity: 1;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.secondary};
    color: ${({ theme }) => theme.fontColor};
    cursor: not-allowed;
  }
`;

export const SettingContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  row-gap: 5px;
  top: 10px;
`;

export const SettingsLink = styled(Link)`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  color: ${({ theme }) => theme.theme};
  display: flex;
  font-size: 1.3rem;
  height: 45px;
  justify-content: center;
  opacity: 0.8;
  width: 45px;

  &:hover {
    opacity: 1;
  }
`;

export const ThemeChangerButton = styled.button`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 50%;
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  color: ${({ theme }) => (
    theme.name === 'light' ? theme.darkTheme : '#FF9800')};
  cursor: pointer;
  display: flex;
  font-size: 1.3rem;
  height: 35px;
  justify-content: center;
  opacity: 0.8;
  width: 35px;

  &:hover {
    opacity: 1;
  }
`;

export default LoginPage;
