import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Game from './pages/Game';

class Content extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route path="/settings" component={ Settings } />
      </Switch>
    );
  }
}

export default Content;
