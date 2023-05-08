import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

console.log('Pikachu Everywhere - Content Script is Running');

var width = window.innerWidth;
var height = window.innerHeight;

const stampImageUrl = chrome.runtime.getURL('stamp.png');
const stampMarkImageUrl = chrome.runtime.getURL('stamp_mark.png');

console.log(stampImageUrl);

const paper = document.createElement('div');
paper.style.zIndex = '9998';
// paper.style.cursor = `url("${stampImageUrl}") 40 70, help`;
paper.style.cursor = `none`;
paper.style.display = 'flex';
paper.style.position = 'fixed';
paper.style.top = '0';
paper.style.left = '0';

const cursorPlayground = document.createElement('cursorPlayground');
cursorPlayground.style.zIndex = '9999';
cursorPlayground.style.display = 'flex';
cursorPlayground.style.position = 'fixed';
cursorPlayground.style.top = '0';
cursorPlayground.style.left = '0';
cursorPlayground.style.width = '100%';
cursorPlayground.style.height = '100%';
cursorPlayground.style.cursor = 'none';

const customCursor = new Image(70, 70);
customCursor.src = `${stampImageUrl}`;
cursorPlayground.appendChild(customCursor);

var stage = new Konva.Stage({
  container: paper,
  width: width,
  height: height,
});
var layer = new Konva.Layer();
stage.add(layer);

const MARK_SIZE = 100;

const handleMouseMove = (event: any) => {
  event.preventDefault();

  const mouseY = event.clientY;
  const mouseX = event.clientX;

  console.log(`${mouseX} ${mouseY}`);

  customCursor.style.transform = `translate3d(${mouseX - 35}px, ${mouseY - 50}px, 0)`;
};

const handleMouseClick = (event: any) => {
  event.preventDefault();

  console.log('clicked');

  stage.setPointersPositions(event);

  const imageObj = new Image();
  imageObj.onload = function () {
    const image = new Konva.Image({
      x: 200,
      y: 50,
      image: imageObj,
      width: MARK_SIZE,
      height: MARK_SIZE,
    });
    cropStamp(image);
    const curPointerPos = stage.getPointerPosition() as Vector2d;
    setTimeout(() => {
      layer.add(image);
      image.position({ x: curPointerPos.x - MARK_SIZE / 2, y: curPointerPos.y - MARK_SIZE / 2 });
    }, 100);
  };
  imageObj.src = stampMarkImageUrl;
};

const mouseMove = (event: any) => {
  const mouseY = event.clientY;
  const mouseX = event.clientX;

  customCursor.animate(
    [
      {
        transform: `translate3d(${mouseX - 35}px, ${mouseY - 90}px, 0)`,
      },
      {
        transform: `translate3d(${mouseX - 35}px, ${mouseY - 50}px, 0)`,
      },
      {
        transform: `translate3d(${mouseX - 35}px, ${mouseY - 90}px, 0)`,
      },
      // { opacity: 1, easing: 'ease-out' },
      // { opacity: 0.1, easing: 'ease-in' },
    ],
    { duration: 300, iterations: 1 },
  );
};

let isEnabled = false;

chrome.runtime.onMessage.addListener(message => {
  if (message === 'on' && isEnabled === false) {
    console.log('receive on!');
    isEnabled = true;
    document.body.appendChild(paper);
    document.body.appendChild(cursorPlayground);
    document.body.addEventListener('click', handleMouseClick);
    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('click', mouseMove);
    console.log('hot reloader!');
  } else if (message === 'off' && isEnabled === true) {
    isEnabled = false;
    document.body.removeEventListener('click', handleMouseClick);
    document.body.removeEventListener('mousemove', handleMouseMove);
    document.body.removeEventListener('click', mouseMove);
    layer.find('Image').forEach(image => {
      image.destroy();
    });
    paper.remove();
  }
});

function cropStamp(image: Konva.Image) {
  const width = 566;
  const height = 393;
  const widthCount = 3;
  const heightCount = 2;

  console.log((width / widthCount) * Math.floor(Math.random() * widthCount));
  console.log((height / heightCount) * Math.floor(Math.random() * heightCount));
  image.crop({
    x: (width / widthCount) * Math.floor(Math.random() * widthCount),
    y: (height / heightCount) * Math.floor(Math.random() * heightCount),
    width: width / widthCount,
    height: height / heightCount,
  });
}

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
// import ContentApp from './ContentApp';

// const $content = document.createElement('div');

// document.body.appendChild($content);

// ReactDOM.render(<ContentApp />, $content);
