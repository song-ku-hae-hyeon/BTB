import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ContentApp from './ContentApp';
import { RecoilRoot } from 'recoil';

const $content = document.createElement('div');

document.body.appendChild($content);

ReactDOM.render(
  <RecoilRoot>
    <ContentApp />
  </RecoilRoot>,
  $content,
);
