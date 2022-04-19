import React from 'react';
import {Box, Text} from 'native-base';

class EventBoxCalendar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Box zIndex={1} bottom="67.5%" marginTop="2%" borderLeftWidth="1" borderRightWidth="1" bgColor={this.props.eventColor} {...this.props.event_attr}><Text fontSize="2xs" lineHeight="xs" color={this.props.colorContrast} isTruncated>{this.props.text}</Text></Box>
        );
    }
}

export default EventBoxCalendar;
