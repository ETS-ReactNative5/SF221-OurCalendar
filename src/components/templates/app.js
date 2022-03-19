import React from 'react';
import {Dimensions} from 'react-native';
import {NativeBaseProvider, HStack, ScrollView, Center, Icon, Text, Box} from 'native-base';
import Header from '../organisms/headerApp';
import Bottom from '../organisms/bottomApp';

import WeekDay from "../organisms/weekDay";

const window = Dimensions.get("window");

class AppTemplate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            window: {
                width: window.width,
                height: window.height,
            }
        };

    }

    render() {
        const { window: { width, height } } = this.state;
        const { navigation } = this.props;

        return (
            <NativeBaseProvider>
                <ScrollView>
                    <HStack bg="#f57f6f" w="100%" h="60">
                        <Header navigation={navigation}/>
                    </HStack>
                    <HStack bg="#f4be82" w="100%" h="90">
                        <WeekDay/>
                    </HStack>
                    <HStack bg="#eedec4" w="100%" minH={height - 240}>
                        {this.props.children}
                    </HStack>
                    <HStack bg="#9d9fd2" w="100%" h="60">
                        <Bottom navigation={navigation}/>
                    </HStack>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
export default AppTemplate;
