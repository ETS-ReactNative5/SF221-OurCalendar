import React from 'react';
import {Box, Checkbox, HStack, Icon, Pressable, Text} from 'native-base';
import {StyleSheet} from "react-native";
import icons from "../../../utils/icons";

class EventBoxHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Pressable onPress={this.props.openModal}>
                <Box style={styles.boxEvent} backgroundColor={this.props.color}>
                    <HStack justifyContent="flex-end" paddingTop="4%" paddingRight="10%" paddingLeft="20%">
                        <Text fontSize="13" color={this.props.colorContrast}>{this.props.name}</Text>
                    </HStack>
                    <HStack justifyContent="flex-end"  paddingRight="10%">
                        <Text fontSize="13" color={this.props.colorContrast}>{this.props.time}</Text>
                    </HStack>
                    <HStack justifyContent="flex-start">
                        <Icon as={icons[this.props.iconFamily]} name={this.props.iconName} color={this.props.colorContrast} marginTop="-8" marginLeft="13%"/>
                    </HStack>
                    <HStack justifyContent="flex-start"  paddingLeft="2" marginTop="-45">
                        {this.props.checkbox == 'true'&& <Checkbox accessibilityLabel="Checkbox"/> }
                    </HStack>
                </Box>
            </Pressable>
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
