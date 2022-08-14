import styled from 'styled-components';

const GameStatsContent = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
  height: 480px;
  justify-content: flex-start;

  @media screen and (max-width: 900px) {
    flex-direction: row;
    height: auto;
    justify-content: center;
  }
`;

export const StatsContainer = styled.section`
  color: ${({ theme }) => theme.lightColor};
  background-color: ${({ background, theme }) => background || theme.theme};
  display: flex;
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  flex-direction: column;
  height: 110px;
  opacity: 0.8;
  padding-inline: 15px;
  transition: all 50ms;
  width: 230px;

  & h3 {
    margin-block: 10px;
    text-transform: uppercase;
  }
`;

export const StatsContent = styled.div`
  align-items: center;
  display: flex;
  flex-grow: 1;
  font-size: 1.6rem;
  font-weight: 600;
  justify-content: space-between;
  padding-inline: 5px;
`;

export default GameStatsContent;
