import styled from 'styled-components';

import { ButtonStyleProps } from './types';

const colorDict = {
  grey: {
    normal: '#f8f8f8',
    highlighted: '#e6e6e6',
  },
  blue: {
    normal: '#5ba4fc',
    highlighted: '#5897ee',
  },
  green: {
    normal: '#53d769',
    highlighted: '#46c263',
  },
  red: {
    normal: '#fc3d39',
    highlighted: '#e33437',
  },
};

const ButtonWrapper = styled.button<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 48px;
  border-radius: 5px;
  border-style: none;
  color: white;
  background-color: ${({ color }) => colorDict[color].normal};
  &:hover {
    background-color: ${({ color }) => colorDict[color].highlighted};
  }
`;

export default { ButtonWrapper };
