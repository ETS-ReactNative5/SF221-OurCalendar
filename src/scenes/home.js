import React from 'react';
import AppTemplate from '../components/templates/app';
import EventBoxHome from "../components/molecules/home/eventBoxHome";
import {Button, Stack, View} from "native-base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditEvent from "../components/organisms/eventModal/editEvent";
import eventStorage from "../utils/eventStorage";

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

    async loadEvents() {
        // await AsyncStorage.removeItem('events');
        // await AsyncStorage.removeItem('eventIds');
        // console.log('events remove');
        const event = await eventStorage.getItem('events');
        console.log('get event');
        console.log(event['8khc']['created']);
        const id = await eventStorage.getItem('eventIds');
        console.log('get id');
        console.log(id);
    }

    render() {
        return (
            <>
            <AppTemplate {...this.props}>
                <View width="100%" marginTop="7%" marginBottom="7%">
                    <Button onPress={() => this.loadEvents()}>events</Button>
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
