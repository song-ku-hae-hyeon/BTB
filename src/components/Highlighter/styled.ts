import styled from 'styled-components';
import { IMAGE } from '@static';

const HighlighterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  cursor: url(${IMAGE.HIGHLIGHTER_URL}) 8 64, auto;
`;

export default { HighlighterWrapper };
