import { useState, useEffect, useRef, RefObject } from 'react';
import Konva from 'konva';
import { Layer, Image as KonvaImage } from 'react-konva';
import S from './styled';

import { IMAGE } from '@static';

import { IRect, Vector2d } from 'konva/lib/types';
import { useRecoilState } from 'recoil';
import { StampAtom } from '@recoil';
import { useAntKiller } from '../../hooks/useAntKiller';

const MARK_SIZE = 100;
const imageObj = new Image();
imageObj.src = IMAGE.STAMP_MARK_URL;

type PaperProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const Paper = ({ stageRef }: PaperProps) => {
  const [stampPositions, setStampPositions] = useRecoilState(StampAtom);
  const imgRef = useRef<HTMLImageElement>(null);
  const { ants, killIfInRange } = useAntKiller(MARK_SIZE, MARK_SIZE);

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    const handleMouseDown = ({ evt: { clientX, clientY } }: Konva.KonvaEventObject<MouseEvent>) => {
      const drawStampMark = (clientX: number, clientY: number) => {
        const curPointerPos: Vector2d = { x: clientX, y: clientY };
        setStampPositions(prevArray => [...prevArray, { ...curPointerPos, cropRect: cropStamp() }]);
      };

      const stampSeal = (clientX: number, clientY: number) => {
        if (imgRef.current) {
          // imgRef.current.animate(
          //   [
          //     {
          //       transform: `translate3d(${clientX - 30}px, ${clientY - 90}px, 0)`,
          //     },
          //     {
          //       transform: `translate3d(${clientX - 30}px, ${clientY - 50}px, 0)`,
          //     },
          //     {
          //       transform: `translate3d(${clientX - 30}px, ${clientY - 90}px, 0)`,
          //     },
          //   ],
          //   { duration: 300, iterations: 1 },
          // );
        }
      };

      drawStampMark(clientX, clientY);
      stampSeal(clientX, clientY);
      killIfInRange(clientX, clientY);
    };

    const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
      event.evt.preventDefault();
      const mouseY = event.evt.clientY;
      const mouseX = event.evt.clientX;
      if (imgRef.current) {
        // imgRef.current.style.transform = `translate3d(${mouseX - 30}px, ${mouseY - 70}px, 0)`;
      }
    };

    stage.on('mousedown', handleMouseDown);
    stage.on('mousemove', handleMouseMove);

    // Clean up event listeners
    return () => {
      stage.off('mousedown', handleMouseDown);
      stage.off('mousemove', handleMouseMove);
    };
  }, [stageRef?.current, ants]);

  return (
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
      <S.Stamp src="/stamp.png" ref={imgRef} />
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
