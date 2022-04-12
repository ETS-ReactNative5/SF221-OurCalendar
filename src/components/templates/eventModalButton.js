import React from 'react';
import {Icon, IconButton} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EventModal from '../organisms/eventModal/eventModal';
import AddEvent from '../organisms/eventModal/addEvent';
import AddTodo from '../organisms/eventModal/addTodo';
import IconSelection from "../organisms/eventModal/selectIcon";

class EventModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventModal: false,
            addEvent: false,
            addToDo: false,
            iconSelection: false,
        }
    }

    openAddEvent() {
        this.closeModal();
        this.setState({addEvent: true});
    }

    openIcon() {
        this.setState({iconSelection: true});
    }

    openAddToDo() {
        this.closeModal();
        this.setState({addToDo: true});
    }

    closeModal() {
        this.setState({eventModal: false});
    }

    closeEvent() {
        this.setState({addEvent: false});
    }

    closeTodo() {
        this.setState({addToDo: false});
    }

    closeIcon(){
        this.setState({iconSelection: false});
    }

    render() {
        const { navigation } = this.props;

        return (
            <>
                <IconButton icon={<Icon as={FontAwesome5} name="calendar-plus" size="md" color="black"/>} style={{paddingEnd:0}} onPress={() => this.setState({eventModal: true})} />
                <EventModal isOpen={this.state.eventModal} onClose={() => this.closeModal()} eventButton={() => this.openAddEvent()} todoButton={() => this.openAddToDo()}/>
                <AddEvent isOpen={this.state.addEvent} onClose={() => this.closeEvent()} navigation={navigation} iconButton={() => this.openIcon()}/>
                <AddTodo isOpen={this.state.addToDo} onClose={() => this.closeTodo()} navigation={navigation}/>
                <IconSelection isOpen={this.state.iconSelection} onClose={() => this.closeIcon()} navigation={navigation}/>
            </>
        );
    }
}

export default EventModalButton;
