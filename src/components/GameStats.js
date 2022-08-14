import React from 'react';
import { number } from 'prop-types';
import { connect } from 'react-redux';
import { MdSportsScore } from 'react-icons/md';
import { BsPercent } from 'react-icons/bs';
import { GrValidate } from 'react-icons/gr';

import GameStatsContent, {
  StatsContainer, StatsContent,
} from './GameStats.styles';

class GameStats extends React.Component {
  render() {
    const { amount, assertions, index, score } = this.props;

    const ICONS_STYLE = {
      fontSize: '2.8rem',
      opacity: 0.5,
    };

    const TRIVIA_PERCENTAGE_COMPLETED = (((index + 1) * 100) / amount).toFixed(2);

    return (
      <GameStatsContent>
        <StatsContainer background="#574b90">
          <h3>Score</h3>
          <StatsContent>
            <MdSportsScore style={ ICONS_STYLE } />
            <p>{`${score} points`}</p>
          </StatsContent>
        </StatsContainer>

        <StatsContainer background="#2980b9">
          <h3>Assertions</h3>
          <StatsContent>
            <GrValidate style={ ICONS_STYLE } />
            <p>{`${assertions}/${amount}`}</p>
          </StatsContent>
        </StatsContainer>

        { index !== undefined && (
          <StatsContainer background="#d35400">
            <h3>Progress</h3>
            <StatsContent>
              <BsPercent style={ ICONS_STYLE } />
              <p>{`${TRIVIA_PERCENTAGE_COMPLETED}%`}</p>
            </StatsContent>
          </StatsContainer>
        ) }
      </GameStatsContent>
    );
  }
}

GameStats.defaultProps = {
  index: undefined,
};

GameStats.propTypes = {
  amount: number.isRequired,
  assertions: number.isRequired,
  index: number,
  score: number.isRequired,
};

const mapStateToProps = ({ player: { amount, assertions, score } }) => ({
  amount, assertions, score,
});

export default connect(mapStateToProps)(GameStats);
