import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { RecoilRoot } from 'recoil';
import { Stage } from 'react-konva';
import type Konva from 'konva';

import { DockBar, Highlighter, Stamp, AntGroup } from '@components';
import { ToolType } from '@types';
import { Bubble } from './components/Bubble';

interface ContentWrapperProps {
  isActive: boolean;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 999;
`;

interface ContentAppProps {
  isDev?: boolean;
}

const ContentApp = ({ isDev }: ContentAppProps) => {
  const [tool, selectTool] = useState<ToolType>('highlighter');
  const [isContentActive, setIsContentActive] = useState(Boolean(isDev));

  useEffect(() => {
    if (isDev) return;
    const messageListener = (message: any) => {
      setIsContentActive(message.state as boolean);
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  return (
    <RecoilRoot>
      <ContentWrapper isActive={isContentActive}>
        <Workbench tool={tool} />
        <DockBar selectTool={selectTool} />
      </ContentWrapper>
    </RecoilRoot>
  );
};

const Workbench = ({ tool }: { tool: ToolType }) => {
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9000 }}>
      <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
        <Highlighter stageRef={tool === 'highlighter' ? stageRef : null} />
        <Stamp stageRef={tool === 'stamp' ? stageRef : null} />
        <AntGroup stageRef={tool === 'ant' ? stageRef : null} />
        <Bubble stageRef={tool === 'bubble' ? stageRef : null} />
      </Stage>
    </div>
  );
};

export default ContentApp;
