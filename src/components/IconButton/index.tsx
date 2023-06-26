import React from 'react';
import S from './styled';

import type { ButtonProps } from './types';

const IconButton = ({ icon, onClick }: ButtonProps) => {
  return <S.ButtonWrapper onClick={onClick}>{icon}</S.ButtonWrapper>;
};

export default IconButton;
