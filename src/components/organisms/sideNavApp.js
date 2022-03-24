import React from 'react';
import {Text,Center,Divider} from "native-base";
import {DrawerContentScrollView} from '@react-navigation/drawer';
import NavAppBox from "../molecules/navAppBox";



class SideNavigatorApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <DrawerContentScrollView {...this.props} safeArea style={{backgroundColor:"#f2efe7"}}>
                    <Center>
                        <Text alignSelf={"flex-start"} paddingLeft="5" fontSize="3xl" bold="2" paddingTop="2" >Our calendar</Text>
                        <Divider my="0.9%" />
                        <NavAppBox iconpic="AntDesign" colorText="#000000" icon="home" background="" border="#000000" colorIcon="#000000" text="Home"/>
                        <NavAppBox iconpic="AntDesign" colorText="#000000" icon="setting" background="" border="#000000" colorIcon="#000000" text="Setting"/>
                        <NavAppBox iconpic="AntDesign" colorText="#000000" icon="calendar"  background="#D0AB87" border="#855f3b" colorIcon="#000000" text="my calendar"/>
                        <NavAppBox iconpic="MaterialCommunityIcons" colorText="#000000" icon="calendar-multiple" background="" border="#000000" colorIcon="#000000" text="calendar team"/>
                        <NavAppBox iconpic="MaterialIcons" colorText="#000000" icon="alternate-email" background="" border="#000000" colorIcon="#000000" text="contact us"/>
                    </Center>
            </DrawerContentScrollView>
        );
    }
}
export default SideNavigatorApp;
