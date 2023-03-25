import { ReactNode } from 'react';

type ButtonColor = 'grey' | 'blue' | 'green' | 'red';

export interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  color?: ButtonColor;
}

export interface ButtonStyleProps {
  color: ButtonColor;
}
