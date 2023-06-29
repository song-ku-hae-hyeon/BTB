import { IconButton } from '@components';
import S from './styled';
import { ToolType } from '@types';

type DockBarProps = {
  selectTool: (value: ToolType) => void;
};

const DockBar = ({ selectTool }: DockBarProps) => {
  const onClickBtn = (tool: ToolType) => selectTool(tool);

  return (
    <S.DockBarWrapper>
      <IconButton icon="firework" onClickBtn={() => onClickBtn('firework')} />
      <IconButton icon="highlighter" onClickBtn={() => onClickBtn('highlighter')} />
      <IconButton icon="stamp" onClickBtn={() => onClickBtn('stamp')} />
      <IconButton icon="ant" onClickBtn={() => onClickBtn('ant')} />
    </S.DockBarWrapper>
  );
};

export default DockBar;
