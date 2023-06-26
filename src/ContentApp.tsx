import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DockBar } from '@components';
import { Fireworks } from './lib/Fireworks/Fireworks';

interface ContentWrapperProps {
  isActive: boolean;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;
`;

interface ContentAppProps {
  isDev?: boolean;
}

const ContentApp = ({ isDev }: ContentAppProps) => {
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
      <Fireworks />
      <DockBar />
    </ContentWrapper>
  );
};

export default ContentApp;
