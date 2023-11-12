import type { RefObject } from 'react';
import type Konva from 'konva';
import { useEffect, useRef, useCallback, useState } from 'react';
import { Layer } from 'react-konva';
import { Stage } from 'konva/lib/Stage';
import { useEraser } from '../../hooks/useEraser';

const getRandomInt = (min: number, max: number) => Math.round(Math.random() * (max - min + 1)) + min;
const getBackgroundColor = () => {
  const c = getRandomInt(0, 255);
  return `rgb(${[c, c, c].join(',')});`;
};

type BubbleProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

export const Bubble = ({ stageRef }: BubbleProps) => {
  const mousePosRef = useRef<{ x: null | number; y: null | number }>({ x: null, y: null });
  const { eraseAnts, eraseStamps, eraseCrash } = useEraser(30, 30);

  const createBubble = useCallback((x: number, y: number) => {
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
      opacity: 0.5;  
    `;

    const bubbleElement = document.createElement('div');
    bubbleElement.setAttribute('style', style);
    bubbleElement.setAttribute('class', 'bubble');
    document.querySelector('body')?.appendChild(bubbleElement);
    removeBubble(bubbleElement);
  }, []);

  const removeBubble = useCallback(
    (bubbleElement: HTMLDivElement) => setTimeout(() => bubbleElement.remove(), 1000),
    [],
  );

  useEffect(() => {
    const createBubbles = () => {
      const { x, y } = mousePosRef.current;
      const inActive = stageRef?.current === undefined;
      if (x === null || y === null || inActive) {
        return;
      }
      eraseStamps(x, y);
      eraseAnts(x, y);
      eraseCrash(x, y);
      createBubble(x, y);
    };

    const removeAllBubbles = () => {
      // 그려진 버블을 지운다
      document.querySelectorAll('.bubble').forEach(element => element.remove());

      // 모든 버블을 그리는 interval을 종료시킨다
      const interval_id = window.setInterval(function () {}, Number.MAX_SAFE_INTEGER);
      for (let i = 1; i < interval_id; i++) {
        window.clearInterval(i);
      }
    };

    let intervalId: any;
    const startDraw = () => {
      intervalId = setInterval(createBubbles, 50);
    };
    const stopDraw = () => {
      clearInterval(intervalId);
    };
    stageRef?.current?.on('mousedown', startDraw);
    stageRef?.current?.on('mouseup', stopDraw);

    if (stageRef?.current === undefined) {
      removeAllBubbles();
    }

    return () => {
      stageRef?.current?.off('mousedown', startDraw);
      stageRef?.current?.off('mouseup', stopDraw);
    };
  }, [stageRef?.current]);

  useEffect(() => {
    const handleMouseMove = (stage: Stage) => {
      const pos = stage.getPointerPosition();
      if (pos) {
        mousePosRef.current.x = pos.x;
        mousePosRef.current.y = pos.y;
      }
    };

    const stage = stageRef?.current;
    if (!stage) {
      return;
    }

    stage.on('mousemove', () => handleMouseMove(stage));
    return () => {
      stage.off('mousemove', () => handleMouseMove(stage));
    };
  }, [stageRef?.current]);

  return <Layer style={{ width: '100%', height: '100%' }}></Layer>;
};
