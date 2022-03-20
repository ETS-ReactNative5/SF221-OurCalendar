import React from 'react';
import {NativeBaseProvider, HStack, ScrollView} from 'native-base';
import Header from '../organisms/headerApp';
import Bottom from '../organisms/bottomApp';

import WeekDay from "../organisms/weekDay";

class AppTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { navigation } = this.props;

        return (
            <NativeBaseProvider>
                <ScrollView contentContainerStyle={{flexGrow: 1}}>
                    <HStack bg="#f57f6f" w="100%" h="8%">
                        <Header navigation={navigation}/>
                    </HStack>
                    <HStack bg="#f4be82" w="100%" h="12%">
                        <WeekDay/>
                    </HStack>
                    <HStack bg="#eedec4" w="100%" minH="72%">
                        {this.props.children}
                    </HStack>
                    <HStack bg="#9d9fd2" w="100%" h="8%">
                        <Bottom navigation={navigation}/>
                    </HStack>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
export default AppTemplate;
