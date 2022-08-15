import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { number, string } from 'prop-types';

import Header from '../components/Header';
import GameStats from '../components/GameStats';
import Podium from '../components/Podium';

import FeedbackPage, { FeedbackContainer, FeedbackContent } from './Feedback.styles';

class Feedback extends React.Component {
  componentDidMount = () => this.getStoredGames();

  getStoredGames = () => {
    const { name, picture, score } = this.props;
    const userData = { name, picture, score };

    const storedGames = JSON.parse(localStorage.getItem('ranking'));

    if (storedGames !== null) {
      const localStorageUpdate = [...storedGames, userData];
      return localStorage.setItem('ranking', JSON.stringify(localStorageUpdate));
    }

    localStorage.setItem('ranking', JSON.stringify([userData]));
  };

  render() {
    const { amount, assertions, name } = this.props;

    if (name === '') return <Redirect to="/" />;

    return (
      <FeedbackPage>
        <Header />

        <FeedbackContainer>
          <FeedbackContent>
            <GameStats />
            <Podium amount={ amount } assertions={ assertions } />
          </FeedbackContent>

        </FeedbackContainer>
      </FeedbackPage>
    );
  }
}

Feedback.propTypes = {
  amount: number.isRequired,
  assertions: number.isRequired,
  picture: string.isRequired,
  name: string.isRequired,
  score: number.isRequired,
};

const mapStateToProps = ({ player: {
  amount, assertions, gravatarEmail, name, score } }) => ({
  amount,
  assertions,
  picture: gravatarEmail,
  name,
  score,
});

export default connect(mapStateToProps)(Feedback);
