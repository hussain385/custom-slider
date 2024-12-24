import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, View} from "react-native";
import tw from "@/utils/tailwind";
import Text from "@/components/common/Text";
import LinearProgressBar from "@/components/common/LinearProgressBar";
import {useRouter} from "expo-router";
import {FadeInDown} from "react-native-reanimated";

const SplashScreen = () => {
    const [timer, setTimer] = useState(0)
    const router = useRouter()

    useEffect(() => {
        const duration = 3000;
        const interval = 50;
        const steps = duration / interval;
        const increment = 1 / steps;
        let currentStep = 0;
        const timerInterval = setInterval(() => {
            currentStep++;
            const newValue = Math.min(currentStep * increment, 1);
            setTimer(newValue);
            if (currentStep >= steps) {
                clearInterval(timerInterval);
                setTimeout(() => {
                    router.push('/introduction')
                }, 500)
            }
        }, interval);
        return () => clearInterval(timerInterval);
    }, []);

    return (
        <SafeAreaView style={tw`bg-primary flex-1`}>
            <View style={tw`bg-primary flex-1 flex-col justify-between items-center`}>
                <View />
                <Image source={require('@/assets/images/healthy.png')} style={tw`w-[207px] h-[207px] mt-8`}/>
                <View style={tw`w-10/12 flex-col gap-8 mb-4`}>
                    <Text entering={FadeInDown.delay(600)} variant={'title-lg'} style={tw`text-center text-white`}>
                        As fast as lightning,{'\n'}
                        as delicious as thunder!
                    </Text>
                    <LinearProgressBar progress={timer} height={6}/>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SplashScreen;
