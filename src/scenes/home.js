import React from 'react';
import AppTemplate from '../components/templates/app';
import EventBoxHome from "../components/molecules/home/eventBoxHome";
import {Stack, Text, View} from "native-base";
import EditEvent from "../components/organisms/eventModal/editEvent";
import eventStorage from "../utils/eventStorage";
import moment from 'moment';
import fontColorContrast from "font-color-contrast";
import EditTodo from "../components/organisms/eventModal/editTodo";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editEvent: false,
            editTodo: false,
            event: {},
            todo: {},
            eventContent: [],
            todoContent: [],
            googleEventContent: [],
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => this.retrieveData());
    }

    componentWillUnmount() {
        this._unsubscribe.remove();
    }

    async openEventModal(eventId) {
        const event = await eventStorage.getItem('events');

        await this.setState({event: event[eventId]});
        this.setState({editEvent: true});
    }

    closeEventModal() {
        this.setState({editEvent: false});
        this.setState({event: {}});
    }

    async openTodoModal(todoId) {
        const todo = await eventStorage.getItem('todos');

        await this.setState({todo: todo[todoId]});
        this.setState({editTodo: true});
    }

    closeTodoModal() {
        this.setState({editTodo: false});
        this.setState({todo: {}});
    }

    dateToString(startDate, endDate) {
        const start = moment(startDate).format("HH:mm");
        const end = moment(endDate).format("HH:mm");

        return start + " - " + end;
    }

    async retrieveData() {
        const event = await eventStorage.getItem('events');
        const eventArray = Object.keys(event);

        let eventContent = [];
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
                eventContent.push(
                    <EventBoxHome key={i}
                                  name={event[item].title}
                                  time={this.dateToString(event[item].start, event[item].end)}
                                  iconFamily={event[item].icon.font} iconName={event[item].icon.name}
                                  color={event[item].color} colorContrast={fontColorContrast(event[item].color)}
                                  openModal={() => this.openEventModal(event[item].id)}/>
                );
            }
        });

        const todo = await eventStorage.getItem('todos');
        const todoArray = Object.keys(todo);

        let todoContent = [];
        todoArray.map((item, i) => {
            if (new Date(todo[item].end) > new Date()) {
                todoContent.push(
                    <EventBoxHome key={i}
                                  name={todo[item].title}
                                  time={moment(todo[item].end).format('L HH:mm')}
                                  iconFamily={todo[item].icon.font} iconName={todo[item].icon.name}
                                  color={todo[item].color} colorContrast={fontColorContrast(todo[item].color)}
                                  openModal={() => this.openTodoModal(todo[item].id)}/>
                );
            }
        });

        const googleEvent = await eventStorage.getItem('googleEvents');
        const googleEventArray = Object.keys(googleEvent);

        let googleEventContent = [];


        googleEventArray.map((item, i) => {
            let googleRepeatCheck;

            if (new Date().getDate() >= new Date(googleEvent[item].start).getDate() && new Date() <= new Date(googleEvent[item].end)) {
                if (googleEvent[item].repeat === "None") {
                    googleRepeatCheck = true;
                }else if (googleEvent[item].repeat === "Daily") {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Weekly" && new Date().getDay() === new Date(googleEvent[item].start).getDay()) {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Monthly" && new Date().getDate() === new Date(googleEvent[item].start).getDate() && new Date().getMonth() >= new Date(googleEvent[item].start).getMonth()) {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Annually" && new Date().getDate() === new Date(googleEvent[item].start).getDate() && new Date().getMonth() === new Date(googleEvent[item].start).getMonth() && new Date().getFullYear() >= new Date(googleEvent[item].start).getFullYear()) {
                    googleRepeatCheck = true;
                }
            }

            if (googleRepeatCheck) {
                googleEventContent.push(
                    <EventBoxHome key={i}
                                  name={googleEvent[item].title}
                                  time={this.dateToString(googleEvent[item].start, googleEvent[item].end)}
                                  iconFamily={googleEvent[item].icon.font} iconName={googleEvent[item].icon.name}
                                  color={googleEvent[item].color} colorContrast={fontColorContrast(googleEvent[item].color)}
                                  openModal={() => this.openEventModal(googleEvent[item].id)}/>
                );
            }
        });

        this.setState({eventContent: eventContent, todoContent: todoContent, googleEventContent: googleEventContent});
    };

    render() {
        return (
            <>
                <AppTemplate {...this.props}>
                    <View width="100%" marginTop="4%" marginBottom="4%">
                        {
                            this.state.todoContent.length !== 0 ? (
                                <>
                                    <Text fontSize="xl" fontWeight="700" width="80%" alignSelf="center" mb="1">Todos</Text>
                                    <Stack space="3" mb="2">
                                        {this.state.todoContent}
                                    </Stack>
                                </>
                            ) : (<></>)
                        }
                        {
                            this.state.eventContent.length !== 0 ? (
                                <>
                                    <Text fontSize="xl" fontWeight="700" width="80%" alignSelf="center" mb="1">Events</Text>
                                    <Stack space="3">
                                        {this.state.eventContent}
                                    </Stack>
                                </>
                            ) : (<></>)
                        }
                        {
                            this.state.googleEventContent.length !== 0 ? (
                                <>
                                    <Text fontSize="xl" fontWeight="700" width="80%" alignSelf="center" mb="1">Google Events</Text>
                                    <Stack space="3">
                                        {this.state.googleEventContent}
                                    </Stack>
                                </>
                            ) : (<></>)
                        }
                        <EditEvent key={this.state.event.id} isOpen={this.state.editEvent} event={this.state.event} onClose={() => this.closeEventModal()}/>
                        <EditTodo key={this.state.todo.id} isOpen={this.state.editTodo} todo={this.state.todo} onClose={() => this.closeTodoModal()}/>
                    </View>
                </AppTemplate>
            </>
        );
    }
}

export default Home;
