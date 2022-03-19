import React from 'react';
import {Box} from 'native-base';

class CalendarBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box h="100%" w="14.28%" borderWidth="1" {...this.props.attributes} _text={{textAlign:"right", top:"2", right:"1"}}>{this.props.text}</Box>
        );
    }
}

export default CalendarBox;
