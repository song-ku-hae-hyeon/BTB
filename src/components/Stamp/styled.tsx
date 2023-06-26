import styled from 'styled-components';

const Playground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: none;
  z-index: 9000;
`;

const Paper = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;
  height: 100%;
  cursor: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9100;
`;

const Stamp = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9100;
`;

export default { Playground, Paper, Stamp };
