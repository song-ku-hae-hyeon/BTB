import { useRecoilState, useRecoilValue } from 'recoil';
import S from './ContentWrapper.styled';
import { ToolAtom } from '@recoil';

import type { ContentWrapperProps } from './types';

const ContentWrapper = ({ isActive, children }: ContentWrapperProps) => {
  const tool = useRecoilValue(ToolAtom);
  return (
    <S.ContentWrapper isActive={isActive} tool={tool}>
      {children}
    </S.ContentWrapper>
  );
};

export default ContentWrapper;
