import styled from 'styled-components';
import { Layer } from 'react-konva';
import { IMAGE } from '@static';

const Cursor = styled(Layer)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  cursor: url(${IMAGE.STAMP_URL}) 8 64, auto;
`;

const NonCursor = styled(Layer)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  cursor: none;
`;

export default { Cursor, NonCursor };
