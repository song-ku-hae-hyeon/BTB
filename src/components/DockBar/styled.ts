import styled from 'styled-components';

const DockBarWrapper = styled.div`
  position: sticky;
  z-index: 9999;
  bottom: 0;
  display: flex;
  margin: 32px auto;
  padding: 10px;
  width: 640px;
  border-radius: 10px;
  background-color: rgba(200, 200, 200, 0.9);
`;

export default { DockBarWrapper };
