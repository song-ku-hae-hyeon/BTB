import styled from 'styled-components';

const ButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 72px;
  border-radius: 5px;
  border-style: none;
  background-color: none;
  &:hover {
    background-color: rgba(150, 150, 150, 0.5);
  }
`;

export default { ButtonWrapper };
