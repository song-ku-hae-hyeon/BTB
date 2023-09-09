import styled from 'styled-components';
import { IMAGE } from '@static';

import type { ContentWrapperProps } from '.';
import type { ToolType } from '@types';

const cursorImage: Record<ToolType, string> = {
  highlighter: `url(${IMAGE.HIGHLIGHTER_URL}) 8 64, auto;`,
  stamp: `url(${IMAGE.STAMP_URL}) 0 0 ,auto;`,
  ant: `default`,
  bubble: `default`,
};

const ContentWrapper = styled.div<ContentWrapperProps>`
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
