import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { func, number, string } from 'prop-types';
import { RiCloseCircleLine } from 'react-icons/ri';
import { BsCheck2Circle } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { decode } from 'html-entities';

import fetchTrivia from '../services/fetchTrivia';
import { updateScore, incrementAssertions, setAmount } from '../redux/actions/index';

import Header from '../components/Header';
import GameStats from '../components/GameStats';

import GamePage, {
  GamePageContent, ProgressTimer, GameContainer, TriviaGame, CurrentTriviaIndex,
  TriviaContainer, TriviaCategory, TriviaQuestion, AnswerButtonsContainer,
  AnswerButton, AlertMessageContainer, CorrectAnswerAlert, IncorrectAnswerAlert,
  TimeIsOver, NextTriviaButton,
} from './Game.styles';

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      answerButtonsIsDisabled: false,
      counter: 30,
      currentTrivia: undefined,
      redirect: false,
      redirectTo: '/',
      selectedAnswerIsCorrect: undefined,
      showAnswers: false,
      shuffledAnswers: [],
      triviaData: [],
      triviaIndex: 0,
    };
  }

  async componentDidMount() {
    const { results } = await fetchTrivia();

    if (results.length > 0) {
      const { dispatch } = this.props;
      dispatch(setAmount(results.length));
      return this.setState({ triviaData: results }, () => this.getCurrentTrivia());
    }

    localStorage.removeItem('apiConfig');
    this.setState({ redirect: true });
  }

  componentWillUnmount() { clearInterval(this.timer); }

  startTimer = () => {
    const ONE_SECOND = 1000;

    this.timer = setInterval(() => {
      this.setState(
        (prev) => ({ counter: prev.counter - 1 }),
        () => {
          const { counter, showAnswers } = this.state;
          if (counter === 0 || showAnswers) {
            this.setState({ answerButtonsIsDisabled: true, showAnswers: true });
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

  getTriviaAnswers = (trivia) => {
    const answers = [];

    answers.push({
      answer: 'right',
      level: trivia.difficulty,
      value: trivia.correct_answer,
    });

    trivia.incorrect_answers.forEach((answer) => {
      answers.push({
        answer: 'wrong',
        level: trivia.difficulty,
        value: answer,
      });
    });

    return this.shuffleArray(answers);
  };

  getCurrentTrivia = () => {
    const { triviaData, triviaIndex } = this.state;
    if (triviaData.length === triviaIndex) return this.redirectToFeedBack();

    const currentTrivia = triviaData[triviaIndex];
    const shuffledAnswers = this.getTriviaAnswers(currentTrivia);

    this.setState({ currentTrivia, shuffledAnswers }, () => this.startTimer());
  };

  onSubmitAnswer = (answer) => {
    const { counter } = this.state;
    const { dispatch } = this.props;

    if (answer.answer === 'right') {
      const BASE_RESULT = 10;
      const level = { easy: 1, medium: 2, hard: 3 };
      const scoreCalc = BASE_RESULT + (counter * level[answer.level]);

      dispatch(updateScore(scoreCalc));
      dispatch(incrementAssertions());
    }

    this.setState({
      selectedAnswerIsCorrect: answer.answer === 'right',
      showAnswers: true,
    });
  };

  nextTrivia = () => {
    const updateStateToSetNewTrivia = (prevState) => ({
      answerButtonsIsDisabled: false,
      selectedAnswerIsCorrect: undefined,
      counter: 30,
      showAnswers: false,
      triviaIndex: prevState.triviaIndex + 1,
    });

    this.setState(updateStateToSetNewTrivia, () => this.getCurrentTrivia());
  };

  redirectToFeedBack = () => this.setState({ redirectTo: '/feedback', redirect: true });

  render() {
    const {
      answerButtonsIsDisabled, currentTrivia, redirect, redirectTo,
      selectedAnswerIsCorrect, showAnswers, shuffledAnswers, triviaIndex,
    } = this.state;

    const { amount, name } = this.props;

    if (redirect || name === '') return <Redirect to={ redirectTo } />;

    const ANIMATIONS_NAME = ['one', 'two', 'three', 'four', 'five'];

    return (
      <GamePage>
        <Header />
        <GamePageContent>
          <GameContainer>
            <ProgressTimer
              animation={ currentTrivia ? ANIMATIONS_NAME[triviaIndex] : 'running' }
              stop={ showAnswers }
            />

            <TriviaGame>
              { currentTrivia && (
                <TriviaContainer>
                  <CurrentTriviaIndex>
                    {`Question ${triviaIndex + 1}/${amount}`}
                  </CurrentTriviaIndex>

                  <TriviaCategory>{currentTrivia.category}</TriviaCategory>
                  <TriviaQuestion>{decode(currentTrivia.question)}</TriviaQuestion>

                  <AnswerButtonsContainer>
                    { shuffledAnswers.map((answer, index) => (
                      <AnswerButton
                        answer={ answer.answer }
                        disabled={ answerButtonsIsDisabled }
                        key={ index }
                        onClick={ () => this.onSubmitAnswer(answer) }
                        type="button"
                        showAnswer={ showAnswers }
                      >
                        {decode(answer.value)}
                      </AnswerButton>
                    )) }
                  </AnswerButtonsContainer>
                </TriviaContainer>
              ) }
            </TriviaGame>

            <AlertMessageContainer>
              { !showAnswers && <p>Waiting for the answer...</p> }

              { showAnswers && selectedAnswerIsCorrect && (
                <CorrectAnswerAlert>
                  <BsCheck2Circle />
                  Right answer!
                </CorrectAnswerAlert>
              )}

              { showAnswers && selectedAnswerIsCorrect === false && (
                <IncorrectAnswerAlert>
                  <RiCloseCircleLine />
                  Incorrect answer!
                </IncorrectAnswerAlert>
              )}

              { showAnswers && selectedAnswerIsCorrect === undefined && (
                <TimeIsOver>
                  <BiTimeFive />
                  Your time is over!
                </TimeIsOver>
              )}

              { showAnswers && (
                <NextTriviaButton
                  data-testid="btn-next"
                  onClick={ this.nextTrivia }
                  type="button"
                >
                  Next
                </NextTriviaButton>
              ) }
            </AlertMessageContainer>
          </GameContainer>

          <GameStats index={ triviaIndex } />
        </GamePageContent>
      </GamePage>
    );
  }
}

Game.propTypes = {
  amount: number.isRequired, dispatch: func.isRequired, name: string.isRequired };

const mapStateToProps = ({ player: { amount, name } }) => ({ amount, name });

export default connect(mapStateToProps)(Game);
