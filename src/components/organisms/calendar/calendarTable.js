import React from 'react';
import {Box, HStack, Modal, Text, VStack} from 'native-base';
import moment from 'moment';

import CalendarBox from '../../molecules/calender/calendarBox';
import EventBoxCalendar from "../../molecules/calender/eventBoxCalendar";
import EventBoxHome from "../../molecules/home/eventBoxHome";
import EditEvent from "../eventModal/editEvent";
import eventStorage from "../../../utils/eventStorage";

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
            event:1,
            addEvent: false,

            month: this.props.month,
            year: this.props.year,

            events: {}
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

        this.setState({events: event});
    }

    updateDate() {
        if (this.date_count >= this.day_in_month) {
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
        if (this.date_count === this.day_in_month) {
            this.border_color = this.color_out;
        } else if (this.date_count >= 0) {
            this.border_color = this.border_color_date;
        } else {
            this.border_color = this.color_out;
        }
        return this.border_color;
    }

    changeBgColor() {
        if (this.date_count === this.day_in_month) {
            this.bg_color = this.color_out;
        } else if (this.date_count >= 0) {
            this.bg_color = this.bg_color_date;
        } else {
            this.bg_color = this.color_out;
        }
        return this.bg_color;
    }

    changeEventColor() {
        if (this.event_count === this.day_in_month) {
            this.bg_color = this.color_out;
        } else if (this.event_count >= 0) {
            this.bg_color = this.bg_color_event;
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

    openModal(date) {
        if (date >= 1) {
            this.setState({calendarModal: true, date: date});
        }
    }

    closeModal() {
        this.setState({calendarModal: false});
    }
    showModal(eventId) {
        this.setState({addEvent: true});
        this.setState({event:eventId});
    }

    exitModal() {
        this.setState({addEvent: false});
    }

    getEvent(date, ev_attr) {
        if (date === null) return;

        const event = this.state.events;
        const eventArray = Object.keys(event);
        const startCurrentDate = new Date(this.state.year, this.state.month, date+1);
        const endCurrentDate = new Date(this.state.year, this.state.month, date);

        let eventContent = [];
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
                eventContent.push(
                    <EventBoxCalendar key={i} event_attr={ev_attr} text={event[item].title}/>
                );
            }
        });

        return eventContent;
    }

    render() {
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
                        let attr = {borderColor: this.changeBorderColor(), bgColor: this.changeBgColor(), [round]: "lg"};
                        let ev_attr = {borderColor: this.changeBorderColor(), bgColor: this.changeEventColor()};
                        const date = this.updateDate();
                        return (
                            <Box key={col} h="100%" w="14.28%">
                                <CalendarBox attributes={attr} text={date} openModal={() => this.openModal(date)}/>
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
                            <Text bold="bold" fontSize="20">Events {this.state.date}</Text>
                        </Modal.Header>
                        <Modal.Body>
                            <VStack space="2">
                                <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell" color="#d4d4d4" openModal={() => this.showModal(1)}/>
                                <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell" color="#d4d4d4" openModal={() => this.showModal(4)}/>
                                <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell" color="#d4d4d4" openModal={() => this.showModal(8)}/>
                            </VStack>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>
                <EditEvent isOpen={this.state.addEvent} event={this.state.event} onClose={() => this.exitModal()}/>
            </>
        );
    }
}

export default CalendarTable;
