import React from 'react';
import {StyleSheet} from "react-native";
import {Box, Center, Text, View} from 'native-base';

import BoxPasscode from "../components/molecules/auth/boxPasscode";
import AuthTemplate from "../components/templates/auth";
import PasscodeHead from "../components/molecules/auth/passcodeHead";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";


class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            code: ''
        }
        this.pinInput = React.createRef();
    }
    checkCode(code){
        console.log(code)
    }
    render() {
        return (
            <AuthTemplate {...this.props}>
                <Box style={styles.boxCenter}>
                    <PasscodeHead/>
                    <Text style={styles.boxEnterPasscode}>Enter your passcode</Text>
                    <View marginTop={26}>
                    <Center>
                        <SmoothPinCodeInput
                            onFulfill={(code) => this.checkCode(code)}
                            password mask="﹡"
                            ref={this.pinInput}
                            codeLength={6}
                            value={this.state.code}
                            keyboardType="numeric"
                            onTextChange={(code) => this.setState({code: code})}
                            cellStyle={{
                                backgroundColor:"#ffffff",
                                width:52,
                                height:52,
                                borderRadius:10,
                            }}
                        />
                    </Center></View>
                    <Text style={styles.boxForgetPass}>Forget Passcode?</Text>
                </Box>
            </AuthTemplate>
        );
    }
}
const styles = StyleSheet.create({
    boxCenter:{
        top:"25%",
    },
    boxEnterPasscode:{
        color:"#ffffff",
        marginLeft:32,
        fontSize:15,

    },
    boxForgetPass:{
        color:"#ffffff",
        marginLeft:"61%",
        fontSize:15,
        marginTop:26,
    },
});
export default Auth;
