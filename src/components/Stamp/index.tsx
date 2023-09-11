import { useState, useEffect, useRef, RefObject } from 'react';
import Konva from 'konva';
import { Layer, Image as KonvaImage } from 'react-konva';
import S from './styled';

import { IMAGE } from '@static';

import { IRect, Vector2d } from 'konva/lib/types';
import { useRecoilState } from 'recoil';
import { StampAtom } from '@recoil';
import { Image as KonvaImageType } from 'konva/lib/shapes/Image';

const MARK_SIZE = 100;
const stampMarkImage = new Image();
stampMarkImage.src = IMAGE.STAMP_MARK_URL;
const stampImage = new Image();
stampImage.src = IMAGE.STAMP_URL;

type PaperProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const Paper = ({ stageRef }: PaperProps) => {
  const [isClicked, setClicked] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [stampPositions, setStampPositions] = useRecoilState(StampAtom);
  const layerRef = useRef<Konva.Layer>(null);

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    // @ts-ignore
    const container = stage.container();

    container.style.cursor = `url(${IMAGE.STAMP_URL}), auto`;

    const handleMouseDown = ({ evt: { clientX, clientY } }: Konva.KonvaEventObject<MouseEvent>) => {
      const drawStampMark = (clientX: number, clientY: number) => {
        const curPointerPos: Vector2d = { x: clientX, y: clientY };
        setStampPositions(prevArray => [...prevArray, { ...curPointerPos, cropRect: cropStamp() }]);
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
        onFinish: () => {
          movingStampImage?.to({
            x: currentX,
            y: currentY,
            onFinish: () => {
              movingStampImage?.hide();
            },
          });
        },
      });

      drawStampMark(clientX, clientY);
    };

    stage.on('mousedown', handleMouseDown);

    // Clean up event listeners
    return () => {
      stage.off('mousedown', handleMouseDown);
      container.style.cursor = 'auto';
    };
  }, [stageRef?.current]);

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
