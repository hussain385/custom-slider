import React from 'react';
import {SafeAreaView, View} from "react-native";
import tw from "@/utils/tailwind";
import {Slot} from "expo-router";

type componentPropType = {
    children: React.ReactNode;
}

const AuthLayout = () => {
    return (
        <View style={tw`bg-white flex-col items-center flex-1`}>
            <SafeAreaView style={tw`flex-col flex-1`}>
                <Slot />
            </SafeAreaView>
        </View>
    );
};

export default AuthLayout;
