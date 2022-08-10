import React from 'react';
import { string } from 'prop-types';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import Content from './routes';
import GlobalStyles from './global.styles';

import * as themes from './themes';

function App({ theme }) {
  return (
    <ThemeProvider theme={ themes[theme] }>
      <GlobalStyles />
      <Content />
    </ThemeProvider>
  );
}

App.propTypes = {
  theme: string.isRequired,
};

const mapStateToProps = ({ player: { theme } }) => ({
  theme,
});

export default connect(mapStateToProps)(App);
