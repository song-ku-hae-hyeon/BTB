import { useEffect } from 'react';
import type { RefObject } from 'react';
import { Layer } from 'react-konva';
import type Konva from 'konva';
import { useRecoilState } from 'recoil';

import { AntAtom, AntData } from '@recoil';
import Ant from './Ant';

type AntGroupProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const AntGroup = ({ stageRef }: AntGroupProps) => {
  const [ants, setAnts] = useRecoilState(AntAtom);

  useEffect(() => {
    const stage = stageRef?.current;
    if (!stage) return;

    const handleMouseDown = ({ evt: { offsetX, offsetY } }: Konva.KonvaEventObject<MouseEvent>) => {
      setAnts(prev => [...prev, { x: offsetX, y: offsetY, vx: Math.random() - 0.5, vy: Math.random() - 0.5 }]);
    };

    stage.on('mousedown', handleMouseDown);
    return () => {
      stage.off('mousedown', handleMouseDown);
    };
  }, [stageRef?.current]);

  useEffect(() => {
    const updateAnt = (ant: AntData) => {
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
      cancelAnimationFrame(id);
    };
  }, [ants]);

  return (
    <Layer>
      {ants.map((ant, idx) => (
        <Ant {...ant} key={idx} />
      ))}
    </Layer>
  );
};

export default AntGroup;
