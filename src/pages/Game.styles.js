import styled from 'styled-components';

const GamePage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: max(500px, 100vh);
`;

export const GamePageContent = styled.div`
  align-items: center;
  column-gap: 60px;
  display: flex;
  flex-grow: 1;
  justify-content: center;
  min-height: 400px;
  padding: 20px;
  row-gap: 40px;
  min-width: 300px;

  @media screen and (max-width: 900px) {
    flex-direction: column-reverse;
  }
`;

export const GameContainer = styled.div`
  align-self: center;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0 0 0 /15%);
  display: flex;
  flex-direction: column;
  height: 480px;
  max-height: 480px;
  min-width: 300px;
  overflow: auto;
  position: relative;
  width: min(100%, 500px);

  @media screen and (max-width: 420px) {
    height: 520px;
    max-height: 520px;
  }
`;

export const ProgressTimer = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  min-height: 10px;
  position: relative;

  &:after {
    animation: linear ${({ animation }) => `${animation}`} 30s;
    animation-fill-mode: forwards;
    animation-play-state: ${({ stop }) => (stop ? 'paused' : 'initial')};
    background-color: #27ae60;
    content: '';
    min-height: 10px;
    position: absolute;
    transition: linear 50ms;
    width: 0;
  }

  @keyframes ${({ animation }) => animation} {
    from { width: 100%; }
    to { background-color: #c0392b; width: 0; }
  }
`;

export const TriviaGame = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-inline: 20px;
  padding-top: 30px;
  text-align: center;
`;

export const CurrentTriviaIndex = styled.span`
  left: 5px;
  position: absolute;
  top: -10px;
`;

export const TriviaContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

export const TriviaCategory = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 15px;
  margin-top: 25px;
  text-align: center;
`;

export const TriviaQuestion = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  font-weight: 600;
  max-width: 490px;
`;

export const AnswerButtonsContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  padding-block: 20px;
  row-gap: 5px;
`;

export const AnswerButton = styled.button`
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid transparent;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0 0 0 / 10%);
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  font-weight: 600;
  min-height: 45px;
  padding-block: 5px;
  padding-inline: 20px;
  transition: all 50ms;
  width: 260px;

  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }

  &:disabled {
    border-color: ${({ answer }) => (answer === 'right' ? '#27ae60' : '#c0392b')};
    color: ${({ answer }) => (answer === 'right' ? '#27ae60' : '#c0392b')};
    cursor: not-allowed;
    opacity: 0.7;
  }

  &:disabled:hover {
    background-color: ${({ answer }) => (answer === 'right' ? '#27ae60' : '#c0392b')};
    color: ${({ theme }) => theme.lightColor};
    cursor: not-allowed;
  }
`;

export const AlertMessageContainer = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-top: 2px solid ${({ theme }) => theme.theme};
  display: flex;
  justify-content: space-between;
  min-height: 70px;
  padding-inline: 25px;
  gap: 10px;

  & p {
    align-items: center;
    column-gap: 5px;
    display: flex;
    font-weight: bold;
  }

  @media screen and (max-width: 420px) {
    align-items: center;
    flex-direction: column;
    min-height: 100px;
    justify-content: center;
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
  background-color: ${({ theme }) => theme.theme};
  box-shadow: none;
  color: ${({ theme }) => theme.lightColor};
  opacity: 0.8;
  width: 120px;

  &:hover { opacity: 1 }
`;

export default GamePage;
