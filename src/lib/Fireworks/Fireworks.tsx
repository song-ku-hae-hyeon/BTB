import styled from 'styled-components';
import { useFireworkParticle } from './useFireworkParticle';

export const Fireworks = () => {
  const { canvasRef, createFirework } = useFireworkParticle();

  return (
    <CanvasStyled
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => createFirework(e.pageX, e.pageY)}
    />
  );
};

const CanvasStyled = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
