import { useEffect, RefObject } from 'react';
import { Line } from 'react-konva';
import { LineData } from '@recoil';

import S from './styled';
import type Konva from 'konva';
import { RecoilState, useRecoilState } from 'recoil';

type PenProps = {
  stageRef: RefObject<Konva.Stage> | null;
  atom: RecoilState<LineData[]>;
  color: string;
  strokeWidth: number;
};

const Pen = ({ stageRef, atom, color, strokeWidth }: PenProps) => {
  const [lines, setLines] = useRecoilState(atom);

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    const handleMouseDown = () => {
      const pos = stage.getPointerPosition();
      if (!pos) return;
      setLines(prevLines => [...prevLines, { points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if ('buttons' in e.evt && e.evt.buttons !== 1) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      setLines(prevLines => {
        const lastLineIndex = prevLines.length - 1;
        return [...prevLines].map(({ points }, index) =>
          index === lastLineIndex ? { points: points.concat([pos.x, pos.y]) } : { points },
        );
      });
    };

    stage.on('mousedown touchstart', handleMouseDown);
    stage.on('mousemove touchmove', handleMouseMove);

    // Clean up event listeners
    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
      stage.off('mousemove touchmove', handleMouseMove);
    };
  }, [stageRef?.current]);

  return (
    <S.PenLayer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke={color} // 펜의 색상 설정
          strokeWidth={strokeWidth} // 펜의 두께 설정
          globalCompositeOperation="source-over" // 펜의 블렌딩 모드 설정
          lineCap="butt"
          lineJoin="round"
        />
      ))}
    </S.PenLayer>
  );
};

export default Pen;
