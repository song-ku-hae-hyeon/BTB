import { useFireworkParticle } from './useFireworkParticle';

export const Fireworks = () => {
  const { canvasRef, createFirework } = useFireworkParticle();

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => createFirework(e.pageX, e.pageY)}
    />
  );
};
