import * as React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import ContentApp from './ContentApp';

const $content = document.createElement('div') as HTMLElement;
$content.id = 'content';
document.body.appendChild($content);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.querySelector('#content')!).render(
    <React.StrictMode>
      <RecoilRoot>
        <ContentApp />
      </RecoilRoot>
    </React.StrictMode>,
  );
});
