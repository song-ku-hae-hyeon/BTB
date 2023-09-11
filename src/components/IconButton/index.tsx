import S from './styled';

import type { ButtonProps } from './types';

const IconButton = ({ icon, onClickBtn }: ButtonProps) => {
  return <S.ButtonWrapper icon={icon} onClick={onClickBtn} />;
};

export default IconButton;
