import React, { useState, useEffect, useRef } from 'react';
import Konva from 'konva';
import { Stage, Layer, Image as KonvaImage, KonvaNodeComponent } from 'react-konva';
import S from './styled';

// @ts-ignore
import StampImg from '../../../public/stamp_mark.png';

import { IRect, Vector2d } from 'konva/lib/types';

const MARK_SIZE = 100;
const imageObj = new Image();
imageObj.src = StampImg;

const Paper = () => {
  const [stampPositions, setStampPositions] = useState<(Vector2d & { cropRect: IRect })[]>([]);
  const paperRef = useRef<any>();
  const imgRef = useRef<any>();

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

  const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    drawStampMark(event);
    stampSeal(event);
  };

  const drawStampMark = (event: React.MouseEvent<HTMLDivElement>) => {
    const curPointerPos: Vector2d = { x: event.clientX, y: event.clientY };
    setStampPositions(prevArray => [...prevArray, { ...curPointerPos, cropRect: cropStamp() }]);
  };

  const stampSeal = (event: React.MouseEvent<HTMLDivElement>) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    imgRef.current.animate(
      [
        {
          transform: `translate3d(${mouseX - 30}px, ${mouseY - 90}px, 0)`,
        },
        {
          transform: `translate3d(${mouseX - 30}px, ${mouseY - 50}px, 0)`,
        },
        {
          transform: `translate3d(${mouseX - 30}px, ${mouseY - 90}px, 0)`,
        },
      ],
      { duration: 300, iterations: 1 },
    );
  };

  const moveStamp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    event.evt.preventDefault();

    const mouseY = event.evt.clientY;
    const mouseX = event.evt.clientX;

    // @ts-ignore
    imgRef.current.style.transform = `translate3d(${mouseX - 30}px, ${mouseY - 70}px, 0)`;
  };

  return (
    <div>
      <S.Paper onMouseDown={handleMouseClick}>
        <Stage width={window.innerWidth} height={window.innerHeight} ref={paperRef} onMouseMove={moveStamp}>
          <Layer>
            {stampPositions.map((position, index) => (
              <KonvaImage
                key={`${index}-key`}
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
        <S.Stamp src="/stamp.png" ref={imgRef} />;
      </S.Paper>
    </div>
  );
};

export default Paper;
