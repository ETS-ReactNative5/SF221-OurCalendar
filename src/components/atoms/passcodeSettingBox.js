import React from 'react';
import {FormControl, Input} from 'native-base';




class PasscodeSettingBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl>
                <FormControl.Label>{this.props.title}</FormControl.Label>
                <Input  keyboardType="numeric"/>
            </FormControl>
        );
    }
}

export default PasscodeSettingBox;
