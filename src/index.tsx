// 개발환경용 파일
import ContentApp from './ContentApp';
import DevBackground from './components/DevBackground';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <>
    <DevBackground />
    <ContentApp isDev />
  </>,
);
