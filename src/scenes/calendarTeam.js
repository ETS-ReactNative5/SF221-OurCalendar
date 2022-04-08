import React from 'react';
import AppTemplate from '../components/templates/app';

class CalendarTeam extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppTemplate {...this.props} monthChangeable={true}>

            </AppTemplate>
        );
    }
}

export default CalendarTeam;
