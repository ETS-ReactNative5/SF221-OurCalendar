import React from 'react';
import {Box,Flex, HStack, Pressable, Switch, Text} from 'native-base';
import i18n from '../../../utils/i18n';


class NotificationsSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }

    render() {
        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight="bold" paddingLeft="14%"> {i18n.t('setting.notifications')}</Text>
                        <Flex width="30%" flexDirection="row" justify="flex-end">
                            <Switch/>
                        </Flex>
                    </HStack>
                </Pressable>
            </Box>
        );
    }
}
export default NotificationsSelection;
