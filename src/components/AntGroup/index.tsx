import { useEffect } from 'react';
import type { RefObject } from 'react';
import { Layer } from 'react-konva';
import type Konva from 'konva';
import { AntProps } from './types';
import DeadAnt from './DeadAnt';
import { useAntKiller } from '../../hooks/useAntKiller';

import Ant from './Ant';

type AntGroupProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

const AntGroup = ({ stageRef }: AntGroupProps) => {
  const { ants, setAnts, killIfInRange } = useAntKiller(20, 20);

  useEffect(() => {
    const handleClick = ({ evt }: Konva.KonvaEventObject<MouseEvent>) => {
      if (!(evt.target as HTMLElement).closest('.konvajs-content')) return;
      const x = evt.offsetX;
      const y = evt.offsetY;
      if (!evt.shiftKey)
        return setAnts([...ants, { x, y, vx: Math.random() - 0.5, vy: Math.random() - 0.5, dead: false }]);
      killIfInRange(x, y);
    };

    const stage = stageRef?.current;
    if (stage) {
      stage.on('click', handleClick);
    }

    const updateAnt = (ant: AntProps) => {
      if (ant.dead) return { ...ant };
      const x = ant.x + ant.vx;
      const y = ant.y + ant.vy;
      let vx = ant.vx;
      let vy = ant.vy;
      if (x >= window.innerWidth || x < 0) vx *= -1;
      if (y >= window.innerHeight || y < 0) vy *= -1;
      return { ...ant, x, y, vx, vy };
    };
    const setupFrame = () => {
      setAnts(ants.map(updateAnt));
    };
    const id = requestAnimationFrame(setupFrame);

    return () => {
      stage?.off('click', handleClick);
      cancelAnimationFrame(id);
    };
  }, [ants]);

  return (
    <Layer>{ants.map((ant, idx) => (ant.dead ? <DeadAnt {...ant} key={idx} /> : <Ant {...ant} key={idx} />))}</Layer>
  );
};

export default AntGroup;
