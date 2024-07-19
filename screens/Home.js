import {
    Text,
    View,
    Image,
    TextInput,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
// import { ScrollView } from 'react-native-virtualized-view';
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import Category from '../components/Category';
import axios from 'axios';
import Recipes from '../components/Recipes';

const Home = () => {
    const [category, setCategory] = useState([]);
    const [meals, setMeals] = useState([]);
    const [activeCategory, setActiveCategory] = useState('Beef');

    const [search, setSearch] = useState('');

    const handleSearch = () => {
        if (search != '') {
            searchRecipe(search);
            setActiveCategory('');
            setMeals([]);
        }
    };

    const searchRecipe = async (text) => {
        try {
            const response = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
            );

            if (response) {
                setMeals(response.data.meals);
                // console.log(response.data.meals);
                console.log(search);
            }
        } catch (error) {
            console.log('Error in fetching recipes', error);
        }
    };

    const handleChangeCategory = (cat) => {
        setActiveCategory(cat);
        fetchRecipes(cat);

        setMeals([]);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get(
                'https://themealdb.com/api/json/v1/1/categories.php'
            );

            if (response) {
                setCategory(response.data.categories);
            }
        } catch (error) {
            console.log('Error in fetching categories', error);
        }
    };

    const fetchRecipes = async (category = 'Beef') => {
        try {
            const response = await axios.get(
                `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
            );

            if (response) {
                setMeals(response.data.meals);
            }
        } catch (error) {
            console.log('Error in fetching recipes', error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchRecipes();
    }, []);

    return (
        <View className="flex-1 bg-white">
            <StatusBar barStyle="light-content" />
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                className=" space-y-6 pt-6"
            >
                {/* avatar and bell icon */}
                <View className=" mx-4 flex-row justify-between items-center mb-2 mt-12">
                    <Image
                        source={require('../assets/man.png')}
                        style={{ width: hp(5), height: hp(5.5) }}
                    />

                    <BellIcon size={hp(4)} color="grey" />
                </View>
                {/* Greeting */}
                <View className=" mx-4  mb-2 space-y-2">
                    <Text
                        style={{ fontSize: hp(1.7) }}
                        className="text-neutral-600"
                    >
                        Hello Shahan !
                    </Text>

                    <View>
                        <Text
                            style={{ fontSize: hp(3.7) }}
                            className="text-neutral-600 font-semibold"
                        >
                            Make something
                            <Text className=" text-amber-500"> flavourful</Text>
                        </Text>
                    </View>
                </View>

                {/* SearchBar*/}

                <View className=" mx-4 flex-row items-center rounded-full bg-black/5  p-[6px]">
                    <TextInput
                        placeholder="Search new flavours"
                        placeholderTextColor={'grey'}
                        style={{ fontSize: hp(1.7) }}
                        className="flex-1 text-base mb1 pl-3 tracking-wider"
                        value={search}
                        onChangeText={(value) => {
                            setSearch(value);
                        }}
                    />

                    <View className="bg-white rounded-full p-3">
                        <MagnifyingGlassIcon
                            size={hp(2.5)}
                            strokeWidth={3}
                            color="grey"
                            onPress={() => {
                                handleSearch();
                            }}
                        />
                    </View>
                </View>

                {/* Categories */}
                <View>
                    {category.length > 0 && (
                        <Category
                            categories={category}
                            activeCategory={activeCategory}
                            handleChangeCategory={handleChangeCategory}
                        />
                    )}
                </View>

                {/* Recipies */}
                <View>
                    <Recipes meals={meals} categories={category} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
