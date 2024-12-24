import React, {useRef, useState} from 'react';
import {Animated, FlatList, SafeAreaView, View, Image} from "react-native";
import tw from "@/utils/tailwind";
import Slides from '@/data/slider';
import Text from "@/components/common/Text";
import PaginationComponent from "@/components/auth/pagination.component";
import {screen_height, screen_width} from "@/constants/common";
import Button from "@/components/common/Button";
import {useRouter} from "expo-router";

const Introduction = () => {
    const [index, setIndex] = useState<number>(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const router = useRouter()

    const handleOnScroll = (event: any) => {
        Animated.event(
            [
                {
                    nativeEvent: {
                        contentOffset: {
                            x: scrollX,
                        },
                    },
                },
            ],
            {
                useNativeDriver: false,
            },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({viewableItems}: {viewableItems: any[]}) => {
        setIndex(viewableItems[0].index);
    }).current;

    const viewAbilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;

    const handleNext = () => {
         if (index === Slides.length - 1) {
             console.log("")
         } else if (index < Slides.length - 1) {
             flatListRef.current?.scrollToIndex({
                 animated: true,
                 index: index + 1,
             });
         }
    };

    return (
        <View>
            <FlatList
                ref={flatListRef}
                data={Slides}
                renderItem={({item}) => (
                    <View style={[tw`flex-col items-center justify-center`, {width: screen_width, height: screen_height * 0.85}]}>
                        <Image source={item.img} style={tw`w-[207px] h-[207px] mb-12`}/>
                        <Text variant={'title-lg'}>{item.title}</Text>
                        <Text variant={'body-lg'} style={tw`text-center`}>{item.description}</Text>
                    </View>
                )}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 1,
                }}
                decelerationRate="fast"
                snapToInterval={screen_width}
                scrollEventThrottle={16}
            />

            <View style={tw`absolute bottom-0 w-full flex-col items-center justify-center gap-6`}>
                <PaginationComponent data={Slides} scrollX={scrollX} index={index} />
                <Button
                    variant={'filled'}
                    style={tw`w-10/12`}
                    onPress={handleNext}
                >
                    {index === Slides.length - 1 ? 'Finish' : 'Next'}
                </Button>
                <Button variant={'ghost'} style={tw`w-10/12 -mt-3.5`} textStyle={tw`opacity-45`}>
                    Skip
                </Button>
            </View>
        </View>
    );
};

export default Introduction;
