import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Home from '../scenes/home';
import Calendar from '../scenes/calendar';
import CalendarTeam from '../scenes/calendarTeam';
import Setting from '../scenes/setting';
import ContactUs from '../scenes/contactUs';
import SideNavigatorApp from '../components/organisms/sideNavApp';


class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const Drawer = createDrawerNavigator();

        return (
            <NativeBaseProvider>
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home" screenOptions={{
                        headerShown: false,
                        drawerPosition: "right",
                        drawerStyle: {
                            marginLeft: "30%"
                        }
                    }} drawerContent={(props) => <SideNavigatorApp {...props}/>}>
                        <Drawer.Screen name="Home" component={Home} />
                        <Drawer.Screen name="Calendar" component={Calendar} />
                        <Drawer.Screen name="CalendarTeam" component={CalendarTeam} />
                        <Drawer.Screen name="Setting" component={Setting} />
                        <Drawer.Screen name="ContactUs" component={ContactUs} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        );
    }
}

export default AppNavigator;
