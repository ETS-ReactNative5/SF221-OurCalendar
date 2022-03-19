import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../scenes/home';
import Calendar from '../scenes/calendar';

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Drawer = createDrawerNavigator();

        return (
            <NavigationContainer>
                <Drawer.Navigator initialRouteName="Home" screenOptions={{
                    headerShown: false,
                    drawerPosition: "right",
                    drawerStyle: {
                        marginLeft: "30%"
                    }
                }}>
                    <Drawer.Screen name="Home" component={Home} />
                    <Drawer.Screen name="Calendar" component={Calendar} />
                </Drawer.Navigator>
            </NavigationContainer>
        );
    }
}

export default AppNavigator;
