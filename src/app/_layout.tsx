import {ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {useEffect} from 'react';
import 'react-native-reanimated';
import {Colors} from "@/constants/Colors";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {BackHandler} from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        RobotoBlack: require("@/assets/fonts/Roboto-Black.ttf"),
        RobotoBlackItalic: require("@/assets/fonts/Roboto-BlackItalic.ttf"),
        RobotoBold: require("@/assets/fonts/Roboto-Bold.ttf"),
        RobotoBoldItalic: require("@/assets/fonts/Roboto-BoldItalic.ttf"),
        RobotoItalic: require("@/assets/fonts/Roboto-Italic.ttf"),
        RobotoLight: require("@/assets/fonts/Roboto-Light.ttf"),
        RobotoLightItalic: require("@/assets/fonts/Roboto-LightItalic.ttf"),
        RobotoMedium: require("@/assets/fonts/Roboto-Medium.ttf"),
        RobotoMediumItalic: require("@/assets/fonts/Roboto-MediumItalic.ttf"),
        RobotoRegular: require("@/assets/fonts/Roboto-Regular.ttf"),
        RobotoThin: require("@/assets/fonts/Roboto-Thin.ttf"),
        RobotoThinItalic: require("@/assets/fonts/Roboto-ThinItalic.ttf"),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    useEffect(() => {
        const backAction = () => {
            return true; // Return true to prevent the back action
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // Clean up the listener on unmount
    }, []);

    if (!loaded) {
        return null;
    }
    return (
        <ThemeProvider value={{
            dark: false,
            fonts: {
                regular: {
                    fontFamily: "RobotoRegular",
                    fontWeight: "400",
                },
                medium: {
                    fontFamily: "RobotoMedium",
                    fontWeight: "500",
                },
                bold: {
                    fontFamily: "RobotoBold",
                    fontWeight: "bold",
                },
                heavy: {
                    fontFamily: "RobotoBlack",
                    fontWeight: "bold",
                },
            },
            colors: {
                background: Colors.white,
                text: Colors.primary,
                border: Colors.secondary['200'],
                card: Colors.secondary['200'],
                notification: Colors.secondary['200'],
                primary: Colors.secondary['200'],
            },
        }}>
            <GestureHandlerRootView>
                <Stack screenOptions={{headerShown: false, animation: "none"}}/>
            </GestureHandlerRootView>
        </ThemeProvider>
    );
}
