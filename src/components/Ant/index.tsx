import React, { useState, useEffect } from 'react';
import { Layer, Stage, Rect, Text } from 'react-konva';
import Ant from './Ant';
import { AntProps } from './types';

const AntGroup = () => {
  const [ants, setAnts] = useState<AntProps[]>([]);

  useEffect(() => {
    const handleClick = (ev: MouseEvent) => {
      const x = ev.offsetX;
      const y = ev.offsetY;
      setAnts([...ants, { x, y, vx: Math.random() - 0.5, vy: Math.random() - 0.5 }]);
    };
    document.body.addEventListener('click', handleClick);

    const updateAnt = (ant: AntProps) => {
      const x = ant.x + ant.vx;
      const y = ant.y + ant.vy;
      let vx = ant.vx;
      let vy = ant.vy;
      if (x >= window.innerWidth || x < 0) vx *= -1;
      if (y >= window.innerHeight || y < 0) vy *= -1;
      return { x, y, vx, vy };
    };
    const setupFrame = () => {
      setAnts(ants.map(updateAnt));
    };
    const id = requestAnimationFrame(setupFrame);

    return () => {
      document.body.removeEventListener('click', handleClick);
      cancelAnimationFrame(id);
    };
  }, [ants]);

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        {ants.map((ant, idx) => (
          <Ant {...ant} key={`${ant.x},${ant.y}:${idx}`} />
        ))}
      </Layer>
    </Stage>
  );
};

export default AntGroup;
