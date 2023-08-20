import React from 'react';
import S from './styled';
// @ts-ignore
import img from '../../asset/ant.png';
import { getIconImageSrc } from '../../utils';

import type { ButtonProps } from './types';

const IconButton = ({ icon, onClickBtn }: ButtonProps) => {
  return (
    <S.ButtonWrapper onClick={onClickBtn}>
      <img src={getIconImageSrc(icon)} alt="img" width="100%" />
    </S.ButtonWrapper>
  );
};

export default IconButton;
