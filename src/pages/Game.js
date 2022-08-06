import React from 'react';
import { Redirect } from 'react-router-dom';

import Header from '../components/Header';
import fetchTrivia from '../services/fetchTrivia';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      triviaData: [],
      triviaIndex: 0,
      redirect: false,
    };
  }

  componentDidMount() {
    fetchTrivia()
      .then((data) => {
        if (data.results.length === 0) {
          localStorage.removeItem('token');
          this.setState({ redirect: true });
        } else {
          this.setState({ triviaData: data.results });
        }
      });
  }

  shuffleArray = (array) => array.sort(() => {
    const NEGATIVE_NUMBER = -1;
    return Math.random() + (Math.random() * NEGATIVE_NUMBER);
  });

  getTriviaAnswers = (trivia) => {
    const answers = [];

    answers.push({ value: trivia.correct_answer, toTest: 'correct-answer' });

    trivia.incorrect_answers.forEach((answer, index) => {
      answers.push({ value: answer, toTest: `wrong-answer-${index}` });
    });

    return this.shuffleArray(answers);
  };

  render() {
    const { triviaData, triviaIndex, redirect } = this.state;

    const currentTrivia = triviaData[triviaIndex];

    if (redirect) return <Redirect to="/" />;

    return (
      <main>
        <Header />

        { currentTrivia && (
          <div>
            <p data-testid="question-category">{currentTrivia.category}</p>
            <p data-testid="question-text">{ currentTrivia.question }</p>

            <ul data-testid="answer-options">
              { this.getTriviaAnswers(currentTrivia).map((answer, index) => (
                <li key={ index } data-testid={ answer.toTest }>
                  <button type="button">
                    {answer.value}
                  </button>
                </li>
              )) }
            </ul>
          </div>
        ) }
      </main>
    );
  }
}

export default Game;
