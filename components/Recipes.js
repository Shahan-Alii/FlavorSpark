import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native';
import React from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';

export default function Recipes({ meals, categories }) {
    const navigation = useNavigation();

    if (meals == null) {
        return (
            <View className=" mx-4 space-y-3">
                <Text
                    style={{ fontSize: hp(3) }}
                    className=" font-semibold text-neutral-600"
                >
                    Recipes
                </Text>

                <View className="flex justify-center items-center flex-1 pt-14 ">
                    <Text
                        style={{ fontSize: hp(2) }}
                        className=" font-semibold text-neutral-500 "
                    >
                        No Result Found
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View className=" mx-4 space-y-3">
            <Text
                style={{ fontSize: hp(3) }}
                className=" font-semibold text-neutral-600"
            >
                Recipes
            </Text>

            <View>
                {meals.length < 1 || categories.length == 0 ? (
                    <View className=" flex flex-1 justify-center items-center">
                        <ActivityIndicator
                            size="large"
                            className=" mt-20"
                            color="#ffbf00"
                        />
                    </View>
                ) : (
                    <MasonryList
                        data={meals}
                        keyExtractor={(item) => item.idMeal}
                        numColumns={2}
                        showVerticalScrollIndicator={false}
                        renderItem={({ item, i }) => (
                            <RecipeCard
                                item={item}
                                index={i}
                                navigation={navigation}
                            />
                        )}
                        onEndReachedThreshold={0.1}
                    />
                )}
            </View>
        </View>
    );
}

const RecipeCard = ({ item, index, navigation }) => {
    let isEven = index % 2 == 0;

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)
                .duration(600)
                .springify()
                .damping(12)}
        >
            <Pressable
                style={{
                    width: '100%',
                    paddingLeft: isEven ? 0 : 8,
                    paddingRight: isEven ? 8 : 0,
                }}
                className="flex justify-center mb-4 space-y-1"
                onPress={() => navigation.navigate('DetailScreen', { ...item })}
            >
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    style={{
                        width: '100%',
                        height: index % 3 == 0 ? hp(25) : hp(35),
                        borderRadius: 15,
                    }}
                />
                <Text
                    className=" font-semibold ml-2 text-neutral-600"
                    style={{ fontSize: hp(1.7) }}
                >
                    {item.strMeal.length > 20
                        ? item.strMeal.slice(0, 20) + '...'
                        : item.strMeal}
                </Text>
            </Pressable>
        </Animated.View>
    );
};
