import React from 'react';
import {Box, HStack, Modal, Text, VStack} from 'native-base';
import moment from 'moment';
import fontColorContrast from "font-color-contrast";

import CalendarBox from '../../molecules/calender/calendarBox';
import EventBoxCalendar from "../../molecules/calender/eventBoxCalendar";
import EventBoxHome from "../../molecules/home/eventBoxHome";
import EditEvent from "../eventModal/editEvent";
import eventStorage from "../../../utils/eventStorage";
import EditTodo from "../eventModal/editTodo";
import {withTranslation} from "react-i18next";

const COLOR_OUT = '#d4d4d4';
const BG_COLOR_DATE = 'primary.50';
const BORDER_COLOR_DATE = '#eedec4';

class CalendarTable extends React.Component {
    constructor(props) {
        super(props);

        this.color_out = COLOR_OUT;
        this.bg_color_date = BG_COLOR_DATE;
        this.bg_color_event = "primary.200";
        this.border_color_date = BORDER_COLOR_DATE;
        this.day_in_month = moment(props.month + 1, "MM").daysInMonth();
        this.date_count = 0 - moment([props.year, props.month, 1]).day();
        this.event_count = 0 - moment([props.year, props.month, 1]).day();

        this.state = {
            calendarModal: false,
            date: 0,

            event: {},
            editEvent: false,
            todo: {},
            editTodo: false,

            month: this.props.month,
            year: this.props.year,

            events: {},
            todos: {},
            googleEvents: {},
        }
    }

    componentDidUpdate() {
        this.day_in_month = moment(this.state.month + 1, "MM").daysInMonth();
        this.date_count = 0 - moment([this.state.year, this.state.month, 1]).day();
        this.event_count = 0 - moment([this.state.year, this.state.month, 1]).day();
    }

    componentDidMount() {
        this.loadEvents();
        this.date_count = 0 - moment([this.state.year, this.state.month, 1]).day();
        this.event_count = 0 - moment([this.state.year, this.state.month, 1]).day();
    }

    async loadEvents() {
        const event = await eventStorage.getItem('events');
        const todo = await eventStorage.getItem('todos');
        const googleEvent = await eventStorage.getItem('googleEvents');

        this.setState({events: event, todos: todo, googleEvents: googleEvent});
    }

    updateDate() {
        if (this.date_count >= this.day_in_month) {
            this.date_count += 1;
            return null;
        } else if (this.date_count >= 0) {
            this.date_count += 1;
            return this.date_count;
        } else {
            this.date_count += 1;
            return null;
        }
    }

    updateEvent() {
        if (this.event_count >= this.day_in_month) {
            return null;
        } else if (this.event_count >= 0) {
            this.event_count += 1;
            return true;
        } else {
            this.event_count += 1;
            return null;
        }
    }

    changeBorderColor() {
        if (this.date_count > this.day_in_month) {
            this.border_color = this.color_out;
        } else if (this.date_count > 0) {
            this.border_color = this.border_color_date;
        } else {
            this.border_color = this.color_out;
        }
        return this.border_color;
    }

    changeBgColor() {
        if (this.date_count > this.day_in_month) {
            this.bg_color = this.color_out;
        } else if (this.date_count > 0) {
            this.bg_color = this.bg_color_date;
        } else {
            this.bg_color = this.color_out;
        }
        return this.bg_color;
    }

    calculateHeight() {
        if (moment([this.state.year, this.state.month, 1]).day() === 6 && this.day_in_month >= 30) {
            return "16.66%";
        } else if (moment([this.state.year, this.state.month, 1]).day() === 5 && this.day_in_month >= 31) {
            return "16.66%";
        } else {
            return "20%";
        }
    }

    calculateCalendarRow() {
        if ((moment([this.state.year, this.state.month, 1]).day() === 6 && this.day_in_month >= 30) || (moment([this.state.year, this.state.month, 1]).day() === 5 && this.day_in_month >= 31)) {
            return 6;
        } else {
            return 5;
        }
    }

    dateToString(startDate, endDate) {
        const start = moment(startDate).format("HH:mm");
        const end = moment(endDate).format("HH:mm");

        return start + " - " + end;
    }

    openModal(date) {
        if (date >= 1) {
            this.setState({calendarModal: true, date: date});
        }
    }

    closeModal() {
        this.setState({calendarModal: false});
    }

    getEvent(date, ev_attr) {
        if (date === null) return;

        const event = this.state.events;
        const eventArray = Object.keys(event);

        const todo = this.state.todos;
        const todoArray = Object.keys(todo);

        const googleEvent = this.state.googleEvents;
        const googleEventArray = Object.keys(googleEvent);

        const startCurrentDate = new Date(this.state.year, this.state.month, date+1);
        const endCurrentDate = new Date(this.state.year, this.state.month, date);

        let eventContent = [];

        todoArray.map((item, i) => {
            if (new Date(todo[item].end) > endCurrentDate && new Date(todo[item].start) < startCurrentDate && eventContent.length < 5) {
                eventContent.push(
                    <EventBoxCalendar key={todo[item].id} event_attr={ev_attr} eventColor={todo[item].color} colorContrast={fontColorContrast(todo[item].color)} text={todo[item].title}/>
                );
            }
        });

        eventArray.map((item, i) => {
            let repeatCheck;

            const start = new Date(event[item].start);
            const end = new Date(event[item].end);
            if (startCurrentDate >= start && endCurrentDate <= end) {
                if (event[item].repeat === "None" || event[item].repeat === "Daily") {
                    repeatCheck = true;
                } else if (event[item].repeat === "Weekly" && endCurrentDate.getDay() === new Date(event[item].start).getDay()) {
                    repeatCheck = true;
                } else if (event[item].repeat === "Monthly" && endCurrentDate.getDate() === new Date(event[item].start).getDate() && endCurrentDate.getMonth() >= new Date(event[item].start).getMonth()) {
                    repeatCheck = true;
                } else if (event[item].repeat === "Annually" && endCurrentDate.getDate() === new Date(event[item].start).getDate() && endCurrentDate.getMonth() === new Date(event[item].start).getMonth() && endCurrentDate.getFullYear() >= new Date(event[item].start).getFullYear()) {
                    repeatCheck = true;
                }
            }

            if (repeatCheck && eventContent.length < 5) {
                eventContent.push(
                    <EventBoxCalendar key={i} event_attr={ev_attr} eventColor={event[item].color} colorContrast={fontColorContrast(event[item].color)} text={event[item].title}/>
                );
            }
        });

        googleEventArray.map((item, i) => {
            let googleRepeatCheck;

            const start = new Date(googleEvent[item].start);
            const end = new Date(googleEvent[item].end);
            if (startCurrentDate >= start && endCurrentDate <= end) {
                if (googleEvent[item].repeat === "None" || googleEvent[item].repeat === "Daily") {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Weekly" && endCurrentDate.getDay() === new Date(googleEvent[item].start).getDay()) {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Monthly" && endCurrentDate.getDate() === new Date(googleEvent[item].start).getDate() && endCurrentDate.getMonth() >= new Date(googleEvent[item].start).getMonth()) {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Annually" && endCurrentDate.getDate() === new Date(googleEvent[item].start).getDate() && endCurrentDate.getMonth() === new Date(googleEvent[item].start).getMonth() && endCurrentDate.getFullYear() >= new Date(googleEvent[item].start).getFullYear()) {
                    googleRepeatCheck = true;
                }
            }

            if (googleRepeatCheck && eventContent.length < 5) {
                eventContent.push(
                    <EventBoxCalendar key={i} event_attr={ev_attr} eventColor={googleEvent[item].color} colorContrast={fontColorContrast(googleEvent[item].color)} text={googleEvent[item].title}/>
                );
            }
        });

        return eventContent;
    }

    eventListing(date) {
        const event = this.state.events;
        const eventArray = Object.keys(event);

        const todo = this.state.todos;
        const todoArray = Object.keys(todo);

        const googleEvent = this.state.googleEvents;
        const googleEventArray = Object.keys(googleEvent);

        const startCurrentDate = new Date(this.state.year, this.state.month, date+1);
        const endCurrentDate = new Date(this.state.year, this.state.month, date);

        let eventList = [];

        todoArray.map((item, i) => {
            if (new Date(todo[item].end) > endCurrentDate && new Date(todo[item].start) < startCurrentDate) {
                eventList.push(
                    <EventBoxHome key={todo[item].id}
                                  name={todo[item].title}
                                  time={moment(todo[item].end).format('L HH:mm')}
                                  iconFamily={todo[item].icon.font} iconName={todo[item].icon.name}
                                  color={todo[item].color} colorContrast={fontColorContrast(todo[item].color)}
                                  openModal={() => this.openTodoModal(todo[item].id)}/>
                );
            }
        });

        eventArray.map((item, i) => {
            let repeatCheck;

            const start = new Date(event[item].start);
            const end = new Date(event[item].end);
            if (startCurrentDate >= start && endCurrentDate <= end) {
                if (event[item].repeat === "None" || event[item].repeat === "Daily") {
                    repeatCheck = true;
                } else if (event[item].repeat === "Weekly" && endCurrentDate.getDay() === new Date(event[item].start).getDay()) {
                    repeatCheck = true;
                } else if (event[item].repeat === "Monthly" && endCurrentDate.getDate() === new Date(event[item].start).getDate() && endCurrentDate.getMonth() >= new Date(event[item].start).getMonth()) {
                    repeatCheck = true;
                } else if (event[item].repeat === "Annually" && endCurrentDate.getDate() === new Date(event[item].start).getDate() && endCurrentDate.getMonth() === new Date(event[item].start).getMonth() && endCurrentDate.getFullYear() >= new Date(event[item].start).getFullYear()) {
                    repeatCheck = true;
                }
            }

            if (repeatCheck) {
                eventList.push(
                    <EventBoxHome key={event[item].id}
                                  name={event[item].title}
                                  time={this.dateToString(event[item].start, event[item].end)}
                                  iconFamily={event[item].icon.font} iconName={event[item].icon.name}
                                  color={event[item].color} colorContrast={fontColorContrast(event[item].color)}
                                  openModal={() => this.openEventModal(event[item].id)}/>
                );
            }
        });

        googleEventArray.map((item, i) => {
            let googleRepeatCheck;

            const googleStart = new Date(googleEvent[item].start);
            const googleEnd = new Date(googleEvent[item].end);
            if (startCurrentDate >= googleStart && endCurrentDate <= googleEnd) {
                if (googleEvent[item].repeat === "None") {
                    googleRepeatCheck = true;
                }else if (googleEvent[item].repeat === "Daily") {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Weekly" && endCurrentDate.getDay() === new Date(googleEvent[item].start).getDay()) {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Monthly" && endCurrentDate.getDate() === new Date(googleEvent[item].start).getDate() && endCurrentDate.getMonth() >= new Date(googleEvent[item].start).getMonth()) {
                    googleRepeatCheck = true;
                } else if (googleEvent[item].repeat === "Annually" && endCurrentDate.getDate() === new Date(googleEvent[item].start).getDate() && endCurrentDate.getMonth() === new Date(googleEvent[item].start).getMonth() && endCurrentDate.getFullYear() >= new Date(googleEvent[item].start).getFullYear()) {
                    googleRepeatCheck = true;
                }
            }

            if (googleRepeatCheck) {
                eventList.push(
                    <EventBoxHome key={i}
                                  name={googleEvent[item].title}
                                  time={this.dateToString(googleEvent[item].start, googleEvent[item].end)}
                                  iconFamily={googleEvent[item].icon.font} iconName={googleEvent[item].icon.name}
                                  color={googleEvent[item].color} colorContrast={fontColorContrast(googleEvent[item].color)}/>
                );
            }
        });

        return eventList;
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

    render() {
        const { t } = this.props;

        let content = [];
        let column = [0, 1, 2, 3, 4, 5, 6];

        for (let row=0;row<this.calculateCalendarRow();row++) {
            content.push(
                <HStack key={row} space={0} justifyContent="center" height={this.calculateHeight()}>
                    {column.map((col, i) => {
                        let round;
                        if (row === 0 && col === 0) {
                            round = 'roundedTopLeft';
                        } else if (row === 0 && col === 6) {
                            round = 'roundedTopRight';
                        } else if ((row === 4 || row === 5) && col === 0) {
                            round = 'roundedBottomLeft';
                        } else if ((row === 4 || row === 5) && col === 6) {
                            round = 'roundedBottomRight';
                        }
                        let attr = {[round]: "lg"};
                        let ev_attr = {borderColor: this.changeBorderColor()};
                        const date = this.updateDate();
                        return (
                            <Box key={col} h="100%" w="14.28%">
                                {
                                    date >= 1 && date <= this.day_in_month ? (
                                        <CalendarBox bdColor={this.changeBorderColor()} attributes={attr} text={date} openModal={() => this.openModal(date)}/>
                                    ) : (
                                        <CalendarBox bdColor={this.changeBorderColor()} backColor={this.changeBgColor()} attributes={attr} openModal={() => this.openModal(date)}/>
                                    )
                                }
                                {
                                    this.updateEvent() ? (
                                        <>
                                            {this.getEvent(date, ev_attr)}
                                        </>
                                    ) : (<></>)
                                }
                            </Box>
                        );
                    })}
                </HStack>
            );
        }
        return (
            <>
                <Box alignSelf="center" position="absolute" bg="primary.50" width="95%" height="90%" left="2.5%" rounded="lg">
                    {content}
                </Box>
                <Modal isOpen={this.state.calendarModal} onClose={() => this.closeModal()}>
                    <Modal.Content maxWidth="400px" >
                        <Modal.Header borderBottomWidth="0" py="3">
                            <Text bold="bold" fontSize="20">{this.state.date} {t('month.'+moment.months(this.state.month))} {this.state.year}</Text>
                        </Modal.Header>
                        <Modal.Body>
                            <VStack space="2">
                                {this.eventListing(this.state.date)}
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
                <EditEvent key={this.state.event.id} isOpen={this.state.editEvent} event={this.state.event} onClose={() => this.closeEventModal()}/>
                <EditTodo key={this.state.todo.id} isOpen={this.state.editTodo} todo={this.state.todo} onClose={() => this.closeTodoModal()}/>
            </>
        );
    }
}

export default withTranslation()(CalendarTable);
