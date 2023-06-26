import styled from 'styled-components';

const DockBarWrapper = styled.div`
  width: 640px;
  height: 72px;
  position: fixed;
  z-index: 2;
  bottom: 20px;
  left: calc(50% - 320px);
  display: flex;
  margin: 32px auto;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(200, 200, 200, 0.9);
  user-select: none;
`;

export default { DockBarWrapper };
