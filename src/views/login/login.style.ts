import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const UsernameInput = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  width: 300px;
  font-size: 16px;
`;

export const LoginButton = styled.button`
  padding: 10px;
  width: 150px;
  font-size: 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;
