import React from 'react';
import {Box,Flex, HStack, Pressable, Switch, Text} from 'native-base';


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
                        <Text width="60%" fontSize="19" fontWeight="bold"paddingLeft="14%"> Notifications</Text>
                        <Flex width="30%" direction="row" justify="flex-end">
                            <Switch/>
                        </Flex>
                    </HStack>
                </Pressable>
            </Box>
        );
    }
}
export default NotificationsSelection;
