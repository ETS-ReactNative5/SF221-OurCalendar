import React from 'react';
import bcrypt from 'bcrypt-react-native';
import { connect } from 'react-redux';
import {StyleSheet} from "react-native";
import {Box, Center, Text, View} from 'native-base';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthTemplate from "../components/templates/auth";
import PasscodeHead from "../components/molecules/auth/passcodeHead";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import {setPasscode} from "../redux/reducers/authSlice";

const mapDispatchToProps = () => ({
    setPasscode
});

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.pinInput = React.createRef();
        this.state = {
            code: ''
        }
    }

    async checkCode(code){
        const passcodeHash = await AsyncStorage.getItem('passcodeHash');

        if (await bcrypt.compareSync(code, passcodeHash)) {
            this.props.setPasscode(true);
            this.props.navigation.navigate('Home');
        } else {
            this.pinInput.current.shake();
            this.setState({code: ''});
        }
    }

    render() {
        return (
            <AuthTemplate {...this.props}>
                <Box style={styles.boxCenter}>
                    <PasscodeHead/>
                    <Text style={styles.boxEnterPasscode}>Enter your passcode</Text>
                    <View mt="4">
                        <Center>
                            <SmoothPinCodeInput
                                onFulfill={(code) => this.checkCode(code)}
                                password
                                mask="﹡"
                                ref={this.pinInput}
                                codeLength={6}
                                value={this.state.code}
                                keyboardType="numeric"
                                onTextChange={(code) => this.setState({code: code})}
                                cellStyle={styles.cellStyle}
                            />
                        </Center>
                    </View>
                    <Text style={styles.boxForgetPass}>Forget Passcode?</Text>
                </Box>
            </AuthTemplate>
        );
    }
}

const styles = StyleSheet.create({
    boxCenter: {
        top: "25%",
    },
    boxEnterPasscode: {
        color: "#ffffff",
        marginLeft: 32,
        fontSize: 15,
        marginTop: 16
    },
    boxForgetPass: {
        color: "#ffffff",
        marginLeft: "61%",
        fontSize: 15,
        marginTop: 10,
    },
    cellStyle: {
        backgroundColor:"#ffffff",
        width:52,
        height:52,
        borderRadius:10,
    }
});

export default connect(null, mapDispatchToProps())(Auth);
