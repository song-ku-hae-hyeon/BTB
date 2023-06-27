import React from 'react';
import S from './styled';

import type { ButtonProps } from './types';

const IconButton = ({ icon, onClickBtn }: ButtonProps) => {
  return <S.ButtonWrapper onClick={onClickBtn}>{icon}</S.ButtonWrapper>;
};

export default IconButton;
