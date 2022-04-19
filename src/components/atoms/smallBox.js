import React from 'react';
import {Center} from 'native-base';
import {StyleSheet} from "react-native";



class SmallBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Center style={styles.boxPasscode}>
            </Center>
        );
    }
}
const styles = StyleSheet.create({
    boxPasscode:{
        backgroundColor:"#ffffff",
        width:52,
        height:52,
        borderRadius:10,
        marginTop:55,
    },
});
export default SmallBox;
