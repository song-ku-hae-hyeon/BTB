import { atom } from 'recoil';

export const popupState = atom<boolean>({
  key: 'popupState',
  default: false,
});
