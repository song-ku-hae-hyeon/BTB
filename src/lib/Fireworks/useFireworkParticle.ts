import { useEffect, useRef, useCallback } from 'react';
import { Particle } from './particle';

export const useFireworkParticle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particleRef = useRef<Particle[]>([]);

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
    window.requestAnimationFrame(startFireWork);
  };

  const createFirework = (x: number, y: number) => {
    const randomNumberGenerator = (min: number, max: number) => Math.random() * (max - min) + min;
    const numberOfParticles = randomNumberGenerator(10, 50);
    const result = [];
    for (let index = 0; index < numberOfParticles; index++) {
      const particle = new Particle(x, y, canvasRef.current as HTMLCanvasElement);
      result.push(particle);
    }
    particleRef.current.push(...result);
  };

  useEffect(() => {
    const requestedId = window.requestAnimationFrame(startFireWork);
    return () => window.cancelAnimationFrame(requestedId);
  }, []);

  return { canvasRef, createFirework };
};
