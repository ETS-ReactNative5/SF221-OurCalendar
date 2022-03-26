import React from 'react';
import {Box, HStack, Icon,Pressable, Text} from 'native-base';
import icons from "../../utils/icons";

class NavAppBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box alignItems="center">
                <Pressable paddingTop="4" onPress={this.props.onPress}>
                    {({
                          isHovered,
                          isPressed
                      }) => {
                        return <Box w="240"  bg={isPressed ? "" : isHovered ? "#D0AB87" : this.props.background }
                                    borderWidth="1" borderColor={this.props.border} h="10" rounded="8" style={{
                            transform: [{
                                scale: isPressed ? 0.96 : 1
                            }]
                        }}>
                            <HStack alignItems="center">
                                <Icon as={icons[this.props.iconFont]} name={this.props.icon} size="sm" marginLeft="2" marginTop="2" color={this.props.colorIcon}/>
                                <Text mt="2" fontSize={14} fontWeight="medium" color={this.props.colorText} alignSelf="flex-start" paddingLeft="5%">
                                    {this.props.text}
                                </Text>
                            </HStack>
                        </Box>;
                    }}
                </Pressable>
            </Box>
        );
    }
}

export default NavAppBox;
