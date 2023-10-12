import { atom } from 'recoil';

import type { ToolType } from '@types';
import type { ShakeProps, HighlighterLineData, Stamp, AntData } from './types';

export const HighlighterAtom = atom<HighlighterLineData[]>({
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
  default: 'none',
});

export const ShakeAtom = atom<ShakeProps>({
  key: 'shakeAtom',
  default: {
    shouldShake: false,
    duration: 500,
  },
});
