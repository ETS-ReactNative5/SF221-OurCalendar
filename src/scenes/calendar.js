import React from 'react';
import AppTemplate from '../components/templates/app';
import CalendarTable from '../components/organisms/calendar/calendarTable';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
    }

    render() {
        return (
            <AppTemplate  {...this.props}>
                <CalendarTable month={this.month} year={this.year}/>
            </AppTemplate>
        );
    }
}

export default Calendar;
