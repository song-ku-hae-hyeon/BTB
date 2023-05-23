import styled from 'styled-components';

const Container = styled.div`
  background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteBox = styled.div`
  background-color: white;
  padding: 40px;
`;

const TransparentText = styled.p`
  font-size: 60px;
  font-weight: 700;
  background: linear-gradient(to right, #c6ffdd, #fbd786, #f7797d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export default { Container, WhiteBox, TransparentText };
