import React from 'react';
import { withTranslation } from 'react-i18next';
import {Box,Flex, HStack, Pressable, Switch, Text} from 'native-base';

class NotificationsSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }

    render() {
        const { t } = this.props;

        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight={700} paddingLeft="14%"> {t('setting.notifications')}</Text>
                        <Flex width="30%" flexDirection="row" justify="flex-end">
                            <Switch/>
                        </Flex>
                    </HStack>
                </Pressable>
            </Box>
        );
    }
}
export default withTranslation()(NotificationsSelection);
