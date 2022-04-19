import React from 'react';
import {FormControl, Input, Text} from 'native-base';


class PasscodeSettingBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FormControl>
                <FormControl.Label><Text>{this.props.title}</Text></FormControl.Label>
                <Input  keyboardType="numeric"/>
            </FormControl>
        );
    }
}

export default PasscodeSettingBox;
