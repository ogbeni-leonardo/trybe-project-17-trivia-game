import styled from 'styled-components';

const SettingsPage = styled.main`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: max(100vh, 500px);
  min-width: 340px;
  padding: 20px;
`;

export const SettingsForm = styled.main`
  background-color: ${({ theme }) => theme.primary};
  border-radius: 6px;
  box-shadow: 0 0 15px rgba(0 0 0 / 15%);
  display: flex;
  flex-direction: column;
  margin: auto;
  min-height: 500px;
  overflow: hidden;
  width: 570px;
`;

export const FormTitle = styled.header`
  align-items: center;
  background-color: ${({ theme }) => theme.secondary};
  column-gap: 25px;
  display: flex;
  height: 85px;
  margin-bottom: 20px;
  padding-inline: 20px;

  & :first-child {
    align-items: center;
    color: ${({ theme }) => theme.theme};
    display: flex;
    font-size: 3rem;
  }
`;

export const FormLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: 600;
  padding: 10px 30px;
  row-gap: 10px;
`;

export const FormInput = styled.input`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
  height: 38px;
  padding-inline: 10px;
`;

export const FormSelect = styled.select`
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  color: ${({ theme }) => theme.fontColor};
  cursor: pointer;
  height: 38px;
  padding-inline: 10px;
  position: relative;
`;

export const FormSubmit = styled.button`
  align-items: center;
  align-self: center;
  background-color: transparent;
  border: 2px solid ${({ theme }) => theme.theme};
  border-radius: 5px;
  color: ${({ theme }) => theme.theme};
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  font-weight: 600;
  height: 40px;
  justify-content: center;
  margin-block: 35px;
  text-decoration: none;
  text-transform: uppercase;
  transition: all 50ms;
  width: 140px;
  
  &:hover {
    background-color: ${({ theme }) => theme.theme};
    color: ${({ theme }) => theme.lightColor};
  }
`;

export default SettingsPage;
