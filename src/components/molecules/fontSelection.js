import React from 'react';
import {Actionsheet, Box, ChevronRightIcon, Flex, HStack, Pressable, Text} from 'native-base';
import i18n from '../../utils/i18n';

const FONTS = {
    Cordia: 'Cordia',
    Tahoma: 'Tahoma',
    Arial: 'Arial'
};

class FontSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }

    onPress(font) {
        this.props.font = FONTS[font];
        this.setState({actionsheet: false});
    }

    background(font) {
        return this.props.font === FONTS[font] ? '#0d9488' : '#ffffff';
    }

    render() {
        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight="bold" paddingLeft="14%"> {i18n.t('setting.font')}</Text>
                        <Flex width="30%" direction="row" justify="flex-end">
                            <Text fontSize="19">{this.props.font}</Text>
                            <ChevronRightIcon size="8"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Actionsheet isOpen={this.state.actionsheet} onClose={() => this.setState({actionsheet: false})}>
                    <Actionsheet.Content>
                        {Object.keys(FONTS).map((key, i) => {
                            return (
                                <Actionsheet.Item onPress={() => this.onPress(key)} key={i} backgroundColor={this.background(key)}>{FONTS[key]}</Actionsheet.Item>
                            );
                        })}
                    </Actionsheet.Content>
                </Actionsheet>
            </Box>
        );
    }
}
export default FontSelection;
