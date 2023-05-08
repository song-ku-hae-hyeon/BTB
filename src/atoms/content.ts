import { atom } from 'recoil';

export const contentState = atom<boolean>({
  key: 'contentState',
  default: false,
});
