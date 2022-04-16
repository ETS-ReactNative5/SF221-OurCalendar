import React from 'react';
import {Box, Checkbox, Flex, HStack, Icon, Pressable, Text} from 'native-base';
import {StyleSheet} from "react-native";
import icons from "../../../utils/icons";

class EventBoxHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Pressable onPress={this.props.openModal}>
                <Box style={styles.boxEvent} backgroundColor={this.props.color} px="5" py="3" maxHeight="100%">
                    <HStack width="100%">
                        <Box w="25%">
                            <HStack space="2">
                                {this.props.checkbox && <Checkbox accessibilityLabel="Checkbox"/>}
                                <Icon as={icons[this.props.iconFamily]} name={this.props.iconName} color={this.props.colorContrast}/>
                            </HStack>
                        </Box>
                        <Flex width="75%" paddingLeft="2">
                            <Text fontSize="13" color={this.props.colorContrast} textAlign="right">{this.props.name}</Text>
                            <Text fontSize="13" color={this.props.colorContrast} textAlign="right">{this.props.time}</Text>
                        </Flex>
                    </HStack>
                </Box>
            </Pressable>
        );
    }
}

const styles = StyleSheet.create({
    boxEvent: {
        width:"80%",
        borderRadius: 12,
        alignSelf:"center",
    },
});

export default EventBoxHome;
