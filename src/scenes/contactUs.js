import React from 'react';
import AppTemplate from '../components/templates/app';
import {Box, HStack, Image, Link,Text, View} from "native-base";
import Youtube from "../assets/images/youtube.png";
import Gmail from "../assets/images/gmail.png";



class ContactUs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppTemplate  {...this.props}>
                <View w="100%" paddingTop="3%">
                    <Box paddingLeft="8%">
                        <Text w="60%"  fontSize="19" fontWeight={700}>Our Story</Text>
                        <Text w="100%" paddingLeft="4%" paddingRight="5%">{"\t"}{"\t"}{"\t"}Many months ago after the university has the policy to provide teaching and learning online, It gave all 10 of us a chance to get to know each other. Therefore there has been a group together to develop this application.</Text>
                        <Text w="100%" paddingLeft="4%" paddingRight="5%">{"\t"}{"\t"}{"\t"}We spend a lot of time thinking about and developing this application. We believe this application will be your good assistant and will reach the hearts of users.</Text>
                        <Text w="60%" paddingTop="3%"  fontSize="19" fontWeight={700}>Who we are</Text>
                        <Text w="100%" paddingLeft="4%" paddingRight="5%">{"\t"}{"\t"}{"\t"}We are undergraduate sophomore faculty of engineering at Thammasat University.</Text>
                        <Text paddingTop="3%" fontSize="19" fontWeight={700} >Contact Us</Text>
                    </Box>
                        <Box paddingLeft="15%">
                            <Link href="https://www.youtube.com/channel/UCYiOoVf-90ni2-c0xNgYPvw">
                            <HStack>
                                <Image source={Youtube} alt="youtube" size="12" marginTop="1"/>
                                <Text alignSelf="center" fontSize="15" paddingLeft="4%">: SaHai</Text>
                            </HStack>
                            </Link>
                        </Box>
                        <Box paddingLeft="15%">
                            <Link href="mailto:we.are.sahai@gmail.com">
                            <HStack>
                                <Image source={Gmail} alt="gmail" size="12" marginTop="1"/>
                                <Text alignSelf="center" fontSize="15" paddingLeft="4%" >: we.are.sahai@gmail.com</Text>
                            </HStack>
                            </Link>
                        </Box>
                </View>
            </AppTemplate>
        );
    }
}

export default ContactUs;
