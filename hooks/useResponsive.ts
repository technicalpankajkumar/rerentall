// 🧠 Best Practice
// Use scale for fixed designs (e.g. button width/height)
// Use it for:
// Fixed width of elements like buttons, images, containers, etc.
// Borders, icons, or elements that should scale consistently with screen width.
// -----------
//verticalScale
// Vertical spacing, heights of buttons, images, or vertical paddings/margins.
//------------
// Use moderateScale for font size, padding, margin (gentler scaling).
// Font sizes
// Horizontal paddings/margins
// Subtle horizontal UI adjustments that should scale but not drastically
//--------------
// moderateVerticalScale 
// Vertical padding/margin
// Text line-heights
// Soft scaling of vertical UI elements (like spacing between stacked components)
// -------------
// Use widthPercent / heightPercent for flexible layouts.
// summary
// | Use Case            | Recommended Function                     |
// | ------------------- | ---------------------------------------- |
// | Button width/height | `scale`, `verticalScale`                 |
// | Font size           | `moderateScale`                          |
// | Padding/Margin      | `moderateScale`, `moderateVerticalScale` |
// | Flexible layout     | `widthPercent`, `heightPercent`          |
// | Tablet detection    | `isIpad()`                               |
// | Exact screen size   | `size`, `sizeScreen`                     |


import { Dimensions, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
const { height: screenH, width: screenW } = Dimensions.get('screen');

const guidelineBaseWidth = width >= 768 ? 768 : 375;
const guidelineBaseHeight =
  Platform.OS === 'ios'
    ? height >= 1024
      ? 1024
      : 812
    : height <= 550
    ? 667
    : 812;

const scale = (sizeValue: number) =>
  Math.ceil((width / guidelineBaseWidth) * sizeValue);

const verticalScale = (sizeValue: number) =>
  Math.ceil((height / guidelineBaseHeight) * sizeValue);

const moderateScale = (sizeValue: number, factor = 0.5) =>
  Math.ceil(sizeValue + (scale(sizeValue) - sizeValue) * factor);

const moderateVerticalScale = (sizeValue: number, factor = 0.5) =>
  Math.ceil(sizeValue + (verticalScale(sizeValue) - sizeValue) * factor);

const widthPercent = (value: number) => width * (value / 100);
const heightPercent = (value: number) => height * (value / 100);

const isIpad = () => width >= 768;

export function useResponsive() {
  return {
    size: { width, height },
    sizeScreen: { width: screenW, height: screenH },
    scale,
    verticalScale,
    moderateScale,
    moderateVerticalScale,
    widthPercent,
    heightPercent,
    isIpad,
  };
}
