import { useRef, useEffect, useState, RefObject } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { HighlighterAtom, HighlighterLineData } from '@recoil';

import type Konva from 'konva';
import { useRecoilState } from 'recoil';

type HighlighterProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const Highlighter = ({ stageRef }: HighlighterProps) => {
  const [lines, setLines] = useRecoilState(HighlighterAtom);

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
    <Layer>
      {lines.map((line, i) => (
        <Line
          key={i}
          points={line.points}
          stroke="rgba(255, 255, 0, 0.5)" // 형광펜의 색상 설정
          strokeWidth={20} // 형광펜의 두께 설정
          globalCompositeOperation="source-over" // 형광펜의 블렌딩 모드 설정
          lineCap="butt"
          lineJoin="round"
        />
      ))}
    </Layer>
  );
};

export default Highlighter;
