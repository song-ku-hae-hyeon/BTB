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
      <IconButton icon="highlighter" onClickBtn={() => onClickBtn('highlighter')} />
      <IconButton icon="redPen" onClickBtn={() => onClickBtn('redPen')} />
      <IconButton icon="bluePen" onClickBtn={() => onClickBtn('bluePen')} />
      <IconButton icon="stamp" onClickBtn={() => onClickBtn('stamp')} />
      <IconButton icon="ant" onClickBtn={() => onClickBtn('ant')} />
      <IconButton icon="bubble" onClickBtn={() => onClickBtn('bubble')} />
      <IconButton icon="gun" onClickBtn={() => onClickBtn('gun')} />
      <IconButton icon="hammer" onClickBtn={() => onClickBtn('hammer')} />
    </S.DockBarWrapper>
  );
};

export default DockBar;
