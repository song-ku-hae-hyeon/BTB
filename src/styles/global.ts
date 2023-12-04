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

  @keyframes fallAnimation {
    0% {
      transform: translateX(0) translateY(0) rotate(0deg);
    }
    25% {
      transform: translateX(120px) translateY(-100px) rotate(90deg);
    }
    50% {
      transform: translateX(150px) translateY(0px) rotate(180deg);
    }
    75% {
      transform: translateX(200px) translateY(150px) rotate(270deg);
    }
    99% {
      transform: translateX(240px) translateY(350px) rotate(360deg);
      opacity: 1;
    }
    100% {
      transform: translateX(240px) translateY(400px) rotate(360deg);
      opacity: 0;
    }
  }
`;

export default GlobalStyles;
