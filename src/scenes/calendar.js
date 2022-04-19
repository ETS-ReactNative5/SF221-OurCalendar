import React from 'react';
import AppTemplate from '../components/templates/app';
import CalendarTable from '../components/organisms/calendar/calendarTable';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    calendar: {
        month: state.calendar.month,
        year: state.calendar.year,
    }
});

class Calendar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <AppTemplate {...this.props} monthChangeable={true} route="Calendar">
                <CalendarTable key={this.props.calendar.month} month={this.props.calendar.month} year={this.props.calendar.year}/>
            </AppTemplate>
        );
    }
}

export default connect(mapStateToProps)(Calendar);
