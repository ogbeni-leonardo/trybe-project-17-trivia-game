import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  getRanking = () => {
    const localStorageData = localStorage.getItem('ranking');
    const rankingData = JSON.parse(localStorageData);
    console.log(rankingData);
    return rankingData.sort((a, b) => b.score - a.score);
  }

  render() {
    return (
      <>
        <h1 data-testid="ranking-title">
          Ranking
        </h1>

        <ul>
          {this.getRanking().map((player, index) => (
            <li key={ index }>
              <img
                src={ `https://www.gravatar.com/avatar/${player.picture}` }
                alt="Avatar"
              />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </li>
          ))}
        </ul>

        <Link to="/" data-testid="btn-go-home">
          Início
        </Link>
      </>
    );
  }
}

export default Ranking;
