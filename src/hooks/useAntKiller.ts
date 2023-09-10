import { AntAtom, AntData } from '@recoil';
import { useRecoilState } from 'recoil';

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
  const checkInRange = (ant: AntData, x: number, y: number) =>
    shouldKill(ant, x, y) ? { ...ant, dead: true } : { ...ant };
  const killIfInRange = (x: number, y: number) => setAnts(ants.map(ant => checkInRange(ant, x, y)));

  return {
    ants,
    setAnts,
    killIfInRange,
  };
};
