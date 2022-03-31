import React from 'react';
import {Actionsheet, Box, ChevronRightIcon, Flex, HStack, Pressable, Text} from 'native-base';
import i18n from '../../../utils/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

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
        i18n.locale = language;
        await AsyncStorage.setItem('@locale', language);
        RNRestart.Restart();
    }

    background(language) {
        return i18n.locale === language ? '#0d9488' : '#ffffff';
    }

    render() {
        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight="bold" paddingLeft="14%"> {i18n.t('setting.language')}</Text>
                        <Flex width="30%" direction="row" justify="flex-end">
                            <Text fontSize="19">{LANGUAGES[i18n.locale]}</Text>
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
export default LanguageSelection;
