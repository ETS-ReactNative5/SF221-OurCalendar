import React from 'react';
import AppTemplate from '../components/templates/app';
import {connect} from "react-redux";
import CalendarTableTeam from "../components/organisms/calendar/calendarTableTeam";

const mapStateToProps = state => ({
    calendar: {
        teamMonth: state.calendar.teamMonth,
        teamYear: state.calendar.teamYear,
    }
});

class CalendarTeam extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppTemplate {...this.props} monthChangeable={true} route="CalendarTeam">
                <CalendarTableTeam key={this.props.calendar.teamMonth} month={this.props.calendar.teamMonth} year={this.props.calendar.teamYear} />
            </AppTemplate>
        );
    }
}

export default connect(mapStateToProps)(CalendarTeam);
