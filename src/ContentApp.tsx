import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { DockBar } from '@components';

interface ContentWrapperProps {
  isActive: boolean;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  z-index: 9999;
`;

const ContentApp = () => {
  const [isContentActive, setIsContentActive] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // console.log(message);
      setIsContentActive(message.state as boolean);
    });
  }, []);

  return (
    <ContentWrapper isActive={isContentActive}>
      <DockBar />
    </ContentWrapper>
  );
};

export default ContentApp;
