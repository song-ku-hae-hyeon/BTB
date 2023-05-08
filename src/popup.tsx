import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

import PopupApp from './PopupApp';

const $popup = document.getElementById('popup');
ReactDOM.render(
  <RecoilRoot>
    <PopupApp />
  </RecoilRoot>,
  $popup,
);
