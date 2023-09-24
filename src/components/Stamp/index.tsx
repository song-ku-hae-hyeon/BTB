import { useState, useEffect, useRef, RefObject } from 'react';
import Konva from 'konva';
import { Layer, Image as KonvaImage } from 'react-konva';

import { IMAGE } from '@static';

import { Vector2d } from 'konva/lib/types';
import { useRecoilState } from 'recoil';
import { StampAtom } from '@recoil';
import { useAntKiller, useMove } from '@hooks';

const MARK_SIZE = 100;
const stampMarkImage = new Image();
stampMarkImage.src = IMAGE.STAMP_MARK_URL;
const stampImage = new Image();
stampImage.src = IMAGE.STAMP_URL;

type PaperProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const Paper = ({ stageRef }: PaperProps) => {
  const [stampPositions, setStampPositions] = useRecoilState(StampAtom);
  const layerRef = useRef<Konva.Layer>(null);
  const { ants, killIfInRange } = useAntKiller(MARK_SIZE, MARK_SIZE);
  const offset = 20;

  const callbackFunc = (clientX: number, clientY: number, offset: number) => {
    const drawStampMark = (clientX: number, clientY: number) => {
      const curPointerPos: Vector2d = { x: clientX, y: clientY };
      setStampPositions(prevArray => [...prevArray, { ...curPointerPos, cropRect: cropStamp() }]);
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
          x={position.x - MARK_SIZE / 2}
          y={position.y + 10 - MARK_SIZE / 2}
          width={MARK_SIZE}
          height={MARK_SIZE}
          crop={position.cropRect}
        />
      ))}
    </Layer>
  );
};

const cropStamp = () => {
  const width = 566;
  const height = 393;
  const widthCount = 3;
  const heightCount = 2;

  return {
    x: (width / widthCount) * Math.floor(Math.random() * widthCount),
    y: (height / heightCount) * Math.floor(Math.random() * heightCount),
    width: width / widthCount,
    height: height / heightCount,
  };
};

export default Paper;
