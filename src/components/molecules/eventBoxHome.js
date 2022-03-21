import React from 'react';
import {Box, Checkbox, HStack, Icon, Image, Stack, Text} from 'native-base';
import {StyleSheet} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";




class EventBoxHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box style={styles.boxEvent} backgroundColor={this.props.color}>
                <HStack justifyContent="flex-end"  paddingTop="4%" paddingRight="10%">
                    <Text fontSize="13">{this.props.name}</Text>
                </HStack>
                <HStack justifyContent="flex-end"  paddingRight="10%">
                    <Text fontSize="13">{this.props.time}</Text>
                </HStack>
                <HStack justifyContent="flex-start">
                    <Icon as={MaterialCommunityIcons} name={this.props.icon} marginTop="-8" marginLeft="13%"/>
                </HStack>
                <HStack justifyContent="flex-start"  paddingLeft="2" marginTop="-45">
                    {this.props.checkbox == 'true'&& <Checkbox accessibilityLabel="Checkbox"/> }
                </HStack>
            </Box>
        );
    }
}

const styles = StyleSheet.create({
    boxEvent: {
        width:"80%",
        height: 70,
        borderRadius: 12,
        alignSelf:"center",
    },

});
export default EventBoxHome ;
