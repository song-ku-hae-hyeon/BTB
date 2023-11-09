import { atom } from 'recoil';

import type { ToolType } from '@types';
import type { ShakeProps, LineData, Stamp, AntData, Crash, BulletMark } from './types';

export const HighlighterAtom = atom<LineData[]>({
  key: 'highlightAtom',
  default: [],
});

export const StampAtom = atom<Stamp[]>({
  key: 'stampAtom',
  default: [],
});

export const AntAtom = atom<AntData[]>({
  key: 'antAtom',
  default: [],
});

export const ToolAtom = atom<ToolType>({
  key: 'toolAtom',
  default: 'default',
});

export const ShakeAtom = atom<ShakeProps>({
  key: 'shakeAtom',
  default: {
    shouldShake: false,
    duration: 500,
  },
});

export const CrashAtom = atom<Crash[]>({
  key: 'crashAtom',
  default: [],
});

export const Bullet = atom<BulletMark[]>({
  key: 'bulletAtom',
  default: [],
});

export const RedPenAtom = atom<LineData[]>({
  key: 'RedPenAtom',
  default: [],
});

export const BluePenAtom = atom<LineData[]>({
  key: 'BluePenAtom',
  default: [],
});
