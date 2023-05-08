import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import ContentApp from './ContentApp';

const $content = document.createElement('div');

document.body.appendChild($content);

ReactDOM.render(
  <RecoilRoot>
    <ContentApp />
  </RecoilRoot>,
  $content,
);
