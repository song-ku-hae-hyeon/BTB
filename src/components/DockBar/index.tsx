import { IconButton } from '@components';
import S from './styled';

const DockBar = () => {
  return (
    <S.DockBarWrapper>
      <IconButton icon="A" />
      <IconButton icon="B" />
      <IconButton icon="C" />
      <IconButton icon="D" />
      <IconButton icon="E" />
    </S.DockBarWrapper>
  );
};

export default DockBar;
