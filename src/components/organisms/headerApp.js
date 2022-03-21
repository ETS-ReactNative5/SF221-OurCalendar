import React from 'react';
import {HStack, Icon, IconButton, Image} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';

import Logo from '../../assets/images/logo.png';
import NotificationModalButton from "./notificationModalButton";

class HeaderApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <HStack justifyContent="space-between" alignItems="center" w="100%">
                <HStack pl="2">
                    <Image source={Logo} alt="Logo" size="sm" />
                </HStack>
                <HStack>
                    <NotificationModalButton/>
                    <IconButton icon={<Icon as={Octicons} name="three-bars" size="md" color="black" onPress={() => navigation.openDrawer()} />} />
                </HStack>
            </HStack>
        );
    }
}

export default HeaderApp;
