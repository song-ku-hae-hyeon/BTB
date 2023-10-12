import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { ContentWrapper, DockBar, Highlighter, Stamp, AntGroup, Hammer } from '@components';
import { ToolType } from '@types';
import { Bubble } from './components/Bubble';
import type Konva from 'konva';
import { GunEffect } from './components/Gun-Effect';
import { ToolAtom } from '@recoil';
import { GlobalStyles } from '@styles';
import { Stage } from 'react-konva';

interface ContentAppProps {
  isDev?: boolean;
}

const ContentApp = ({ isDev }: ContentAppProps) => {
  const [tool, selectTool] = useRecoilState(ToolAtom);
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
    <ContentWrapper isActive={isContentActive}>
      <GlobalStyles />
      <Workbench tool={tool} />
      <DockBar selectTool={selectTool} />
    </ContentWrapper>
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
        <GunEffect stageRef={tool === 'gun' ? stageRef : null} />
        <Hammer stageRef={tool === 'hammer' ? stageRef : null} />
      </Stage>
    </div>
  );
};

export default ContentApp;
