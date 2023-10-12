import { useRef, RefObject } from 'react';
import Konva from 'konva';
import { Layer, Image as KonvaImage } from 'react-konva';

import { IMAGE } from '@static';

import { Vector2d } from 'konva/lib/types';
import { useRecoilState } from 'recoil';
import { CrashAtom } from '@recoil';
import { useAntKiller, useShake, useTurn } from '@hooks';

const MARK_SIZE = 48;
const crashImage = new Image();
crashImage.src = IMAGE.CRASH_URL;

type PaperProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const Paper = ({ stageRef }: PaperProps) => {
  const [crashPositions, setCrashPositions] = useRecoilState(CrashAtom);
  const layerRef = useRef<Konva.Layer>(null);
  const { ants, killIfInRange } = useAntKiller(MARK_SIZE, MARK_SIZE);
  const { shakeBrowser } = useShake();
  const offset = 50;

  const callbackFunc = (clientX: number, clientY: number, offset: number) => {
    const drawCrashMark = (clientX: number, clientY: number) => {
      const curPointerPos: Vector2d = { x: clientX, y: clientY };
      const angle = 30;
      const rotation = -angle + Math.random() * angle; // -angle ~ angle
      setCrashPositions(prevArray => [...prevArray, { ...curPointerPos, rotation }]);
    };
    shakeBrowser(100);
    drawCrashMark(clientX - offset / 2, clientY);
    killIfInRange(clientX - offset / 2, clientY);
  };
  useTurn({ stageRef, layerRef, callback: callbackFunc, offset });

  return (
    <Layer ref={layerRef}>
      {crashPositions.map((position, index) => (
        <KonvaImage
          key={`${index}-key`}
          image={crashImage}
          x={position.x - MARK_SIZE / 2}
          y={position.y + 10 - MARK_SIZE / 2}
          width={MARK_SIZE}
          height={MARK_SIZE}
          rotation={position.rotation}
        />
      ))}
    </Layer>
  );
};

export default Paper;
