import { useEffect, type RefObject, useRef } from 'react';
import { Layer } from 'react-konva';

import type Konva from 'konva';
import { Gun } from './Gun';

type GunEffectProps = {
  stageRef: RefObject<Konva.Stage> | null;
};

export const GunEffect = ({ stageRef }: GunEffectProps) => {
  const layerRef = useRef<any>(null);

  useEffect(() => {
    const layerCanvas = layerRef.current?.getCanvas();
    if (layerCanvas) {
      // Settings
      const ctx = layerCanvas?.getContext('2d');
      if (ctx) {
        ctx.imageSmoothingEnabled = false;
        // Gun Props
        const properties = {
          ctx: ctx,
          width: window.innerWidth,
          height: window.innerHeight,
          image: 'https://images2.imgbox.com/c2/91/ibBtxOym_o.png',
          weight: 3.4,
          rateOfFire: 300,
          recoil: 40,
          barrelCoordinate: {
            x: 50,
            y: -20,
          },
        };
        const gun = new Gun(properties);
        if (stageRef?.current) {
          gun.animate();
        }
      }
    }
  }, [stageRef?.current]);

  return <Layer ref={layerRef}></Layer>;
};
