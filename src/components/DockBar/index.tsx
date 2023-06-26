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
      <IconButton icon="pen" onClickBtn={() => onClickBtn('pen')} />
    </S.DockBarWrapper>
  );
};

export default DockBar;
