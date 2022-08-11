import { createGlobalStyle } from 'styled-components';
import Inter from './assets/fonts/Inter.ttf';

const GlobalStyles = createGlobalStyle`  
  * {
    border: 0;
    box-sizing: border-box;
    font-family: Inter, sans-serif;
    margin: 0;
    outline: none;
    padding: 0;
  }

  @font-face {
    font-family: Inter;
    src: local('Inter'), url(${Inter}) format('truetype');
  }

  :root {
    font-size: 14px;
  }

  ::selection {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor}
  }

  body {
    background-color: ${({ theme }) => theme.defaultBackground};
    color: ${({ theme }) => theme.fontColor};
    height: 100vh;
    min-height: 500px;
  }
`;

export default GlobalStyles;
