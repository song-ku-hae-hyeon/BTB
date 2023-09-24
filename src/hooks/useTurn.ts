import { useEffect, RefObject } from 'react';
import Konva from 'konva';
import { useRecoilState } from 'recoil';
import { ToolAtom } from '@recoil';
import { CURSOR_URL } from '@static';

type Direction = 'left' | 'right';

export type useTurnParams = {
  stageRef: RefObject<Konva.Stage> | null;
  layerRef: RefObject<Konva.Layer> | null;
  offset?: number;
  direction?: Direction;
  time?: number;
  callback?: (clientX: number, clientY: number, offset: number) => void;
};

/**
 * @param params - stageRef, layerRef, offset, direction, time, callback
 * @description - 클릭시 커서 이미지에 원하는 각도와 방향으로 회전합니다.
 */
export const useTurn = (params: useTurnParams) => {
  const { stageRef, layerRef, offset = 60, direction = 'left', time = 300, callback = () => {} } = params;
  const [tool, setTool] = useRecoilState(ToolAtom);
  const toolImage = new Image();
  toolImage.src = CURSOR_URL[tool];

  useEffect(() => {
    const stage = stageRef?.current;
    const layer = layerRef?.current;
    if (!stage || !layer) return;

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      setTool('none');
      const { clientX, clientY } = e.evt;

      const rotatingImage = new Konva.Image({
        image: toolImage,
        x: clientX,
        y: clientY,
        offsetX: toolImage.width / 2,
        offsetY: toolImage.height / 2,
      });
      layer.add(rotatingImage);

      rotatingImage.show();
      rotatingImage.setPosition({ x: clientX, y: clientY });

      const rotationOffset = direction === 'right' ? offset : -offset;

      rotatingImage.to({
        rotation: rotationOffset,
        duration: time / 2000, // duration을 초 단위로 변환
        onFinish: () => {
          setTool('stamp');
          rotatingImage.remove();
        },
      });
      callback(clientX, clientY, offset);
    };

    stage.on('mousedown', handleMouseDown);

    return () => {
      stage.off('mousedown', handleMouseDown);
    };
  }, [tool, stageRef, layerRef]);
};
