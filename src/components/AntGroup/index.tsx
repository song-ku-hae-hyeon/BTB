import { useEffect } from 'react';
import type { RefObject } from 'react';
import { Layer } from 'react-konva';
import type Konva from 'konva';
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

    return () => {
      stage?.off('click', handleClick);
    };
  }, [ants]);

  return (
    <Layer>{ants.map((ant, idx) => (ant.dead ? <DeadAnt {...ant} key={idx} /> : <Ant {...ant} key={idx} />))}</Layer>
  );
};

export default AntGroup;
