import React from 'react';
import {Icon, IconButton} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import EventModal from '../organisms/eventModal/eventModal';
import AddEvent from '../organisms/eventModal/addEvent';
import AddTodo from '../organisms/eventModal/addTodo';

class EventModalButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventModal: false,
            addEvent: false,
            addToDo: false,
        }
    }

    openAddEvent() {
        this.closeModal();
        this.setState({addEvent: true});
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

    render() {
        const { navigation } = this.props;

        return (
            <>
                <IconButton icon={<Icon as={FontAwesome5} name="calendar-plus" size="md" color="black"/>} style={{paddingEnd:0}} onPress={() => this.setState({eventModal: true})} />
                <EventModal isOpen={this.state.eventModal} onClose={() => this.closeModal()} eventButton={() => this.openAddEvent()} todoButton={() => this.openAddToDo()} navigation={navigation}/>
                <AddEvent isOpen={this.state.addEvent} onClose={() => this.closeEvent()} navigation={navigation}/>
                <AddTodo isOpen={this.state.addToDo} onClose={() => this.closeTodo()} navigation={navigation}/>
            </>
        );
    }
}

export default EventModalButton;
