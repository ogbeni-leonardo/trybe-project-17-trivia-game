import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.theme};
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  display: flex;
  justify-content: space-between;
  min-height: 100px;
  padding-inline: 20px;
`;

export const HeaderTitle = styled.h1`
  & span {
    color: ${({ theme }) => theme.theme};
  }
`;

export const HeaderUserContainer = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;

  &:hover {
    & div {
      column-gap: 5px;
      border-radius: 30px;
      flex-direction: row;
      height: 46px;
      padding: 8px;
      width: auto;

      & img {
        transform: translateY(0);
      }

      & p {
        max-width: 100px;
      }

      & a {
        display: block;
      }
    }
  }
`;

export const HeaderUser = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.theme};
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 80px;
  justify-content: center;
  padding: 5px;
  position: relative;
  transition: all 60ms;
  width: 80px;

  & img {
    border-radius: 50%;
    height: 36px;
    transform: translateY(-2px);
    width: 36px;
  }

  & p {
    font-weight: 600;
    font-size: 0.8rem;
    max-width: 45px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;
    white-space: nowrap;
  }
`;

export const Logout = styled(Link)`
  border-radius: 50%;
  color: ${({ theme }) => theme.fontColor};
  display: none;
  font-size: 1.2rem;
  height: 32px;
  position: relative;
  text-decoration: none;
  width: 32px;

  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }
`;

export default HeaderContainer;
