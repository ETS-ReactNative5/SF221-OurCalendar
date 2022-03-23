import React from 'react';
import {Text} from 'native-base';
import {DrawerContentScrollView} from '@react-navigation/drawer';

class SideNavigatorApp extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <DrawerContentScrollView {...this.props} safeArea>
                <Text>Hello</Text>
            </DrawerContentScrollView>
        );
    }
}
export default SideNavigatorApp;
