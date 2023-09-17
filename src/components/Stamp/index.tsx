import { useState, useEffect, useRef, RefObject } from 'react';
import Konva from 'konva';
import { Layer, Image as KonvaImage } from 'react-konva';

import { IMAGE } from '@static';

import { Vector2d } from 'konva/lib/types';
import { useRecoilState } from 'recoil';
import { StampAtom } from '@recoil';
import { useAntKiller } from '../../hooks/useAntKiller';

const MARK_SIZE = 64;
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

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    const container = stage.container();

    container.style.cursor = `none, url(${IMAGE.STAMP_URL}) 30 56, auto`;

    const handleMouseDown = ({ evt: { clientX, clientY } }: Konva.KonvaEventObject<MouseEvent>) => {
      const drawStampMark = (clientX: number, clientY: number) => {
        const curPointerPos: Vector2d = { x: clientX, y: clientY };
        setStampPositions(prevArray => [...prevArray, { ...curPointerPos }]);
      };

      const currentX = clientX - 30;
      const currentY = clientY - 90;

      const movingStampImage = new Konva.Image({
        image: stampImage,
      });
      layerRef.current?.add(movingStampImage);

      movingStampImage.show();
      movingStampImage.setPosition({ x: currentX, y: currentY });
      movingStampImage.to({
        x: currentX,
        y: currentY + 40,
        zIndex: 20,
        onFinish: () => {
          movingStampImage?.to({
            x: currentX,
            y: currentY,
            zIndex: 20,
            onFinish: () => {
              movingStampImage?.remove();
            },
          });
        },
      });

      drawStampMark(clientX, clientY);
      killIfInRange(clientX, clientY);
    };

    stage.on('mousedown', handleMouseDown);

    // Clean up event listeners
    return () => {
      stage.off('mousedown', handleMouseDown);
      container.style.cursor = 'auto';
    };
  }, [stageRef?.current, ants]);

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
          zIndex={10}
        />
      ))}
    </Layer>
  );
};

export default Paper;
