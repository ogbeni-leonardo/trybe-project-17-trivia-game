import React from 'react';
import { Redirect } from 'react-router-dom';

import { BsFillTrophyFill } from 'react-icons/bs';
import Header from '../components/Header';

import { ButtonContent } from './Feedback.styles';
import RankingPage, {
  TableRanking,
  PlayerRanking,
  Player,
  Score,
  Rank,
  TrophyRankOne,
  TrophyRankTwo,
  TrophyRankTree,
} from './Ranking.styles';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = { redirectPlayAgain: false };
  }

  getRanking = () => {
    const localStorageData = localStorage.getItem('ranking');
    const rankingData = JSON.parse(localStorageData);
    console.log(rankingData);
    return rankingData.sort((a, b) => b.score - a.score);
  }

  playAgain = () => {
    this.setState({
      redirectPlayAgain: true,
    });
  }

  render() {
    const { redirectPlayAgain } = this.state;
    const podiumLength = 3;
    return (
      <>
        <Header />
        <RankingPage>

          <h1 data-testid="ranking-title">
            Ranking
          </h1>

          <TableRanking>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
              </tr>
            </thead>

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

          <ButtonContent
            type="button"
            data-testid="btn-play-again"
            onClick={ this.playAgain }
          >
            Play Again
          </ButtonContent>

          { redirectPlayAgain && <Redirect to="/" /> }

        </RankingPage>
      </>
    );
  }
}

export default Ranking;
