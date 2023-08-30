import type { MouseEventHandler, RefObject } from 'react';
import type Konva from 'konva';
import { useCallback, useEffect, useRef } from 'react';
import { Layer } from 'react-konva';

const getRandomInt = (min: number, max: number) => Math.round(Math.random() * (max - min + 1)) + min;
const getBackgroundColor = () => `rgb(${getRandomInt(0, 255)},${getRandomInt(0, 255)},${getRandomInt(0, 255)});`;

type BubbleProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

export const Bubble = ({ stageRef }: BubbleProps) => {
  const mousePosRef = useRef<{ x: null | number; y: null | number }>({ x: null, y: null });

  const draw = useCallback(() => {
    const { x, y } = mousePosRef.current;
    if (x === null || y === null) return;

    const range = 15;
    const sizeInt = getRandomInt(10, 30);
    const style = `
      height: ${sizeInt}px; width: ${sizeInt}px;
      left: ${getRandomInt(x - range - sizeInt, x + range)}px;
      top: ${getRandomInt(y - range - sizeInt, y + range)}px;
      background: ${getBackgroundColor()}
      pointer-events: none;
      position: absolute;

      border-radius: 50%;
      background: gray;
      animation: implode 1s ease-in-out;
      animation-fill-mode: both;
      opacity: 0.5;
    
      @keyframes implode {
        100% {
          transform: scale(0);
        }
      }
    `;
    const bubbleElement = document.createElement('div');
    bubbleElement.setAttribute('style', style);
    bubbleElement.setAttribute('className', 'bubble');
    document.querySelector('body')?.appendChild(bubbleElement);
  }, []);

  useEffect(() => {
    const handleMouseMove = () => {
      const stage = stageRef?.current;
      if (!stage) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      mousePosRef.current.x = pos.x;
      mousePosRef.current.y = pos.y;
    };
    const handleMouseLeave = () => {
      if (mousePosRef.current !== null) {
        const { x, y } = mousePosRef.current;
        if (x !== null && y !== null) {
          mousePosRef.current.x = x - 1;
          mousePosRef.current.y = y - 1;
        }
      }
    };

    const stage = stageRef?.current;
    if (!stage) return;
    stage.on('mousemove', handleMouseMove);
    stage.on('mouseleave', handleMouseLeave);

    return () => {
      stage.off('mousemove', handleMouseMove);
      stage.off('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    setInterval(() => draw(), 10);
  }, []);

  useEffect(() => {
    const removeBubble = () => document.querySelectorAll('.bubble').forEach(element => element.remove());
    window.addEventListener('webkitanimationend', removeBubble);
    window.addEventListener('mozAnimationEnd', removeBubble);
    window.addEventListener('animationend', removeBubble);

    return () => {
      window.removeEventListener('webkitanimationend', removeBubble);
      window.removeEventListener('mozAnimationEnd', removeBubble);
      window.removeEventListener('animationend', removeBubble);
    };
  }, []);

  return (
    <Layer style={{ width: '100%', height: '100%' }}>
      <div id="bubbleLayer"></div>
    </Layer>
  );
};
