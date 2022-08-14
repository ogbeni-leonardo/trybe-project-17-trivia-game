import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PodiumContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;
  flex-grow: 1;
  align-self: stretch;
  background-color: ${({ theme }) => theme.secondary};

  & > :first-child {
    font-size: 12rem;
    color: #f7b731;
  }

  & p {
    font-size: 2.4rem;
  }

  @media screen and (max-width: 410px) {
    & > div {
      flex-direction: column;

      & a {
        width: 160px
      }
    }
  }
`;

export const RedirectLinksContainer = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 20px;
`;

export const RedirectLink = styled(Link)`
  align-items: center;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.theme};
  display: flex;
  font-size: 0.9rem;
  font-weight: 600;
  height: 40px;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 50ms;
  width: 125px;
  
  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }
`;

export default PodiumContent;
