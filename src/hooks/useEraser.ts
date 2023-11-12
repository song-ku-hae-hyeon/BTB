import { useRecoilState } from 'recoil';
import { useAntKiller } from './useAntKiller';
import { AntAtom, AntData, Crash, CrashAtom, Stamp, StampAtom } from '@recoil';

export const useEraser = (dx: number, dy: number) => {
  const [_, setAnts] = useRecoilState(AntAtom);
  const [__, setStamps] = useRecoilState(StampAtom);
  const [___, setCrash] = useRecoilState(CrashAtom);

  const eraseAnts = (x: number, y: number) => {
    const inEraserRange = (ant: AntData) => Math.abs(ant.x - x) < dx && Math.abs(ant.y - y) < dy;
    setAnts(ants => ants.filter(ant => !(inEraserRange(ant) && ant.dead)));
  };

  const eraseStamps = (x: number, y: number) => {
    const inEraserRange = (stamp: Stamp) => Math.abs(stamp.x - x) < dx && Math.abs(stamp.y - y) < dy;
    setStamps(stamps => stamps.filter(stamp => !inEraserRange(stamp)));
  };

  const eraseCrash = (x: number, y: number) => {
    const inEraserRange = (crash: Crash) => Math.abs(crash.x - x) < dx && Math.abs(crash.y - y) < dy;
    setCrash(crashes => crashes.filter(crash => !inEraserRange(crash)));
  };

  return { eraseAnts, eraseStamps, eraseCrash };
};
