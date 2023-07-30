import styled from 'styled-components';
import { useEffect } from 'react';
import { useFireworkParticle } from './useFireworkParticle';

const Fireworks = () => {
  const { canvasRef, createFirework, cancelFireworkrAF } = useFireworkParticle();

  useEffect(() => {
    return () => cancelFireworkrAF();
  }, []);

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

export default Fireworks;
