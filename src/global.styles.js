import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: 0;
    outline: none;
    font-family: 'Inter', sans-serif
  }

  :root {
    font-size: 14px;
  }

  ::selection {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor}
  }

  body {
    min-height: 500px;
    height: 100vh;
    background-color: ${({ theme }) => theme.defaultBackground};
    color: ${({ theme }) => theme.fontColor};
  }
`;

export default GlobalStyles;
