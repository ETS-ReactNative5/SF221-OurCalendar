import React from 'react';
import { withTranslation } from 'react-i18next';
import {Text, Divider, Box, Image, HStack} from "native-base";
import {DrawerContentScrollView} from '@react-navigation/drawer';
import NavAppBox from '../../molecules/appNavigator/navAppBox';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
    auth: {
        googleAuth: state.auth.googleAuth,
        userInfo: state.auth.userInfo
    }
});

class SideNavigatorApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0
        }
    }

    backgroundColor(index) {
        return this.props.state.index === index ? '#D0AB87' : '#f2efe7';
    }

    borderColor(index) {
        return this.props.state.index === index ? '#855f3b' : '#000000';
    }

    onLayout(event) {
        this.setState({height: event.nativeEvent.layout.height});
    }

    render() {
        const { t } = this.props;
        const navigation = this.props.navigation;

        return (
            <DrawerContentScrollView {...this.props} safeArea onLayout={(e) => this.onLayout(e)} style={{backgroundColor:"#f2efe7"}}>
                <Box height={this.state.height - 67}>
                    <Text alignSelf="flex-start" paddingLeft="5" fontSize="3xl" fontWeight={700} paddingTop="2" >Our Calendar</Text>
                    <Divider my="0.9%" />
                    <NavAppBox iconFont="AntDesign" colorText="#000000" icon="home" background={this.backgroundColor(0)} border={this.borderColor(0)} colorIcon="#000000" text={t('side_nav.home')} onPress={() => navigation.navigate('Home')}/>
                    <NavAppBox iconFont="AntDesign" colorText="#000000" icon="calendar" background={this.backgroundColor(1)} border={this.borderColor(1)} colorIcon="#000000" text={t('side_nav.my_calendar')} onPress={() => navigation.navigate('Calendar')}/>
                    <NavAppBox iconFont="MaterialCommunityIcons" colorText="#000000" icon="calendar-multiple" background={this.backgroundColor(2)} border={this.borderColor(2)} colorIcon="#000000" text={t('side_nav.calendar_team')} onPress={() => navigation.navigate('CalendarTeam')}/>
                    <NavAppBox iconFont="AntDesign" colorText="#000000" icon="setting" background={this.backgroundColor(3)} border={this.borderColor(3)} colorIcon="#000000" text={t('side_nav.settings')} onPress={() => navigation.navigate('Setting')}/>
                    <NavAppBox iconFont="MaterialIcons" colorText="#000000" icon="alternate-email" background={this.backgroundColor(4)} border={this.borderColor(4)} colorIcon="#000000" text={t('side_nav.contact_us')} onPress={() => navigation.navigate('ContactUs')}/>
                </Box>
                {
                    this.props.auth.googleAuth ? (
                        <Box height="60">
                            <Divider my="0.9%" />
                            <HStack space={2} px="2">
                                <Image size="xs" borderRadius={100} source={{uri: this.props.auth.userInfo.picture}} alt="Profile" />
                                <Box>
                                    <Text>{this.props.auth.userInfo.name}</Text>
                                    <Text>{this.props.auth.userInfo.email}</Text>
                                </Box>
                            </HStack>
                        </Box>
                    ) : (<></>)
                }
            </DrawerContentScrollView>
        );
    }
}
export default connect(mapStateToProps)(withTranslation()(SideNavigatorApp));
