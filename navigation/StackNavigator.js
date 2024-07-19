import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import WelcomeScreen from '../screens/WelcomeScreen';
import DetailScreen from '../screens/DetailScreen';

const navigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Welcome"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="DetailScreen" component={DetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default navigation;
