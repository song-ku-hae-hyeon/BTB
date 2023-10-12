import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @keyframes shake {
    10%, 90% {
      transform: translate3d(-2px, 2px, 0);
    }
    
    20%, 80% {
      transform: translate3d(4px, 8px, 3px);
    }

    30%, 50%, 70% {
      transform: translate3d(-6px, -5px, -3px);
    }

    40%, 60% {
      transform: translate3d(6px, 0, 0);
    }
  }
`;

export default GlobalStyles;
