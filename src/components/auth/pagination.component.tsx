import {Animated, View} from 'react-native';
import React from 'react';
import {screen_width} from "@/constants/common";
import Slides from '@/data/slider';
import tw from "@/utils/tailwind";
import {Colors} from "@/constants/Colors";

type componentProp = {
    data: typeof Slides,
    scrollX: Animated.Value,
    index: number
}

const PaginationComponent = ({data, scrollX, index}: componentProp) => {
    return (
        <View style={tw`flex-row w-full items-center justify-center`}>
            {data.map((_, idx: number) => {
                const inputRange = [(idx - 1) * screen_width, idx * screen_width, (idx + 1) * screen_width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [12, 30, 12],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 1, 0.1],
                    extrapolate: 'clamp',
                });

                const backgroundColor = scrollX.interpolate({
                    inputRange,
                    outputRange: [Colors.secondary["50"], Colors.secondary["200"], Colors.secondary["50"]],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={idx.toString()}
                        style={[
                            tw`w-3 h-3 rounded-lg mx-1 bg-secondary50`,
                            {width: dotWidth, backgroundColor},
                            idx === index && tw`bg-secondary200`,
                        ]}
                    />
                );
            })}
        </View>
    );
};

export default PaginationComponent;
