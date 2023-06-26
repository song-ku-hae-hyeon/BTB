import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DockBar, HighlightPen } from '@components';

interface ContentWrapperProps {
  isActive: boolean;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 999;
`;

interface ContentAppProps {
  isDev?: boolean;
}

const ContentApp = ({ isDev }: ContentAppProps) => {
  const [isContentActive, setIsContentActive] = useState(Boolean(isDev));
  const [onHighlightPen, setOnHighlightPen] = useState(false);

  const setObject = {
    setOnHighlightPen,
  };

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
      <DockBar setObject={setObject} />
      {onHighlightPen && <HighlightPen />}
    </ContentWrapper>
  );
};

export default ContentApp;
