import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import axios from 'axios';
import { CatchedImage } from '../helper/image';

export default function Category({
    categories,
    activeCategory,
    handleChangeCategory,
}) {
    return (
        <Animated.View entering={FadeInDown.duration(1000).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className=" space-x-4"
                contentContainerStyle={{
                    paddingHorizontal: 15,
                    paddingVertical: 15,
                }}
            >
                {categories.map((cat, index) => {
                    let isActive = cat.strCategory == activeCategory;

                    let activeClass = isActive ? 'bg-amber-500' : 'bg-black/10';

                    return (
                        <TouchableOpacity
                            key={cat.strCategory}
                            onPress={() => {
                                handleChangeCategory(cat.strCategory);
                            }}
                            key={index}
                            className="flex  space-y-2 items-center"
                        >
                            <View
                                className={` rounded-full p-[6px] ${activeClass}`}
                            >
                                {/* 
                                
                                 <CatchedImage
                                    uri={cat.strCategoryThumb}
                                    style={{
                                        height: hp(6),
                                        width: hp(6),
                                        borderRadius: 40,
                                    }}
                                />
                                
                                */}
                                <Image
                                    source={{ uri: cat.strCategoryThumb }}
                                    className=" rounded-full "
                                    style={{ height: hp(6), width: hp(6) }}
                                />
                            </View>

                            <Text
                                className="text-neutral-600"
                                style={{ fontSize: hp(1.6) }}
                            >
                                {cat.strCategory}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
}
