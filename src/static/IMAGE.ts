// @ts-nocheck
import highlighter from '@public/highlighter_64.png';
import stamp from '@public/stamp_64.png';
import stamp_mark from '@public/stamp_mark_64.png';
import ant_sprite from '@public/ant_sprite_64.png';
import ant from '@public/ant_64.png';
import ant_dead from '@public/ant_dead_64.png';
import hammer from '@public/hammer_64.png';
import crash from '@public/crash_64.png';
import gun from '@public/gun_64.png';
import gun_mark from '@public/gun_mark_64.png';
import red_pen from '@public/red_pen_64.png';
import blue_pen from '@public/blue_pen_64.png';
import clean from '@public/clean_64.png';
import type { ToolType } from '@types';

const HIGHLIGHTER_URL = highlighter as string;
const STAMP_URL = stamp as string;
const STAMP_MARK_URL = stamp_mark as string;
const ANT_SPRITE_URL = ant_sprite as string;
const ANT_URL = ant as string;
const DEAD_ANT_URL = ant_dead as string;
const HAMMER_URL = hammer as string;
const CRASH_URL = crash as string;
const GUN_URL = gun as string;
const GUN_MARK_URL = gun_mark as string;
const RED_PEN_URL = red_pen as string;
const BLUE_PEN_URL = blue_pen as string;
const CLEAN_URL = clean as string;

export const CURSOR_URL: Record<ToolType, string> = {
  none: '',
  highlighter: HIGHLIGHTER_URL,
  stamp: STAMP_URL,
  ant: '',
  bubble: CLEAN_URL,
  hammer: HAMMER_URL,
  gun: GUN_URL,
  redPen: RED_PEN_URL,
  bluePen: BLUE_PEN_URL,
};

export default {
  HIGHLIGHTER_URL,
  STAMP_URL,
  STAMP_MARK_URL,
  ANT_URL,
  ANT_SPRITE_URL,
  DEAD_ANT_URL,
  GUN_URL,
  HAMMER_URL,
  CRASH_URL,
  GUN_MARK_URL,
  RED_PEN_URL,
  BLUE_PEN_URL,
  CLEAN_URL,
};
