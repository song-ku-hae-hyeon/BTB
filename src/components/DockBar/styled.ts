import styled from 'styled-components';

const DockBarWrapper = styled.div`
  position: fixed;
  width: 640px;
  height: 72px;
  z-index: 9999;
  bottom: 0;
  left: calc(50% - 320px);
  display: flex;
  margin: 32px auto;
  padding: 10px;
  border-radius: 10px;
  background-color: rgba(200, 200, 200, 0.9);
  user-select: none;
`;

export default { DockBarWrapper };
