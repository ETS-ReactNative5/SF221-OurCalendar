import React from 'react';
import AppTemplate from '../components/templates/app';
import eventStorage from "../utils/eventStorage";
import {Button} from "native-base";

class CalendarTeam extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppTemplate {...this.props} monthChangeable={true} route="CalendarTeam">
                <Button onPress={async () => console.log(await eventStorage.getItem('teamEvents'))}>event</Button>
                <Button onPress={async () => console.log(await eventStorage.getItem('teamTodos'))}>todo</Button>
            </AppTemplate>
        );
    }
}

export default CalendarTeam;
