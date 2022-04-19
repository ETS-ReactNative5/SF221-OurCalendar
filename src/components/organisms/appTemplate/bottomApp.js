import React from 'react';
import {HStack, Icon, IconButton} from 'native-base';

import Icons from '../../../utils/icons';
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
                <IconButton icon={<Icon as={Icons.FontAwesome5} name="user-alt" size="md" color="black" onPress={() => navigation.navigate('Calendar')} />} />
                <EventModalButton navigation={navigation}/>
                <TeamModalButton navigation={navigation}/>
            </HStack>
        );
    }
}

export default HeaderApp;
