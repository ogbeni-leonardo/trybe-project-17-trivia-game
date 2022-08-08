import React from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
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
