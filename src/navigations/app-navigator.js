import React from 'react';
import { connect } from 'react-redux';
import {extendTheme, NativeBaseProvider} from 'native-base';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import loadState from '../utils/loadState';
import Fonts from '../utils/fonts';
import {set} from '../redux/reducers/fontSlice';
import {setGoogleAuth, setUserInfo, setPasscode} from '../redux/reducers/authSlice';
import {setTeam, setTeamInfo} from '../redux/reducers/teamSlice';

import Home from '../scenes/home';
import Calendar from '../scenes/calendar';
import CalendarTeam from '../scenes/calendarTeam';
import Setting from '../scenes/setting';
import ContactUs from '../scenes/contactUs';
import SideNavigatorApp from '../components/organisms/appNavigator/sideNavApp';
import Auth from '../scenes/auth';

const mapStateToProps = state => ({
    font: state.font.value,
});

const mapDispatchToProps = () => ({
    set,
    setGoogleAuth,
    setUserInfo,
    setPasscode,
    setTeam,
    setTeamInfo
});

class AppNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.navigationRef = React.createRef();
    }

    componentDidMount() {
        loadState(this.props);
        this.loadPasscode();
    }

    async loadPasscode() {
        const passcodeHash = await AsyncStorage.getItem('passcodeHash');

        if (passcodeHash) {
            this.props.setPasscode(true);
            this.navigationRef.current.navigate('Auth');
        }
    }

    theme() {
        const font = this.props.font === 'null' ? null : this.props.font;

        return extendTheme({
            fontConfig: Fonts.fontConfig,
            fonts: Fonts.fonts,
            components: {
                Text: {
                    baseStyle: {
                        fontFamily: font,
                    },
                },
                Input: {
                    baseStyle: {
                        fontFamily: font,
                    },
                },
            },
        });
    }

    render() {
        const Drawer = createDrawerNavigator();

        return (
            <NativeBaseProvider theme={this.theme()}>
                <NavigationContainer ref={this.navigationRef}>
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

                        <Drawer.Screen name="Auth" component={Auth} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(AppNavigator);
