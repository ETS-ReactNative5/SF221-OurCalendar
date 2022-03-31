import React from 'react';
import {Box} from 'native-base';

class CalendarBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let border = this.props.attributes.bgColor !== '#d4d4d4' ? 1 : 0;
        return (
            <Box h="100%" w="100%" borderWidth={border} {...this.props.attributes} _text={{textAlign:"right", top:"2", right:"1"}}>{this.props.text}</Box>
        );
    }
}

export default CalendarBox;
