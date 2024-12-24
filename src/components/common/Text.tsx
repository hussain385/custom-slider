import { ElementRef, forwardRef } from "react";
import { StyleProp, TextProps, TextStyle } from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

import fonts from "@/constants/fonts";
import { moderateScale } from "@/utils/common";
import {Colors} from "@/constants/Colors";
import Fonts from "@/constants/fonts";

export const textVariants = {
  "body-sm": "body-sm",
  "body-md": "body-md",
  "body-lg": "body-lg",
  "body-lg-bold": "body-lg-bold",
  "body-lg-light": "body-lg-light",
  "label-sm": "label-sm",
  "label-md": "label-md",
  "label-lg": "label-lg",
  "title-sm": "title-sm",
  "title-md": "title-md",
  "title-md-bold": "title-md-bold",
  "title-lg": "title-lg",
  "title-xl": "title-xl",
} as const;

export type TextVariants = keyof typeof textVariants;

export interface IText extends AnimatedProps<TextProps> {
  variant?: TextVariants;
}

const textVariant: Record<TextVariants, StyleProp<TextStyle>> = {
  "title-xl": {
    fontSize: moderateScale(30),
    fontFamily: fonts.Roboto.Bold,
  },
  "title-lg": {
    fontSize: moderateScale(22),
    fontFamily: fonts.Roboto.Medium,
    lineHeight: moderateScale(22),
    fontWeight: "600",
  },
  "title-md": {
    fontSize: moderateScale(20),
    fontFamily: fonts.Roboto.Medium,
  },
  "title-md-bold": {
    fontSize: moderateScale(20),
    fontFamily: fonts.Roboto.Bold,
  },
  "title-sm": {
    fontSize: moderateScale(18),
    fontFamily: fonts.Roboto.Medium,
    lineHeight: moderateScale(21),
  },
  "label-lg": {
    fontSize: moderateScale(16),
  },
  "label-md": {
    fontSize: moderateScale(14),
  },
  "label-sm": {
    fontSize: moderateScale(12),
  },
  "body-lg": {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(21),
    fontFamily: Fonts.Roboto.Medium
  },
  "body-lg-light": {
    fontSize: moderateScale(16),
    lineHeight: moderateScale(21),
  },
  "body-lg-bold": {
    fontSize: moderateScale(16),
    fontFamily: fonts.Roboto.Bold,
    lineHeight: moderateScale(18),
  },
  "body-md": {
    fontSize: moderateScale(14),
  },
  "body-sm": {
    fontSize: moderateScale(12),
    lineHeight: moderateScale(14),
  },
};

const Text = forwardRef<ElementRef<Animated.Text>, IText>(
  ({ style, variant = "body-md", ...props }, ref) => (
    <Animated.Text
      ref={ref}
      {...props}
      style={[
        { fontFamily: fonts.Roboto.Regular, color: Colors.primary },
        textVariant[variant],
        style,
      ]}
    />
  ),
);

export default Text;
