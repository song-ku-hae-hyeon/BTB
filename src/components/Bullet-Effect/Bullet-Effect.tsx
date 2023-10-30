import { type RefObject, useRef } from 'react';
import { Layer, Image as KonvaImage } from 'react-konva';
import { useTurn, useAntKiller } from '@hooks';
import { useRecoilState } from 'recoil';
import { IMAGE } from '@static';

import type Konva from 'konva';
import { Vector2d } from 'konva/lib/types';
import { Bullet } from '@recoil';

type GunEffectProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const MARK_SIZE = 48;
const bulletMarkImage = new Image();
bulletMarkImage.src = IMAGE.GUN_MARK_URL;

export const BulletEffect = ({ stageRef }: GunEffectProps) => {
  const [bulletPositions, setBulletPositions] = useRecoilState(Bullet);
  const layerRef = useRef<Konva.Layer>(null);
  const { killIfInRange } = useAntKiller(MARK_SIZE, MARK_SIZE);
  const offset = 35;
  const mouseDownHandler = (clientX: number, clientY: number, offset: number) => {
    const compensatedX = clientX - offset * 3;
    const compensatedY = clientY - offset * 2;
    const drawCrashMark = (x: number, y: number) => {
      const curPointerPos: Vector2d = { x, y };
      const angle = 30;
      const rotation = -angle + Math.random() * angle; // -angle ~ angle
      setBulletPositions(prevArray => [...prevArray, { ...curPointerPos, rotation }]);
    };
    drawCrashMark(compensatedX, compensatedY);
    killIfInRange(compensatedX, compensatedY);
  };

  useTurn({ stageRef, layerRef, callback: mouseDownHandler, offset, direction: 'COUNTER_CLOCK_WISE' });

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
