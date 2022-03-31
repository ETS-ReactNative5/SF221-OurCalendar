import React from 'react';
import {HStack, Icon, IconButton} from 'native-base';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EventModalButton from '../../templates/eventModalButton';
import TeamModalButton from './teamModalButton';

class HeaderApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <HStack justifyContent="space-between" px="2" alignItems="center" w="100%">
                <IconButton icon={<Icon as={FontAwesome5} name="user-alt" size="md" color="black" />} />
                <EventModalButton/>
                <TeamModalButton/>
            </HStack>
        );
    }
}

export default HeaderApp;
