import React from 'react';
import {HStack, Icon, Text} from 'native-base';
import icons from "../../../utils/icons";




class NotificationEvent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <HStack paddingTop="1" width="80%">
                <Icon as={icons.MaterialCommunityIcons} name={this.props.icon}/>
                <Text paddingTop="2" paddingLeft="3">{this.props.text}</Text>
            </HStack>
        );
    }
}

export default NotificationEvent ;
