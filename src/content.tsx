import Konva from 'konva';
import { Vector2d } from 'konva/lib/types';

console.log('Pikachu Everywhere - Content Script is Running');

var width = window.innerWidth;
var height = window.innerHeight;

const stampImageUrl = chrome.runtime.getURL('stamp.png');
const stampMarkImageUrl = chrome.runtime.getURL('stamp_mark.png');

console.log(stampImageUrl);

const paper = document.createElement('div');
paper.style.zIndex = '9999';
paper.style.cursor = `url("${stampImageUrl}") 40 70, help`;
paper.style.display = 'flex';
paper.style.position = 'fixed';
paper.style.top = '0';
paper.style.left = '0';

var stage = new Konva.Stage({
  container: paper,
  width: width,
  height: height,
});
var layer = new Konva.Layer();
stage.add(layer);

const MARK_SIZE = 100;

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
    layer.add(image);
    const curPointerPos = stage.getPointerPosition() as Vector2d;
    image.position({ x: curPointerPos.x - MARK_SIZE / 2, y: curPointerPos.y - MARK_SIZE / 2 });
  };
  imageObj.src = stampMarkImageUrl;
};

let isEnabled = false;

chrome.runtime.onMessage.addListener(message => {
  if (message === 'on' && isEnabled === false) {
    console.log('receive on!');
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
