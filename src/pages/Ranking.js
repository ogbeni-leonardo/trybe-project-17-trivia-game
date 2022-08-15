import React from 'react';

import { BsFillTrophyFill } from 'react-icons/bs';
import Header from '../components/Header';

import { RedirectLink } from '../components/Podium.styles';
import RankingPage, {
  TableRanking,
  HeaderTableRanking,
  PlayerRanking,
  Player,
  Score,
  Rank,
  TrophyRankOne,
  TrophyRankTwo,
  TrophyRankTree,
} from './Ranking.styles';

class Ranking extends React.Component {
  getRanking = () => {
    const localStorageData = localStorage.getItem('ranking');
    const rankingData = JSON.parse(localStorageData);
    console.log(rankingData);
    return rankingData.sort((a, b) => b.score - a.score);
  }

  render() {
    const podiumLength = 3;
    const headerTitles = ['Rank', 'Player', 'Score'];

    return (
      <>
        <Header />
        <RankingPage>

          <h1 data-testid="ranking-title">
            Ranking
          </h1>

          <TableRanking>
            <HeaderTableRanking>
              <tr>
                {headerTitles.map((item) => (
                  <th key={ item }>{item}</th>
                ))}
              </tr>
            </HeaderTableRanking>

            <tbody>
              {this.getRanking().map((player, index) => (
                <PlayerRanking key={ index }>
                  <Rank>
                    { index + 1 === 1
                    && <TrophyRankOne><BsFillTrophyFill /></TrophyRankOne>}

                    { index + 1 === 2
                    && <TrophyRankTwo><BsFillTrophyFill /></TrophyRankTwo>}

                    { index + 1 === podiumLength
                    && <TrophyRankTree><BsFillTrophyFill /></TrophyRankTree>}
                    { index + 1 > podiumLength
                    && <p><strong>{ index + 1 }</strong></p> }
                  </Rank>
                  <Player>
                    <img
                      src={ `https://avatars.dicebear.com/api/bottts/${player.picture}.svg` }
                      alt="Avatar"
                    />
                    <p>{player.name}</p>
                  </Player>

                  <Score>
                    <p>{player.score}</p>
                  </Score>
                </PlayerRanking>
              ))}
            </tbody>
          </TableRanking>

          <RedirectLink to="/">
            Play Again
          </RedirectLink>
        </RankingPage>
      </>
    );
  }
}

export default Ranking;
