import styled from 'styled-components';
import { Layer } from 'react-konva';

const PenLayer = styled(Layer)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
`;

export default { PenLayer };
