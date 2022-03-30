import React from 'react';
import {Box,HStack,Image, Pressable, Text} from 'native-base';
import GoogleSignIn from '../../assets/images/googleSignIn.png';


class AccountSingIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }
    render() {
        return (
            <Box width="100%" paddingBottom="2">
                        <Text width="60%" fontSize="19" fontWeight="bold"paddingLeft="15%" paddingBottom="2">
                            Account
                        </Text>
                <Pressable  onPress={this.props.onPress} alignSelf="center">
                    {({
                          isHovered,
                          isPressed
                      }) => {
                        return <Box w="240"
                         bg={isPressed ? "" : isHovered ? "#D0AB87" : "white" }
                                    h="10" rounded="8" style={{
                            transform: [{
                                scale: isPressed ? 0.96 : 1
                            }]
                        }}>
                            <HStack alignSelf="center" alignContent="center" >
                                <Image source={GoogleSignIn} alt="googleSignIn" size="8" marginTop="1"/>
                                <Text mt="2" fontSize={14} fontWeight="medium">
                                    Sign in with Google
                                </Text>
                            </HStack>
                        </Box>;
                    }}
                </Pressable>



            </Box>
        );
    }
}
export default AccountSingIn;
