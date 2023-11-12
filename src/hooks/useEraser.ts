import { useRecoilState } from 'recoil';
import {
  AntAtom,
  AntData,
  BluePenAtom,
  Bullet,
  BulletMark,
  Crash,
  CrashAtom,
  HighlighterAtom,
  LineData,
  RedPenAtom,
  Stamp,
  StampAtom,
} from '@recoil';

export const useEraser = (dx: number, dy: number) => {
  const [_, setAnts] = useRecoilState(AntAtom);
  const [__, setStamps] = useRecoilState(StampAtom);
  const [___, setCrash] = useRecoilState(CrashAtom);
  const [____, setBulletEffect] = useRecoilState(Bullet);
  const [_____, setRedPen] = useRecoilState(RedPenAtom);
  const [______, setHighlighter] = useRecoilState(HighlighterAtom);
  const [________, setBluePen] = useRecoilState(BluePenAtom);

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

  const eraseBulletEffect = (x: number, y: number) => {
    const inEraserRange = (bullet: BulletMark) => Math.abs(bullet.x - x) < dx && Math.abs(bullet.y - y) < dy;
    setBulletEffect(bullets => bullets.filter(bullet => !inEraserRange(bullet)));
  };

  const eraseRedPen = (x: number, y: number) => {
    const inEraserRange = (line: LineData) => {
      for (let i = 0; i < line.points.length; i += 2) {
        const inRange = Math.abs(line.points[i] - x) < dx && Math.abs(line.points[i + 1] - y) < dy;
        if (inRange) return true;
      }
      return false;
    };
    setRedPen(lines => lines.filter(line => !inEraserRange(line)));
  };

  const eraseHighlighter = (x: number, y: number) => {
    const inEraserRange = (line: LineData) => {
      for (let i = 0; i < line.points.length; i += 2) {
        const inRange = Math.abs(line.points[i] - x) < dx && Math.abs(line.points[i + 1] - y) < dy;
        if (inRange) return true;
      }
      return false;
    };
    setHighlighter(lines => lines.filter(line => !inEraserRange(line)));
  };

  const eraseBluePen = (x: number, y: number) => {
    const inEraserRange = (line: LineData) => {
      for (let i = 0; i < line.points.length; i += 2) {
        const inRange = Math.abs(line.points[i] - x) < dx && Math.abs(line.points[i + 1] - y) < dy;
        if (inRange) return true;
      }
      return false;
    };
    setBluePen(lines => lines.filter(line => !inEraserRange(line)));
  };

  return { eraseAnts, eraseStamps, eraseCrash, eraseBulletEffect, eraseRedPen, eraseHighlighter, eraseBluePen };
};
