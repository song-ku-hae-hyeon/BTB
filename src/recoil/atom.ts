import { atom } from 'recoil';
import { IRect, Vector2d } from 'konva/lib/types';

export interface HighlighterLineData {
  points: number[];
}

export const HighlighterAtom = atom<HighlighterLineData[]>({
  key: 'highlightAtom',
  default: [],
});

export type Stamp = Vector2d & { cropRect: IRect };

export const StampAtom = atom<Stamp[]>({
  key: 'stampAtom',
  default: [],
});
