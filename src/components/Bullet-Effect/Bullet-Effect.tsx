import { type RefObject, useRef, useCallback, useState } from 'react';
import { Layer, Image as KonvaImage } from 'react-konva';
import { useTurn, useAntKiller, useShake } from '@hooks';
import { useRecoilState } from 'recoil';
import { IMAGE } from '@static';
import styled, { keyframes } from 'styled-components';

import type Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { Bullet } from '@recoil';

type GunEffectProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const BULLET_OFFSET = 35;
const MARK_SIZE = 48;
const bulletMarkImage = new Image();
bulletMarkImage.src = IMAGE.GUN_MARK_URL;

const useBullet = () => {
  const [bulletPositions, setBulletPositions] = useRecoilState(Bullet);
  const drawBulletMark = useCallback((x: number, y: number) => {
    const curPointerPos: Vector2d = { x, y };
    const angle = 30;
    const rotation = -angle + Math.random() * angle; // -angle ~ angle
    setBulletPositions(prevArray => [...prevArray, { ...curPointerPos, rotation }]);
  }, []);
  const drawBulletShell = useCallback((x: number, y: number) => {
    const container = document.createElement('div');
    applyElementStyle(container, {
      position: 'absolute',
      background: 'transparent',
      left: `${x - 20}px`,
      bottom: '0px',
      top: `${y + 15}px`,
      width: `300px`,
    });

    const bullet = document.createElement('div');
    applyElementStyle(bullet, {
      width: '15px',
      height: '15px',
      background: 'red',
      animation: `1500ms fallAnimation cubic-bezier(0.0, 0.1, 0.0, 0.1) forwards`,
      anmationIterationCount: 1,
    });

    container.appendChild(bullet);
    document.body.appendChild(container);
    setTimeout(() => document.body.removeChild(container), 1700);

    function applyElementStyle(element: HTMLDivElement, styleInfo: {}) {
      const style = Object.entries(styleInfo)
        .map(([key, value]) => `${key}:${value};`)
        .join('');
      element.setAttribute('style', style);
    }
  }, []);

  return { bulletPositions, drawBulletMark, drawBulletShell };
};

export const BulletEffect = ({ stageRef }: GunEffectProps) => {
  const layerRef = useRef<Konva.Layer>(null);
  const { killIfInRange } = useAntKiller(MARK_SIZE, MARK_SIZE);
  const { shakeBrowser } = useShake();
  const { bulletPositions, drawBulletMark, drawBulletShell } = useBullet();

  const onMouseDown = (clientX: number, clientY: number, offset: number) => {
    const compensatedX = clientX - offset * 3;
    const compensatedY = clientY - offset * 2;
    shakeBrowser(25);
    drawBulletMark(compensatedX, compensatedY);
    drawBulletShell(clientX, clientY);
    killIfInRange(compensatedX, compensatedY);
  };

  useTurn({ stageRef, layerRef, callback: onMouseDown, offset: BULLET_OFFSET, direction: 'COUNTER_CLOCK_WISE' });

  return (
    <Layer ref={layerRef}>
      {bulletPositions.map((position, index) => (
        <KonvaImage
          key={`${index}-key`}
          image={bulletMarkImage}
          x={position.x}
          y={position.y}
          width={MARK_SIZE}
          height={MARK_SIZE}
          rotation={position.rotation}
        />
      ))}
    </Layer>
  );
};
