import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from '../scenes/auth';

class AuthNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Stack = createNativeStackNavigator();

        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
                    <Stack.Screen name="Home" component={Auth} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default AuthNavigator;
