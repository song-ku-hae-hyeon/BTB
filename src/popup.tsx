// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import PopupApp from './PopupApp';

// const $popup = document.getElementById('popup');
// ReactDOM.render(<PopupApp />, $popup);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './PopupApp';

const $popup = document.getElementById('popup');
ReactDOM.render(<App />, $popup);

const send = (s: any) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
    chrome.tabs.sendMessage(tabs[0].id, s);
  });
};

document.getElementById('on')!.onclick = () => {
  send('on');
};

document.getElementById('off')!.onclick = () => {
  send('off');
};
