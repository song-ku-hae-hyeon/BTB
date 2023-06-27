import { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

import type Konva from 'konva';

interface LineData {
  points: number[];
}

const Highlighter = () => {
  const stageRef = useRef<Konva.Stage>(null);
  const [lines, setLines] = useState<LineData[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleMouseDown = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      const pos = stage.getPointerPosition();
      if (!pos) return;
      setLines(prevLines => [...prevLines, { points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      if ('buttons' in e.evt && e.evt.buttons !== 1) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      setLines(prevLines => {
        const updatedLines = [...prevLines];
        const lastLine = updatedLines[updatedLines.length - 1];
        lastLine.points = lastLine.points.concat([pos.x, pos.y]);
        return updatedLines;
      });
    };

    stage.on('mousedown touchstart', handleMouseDown);
    stage.on('mousemove touchmove', handleMouseMove);

    // Clean up event listeners
    return () => {
      stage.off('mousedown touchstart', handleMouseDown);
      stage.off('mousemove touchmove', handleMouseMove);
    };
  }, [stageRef.current]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 9000 }}>
      <Stage width={window.innerWidth} height={window.innerHeight} ref={stageRef}>
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
      </Stage>
    </div>
  );
};

export default Highlighter;
