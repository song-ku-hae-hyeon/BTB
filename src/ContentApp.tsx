import { useEffect, useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { ContentWrapper, DockBar, Pen, Stamp, AntGroup, Hammer, BulletEffect, Bubble } from '@components';
import { ToolType } from '@types';
import type Konva from 'konva';
import { BluePenAtom, HighlighterAtom, RedPenAtom, ToolAtom } from '@recoil';
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
        <Pen
          stageRef={tool === 'highlighter' ? stageRef : null}
          atom={HighlighterAtom}
          color="rgba(255, 255, 0, 0.5)"
          strokeWidth={20}
        />
        <Pen stageRef={tool === 'bluePen' ? stageRef : null} atom={BluePenAtom} color="#5166B3" strokeWidth={5} />
        <Pen stageRef={tool === 'redPen' ? stageRef : null} atom={RedPenAtom} color="#F76D67" strokeWidth={5} />
        <Stamp stageRef={tool === 'stamp' ? stageRef : null} />
        <Bubble stageRef={tool === 'bubble' ? stageRef : null} />
        <BulletEffect stageRef={tool === 'gun' ? stageRef : null} />
        <Hammer stageRef={tool === 'hammer' ? stageRef : null} />
        <AntGroup stageRef={tool === 'ant' ? stageRef : null} />
      </Stage>
    </div>
  );
};

export default ContentApp;
