import S from './ContentWrapper.styled';

import type { ReactNode } from 'react';
import type { ToolType } from '@types';

export interface ContentWrapperProps {
  isActive: boolean;
  children: ReactNode;
  tool: ToolType;
}

const ContentWrapper = ({ isActive, children, tool }: ContentWrapperProps) => {
  return (
    <S.ContentWrapper isActive={isActive} tool={tool}>
      {children}
    </S.ContentWrapper>
  );
};

export default ContentWrapper;
