import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func } from 'prop-types';

import { updateScore, incrementAssertions } from '../redux/actions/index';

import fetchTrivia from '../services/fetchTrivia';
import Header from '../components/Header';

import '../assets/css/Game.css';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      allAnswersButtonIsDisabled: false,
      counter: 30,
      currentTrivia: undefined,
      nextButtonIsDisabled: false,
      redirect: false,
      redirectTo: '/',
      showAnswers: false,
      shuffledAnswers: [],
      triviaData: [],
      triviaIndex: 0,
    };
  }

  async componentDidMount() {
    const { results } = await fetchTrivia();

    if (results.length > 0) {
      return this.setState({ triviaData: results }, () => this.getCurrentTrivia());
    }

    localStorage.removeItem('token');
    this.setState({ redirect: true });
  }

  componentWillUnmount() { clearInterval(this.timer); }

  runTimer = () => {
    const ONE_SECOND = 1000;

    this.timer = setInterval(() => {
      this.setState(
        (prev) => ({ counter: prev.counter > 0 ? prev.counter - 1 : 0 }),
        () => {
          const { counter, showAnswers } = this.state;
          if (counter === 0 || showAnswers) {
            this.setState({ allAnswersButtonIsDisabled: true });
            clearInterval(this.timer);
          }
        },
      );
    }, ONE_SECOND);
  };

  shuffleArray = (array) => array.sort(() => {
    const NEGATIVE_NUMBER = -1;
    return Math.random() + Math.random() * NEGATIVE_NUMBER;
  });

  getCurrentTrivia = () => {
    const { triviaData, triviaIndex, nextButtonIsDisabled } = this.state;

    if (nextButtonIsDisabled) return this.redirectToFeedBack();

    const currentTrivia = triviaData[triviaIndex];
    const shuffledAnswers = this.getTriviaAnswers(currentTrivia);
    this.setState({ currentTrivia, shuffledAnswers });
    this.runTimer();
  };

  getTriviaAnswers = (trivia) => {
    const answers = [];

    answers.push({
      answer: 'right',
      level: trivia.difficulty,
      toTest: 'correct-answer',
      value: trivia.correct_answer,
    });

    console.log(trivia.correct_answer);

    trivia.incorrect_answers.forEach((answer, index) => {
      answers.push({
        answer: 'wrong',
        level: trivia.difficulty,
        toTest: `wrong-answer-${index}`,
        value: answer,
      });
    });
    return this.shuffleArray(answers);
  };

  onSubmit = (answer) => {
    const { counter } = this.state;
    const { dispatch } = this.props;

    if (answer.answer === 'right') {
      const BASE_RESULT = 10;
      const level = { easy: 1, medium: 2, hard: 3 };

      const score = BASE_RESULT + (counter * level[answer.level]);
      dispatch(updateScore(score));
      dispatch(incrementAssertions());
    }
    this.setState({ showAnswers: true });
  };

  nextTrivia = () => {
    this.setState(
      (prev) => ({
        allAnswersButtonIsDisabled: false,
        counter: 30,
        nextButtonIsDisabled: (prev.triviaIndex === prev.triviaData.length - 1),
        showAnswers: false,
        triviaIndex: prev.triviaIndex < prev.triviaData.length - 1
          ? prev.triviaIndex + 1 : prev.triviaIndex,
      }),
      () => this.getCurrentTrivia(),
    );
  };

  redirectToFeedBack = () => {
    const { nextButtonIsDisabled } = this.state;
    if (nextButtonIsDisabled) {
      this.setState({ redirectTo: '/feedback', redirect: true });
    }
  };

  render() {
    const {
      allAnswersButtonIsDisabled,
      counter,
      currentTrivia,
      nextButtonIsDisabled,
      redirect,
      redirectTo,
      showAnswers,
      shuffledAnswers,
    } = this.state;

    if (redirect) return <Redirect to={ redirectTo } />;

    return (
      <main>
        <Header />
        <p>
          Tempo:
          {' '}
          {counter}
        </p>

        { currentTrivia && (
          <div>
            <p data-testid="question-category">{currentTrivia.category}</p>
            <p data-testid="question-text">{ currentTrivia.question }</p>

            <div data-testid="answer-options">
              { shuffledAnswers.map((answer, index) => (
                <button
                  disabled={ allAnswersButtonIsDisabled }
                  key={ index }
                  type="button"
                  data-testid={ answer.toTest }
                  className={
                    `answerButton ${showAnswers ? 'show' : ''} ${answer.answer}`
                  }
                  onClick={ () => this.onSubmit(answer) }
                >
                  {answer.value}
                </button>
              )) }
            </div>
          </div>
        ) }

        { showAnswers && (
          <button
            disabled={ nextButtonIsDisabled }
            type="button"
            data-testid="btn-next"
            onClick={ this.nextTrivia }
          >
            Next
          </button>
        ) }
      </main>
    );
  }
}

Game.propTypes = {
  dispatch: func.isRequired,
};

export default connect()(Game);
