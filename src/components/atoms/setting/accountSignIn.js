import React from 'react';
import {Linking} from 'react-native';
import base64 from 'react-native-base64';
import {API_URL} from '@env';
import {getUniqueId} from 'react-native-device-info';
import {Box, HStack, Image, Pressable, Text} from 'native-base';
import GoogleSignIn from '../../../assets/images/googleSignIn.png';
import {withTranslation} from "react-i18next";
import authCallback from "../../../utils/authCallback";
import {setGoogleAuth, setUserInfo} from "../../../redux/reducers/authSlice";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    auth: {
        googleAuth: state.auth.googleAuth,
        userInfo: state.auth.userInfo
    }
});

const mapDispatchToProps = () => ({
    setGoogleAuth,
    setUserInfo
});

class AccountSignIn extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Linking.addEventListener('url', (url) => authCallback(url, this.props));
    }

    async login() {
        await Linking.openURL(API_URL + '/auth/google?device=' + base64.encode(getUniqueId()));
    }

    render() {
        const { t } = this.props;

        return (
            <Pressable onPress={() => this.login()} alignSelf="center">
                {({
                      isHovered,
                      isPressed
                  }) => {
                    return <Box w="240"
                                bg={isPressed ? "" : isHovered ? "#D0AB87" : "white" }
                                h="10" rounded="8" style={{
                        transform: [{
                            scale: isPressed ? 0.96 : 1
                        }]
                    }}>
                        <HStack alignSelf="center" alignContent="center" >
                            <Image source={GoogleSignIn} alt="googleSignIn" size="8" marginTop="1"/>
                            <Text mt="2" fontSize={14} >
                                {t('setting.sign_in_with_google')}
                            </Text>
                        </HStack>
                    </Box>;
                }}
            </Pressable>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps())(withTranslation()(AccountSignIn));
