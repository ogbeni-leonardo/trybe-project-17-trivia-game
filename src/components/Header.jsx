import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { getGravatarEmail, getScore, getName } = this.props;
    return (
      <>
        <img
          src={ `https://www.gravatar.com/avatar/${getGravatarEmail}` }
          alt="avatar do usuário"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-score">{ `Score: ${getScore}` }</p>
        <p data-testid="header-player-name">{ `Nome: ${getName}` }</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  getScore: state.player.score,
  getName: state.player.name,
  getGravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  getScore: PropTypes.number,
  getName: PropTypes.string,
  getGravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);
