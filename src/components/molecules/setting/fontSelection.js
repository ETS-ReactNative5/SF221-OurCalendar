import React from 'react';
import { withTranslation } from 'react-i18next';
import {Actionsheet, Box, ChevronRightIcon, extendTheme, Flex, HStack, Pressable, Text} from 'native-base';
import Fonts from "../../../utils/fonts";

const FONTS = {
    Cordia: 'Cordia',
    Tahoma: 'Tahoma',
    Arial: 'Arial',
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
        Fonts.components.Text.baseStyle.fontFamily = "Oswald-Regular";
    }

    background(font) {
        return this.props.font === FONTS[font] ? '#0d9488' : '#ffffff';
    }

    render() {
        const { t } = this.props;

        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="60%" fontSize="19" fontWeight={700} paddingLeft="14%"> {t('setting.font')}</Text>
                        <Flex width="30%" flexDirection="row" justify="flex-end">
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

export default withTranslation()(FontSelection);
