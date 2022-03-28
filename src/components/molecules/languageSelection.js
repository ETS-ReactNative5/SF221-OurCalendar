import React from 'react';
import {Actionsheet, Box, ChevronRightIcon, Flex, HStack, Pressable, Text} from 'native-base';

const LANGUAGES = {
    english: 'English',
    thai: 'ไทย',
    japanese: '日本語'
};

class LanguageSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }

    onPress(language) {
        this.props.language = LANGUAGES[language];
        this.setState({actionsheet: false});
    }

    background(language) {
        return this.props.language === LANGUAGES[language] ? '#0d9488' : '#ffffff';
    }

    render() {
        return (
            <Box>
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack pl="6" pr="2">
                        <Text width="70%" fontSize="24" fontWeight="bold">Language</Text>
                        <Flex width="30%" direction="row" justify="flex-end" alignItems="center">
                            <Text fontSize="24">{this.props.language}</Text>
                            <ChevronRightIcon size="md"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Actionsheet isOpen={this.state.actionsheet} onClose={() => this.setState({actionsheet: false})}>
                    <Actionsheet.Content>
                        {Object.keys(LANGUAGES).map((key, i) => {
                            return (
                                <Actionsheet.Item onPress={() => this.onPress(key)} key={i} backgroundColor={this.background(key)}>{LANGUAGES[key]}</Actionsheet.Item>
                            );
                        })}
                    </Actionsheet.Content>
                </Actionsheet>
            </Box>
        );
    }
}
export default LanguageSelection;
