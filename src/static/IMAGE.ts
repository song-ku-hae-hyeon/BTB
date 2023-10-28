// @ts-nocheck
import highlighter from '@public/highlighter_64.png';
import stamp from '@public/stamp_64.png';
import stamp_mark from '@public/stamp_mark_64.png';
import ant_sprite from '@public/ant_sprite_64.png';
import ant from '@public/ant_64.png';
import ant_dead from '@public/ant_dead_64.png';
import hammer from '@public/hammer_64.png';
import crash from '@public/crash_64.png';

const HIGHLIGHTER_URL = highlighter as string;
const STAMP_URL = stamp as string;
const STAMP_MARK_URL = stamp_mark as string;
const ANT_SPRITE_URL = ant_sprite as string;
const ANT_URL = ant as string;
const DEAD_ANT_URL = ant_dead as string;
const HAMMER_URL = hammer as string;
const CRASH_URL = crash as string;

export const CURSOR_URL: Record<ToolType, string> = {
  none: '',
  highlighter: HIGHLIGHTER_URL,
  stamp: STAMP_URL,
  ant: '',
  bubble: '',
  hammer: HAMMER_URL,
};

export default {
  HIGHLIGHTER_URL,
  STAMP_URL,
  STAMP_MARK_URL,
  ANT_URL,
  ANT_SPRITE_URL,
  DEAD_ANT_URL,
  HAMMER_URL,
  CRASH_URL,
};
