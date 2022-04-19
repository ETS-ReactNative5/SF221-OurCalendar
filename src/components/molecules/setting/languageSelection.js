import React from 'react';
import { withTranslation } from 'react-i18next';
import {Actionsheet, Box, ChevronRightIcon, Flex, HStack, Pressable, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGES = {
    en: 'English',
    th: 'ไทย',
    ja: '日本語'
};

class LanguageSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }

    async onPress(language) {
        this.setState({actionsheet: false});
        await this.props.i18n.changeLanguage(language);
        await AsyncStorage.setItem('@locale', language);
    }

    background(language) {
        return this.props.i18n.language === language ? '#0d9488' : '#ffffff';
    }

    render() {
        const { i18n, t } = this.props;

        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight={700} paddingLeft="14%"> {t('setting.language')}</Text>
                        <Flex width="30%" flexDirection="row" justify="flex-end">
                            <Text fontSize="19">{LANGUAGES[i18n.language]}</Text>
                            <ChevronRightIcon size="8"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Actionsheet isOpen={this.state.actionsheet} onClose={() => this.setState({actionsheet: false})}>
                    <Actionsheet.Content>
                        {Object.keys(LANGUAGES).map((key, i) => {
                            return (
                                <Actionsheet.Item onPress={() => {
                                    this.onPress(key)
                                }} key={i} backgroundColor={this.background(key)}>{LANGUAGES[key]}</Actionsheet.Item>
                            );
                        })}
                    </Actionsheet.Content>
                </Actionsheet>
            </Box>
        );
    }
}
export default withTranslation()(LanguageSelection);
