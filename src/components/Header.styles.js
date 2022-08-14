import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  border-bottom: 2px solid ${({ theme }) => theme.theme};
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  display: flex;
  gap: 20px;
  justify-content: space-between;
  min-height: 90px;
  min-width: 300px;
  padding-inline: 20px;

  @media screen and (max-width: 430px) {
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding-block: 20px;
  }
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

  @media screen and (max-width: 430px) {
    align-self: center;
  }
`;

export const HeaderUser = styled.div`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  border: 2px solid ${({ theme }) => theme.theme};
  border-radius: 30px;
  column-gap: 8px;
  cursor: pointer;
  display: flex;
  height: 46px;
  justify-content: center;
  padding: 8px;
  position: relative;
  transition: all 60ms;

  & img {
    border-radius: 50%;
    height: 36px;
    width: 36px;
  }

  & p {
    font-size: 0.8rem;
    font-weight: 600;
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-transform: lowercase;
    white-space: nowrap;
  }
`;

export const Logout = styled(Link)`
  border-radius: 50%;
  color: ${({ theme }) => theme.fontColor};
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
