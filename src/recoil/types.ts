import { IRect, Vector2d } from 'konva/lib/types';

export interface HighlighterLineData {
  points: number[];
}

export type Stamp = Vector2d & { cropRect: IRect };

export interface AntData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  dead?: boolean;
}

export interface ShakeProps {
  shouldShake: boolean;
  duration: number;
}

export type Crash = Vector2d & { rotation: number };
