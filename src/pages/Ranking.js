import React from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      redirectHome: false,
    };
  }

  backHome = (event) => {
    event.preventDefault();
    this.setState({
      redirectHome: true,
    });
  }

  getRanking = () => {
    const localStorageData = localStorage.getItem('ranking');
    const rankingData = JSON.parse(localStorageData);
    console.log(rankingData);
    return rankingData.sort((a, b) => b.score - a.score);
  }

  render() {
    const { redirectHome } = this.state;
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

        <button
          type="submit"
          data-testid="btn-go-home"
          onClick={ this.backHome }
        >
          Início
        </button>
        { redirectHome ? <Redirect to="/" /> : null }

      </>
    );
  }
}

export default Ranking;
