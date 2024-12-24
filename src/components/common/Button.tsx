import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
  ActivityIndicator
} from "react-native";
import Animated, { AnimatedProps } from "react-native-reanimated";

import Text, {TextVariants} from "@/components/common/Text";
import { Colors } from "@/constants/Colors";
import { screen_height } from "@/constants/common";
import { moderateScale } from "@/utils/common";
import {commonStyles} from "@/styles/common.styles";

export const buttonVariants = {
  filled: "filled",
  outlined: "outlined",
  error: "error",
  ghost: "ghost",
  warning: "warning",
  error2: "error2",
} as const;

export const buttonSizes = {
  default: "default",
  small: "small",
} as const;

export type ButtonVariants = keyof typeof buttonVariants;
export type ButtonSizes = keyof typeof buttonSizes;

interface ButtonProps extends AnimatedProps<TouchableOpacityProps> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  textStyle?: StyleProp<TextStyle>;
  LeftIcon?: React.ReactNode;
  icon?: React.ReactNode;
  isLoading?: boolean;
  textVariant?: TextVariants;
  disabled?: boolean;
}

const buttonVariantsStyle: Record<ButtonVariants, StyleProp<ViewStyle>> = {
  filled: {
    backgroundColor: Colors.secondary['200'],
    ...commonStyles.shadow,
  },
  outlined: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  warning: {
    backgroundColor: `rgba(249, 255, 49, 0.25)`,
    borderColor: Colors.warning["100"],
    borderWidth: 2,
  },
  error: {
    backgroundColor: `#C64B434D`,
    borderColor: Colors.error["550"],
    borderWidth: 2,
  },
  error2: {
    backgroundColor: Colors.error["400"],
  },
  ghost: {},
};

const textVariantsStyle: Record<ButtonVariants, StyleProp<TextStyle>> = {
  filled: {color: "#ffffff"},
  outlined: {color: Colors.primary},
  error2: {},
  error: {
    color: "#ffffff",
  },
  warning: {
    color: "#ffffff",
  },
  ghost: {
    color: Colors.primary,
  },
};

const buttonSizesStyle: Record<ButtonSizes, StyleProp<ViewStyle>> = {
  default: {
    paddingVertical: 0,
  },
  small: {
    paddingVertical: 0,
  },
};

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

function Button({
  style,
  variant = "filled",
  size = "default",
  children,
  textStyle,
  LeftIcon,
  icon,
  isLoading,
  textVariant,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.64}
      disabled={disabled || isLoading}
      {...props}
      style={[
        {
          borderRadius: 10000,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          height: moderateScale(50),
          flexDirection: "row",
          opacity: disabled ? 0.4: 1
        },
        buttonVariantsStyle[variant],
        buttonSizesStyle[size],
        style,
      ]}
    >
      {isLoading ? <ActivityIndicator color="white" /> : (icon ?? LeftIcon)}

      {!isLoading && children && (
        <Text
          variant={textVariant || "title-sm"}
          style={[textVariantsStyle[variant], textStyle]}
        >
          {children}
        </Text>
      )}
    </AnimatedTouchableOpacity>
  );
}

export default Button;
