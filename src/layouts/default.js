import React from 'react';
import { Dimensions } from 'react-native';
import {NativeBaseProvider, HStack, View} from 'native-base';

const window = Dimensions.get("window");

class DefaultTemplate extends React.Component {
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

        return (
            <NativeBaseProvider>
                <View>
                    <HStack bg="#f57f6f" w="100%" h="60">
                        <></>
                    </HStack>
                    <HStack bg="#f4be82" w="100%" h="70">
                        <></>
                    </HStack>
                    <HStack bg="#eedec4" w="100%" minH={height - 220}>
                        {this.props.children}
                    </HStack>
                    <HStack bg="#9d9fd2" w="100%" h="60">
                        <></>
                    </HStack>
                </View>
            </NativeBaseProvider>
        );
    }
}
export default DefaultTemplate;
