import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ContentApp from './ContentApp';

const $content = document.createElement('div');

document.body.appendChild($content);

ReactDOM.render(<ContentApp />, $content);
