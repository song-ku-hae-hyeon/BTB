import type { ReactNode } from 'react';
import type { ToolType } from '@types';

export interface ContentWrapperProps {
  isActive: boolean;
  children: ReactNode;
}

export interface ContentWrapperStyledProps extends ContentWrapperProps {
  tool: ToolType;
}
