import { useEffect, useRef, useCallback } from 'react';
import { Particle } from './particle';

export const useFireworkParticle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<Particle[]>([]);
  const rAFIdRef = useRef<number>(0);

  const startFireWork = useCallback(() => {
    const context = canvasRef.current?.getContext('2d') as CanvasRenderingContext2D;
    context.fillStyle = 'rgba(0,0,0,0.1)';
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);

    const current = [];
    for (const particle of particleRef.current) {
      particle.draw();
      if (particle.move()) {
        current.push(particle);
      }
    }

    particleRef.current = current;
    initFireworkrAF();
  }, []);

  const initFireworkrAF = () => {
    const rAFId = window.requestAnimationFrame(startFireWork);
    rAFIdRef.current = rAFId;
  };

  const cancelFireworkrAF = () => {
    window.cancelAnimationFrame(rAFIdRef.current);
  };

  const createFirework = (x: number, y: number) => {
    const randomNumberGenerator = (min: number, max: number) => Math.random() * (max - min) + min;
    const numberOfParticles = randomNumberGenerator(10, 50);

    for (let index = 0; index < numberOfParticles; index++) {
      const particle = new Particle(x, y, canvasRef.current as HTMLCanvasElement);
      particleRef.current.push(particle);
    }
  };

  useEffect(() => {
    const requestedId = window.requestAnimationFrame(startFireWork);
    return () => window.cancelAnimationFrame(requestedId);
  }, []);

  return { canvasRef, createFirework, cancelFireworkrAF };
};
