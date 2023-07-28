import styled from 'styled-components';
// @ts-ignore
import img from '../../../public/highlighter.png';

const imgUrl = img ?? 'highlighter.png';

const HighlighterWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9000;
  cursor: url(${imgUrl}) 8 64, auto;
`;

export default { HighlighterWrapper };
