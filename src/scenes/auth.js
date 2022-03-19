import React from 'react';
import {StyleSheet} from "react-native";
import {Box,Text} from 'native-base';

import BoxPasscode from "../components/molecules/boxPasscode";
import AuthTemplate from "../components/templates/auth";
import PasscodeHead from "../components/molecules/passcodeHead";


class Auth extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AuthTemplate {...this.props}>
                <Box style={styles.boxCenter}>
                    <PasscodeHead/>
                    <Text style={styles.boxEnterPasscode}>Enter your passcode</Text>
                    <BoxPasscode/>
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
        marginTop:52,
    },
});
export default Auth;
