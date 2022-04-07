import React from 'react';
import AppTemplate from '../components/templates/app';
import EventBoxHome from "../components/molecules/home/eventBoxHome";
import {Stack, View} from "native-base";
import EditEvent from "../components/organisms/eventModal/editEvent";



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventBoxModal: false,
            addEvent: false,
            event:1,
        }
    }

    openModal(eventId) {
     this.setState({addEvent: true});
        this.setState({event:eventId});
    }

    closeModal() {
        this.setState({addEvent: false});
    }

    render() {
        return (
            <>
            <AppTemplate {...this.props}>
                <View width="100%" marginTop="7%" marginBottom="7%">
                    <Stack space="3">
                        <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell" color="#ffffff"checkbox="true" openModal={() => this.openModal(1)}/>
                        <EventBoxHome name="วิ่fewfwefjeofggejofง" time="7:00-8:00" icon="dumbbell" color="#ffffff"checkbox="true" openModal={() => this.openModal(2)}/>
                    </Stack>
                    <EditEvent isOpen={this.state.addEvent} event={this.state.event} onClose={() => this.closeModal()}/>
                </View>
            </AppTemplate>
            </>
        );
    }
}

export default Home;
