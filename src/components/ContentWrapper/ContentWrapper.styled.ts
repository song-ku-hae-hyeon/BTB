import styled, { keyframes } from 'styled-components';
import { IMAGE } from '@static';

import type { ContentWrapperStyledProps } from './types';
import type { ToolType } from '@types';

// 특수한 상황을 제외하고는 훅을 사용하는 커서는 반드시 32 32 로 맞춰주세요!
const cursorImage: Record<ToolType, string> = {
  none: `default`,
  highlighter: `url(${IMAGE.HIGHLIGHTER_URL}) 8 64, auto;`,
  stamp: `url(${IMAGE.STAMP_URL}) 32 32 ,auto;`,
  ant: `default`,
  bubble: `default`,
  gun: `url(${IMAGE.GUN_URL}) 32 32 ,auto;`,
  hammer: `url(${IMAGE.HAMMER_URL}) 32 32 ,auto;`,
};

const ContentWrapper = styled.div<ContentWrapperStyledProps>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 999;
  cursor: ${({ tool }) => cursorImage[tool]};
`;

export default { ContentWrapper };
