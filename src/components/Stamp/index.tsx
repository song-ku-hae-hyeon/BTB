import Konva from 'konva';
import React from 'react';
import { Stage, Layer, Text } from 'react-konva';

console.log('Pikachu Everywhere - Content Script is Running');

// const handleMouseClick = (event: any) => {
//   event.preventDefault();

//   console.log('clicked');

//   stage.setPointersPositions(event);

//   Konva.Image.fromURL('https://random.imagecdn.app/500/500', function (image: any) {
//     layer.add(image);

//     image.position(stage.getPointerPosition());
//   });
// };

// let isEnabled = false;

// chrome.runtime.onMessage.addListener(message => {
//   console.log(message);
//   if (message === 'on' && isEnabled === false) {
//     isEnabled = true;
//     document.body.appendChild(paper);
//     document.body.addEventListener('click', handleMouseClick);
//     console.log('hot reloader!');
//   } else if (message === 'off' && isEnabled === true) {
//     isEnabled = false;
//     document.body.removeEventListener('click', handleMouseClick);
//     layer.find('Image').forEach(image => {
//       image.destroy();
//     });
//     paper.remove();
//   }
// });

const Stamp = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="hi" />
      </Layer>
    </Stage>
  );
};

export default Stamp;
