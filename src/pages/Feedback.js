import React from 'react';
import { connect } from 'react-redux';
import { number } from 'prop-types';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions } = this.props;
    const MIN_OF_ASSERTIONS = 3;
    return (
      <main>
        <Header />
        <p data-testid="feedback-text">
          {assertions < MIN_OF_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
        </p>
      </main>
    );
  }
}

Feedback.propTypes = {
  assertions: number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
