import React from 'react';
import {Dimensions} from 'react-native';
import {NativeBaseProvider, HStack, ScrollView, IconButton, Icon, Image} from 'native-base';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Logo from '../assets/logo.png';

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
                <ScrollView>
                    <HStack bg="#f57f6f" w="100%" h="60">
                        <HStack justifyContent="space-between" alignItems="center" w="100%">
                            <HStack pl="2">
                                <Image source={Logo} alt="Logo" size="sm" />
                            </HStack>
                            <HStack>
                                <IconButton icon={<Icon as={MaterialCommunityIcons} name="bell-badge" size="md" color="yellow.400" />} />
                                <IconButton icon={<Icon as={Octicons} name="three-bars" size="md" color="black" />} />
                            </HStack>
                        </HStack>
                    </HStack>
                    <HStack bg="#f4be82" w="100%" h="70">
                        <></>
                    </HStack>
                    <HStack bg="#eedec4" w="100%" minH={height - 220}>
                        {this.props.children}
                    </HStack>
                    <HStack bg="#9d9fd2" w="100%" h="60">
                        <HStack justifyContent="space-between" px="2" alignItems="center" w="100%">
                            <IconButton icon={<Icon as={FontAwesome5} name="user-alt" size="md" color="black" />} />
                            <IconButton icon={<Icon as={FontAwesome5} name="calendar-plus" size="md" color="black"/>} style={{paddingEnd:0}} />
                            <IconButton icon={<Icon as={FontAwesome5} name="users" color="black" style={{width: 40, height: 32}} />} style={{paddingEnd:0}}/>
                        </HStack>
                    </HStack>
                </ScrollView>
            </NativeBaseProvider>
        );
    }
}
export default DefaultTemplate;
