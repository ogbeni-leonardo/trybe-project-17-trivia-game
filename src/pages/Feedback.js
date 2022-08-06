import React from 'react';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <p data-testid="feedback-text">feedback aqui</p>
      </main>
    );
  }
}

export default Feedback;
