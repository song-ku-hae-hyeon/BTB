// @ts-ignore
import FireworkIcon from '../asset/firework.png';
// @ts-ignore
import HighlighterIcon from '../asset/highlight.png';
// @ts-ignore
import StampIcon from '../asset/stamp2.png';
// @ts-ignore
import AntIcon from '../asset/ant.png';

export function getIconImageSrc(icon: string) {
  switch (icon) {
    case 'firework':
      return FireworkIcon;
    case 'highlighter':
      return HighlighterIcon;
    case 'stamp':
      return StampIcon;
    case 'ant':
      return AntIcon;
    default:
      return FireworkIcon;
  }
}
