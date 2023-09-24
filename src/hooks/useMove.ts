import { useEffect, RefObject } from 'react';
import Konva from 'konva';
import type { ToolType } from '@types';
import { IMAGE } from '@static';
import { useRecoilState } from 'recoil';
import { ToolAtom } from '@recoil';

type Direction = 'up' | 'down' | 'left' | 'right';
const cursorUrl: Record<ToolType, string> = {
  none: '',
  highlighter: IMAGE.HIGHLIGHTER_URL,
  stamp: IMAGE.STAMP_URL,
  ant: '',
  bubble: '',
};

export type useMoveParams = {
  stageRef: RefObject<Konva.Stage> | null;
  layerRef: RefObject<Konva.Layer> | null;
  time?: number;
  offset?: number;
  direction?: Direction;
  callback?: (clientX: number, clientY: number) => void;
};

/**
 * 
 * @param params - stageRef, layerRef, time, offset, direction, callback
 * @description - 클릭시 커서 이미지에 원하는 방향으로 애니메이션을 주입합니다.
 * @example
 * const MyTool = ({ stageRef }: MyToolProps) => {
    const layerRef = useRef<Konva.Layer>(null);

    const callbackFunc = (clientX: number, clientY: number) => {
      // ...
      func1(clientX, clientY);
      func2();
    };

    useMove({ stageRef, layerRef, callback: callbackFunc });

    return (
      <Layer ref={layerRef}>
      // ...
      </Layer>
    )
  }
 */
export const useMove = (params: useMoveParams) => {
  const { stageRef, layerRef, time = 300, offset = 15, direction = 'down', callback = () => {} } = params;
  const [tool, setTool] = useRecoilState(ToolAtom);
  const toolImage = new Image();
  toolImage.src = cursorUrl[tool];
  useEffect(() => {
    const stage = stageRef?.current;
    const layer = layerRef?.current;
    if (!stage || !layer) return;
    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent>) => {
      setTool('none');
      const { clientX, clientY } = e.evt;

      const movingStampImage = new Konva.Image({
        image: toolImage,
      });
      layer.add(movingStampImage);

      const currentX = clientX - 32;
      const currentY = clientY - 32;

      movingStampImage.show();
      movingStampImage.setPosition({ x: currentX, y: currentY });

      let endPosition = { x: currentX, y: currentY };

      switch (direction) {
        case 'up':
          endPosition.y = currentY - offset;
          break;
        case 'down':
          endPosition.y = currentY + offset;
          break;
        case 'left':
          endPosition.x = currentX - offset;
          break;
        case 'right':
          endPosition.x = currentX + offset;
          break;
        default:
          break;
      }

      movingStampImage.to({
        ...endPosition,
        duration: time / 2000,
        onFinish: () => {
          setTool('stamp');
          movingStampImage.remove();
        },
      });
      callback(clientX, clientY);
    };

    stage.on('mousedown', handleMouseDown);

    return () => {
      stage.off('mousedown', handleMouseDown);
    };
  }, [tool, stageRef, layerRef]);
};
