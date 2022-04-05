import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {Actionsheet, Box, ChevronRightIcon, Flex, HStack, Pressable, ScrollView, Text} from 'native-base';
import {set} from '../../../redux/reducers/fontSlice';

const FONTS = {
    null: 'Default',
    raleway: "Raleway",
    oswald: "Oswald",
    chakraPetch: "ChakraPetch",
    inconsolata: "Inconsolata",
    kaiseiOpti: "KaiseiOpti",
    mali: "Mali",
    notoSansJP: "NotoSansJP",
    nunitoSans: "NunitoSans",
    zenOldMincho: "ZenOldMincho",
    concertOne: "ConcertOne",
    lobster: "Lobster",
    patrickHand: "PatrickHand",
};

const mapStateToProps = state => ({
    font: state.font.value
});

const mapDispatchToProps = () => ({
    set
});

class FontSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actionsheet: false,
        };
    }

    async onPress(font) {
        this.setState({actionsheet: false});
        await this.props.set(font);
        await AsyncStorage.setItem('@font', font);
    }

    background(font) {
        return this.props.font === font ? '#0d9488' : '#ffffff';
    }

    render() {
        const { t } = this.props;

        return (
            <Box width="100%">
                <Pressable onPress={() => this.setState({actionsheet: true})}>
                    <HStack paddingTop="3%">
                        <Text width="50%" fontSize="19" fontWeight={700} paddingLeft="14%"> {t('setting.font')}</Text>
                        <Flex width="50%" flexDirection="row" justify="flex-end" paddingRight="10%">
                            <Text fontSize="19">{FONTS[this.props.font]}</Text>
                            <ChevronRightIcon size="8"/>
                        </Flex>
                    </HStack>
                </Pressable>
                <Actionsheet isOpen={this.state.actionsheet} onClose={() => this.setState({actionsheet: false})}>
                    <Actionsheet.Content>
                        <ScrollView w="100%">
                            {Object.keys(FONTS).map((key, i) => {
                                return (
                                    <Actionsheet.Item onPress={() => {
                                        this.onPress(key)
                                    }} key={i} backgroundColor={this.background(key)}>{FONTS[key]}</Actionsheet.Item>
                                );
                            })}
                        </ScrollView>
                    </Actionsheet.Content>
                </Actionsheet>
            </Box>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withTranslation()(FontSelection));
