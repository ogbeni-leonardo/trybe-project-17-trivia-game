import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';
import { IoIosLogOut } from 'react-icons/io';

import HeaderContainer, {
  HeaderTitle,
  HeaderUserContainer,
  HeaderUser,
  Logout,
} from './Header.styles';

class Header extends React.Component {
  render() {
    const { name, gravatarEmail } = this.props;
    return (
      <HeaderContainer>
        <HeaderTitle>
          Ninth
          <span>Game</span>
        </HeaderTitle>

        <HeaderUserContainer>
          <HeaderUser>
            <img
              src={ `https://avatars.dicebear.com/api/bottts/${gravatarEmail}.svg` }
              alt="robot-avatar"
              data-testid="header-profile-picture"
            />

            <p data-testid="header-player-name">{name}</p>

            <Logout to="/" title="Sair">
              <IoIosLogOut
                style={ {
                  left: '50%',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                } }
              />
            </Logout>
          </HeaderUser>
        </HeaderUserContainer>
      </HeaderContainer>
    );
  }
}

Header.propTypes = {
  name: string.isRequired,
  gravatarEmail: string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(Header);
