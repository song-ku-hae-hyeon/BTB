import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

import type Konva from 'konva';

interface LineData {
  points: number[];
}

const HighlightPen = () => {
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

  useEffect(() => {
    // stage에 맞게 낙서 크기 줄임. 이후 개선 필요
    let prevWidth = window.innerWidth;
    let prevHeight = window.innerHeight;

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      setLines(prevLines => {
        return prevLines.map(line => {
          const newPoints = line.points.map((point, index) => {
            // 좌표값을 현재 창 크기에 맞게 재계산
            if (index % 2 === 0) {
              return (point * newWidth) / prevWidth;
            } else {
              return (point * newHeight) / prevHeight;
            }
          });
          return { ...line, points: newPoints };
        });
      });

      prevWidth = newWidth;
      prevHeight = newHeight;
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

export default HighlightPen;
