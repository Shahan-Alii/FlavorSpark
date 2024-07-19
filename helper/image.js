import { useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const CatchedImage = (props) => {
    const [cachedSource, setCachedSource] = useState(null);
    const { uri } = props;

    useEffect(() => {
        const getCachedImage = async () => {
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if (cachedImageData) {
                    setCachedSource({ uri: cachedImageData });
                } else {
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () => {
                            resolve(reader.result);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64Data);
                    setCachedSource({ uri: base64Data });
                }
            } catch (error) {
                console.error('Error caching image:', error);
                return { uri };
            }
        };

        getCachedImage();
    }, []);

    return <Animated.Image source={cachedSource} {...props} />;
};
