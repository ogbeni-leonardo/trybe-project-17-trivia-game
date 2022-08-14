import React from 'react';
import { number } from 'prop-types';
import { GiPodiumWinner, GiPodiumThird } from 'react-icons/gi';

import PodiumContent, {
  RedirectLinksContainer, RedirectLink,
} from './Podium.styles';

export default class Podium extends React.Component {
  render() {
    const { assertions } = this.props;
    const MIN_OF_ASSERTIONS = 3;

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
  assertions: number.isRequired,
};
