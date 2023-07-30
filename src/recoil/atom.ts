import { atom } from 'recoil';

export interface HighlighterLineData {
  points: number[];
}

export const HighlighterAtom = atom<HighlighterLineData[]>({
  key: 'highlightAtom',
  default: [],
});
