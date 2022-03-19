import React from 'react';
import {NativeBaseProvider, View} from 'native-base';

class AuthTemplate extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NativeBaseProvider>
                <View style={{backgroundColor:"#f57f6f", height:"100%", width:"100%"}}>
                    {this.props.children}
                </View>
            </NativeBaseProvider>
        );
    }
}

export default AuthTemplate;
