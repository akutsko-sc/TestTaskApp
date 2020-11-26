import 'react-native-gesture-handler';

import React from 'react';
import {
    StatusBar,
} from 'react-native';

import {HomeScreen} from './Components/HomeScreenComponent';
import {DetailsLink} from './Components/DetailsLinkComponent';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
    const navBarOptions = {
        headerStyle: {
            backgroundColor: '#333',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content"/>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="HomeScreen" screenOptions={navBarOptions}>
                    <Stack.Screen name="HomeScreen" component={HomeScreen}
                                  options={{title: 'Home'}} />
                    <Stack.Screen name="DetailsLink" component={DetailsLink}
                                  options={{title: 'Details'}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;
