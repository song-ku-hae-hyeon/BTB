import styled from 'styled-components';
import { IMAGE } from '@static';

import type { ButtonProps } from './types';

const iconImage: Record<string, string> = {
  highlighter: `url(${IMAGE.HIGHLIGHTER_URL})`,
  stamp: `url(${IMAGE.STAMP_URL})`,
  ant: `url(${IMAGE.ANT1_URL})`,
  bubble: 'none',
  gun: `url(${IMAGE.ANT1_URL})`,
};

const ButtonWrapper = styled.button<Pick<ButtonProps, 'icon'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  border-radius: 10px;
  border-style: none;
  background-color: rgba(255, 255, 255, 0);
  background-repeat: no-repeat;
  background-position: center center;
  background-image: ${({ icon }) => iconImage[icon]};
  background-size: 48px;
  transition: all 300ms;
  &:hover {
    background-size: 64px;
  }
`;

export default { ButtonWrapper };
