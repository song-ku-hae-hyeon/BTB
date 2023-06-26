import React, { useState, useEffect, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image as KonvaImage, KonvaNodeComponent } from 'react-konva';
import S from './styled';
import Stamp from './cursor';

// @ts-ignore
import StampImg from '../../../public/stamp_mark.png';

import { IRect, Vector2d } from 'konva/lib/types';

const MARK_SIZE = 100;
const imageObj = new Image();
imageObj.src = StampImg;

const Paper = () => {
  const [stampPositions, setStampPositions] = useState<(Vector2d & { cropRect: IRect })[]>([]);
  const paperRef = useRef<any>();

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

  const handleMouseClick = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const curPointerPos: Vector2d = { x: event.evt.x, y: event.evt.y };
    setStampPositions(prevArray => [...prevArray, { ...curPointerPos, cropRect: cropStamp() }]);
  };

  return (
    <div>
      <S.Paper>
        <Stage width={window.innerWidth} height={window.innerHeight} ref={paperRef} onClick={handleMouseClick}>
          <Layer>
            {stampPositions.map(position => (
              <KonvaImage
                image={imageObj}
                x={position.x - MARK_SIZE / 2}
                y={position.y + 10 - MARK_SIZE / 2}
                width={MARK_SIZE}
                height={MARK_SIZE}
                crop={position.cropRect}
              />
            ))}
          </Layer>
        </Stage>
      </S.Paper>
      <Stamp paper={paperRef}></Stamp>
    </div>
  );
};

export default Paper;
