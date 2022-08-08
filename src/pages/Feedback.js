import React from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';

class Feedback extends React.Component {
  constructor() {
    super();

    this.state = { rankingPage: false };
  }

  rankingRedirect = () => this.setState({ rankingPage: true });

  render() {
    const { rankingPage } = this.state;
    const { assertions, score } = this.props;
    const MIN_OF_ASSERTIONS = 3;
    return (
      <main>
        <Header />
        <p data-testid="feedback-text">
          {assertions < MIN_OF_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </p>
        <p data-testid="feedback-total-score">{score}</p>
        <p data-testid="feedback-total-question">{assertions}</p>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ (event) => {
            event.preventDefault();
            this.rankingRedirect();
          } }
        >
          Ranking
        </button>
        { rankingPage && <Redirect to="/ranking" /> }
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: number.isRequired,
  score: number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
