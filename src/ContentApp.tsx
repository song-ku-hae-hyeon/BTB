import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DockBar, Highlighter } from '@components';
import { Fireworks } from './lib/Fireworks/Fireworks';
import { ToolType } from '@types';

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
  const [tool, selectTool] = useState<ToolType>('firework');
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
      {(() => {
        switch (tool) {
          case 'firework':
            return <Fireworks />;
          case 'highlighter':
            return <Highlighter />;
          default:
            return <></>;
        }
      })()}
      <DockBar selectTool={selectTool} />
    </ContentWrapper>
  );
};

export default ContentApp;
