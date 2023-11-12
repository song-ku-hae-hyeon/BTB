import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { Vector2d } from 'konva/lib/types';
import { Bullet } from '@recoil';

const createBulletShellElement = (x: number, y: number, duration: number) => {
  const container = document.createElement('div');
  applyElementStyle(container, {
    position: 'absolute',
    background: 'transparent',
    left: `${x - 20}px`,
    bottom: '0px',
    top: `${y + 15}px`,
    width: `300px`,
  });

  const bullet = document.createElement('div');
  applyElementStyle(bullet, {
    width: '15px',
    height: '15px',
    background: 'red',
    animation: `${duration}ms fallAnimation cubic-bezier(0.0, 0.1, 0.0, 0.1) forwards`,
    anmationIterationCount: 1,
  });

  container.appendChild(bullet);

  function applyElementStyle(element: HTMLDivElement, styleInfo: {}) {
    const style = Object.entries(styleInfo)
      .map(([key, value]) => `${key}:${value};`)
      .join('');
    element.setAttribute('style', style);
  }

  return container;
};

export const useBullet = () => {
  const [bulletPositions, setBulletPositions] = useRecoilState(Bullet);
  const drawBulletMark = useCallback((x: number, y: number) => {
    const curPointerPos: Vector2d = { x, y };
    const angle = 30;
    const rotation = -angle + Math.random() * angle; // -angle ~ angle
    setBulletPositions(prevArray => [...prevArray, { ...curPointerPos, rotation }]);
  }, []);
  const drawBulletShell = useCallback((x: number, y: number) => {
    const animationDuration = 1700;
    const bulletShellElement = createBulletShellElement(x, y, animationDuration);
    document.body.appendChild(bulletShellElement);
    setTimeout(() => document.body.removeChild(bulletShellElement), animationDuration);
  }, []);

  return { bulletPositions, drawBulletMark, drawBulletShell };
};
