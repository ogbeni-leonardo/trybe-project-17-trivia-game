import styled from 'styled-components';

const MAX_TIME_VALUE = 30;
const timePercentCalc = (time) => `${(time * 100) / MAX_TIME_VALUE}%`;

const GamePage = styled.main`
  display: flex;
  flex-direction: column;
  height: max(500px, 100vh);
  row-gap: 20px;
`;

export const GamePageContent = styled.div``;

export const GameContainer = styled.div`
  align-self: center;
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: min(100%, 500px);
  margin-bottom: 20px;
  min-width: 300px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0 15px rgba(0 0 0 /15%);
`;

export const ProgressTimer = styled.div`
  height: 10px;
  background-color: ${({ theme }) => theme.secondary};
  position: relative;
  transition: all 50ms;

  &:after {
    content: '';
    background: linear-gradient(90deg, rgba(192,57,43,1) 0%,
      rgba(211,84,0,1) 35%, rgba(39,174,96,1) 100%);
    height: 10px;
    width: ${({ counterTime }) => (counterTime !== undefined
    ? timePercentCalc(counterTime) : 0)};
    position: absolute;
    transition: ease-in-out;
    animation: ${({ counterTime }) => (counterTime === undefined
    ? 'linear timing 30s' : undefined)};
  }

  @keyframes timing {
    from { width: 100%; }
    to { width: 0; }
  }
`;

export const TriviaGame = styled.div`
  padding: 30px 20px;
  text-align: center;
`;

export const CurrentTriviaIndex = styled.span`
  position: absolute;
  top: -10px;
  left: 10px;
`;

export const TriviaContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
  position: relative;
`;

export const TriviaCategory = styled.h1`
  font-size: 1.8rem;
  text-align: center;
  margin-top: 25px;
`;

export const TriviaQuestion = styled.p`
  font-weight: 600;
  font-style: italic;
  max-width: 490px;
  font-size: 1.1rem;
`;

export const AnswerButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-top: 20px;
  align-items: center;
`;

export const AnswerButton = styled.button`
  padding-inline: 20px;
  border-radius: 5px;
  min-height: 45px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.fontColor};
  transition: all 50ms;
  cursor: pointer;
  width: 260px;
  font-weight: 600;
  border: 2px solid transparent;
  padding-block: 5px;

  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }

  &:disabled {
    border-color: ${({ answer }) => (answer === 'right' ? '#27ae60' : '#c0392b')};
    cursor: not-allowed;
    color: ${({ answer }) => (answer === 'right' ? '#27ae60' : '#c0392b')};
    opacity: 0.7;
  }

  &:disabled:hover {
    background-color: ${({ answer }) => (answer === 'right' ? '#27ae60' : '#c0392b')};
    cursor: not-allowed;
    color: ${({ theme }) => theme.lightColor};
  }
`;

export const AlertMessageContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  border-top: 2px solid ${({ theme }) => theme.theme};
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  padding: 10px 25px;
  max-height: 90px;
  min-height: 45px;

  & p {
    display: flex;
    column-gap: 5px;
    align-items: center;
    font-weight: bold;
  }
`;

export const CorrectAnswerAlert = styled.p`
  color: #27ae60;
`;

export const IncorrectAnswerAlert = styled.p`
  color: #c0392b;
`;

export const TimeIsOver = styled.p`
  color: ${({ theme }) => theme.theme};
`;

export const NextTriviaButton = styled(AnswerButton)`
  width: 120px;
  background-color: ${({ theme }) => theme.theme};
  color: ${({ theme }) => theme.lightColor};
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;

export default GamePage;
