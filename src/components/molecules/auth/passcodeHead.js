import React from 'react';
import {Box, Image, Text} from 'native-base';
import {StyleSheet} from "react-native";
import Logo from "../../../assets/images/logo.png";


class PasscodeHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box style={styles.boxLogo}>
                <Image style={styles.logo} source={Logo} alt="Logo"/>
                <Text fontSize="3xl" marginX="-15%" marginTop="-4">Our Calendar</Text>
            </Box>
        );
    }
}
const styles = StyleSheet.create({
    boxLogo:{
        marginLeft:"36%",
        top:0,
    },
    logo:{
        width:100,
        height:100,
        marginLeft:5,
    },

});
export default PasscodeHead ;
