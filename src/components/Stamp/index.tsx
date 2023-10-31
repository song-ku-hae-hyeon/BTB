import { useRef, RefObject } from 'react';
import Konva from 'konva';
import { Layer, Image as KonvaImage } from 'react-konva';

import { IMAGE } from '@static';

import { Vector2d } from 'konva/lib/types';
import { useRecoilState } from 'recoil';
import { StampAtom } from '@recoil';
import { useAntKiller, useMove } from '@hooks';

const MARK_IMAGE_SIZE = 64;
const MARK_EFFECT_SIZE = MARK_IMAGE_SIZE - 15;
const stampMarkImage = new Image();
stampMarkImage.src = IMAGE.STAMP_MARK_URL;

type PaperProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const Paper = ({ stageRef }: PaperProps) => {
  const [stampPositions, setStampPositions] = useRecoilState(StampAtom);
  const layerRef = useRef<Konva.Layer>(null);

  const { ants, killIfInRange } = useAntKiller(MARK_EFFECT_SIZE, MARK_EFFECT_SIZE);
  const offset = 50;

  const callbackFunc = (clientX: number, clientY: number, offset: number) => {
    const drawStampMark = (clientX: number, clientY: number) => {
      const curPointerPos: Vector2d = { x: clientX, y: clientY };
      const angle = 45;
      const rotation = -angle + Math.random() * (angle * 2);
      setStampPositions(prevArray => [...prevArray, { ...curPointerPos, rotation }]);
    };
    drawStampMark(clientX, clientY + offset);
    killIfInRange(clientX, clientY + offset);
  };

  useMove({ stageRef, layerRef, callback: callbackFunc, offset });

  return (
    <Layer ref={layerRef}>
      {stampPositions.map((position, index) => (
        <KonvaImage
          key={`${index}-key`}
          image={stampMarkImage}
          x={position.x - MARK_IMAGE_SIZE / 2}
          y={position.y + 10 - MARK_IMAGE_SIZE / 2}
          width={MARK_IMAGE_SIZE}
          height={MARK_IMAGE_SIZE}
          zIndex={10}
          rotation={position.rotation}
        />
      ))}
    </Layer>
  );
};

export default Paper;
