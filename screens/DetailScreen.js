import {
    View,
    Text,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeOut, FadeIn } from 'react-native-reanimated';
import axios from 'axios';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function DetailScreen(props) {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const [loading, setLoading] = useState(true);
    const [meal, setMeal] = useState(null);

    const navigation = useNavigation();

    const getYoutubeVideoId = (url) => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    };

    const IngredientIndexes = (meal) => {
        if (!meal) {
            return [];
        }
        let indexes = [];

        for (let i = 1; i <= 20; i++) {
            if (meal['strIngredient' + i]) {
                indexes.push(i);
            }
        }

        return indexes;
    };

    const fetchRecipeDetail = async (id) => {
        try {
            const response = await axios.get(
                `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
            );

            if (response) {
                setMeal(response.data.meals[0]);
                // console.log(meal);
                setLoading(false);
            }
        } catch (error) {
            console.log('Error in fetching recipes', error);
        }
    };

    useEffect(() => {
        fetchRecipeDetail(item.idMeal);
    }, []);

    return (
        <ScrollView
            className=" bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar barStyle="dark-content" />

            {/* Image of recipe*/}
            <View className=" flex-row justify-center">
                <Animated.Image
                    entering={FadeInDown.duration(900)}
                    source={{ uri: item.strMealThumb }}
                    style={{
                        width: wp(98),
                        height: hp(50),
                        borderRadius: 10,
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                    }}
                />
            </View>
            {/* back and favourite buttons*/}
            <Animated.View
                entering={FadeInDown.delay(200).duration(1000)}
                className=" w-full absolute flex-row justify-between items-center pt-14"
            >
                <TouchableOpacity
                    className=" p-2 rounded-full bg-white ml-4"
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Entypo name="chevron-left" size={hp(4)} color="#fbbf24" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        setIsFavourite(!isFavourite);
                    }}
                    className=" p-2 rounded-full bg-white mr-4"
                >
                    <MaterialIcons
                        name="favorite"
                        size={hp(4)}
                        color={isFavourite ? 'red' : 'black'}
                    />
                </TouchableOpacity>
            </Animated.View>
            {/* recipe description*/}

            {loading ? (
                <ActivityIndicator
                    size={'large'}
                    className="mt-20"
                    color={'#fbbf24'}
                />
            ) : (
                <View className="px-4 flex justify-between space-y-4 pt-8">
                    {/* recipe name and area*/}
                    <Animated.View
                        entering={FadeInDown.duration(700)
                            .springify()
                            .damping(12)}
                        className=" space-y-2"
                    >
                        <Text
                            style={{ fontSize: hp(3) }}
                            className="font-bold flex-1 text-neutral-700"
                        >
                            {item.strMeal}
                        </Text>

                        <Text
                            style={{ fontSize: hp(2) }}
                            className="font-medium flex-1 text-neutral-500"
                        >
                            {meal.strArea}
                        </Text>
                    </Animated.View>
                    {/* Misclanneous*/}
                    <Animated.View
                        entering={FadeInDown.delay(100)
                            .duration(700)
                            .springify()
                            .damping(12)}
                        className="flex-row justify-around"
                    >
                        {/* Cooking Time*/}
                        <View className=" flex rounded-full bg-amber-400 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex justify-center items-center"
                            >
                                <FontAwesome5
                                    name="clock"
                                    size={hp(4)}
                                    color="#525252"
                                />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text
                                    style={{ fontSize: hp(2) }}
                                    className="font-bold text-neutral-700"
                                >
                                    35
                                </Text>
                                <Text
                                    style={{ fontSize: hp(1.3) }}
                                    className="font-bold text-neutral-700"
                                >
                                    Mins
                                </Text>
                            </View>
                        </View>

                        {/* Serving size*/}
                        <View className=" flex rounded-full bg-amber-400 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex justify-center items-center"
                            >
                                <Ionicons
                                    name="people-sharp"
                                    size={hp(4)}
                                    color="#525252"
                                />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text
                                    style={{ fontSize: hp(2) }}
                                    className="font-bold text-neutral-700"
                                >
                                    05
                                </Text>
                                <Text
                                    style={{ fontSize: hp(1.3) }}
                                    className="font-bold text-neutral-700"
                                >
                                    People
                                </Text>
                            </View>
                        </View>

                        {/* Calories*/}
                        <View className=" flex rounded-full bg-amber-400 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex justify-center items-center"
                            >
                                <FontAwesome5
                                    name="fire"
                                    size={hp(4)}
                                    color="#525252"
                                />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text
                                    style={{ fontSize: hp(2) }}
                                    className="font-bold text-neutral-700"
                                >
                                    135
                                </Text>
                                <Text
                                    style={{ fontSize: hp(1.3) }}
                                    className="font-bold text-neutral-700"
                                >
                                    K.Cal
                                </Text>
                            </View>
                        </View>

                        {/* Cooking Time*/}
                        <View className=" flex rounded-full bg-amber-400 p-2">
                            <View
                                style={{ height: hp(6.5), width: hp(6.5) }}
                                className="bg-white rounded-full flex justify-center items-center"
                            >
                                <Octicons
                                    name="stack"
                                    size={hp(4)}
                                    color="#525252"
                                />
                            </View>
                            <View className="flex items-center py-2 space-y-1">
                                <Text
                                    style={{ fontSize: hp(1.3) }}
                                    className="font-bold text-neutral-700"
                                ></Text>

                                <Text
                                    style={{ fontSize: hp(2) }}
                                    className="font-bold text-neutral-700"
                                >
                                    Easy
                                </Text>
                            </View>
                        </View>
                    </Animated.View>

                    {/* Ingredients*/}

                    <Animated.View
                        entering={FadeInDown.delay(200)
                            .duration(700)
                            .springify()
                            .damping(12)}
                        className=" space-y-4"
                    >
                        <Text
                            style={{ fontSize: hp(2.5) }}
                            className="font-bold text-neutral-700 flex-1"
                        >
                            Ingredients
                        </Text>

                        <View className=" space-y-2 ml-3">
                            {IngredientIndexes(meal).map((i) => {
                                return (
                                    <View
                                        key={i}
                                        className=" flex-row space-x-4 items-center"
                                    >
                                        <FontAwesome5
                                            name="dot-circle"
                                            size={hp(1.6)}
                                            color="#FFCA28"
                                        />

                                        <View className="flex-row space-x-4">
                                            <Text
                                                style={{ fontSize: hp(1.7) }}
                                                className=" font-extrabold text-neutral-700"
                                            >
                                                {meal['strMeasure' + i]}
                                            </Text>
                                            <Text
                                                style={{ fontSize: hp(1.7) }}
                                                className=" font-medium text-neutral-600"
                                            >
                                                {meal['strIngredient' + i]}
                                            </Text>
                                        </View>
                                    </View>
                                );
                            })}
                        </View>
                    </Animated.View>

                    {/* Instructions*/}

                    <Animated.View
                        entering={FadeInDown.delay(300)
                            .duration(700)
                            .springify()
                            .damping(12)}
                        className=" space-y-4"
                    >
                        <Text
                            style={{ fontSize: hp(2.5) }}
                            className="font-bold text-neutral-700 flex-1"
                        >
                            Instructions
                        </Text>
                        <Text
                            style={{ fontSize: hp(1.7) }}
                            className=" text-neutral-700"
                        >
                            {meal.strInstructions}
                        </Text>
                    </Animated.View>
                    {/* Recipie video*/}

                    {meal.strYoutube && (
                        <Animated.View
                            entering={FadeInDown.delay(400)
                                .duration(700)
                                .springify()
                                .damping(12)}
                            className=" space-y-4"
                        >
                            <Text
                                style={{ fontSize: hp(2.5) }}
                                className="font-bold text-neutral-700 flex-1"
                            >
                                Recipe Video
                            </Text>

                            <View>
                                <YoutubePlayer
                                    height={hp(30)}
                                    videoId={getYoutubeVideoId(meal.strYoutube)}
                                />
                            </View>
                        </Animated.View>
                    )}
                </View>
            )}
        </ScrollView>
    );
}
