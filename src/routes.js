import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './pages/Login';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }
}

export default Content;
