// 개발환경용 파일
import React from 'react';
import ReactDOM from 'react-dom';
import ContentApp from './ContentApp';
import DevBackground from './components/DevBackground';

const $root = document.getElementById('root');

ReactDOM.render(
  <>
    <DevBackground />
    <ContentApp isDev />
  </>,
  $root,
);
