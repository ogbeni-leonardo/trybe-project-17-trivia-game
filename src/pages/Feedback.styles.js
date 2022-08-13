import styled from 'styled-components';

const MainContent = styled.main`
  // display: flex;
  // height: 100vh;
  & p {
    text-align: center;
    display:flex;
    flex-direction: collumn;
    margin-top: 15px;
    justify-content: center;
    color: ${({ theme }) => theme.theme};
    font-weight: 500;
    font-size: 1.4rem;
  }
`;

export const ButtonContent = styled.button`
// align-items: flex-end;
background-color: ${({ theme }) => theme.theme};
border-radius: 5px;
color: ${({ theme }) => theme.lightColor};
cursor: pointer;
display: flex;
margin-top: 55px;
margin-left: 40px;
opacity: 0.8;
padding: 12px 25px;
text-transform: uppercase;

&:hover {
  opacity: 1;
}
`;

export const DivContent = styled.div`
  display: flex;
  justify-content: center;
`;

export const DivInitialContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50vh;
  // border: 2px solid white;
`;

export default MainContent;
