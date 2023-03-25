import React from 'react';
import S from './styled';

import type { ButtonProps } from './types';

const IconButton = ({ icon }: ButtonProps) => {
  return <S.ButtonWrapper>{icon}</S.ButtonWrapper>;
};

export default IconButton;
