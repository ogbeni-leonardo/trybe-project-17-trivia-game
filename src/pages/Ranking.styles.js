import styled from 'styled-components';

const RankingPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  min-height: 500px;
  position: relative;
  width: 100%;
  padding: 50px;
`;

export const TableRanking = styled.table`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content:center;
  align-content: center;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 20px;
  
  & thead{
    background-color: ${({ theme }) => theme.theme};
    padding: 5px 17px;   
    
    & tr {
      display: flex;
      justify-content: space-between;
      padding: 10px 20px;
    }
  }

  & tbody {
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-content: center;
  }
`;

export const PlayerRanking = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 8px;
  margin: 10px;
  border: 2px solid ${({ theme }) => theme.defaultBackground};
`;

export const Rank = styled.td`
  display: flex;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  width: 25%;
`;

export const Player = styled.td`
  display: flex;
  padding: 8px 15px;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  border: 2px solid ${({ theme }) => theme.defaultBackground};
  border-bottom: 0;
  border-top: 0;

  & img {
    width: 50px;
    margin-right: 20px;
  }
`;

export const Score = styled.td`
  display: flex;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  width: 25%;
`;

export default RankingPage;
