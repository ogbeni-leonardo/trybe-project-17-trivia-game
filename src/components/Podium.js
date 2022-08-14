import React from 'react';
import { number } from 'prop-types';
import { GiPodiumWinner, GiPodiumThird } from 'react-icons/gi';

import PodiumContent, {
  RedirectLinksContainer, RedirectLink,
} from './Podium.styles';

export default class Podium extends React.Component {
  render() {
    const { amount, assertions } = this.props;
    const SIXTY_PERCENT = 0.6;
    const MIN_OF_ASSERTIONS = amount * SIXTY_PERCENT;

    return (
      <PodiumContent>
        {assertions >= MIN_OF_ASSERTIONS
          ? (
            <>
              <GiPodiumWinner />
              <p>Well done!</p>
            </>
          )
          : (
            <>
              <GiPodiumThird />
              <p>Could be better...</p>
            </>
          )}

        <RedirectLinksContainer>
          <RedirectLink to="/">
            Play Again
          </RedirectLink>

          <RedirectLink to="/ranking">
            Go To Ranking
          </RedirectLink>
        </RedirectLinksContainer>
      </PodiumContent>
    );
  }
}

Podium.propTypes = {
  amount: number.isRequired,
  assertions: number.isRequired,
};
