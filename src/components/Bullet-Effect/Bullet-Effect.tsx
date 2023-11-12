import { type RefObject, useRef, useCallback } from 'react';
import { Layer, Image as KonvaImage } from 'react-konva';
import { useTurn, useAntKiller, useShake } from '@hooks';
import { useRecoilState } from 'recoil';
import { IMAGE } from '@static';

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
  const drawBulletShell = useCallback(() => {
    console.log('drawBulletShell');
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
    drawBulletShell();
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
