import React from 'react';
import AppTemplate from '../components/templates/app';
import EventBoxHome from "../components/molecules/home/eventBoxHome";
import {Stack, View} from "native-base";
import EditEvent from "../components/organisms/eventModal/editEvent";
import eventStorage from "../utils/eventStorage";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventBoxModal: false,
            addEvent: false,
            event:1,
            content: []
        }
    }

    componentDidMount() {
        this.retrieveData();
    }

    openModal(eventId) {
        this.setState({addEvent: true});
        this.setState({event:eventId});
    }

    closeModal() {
        this.setState({addEvent: false});
    }

    dateToString(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        return start.getHours() + ":" + start.getMinutes() + " - " + end.getHours() + ":" + end.getMinutes();
    }

    async retrieveData() {
        const event = await eventStorage.getItem('events');
        const eventArray = Object.keys(event);

        let content = [];
        eventArray.map((item, i) => {
            let repeatCheck;

            if (new Date(event[item].end) > new Date()) {
                if (event[item].repeat === "None") {
                    repeatCheck = true;
                }else if (event[item].repeat === "Daily") {
                    repeatCheck = true;
                } else if (event[item].repeat === "Weekly" && new Date().getDay() === new Date(event[item].start).getDay()) {
                    repeatCheck = true;
                } else if (event[item].repeat === "Monthly" && new Date().getDate() === new Date(event[item].start).getDate() && new Date().getMonth() >= new Date(event[item].start).getMonth()) {
                    repeatCheck = true;
                } else if (event[item].repeat === "Annually" && new Date().getDate() === new Date(event[item].start).getDate() && new Date().getMonth() === new Date(event[item].start).getMonth() && new Date().getFullYear() >= new Date(event[item].start).getFullYear()) {
                    repeatCheck = true;
                }
            }

            if (repeatCheck) {
                content.push(
                    <EventBoxHome key={i}
                                  name={event[item].title}
                                  time={this.dateToString(event[item].start, event[item].end)}
                                  icon="dumbbell" color="#ffffff"
                                  openModal={() => this.openModal(event[item].id)}/>
                );
            }
        });
        this.setState({content: content});
    };

    render() {
        return (
            <>
                <AppTemplate {...this.props}>
                    <View width="100%" marginTop="7%" marginBottom="7%">
                        <Stack space="3">
                            {this.state.content}
                        </Stack>
                        <EditEvent isOpen={this.state.addEvent} event={this.state.event} onClose={() => this.closeModal()}/>
                    </View>
                </AppTemplate>
            </>
        );
    }
}

export default Home;
