import { ShakeAtom } from '@recoil';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

/**
 * 
 * @description - 화면을 흔들 때 사용하는 훅입니다.
 * @example
 * const { shakeBrowser } = useShake();
  shakeBrowser(1000); // 1초간 화면을 흔듭니다.
 */
export const useShake = () => {
  const [shake, setShake] = useRecoilState(ShakeAtom);
  const shakeBrowser = (duration?: number) => {
    if (!duration) duration = 500;
    setShake({ duration, shouldShake: true });
  };
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (shake.shouldShake) {
      const animation = `${shake.duration}ms shake cubic-bezier(0.36, 0.07, 0.19, 0.97) both`;

      // body에 애니메이션 적용
      document.body.style.animation = animation;

      // 애니메이션 종료 후 스타일 초기화
      const timeoutId = setTimeout(() => {
        document.body.style.animation = '';
      }, shake.duration);

      return () => clearTimeout(timeoutId);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [shake]);
  return { shakeBrowser };
};
