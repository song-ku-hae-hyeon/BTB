import styled from 'styled-components';

const DockBarWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  margin: 32px auto;
  padding: 16px;
  border-radius: 10px;
  background-color: rgba(250, 250, 250, 0.8);
  box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px;
  cursor: default;
  user-select: none;
`;

export default { DockBarWrapper };
