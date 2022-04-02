import React from 'react';
import { connect } from 'react-redux';
import {extendTheme, NativeBaseProvider} from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Fonts from "../utils/fonts";
import {set} from "../redux/reducers/fontSlice";

import Home from '../scenes/home';
import Calendar from '../scenes/calendar';
import CalendarTeam from '../scenes/calendarTeam';
import Setting from '../scenes/setting';
import ContactUs from '../scenes/contactUs';
import SideNavigatorApp from '../components/organisms/appNavigator/sideNavApp';

const mapStateToProps = state => ({
    font: state.font.value
});

const mapDispatchToProps = () => ({
    set
});

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        (async () => {
            const fontValue = await AsyncStorage.getItem('@font');
            if (fontValue === null) {
                await AsyncStorage.setItem('@font', 'null');
            }
            let locale = fontValue === null ? 'null' : fontValue;
            await this.props.set(locale);
        })();
    }

    theme() {
        return extendTheme({
            fontConfig: Fonts.fontConfig,
            fonts: Fonts.fonts,
            components: {
                Text: {
                    baseStyle: {
                        fontFamily: this.props.font,
                    },
                },
                Input: {
                    baseStyle: {
                        fontFamily: this.props.font,
                    },
                },
            },
        });
    }

    render() {
        const Drawer = createDrawerNavigator();
        return (
            <NativeBaseProvider theme={this.theme()}>
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

export default connect(mapStateToProps, mapDispatchToProps())(AppNavigator);
