// @ts-nocheck
import highlighter from '@public/highlighter_64.png';
import stamp from '@public/stamp_64.png';
import stamp_mark from '@public/stamp_mark_64.png';
import ant1 from '@public/ant1_64.png';
import ant2 from '@public/ant2_64.png';
import ant_dead from '@public/ant_dead_64.png';
import hammer from '@public/hammer_64.png';
import crash from '@public/crash_64.png';
import gun from '@public/gun_64.png';
import gun_mark from '@public/gun_mark_64.png';

const HIGHLIGHTER_URL = highlighter as string;
const STAMP_URL = stamp as string;
const STAMP_MARK_URL = stamp_mark as string;
const ANT1_URL = ant1 as string;
const ANT2_URL = ant2 as string;
const DEAD_ANT_URL = ant_dead as string;
const HAMMER_URL = hammer as string;
const CRASH_URL = crash as string;
const GUN_URL = gun as string;
const GUN_MARK_URL = gun_mark as string;

export const CURSOR_URL: Record<ToolType, string> = {
  none: '',
  highlighter: HIGHLIGHTER_URL,
  stamp: STAMP_URL,
  ant: '',
  bubble: '',
  hammer: HAMMER_URL,
  gun: GUN_URL,
};

export default {
  HIGHLIGHTER_URL,
  STAMP_URL,
  STAMP_MARK_URL,
  ANT1_URL,
  ANT2_URL,
  DEAD_ANT_URL,
  GUN_URL,
  HAMMER_URL,
  CRASH_URL,
  GUN_MARK_URL,
};
