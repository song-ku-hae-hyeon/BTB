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

const Stamp = styled.img`
  display: flex;
  z-index: 9300;
  position: fixed;
  top: 0;
  left: 0;
  width: 70px;
  height: 70px;
`;

export default { Playground, Paper, Stamp };
