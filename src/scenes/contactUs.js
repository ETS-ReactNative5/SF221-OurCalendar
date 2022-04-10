import React from 'react';
import { withTranslation } from 'react-i18next';
import AppTemplate from '../components/templates/app';
import {Box, HStack, Image, Link,Text, View} from "native-base";
import Youtube from "../assets/images/youtube.png";
import Gmail from "../assets/images/gmail.png";



class ContactUs extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { t } = this.props;
        return (
            <AppTemplate  {...this.props}>
                <View w="100%" paddingTop="3%">
                    <Box paddingLeft="8%">
                        <Text w="60%"  fontSize="19" fontWeight={700}>{t('contact.our_story')}</Text>
                        <Text w="100%" paddingLeft="4%" paddingRight="5%">{"\t"}{"\t"}{"\t"}{t('contact.story.intro')}</Text>
                        <Text w="100%" paddingLeft="4%" paddingRight="5%">{"\t"}{"\t"}{"\t"}{t('contact.story.last')}</Text>
                        <Text w="60%" paddingTop="3%"  fontSize="19" fontWeight={700}>{t('contact.who')}</Text>
                        <Text w="100%" paddingLeft="4%" paddingRight="5%">{"\t"}{"\t"}{"\t"}{t('contact.we_are')}</Text>
                        <Text paddingTop="3%" fontSize="19" fontWeight={700} >{t('contact.contact')}</Text>
                    </Box>
                        <Box paddingLeft="15%">
                            <Link href="https://www.youtube.com/channel/UCYiOoVf-90ni2-c0xNgYPvw">
                            <HStack>
                                <Image source={Youtube} alt="youtube" size="12" marginTop="1"/>
                                <Text alignSelf="center" fontSize="15" paddingLeft="4%">{t('contact.sahai')}</Text>
                            </HStack>
                            </Link>
                        </Box>
                        <Box paddingLeft="15%">
                            <Link href="mailto:we.are.sahai@gmail.com">
                            <HStack>
                                <Image source={Gmail} alt="gmail" size="12" marginTop="1"/>
                                <Text alignSelf="center" fontSize="15" paddingLeft="4%" >{t('contact.email')}</Text>
                            </HStack>
                            </Link>
                        </Box>
                </View>
            </AppTemplate>
        );
    }
}

export default withTranslation()(ContactUs);
