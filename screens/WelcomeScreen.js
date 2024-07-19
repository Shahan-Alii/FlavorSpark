import { View, Text, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { useEffect } from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const ring1Padding = useSharedValue(0);
    const ring2Padding = useSharedValue(0);

    useEffect(() => {
        ring1Padding.value = 0;
        ring2Padding.value = 0;

        setTimeout(
            () =>
                (ring1Padding.value = withSpring(ring1Padding.value + hp(2.2))),
            100
        );
        setTimeout(
            () =>
                (ring2Padding.value = withSpring(ring2Padding.value + hp(4.5))),
            300
        );

        setTimeout(() => navigation.navigate('Home'), 1500);
    }, []);

    return (
        <View className="flex-1 justify-center  items-center  space-y-10 bg-amber-500">
            <StatusBar style="light" />
            <Animated.View
                className="bg-white/20  rounded-full "
                style={{ padding: ring2Padding }}
            >
                <Animated.View
                    className="bg-white/20  rounded-full "
                    style={{ padding: ring1Padding }}
                >
                    <Image
                        source={require('../assets/logo.png')}
                        style={{ width: hp(29), height: hp(29) }}
                    />
                </Animated.View>
            </Animated.View>

            <View className="flex items-center space-y-2">
                <Text
                    className=" font-bold text-white tracking-widest "
                    style={{
                        fontSize: hp(6),
                    }}
                >
                    Flavor Spark
                </Text>
                <Text
                    className="font-bold text-white tracking-widest  "
                    style={{ fontSize: hp(2) }}
                >
                    Savor Every Bite
                </Text>
            </View>
        </View>
    );
}
