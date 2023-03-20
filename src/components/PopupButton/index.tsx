import React from 'react';

import S from './styled';
import { ButtonProps } from './types';

const PopupButton = ({ children, onClick, color = 'grey' }: ButtonProps) => {
  return (
    <S.ButtonWrapper onClick={onClick} color={color}>
      {children}
    </S.ButtonWrapper>
  );
};

export default PopupButton;
