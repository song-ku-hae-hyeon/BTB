import Konva from 'konva';

console.log('Pikachu Everywhere - Content Script is Running');

var width = window.innerWidth;
var height = window.innerHeight;

const paper = document.createElement('div');
paper.style.zIndex = '5';
paper.style.cursor =
  'url("https://random.imagecdn.app/32/32"), url("stamp.png"), url("https://e7.pngegg.com/pngimages/901/108/png-clipart-rubber-stamp-rubber-stamp.png"), help';

var stage = new Konva.Stage({
  container: paper,
  width: width,
  height: height,
});
var layer = new Konva.Layer();
stage.add(layer);

const handleMouseClick = (event: any) => {
  event.preventDefault();

  console.log('clicked');

  stage.setPointersPositions(event);

  Konva.Image.fromURL('https://random.imagecdn.app/500/500', function (image: any) {
    layer.add(image);

    image.position(stage.getPointerPosition());
  });
};

let isEnabled = false;

chrome.runtime.onMessage.addListener(message => {
  if (message === 'on' && isEnabled === false) {
    isEnabled = true;
    document.body.appendChild(paper);
    document.body.addEventListener('click', handleMouseClick);
    console.log('hot reloader!');
  } else if (message === 'off' && isEnabled === true) {
    isEnabled = false;
    document.body.removeEventListener('click', handleMouseClick);
    layer.find('Image').forEach(image => {
      image.destroy();
    });
    paper.remove();
  }
});

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// import { DockBar, Stamp } from '@components';

// interface ContentWrapperProps {
//   isActive: boolean;
// }

// const ContentWrapper = styled.div<ContentWrapperProps>`
//   display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
//   position: fixed;
//   bottom: 0;
//   left: 0;
//   width: 100vw;
//   z-index: 9999;
// `;

// const ContentApp = () => {
//   const [isContentActive, setIsContentActive] = useState(false);

//   useEffect(() => {
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//       // console.log(message);
//       setIsContentActive(message.state as boolean);
//     });
//   }, []);

//   return (
//     <ContentWrapper isActive={isContentActive}>
//       <DockBar />
//       <Stamp />
//     </ContentWrapper>
//   );
// };

// export default ContentApp;
