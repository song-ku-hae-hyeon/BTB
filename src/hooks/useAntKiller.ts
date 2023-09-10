import { AntAtom, AntData } from '@recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

let id: number | null = null;

/**
 * (x, y)----- dx -----------|
 *  - +----------------------+
 *  | |                      |
 * dy | Area of killing ants |
 *  | |                      |
 *  - +----------------------+
 */
export const useAntKiller = (dx: number, dy: number) => {
  const [ants, setAnts] = useRecoilState(AntAtom);
  const shouldKill = (ant: AntData, x: number, y: number) => Math.abs(ant.x - x) < dx && Math.abs(ant.y - y) < dy;
  const updateAntDeadState = (ant: AntData, x: number, y: number) =>
    shouldKill(ant, x, y) ? { ...ant, dead: true } : { ...ant };
  const killIfInRange = (x: number, y: number) => {
    setAnts(ants.map(ant => updateAntDeadState(ant, x, y)));
  };

  useEffect(() => {
    if (id) return;
    const updateAnt = (ant: AntData) => {
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
    id = requestAnimationFrame(setupFrame);

    return () => {
      cancelAnimationFrame(id as number);
      id = null;
    };
  }, [ants]);

  return {
    ants,
    setAnts,
    killIfInRange,
  };
};
