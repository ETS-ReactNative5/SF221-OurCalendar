import React from 'react';
import {Text,Center,Divider} from "native-base";
import {DrawerContentScrollView} from '@react-navigation/drawer';
import NavAppBox from "../../molecules/appNavigator/navAppBox";

class SideNavigatorApp extends React.Component {
    constructor(props) {
        super(props);
    }

    backgroundColor(index) {
        return this.props.state.index === index ? '#D0AB87' : '#f2efe7';
    }

    borderColor(index) {
        return this.props.state.index === index ? '#855f3b' : '#000000';
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <DrawerContentScrollView {...this.props} safeArea style={{backgroundColor:"#f2efe7"}}>
                    <Center>
                        <Text alignSelf={"flex-start"} paddingLeft="5" fontSize="3xl" bold="2" paddingTop="2" >Our Calendar</Text>
                        <Divider my="0.9%" />
                        <NavAppBox iconFont="AntDesign" colorText="#000000" icon="home" background={this.backgroundColor(0)} border={this.borderColor(0)} colorIcon="#000000" text="Home" onPress={() => navigation.navigate('Home')}/>
                        <NavAppBox iconFont="AntDesign" colorText="#000000" icon="calendar" background={this.backgroundColor(1)} border={this.borderColor(1)} colorIcon="#000000" text="My Calendar" onPress={() => navigation.navigate('Calendar')}/>
                        <NavAppBox iconFont="MaterialCommunityIcons" colorText="#000000" icon="calendar-multiple" background={this.backgroundColor(2)} border={this.borderColor(2)} colorIcon="#000000" text="Calendar Team" onPress={() => navigation.navigate('CalendarTeam')}/>
                        <NavAppBox iconFont="AntDesign" colorText="#000000" icon="setting" background={this.backgroundColor(3)} border={this.borderColor(3)} colorIcon="#000000" text="Settings" onPress={() => navigation.navigate('Setting')}/>
                        <NavAppBox iconFont="MaterialIcons" colorText="#000000" icon="alternate-email" background={this.backgroundColor(4)} border={this.borderColor(4)} colorIcon="#000000" text="Contact Us" onPress={() => navigation.navigate('ContactUs')}/>
                    </Center>
            </DrawerContentScrollView>
        );
    }
}
export default SideNavigatorApp;
