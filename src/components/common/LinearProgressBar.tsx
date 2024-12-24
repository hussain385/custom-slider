import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleProp, View, ViewStyle } from "react-native";

import tw from "@/utils/tailwind";

type componentPropTypes = {
    initialWidth?: number;
    progress: number;
    style?: StyleProp<ViewStyle>;
    height?: number;
    innerBarStyle?: StyleProp<ViewStyle>;
};

const LinearProgressBar = ({
                               initialWidth = 0,
                               progress = 0,
                               style,
                               height = 4,
                               innerBarStyle
                           }: componentPropTypes) => {
    const progressAnim = useRef(new Animated.Value(initialWidth)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: progress,
            duration: 500,
            easing: Easing.linear,
            useNativeDriver: false,
        }).start();
    }, [progress, progressAnim]);

    const widthInterpolation = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <View
            style={[
                tw`bg-[#FAF8F5] rounded-full`,
                { height },
                style,
            ]}
        >
            <Animated.View
                style={[
                    tw`bg-secondary200 rounded-full`,
                    { width: widthInterpolation, height: "100%" },
                    innerBarStyle
                ]}
            />
        </View>
    );
};

export default LinearProgressBar;
