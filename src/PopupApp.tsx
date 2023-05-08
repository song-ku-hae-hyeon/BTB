import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { PopupButton } from '@components';
import { popupState } from './atoms/popup';

const PopupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 200px;
  height: 100px;
`;

const PopupApp = () => {
  const [isActive, setIsActive] = useRecoilState(popupState);

  const handleButtonClick = (newState: boolean) => {
    setIsActive(newState);
    chrome.tabs.query({ active: true, currentWindow: true }, myTabs => {
      chrome.tabs.sendMessage(myTabs[0].id as number, { state: newState });
    });
  };
  return (
      <PopupWrapper>
        <PopupButton color="green" onClick={() => handleButtonClick(true)}>
          OPEN
        </PopupButton>
        <PopupButton color="red" onClick={() => handleButtonClick(false)}>
          CLOSE
        </PopupButton>
      </PopupWrapper>
  );
};

export default PopupApp;
