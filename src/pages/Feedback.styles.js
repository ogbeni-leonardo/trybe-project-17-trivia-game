import styled from 'styled-components';

const FeedbackPage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: max(100vh, 500px);
  min-width: 300px;
`;

export const FeedbackContainer = styled.div`
  margin: auto;
  padding-block: 20px;
`;

export const FeedbackContent = styled.div`
  align-items: flex-start;
  background-color: ${({ theme }) => theme.primary};
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  display: flex;
  margin-block: auto;
  max-height: 480px;
  min-height: 480px;
  min-width: 300px;
  overflow: hidden;
  width: 670px;

  & > section:first-of-type {
    padding: 20px;

    @media screen and (max-width: 900px) {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 680px) {
    flex-direction: column;
    max-height: none;
    width: auto;

    & > section:first-of-type {
      align-items: center;
      align-self: stretch;
      flex-direction: row;
      justify-content: center;
    }

    & > div:first-of-type {
      padding-block: 60px;

      & p {
        font-size: 2rem;
      }
    }
  }
`;

export default FeedbackPage;
