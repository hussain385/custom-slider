import {screen_width} from "@/constants/common";

export const moderateScale = (size: number, factor = 0.5) => {
  const sample_width = 414;
  const scale = (sizeProp: number) => (screen_width / sample_width) * sizeProp;
  return size + (scale(size) - size) * factor;
};
