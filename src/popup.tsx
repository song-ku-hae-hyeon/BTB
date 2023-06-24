import * as React from 'react';
import ReactDOM from 'react-dom/client';

import PopupApp from './PopupApp';

const $popup = document.createElement('div') as HTMLElement;
$popup.id = 'popup';
document.body.appendChild($popup);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.createRoot(document.querySelector('#popup')!).render(
    <React.StrictMode>
      <PopupApp />
    </React.StrictMode>,
  );
});
