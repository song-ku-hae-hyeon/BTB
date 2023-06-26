import React, { useState, useEffect } from 'react';
import { IconButton } from '@components';
import S from './styled';

import type { Dispatch, SetStateAction } from 'react';

interface DockbarProps {
  setObject: {
    setOnHighlightPen: Dispatch<SetStateAction<boolean>>;
  };
}

const DockBar = ({ setObject }: DockbarProps) => {
  return (
    <S.DockBarWrapper>
      <IconButton icon="A" onClick={() => setObject.setOnHighlightPen(prev => !prev)} />
      <IconButton icon="B" onClick={() => {}} />
      <IconButton icon="C" onClick={() => {}} />
      <IconButton icon="D" onClick={() => {}} />
      <IconButton icon="E" onClick={() => {}} />
    </S.DockBarWrapper>
  );
};

export default DockBar;
