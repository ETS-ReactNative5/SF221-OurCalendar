import React from 'react';
import { withTranslation } from 'react-i18next';
import {Box, Center, HStack, Icon, IconButton, Text} from 'native-base';
import moment from "moment";
import Icons from "../../../utils/icons";
import {setMonth, setYear, setTeamMonth, setTeamYear} from "../../../redux/reducers/calendarSlice";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    calendar: {
        month: state.calendar.month,
        year: state.calendar.year,
        teamMonth: state.calendar.teamMonth,
        teamYear: state.calendar.teamYear,
    }
});

const mapDispatchToProps = () => ({
    setMonth,
    setYear,
    setTeamMonth,
    setTeamYear
});

class WeekDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
            today: new Date(),
        }
    }

    checkDate(num) {
        if (num === this.state.today) {
            return "#90ae4f";
        } else {
            return "#f4be82";
        }
    }

    componentDidMount() {
        this.setState({today: moment(new Date()).day()});
    }

    componentDidUpdate() {
        if (this.props.route === 'CalendarTeam') {
            if (this.props.calendar.teamMonth > 11) {
                this.props.setTeamMonth(0);
                this.props.setTeamYear(this.props.calendar.teamYear + 1);
            } else if (this.props.calendar.teamMonth < 0) {
                this.props.setTeamMonth(11);
                this.props.setTeamYear(this.props.calendar.teamYear - 1);
            }
        } else if (this.props.route === 'Calendar') {
            if (this.props.calendar.month > 11) {
                this.props.setMonth(0);
                this.props.setYear(this.props.calendar.year + 1);
            } else if (this.props.calendar.month < 0) {
                this.props.setMonth(11);
                this.props.setYear(this.props.calendar.year - 1);
            }
        }
    }

    decMonth() {
        if (this.props.route === 'CalendarTeam') {
            this.props.setTeamMonth(this.props.calendar.teamMonth - 1);
        } else if (this.props.route === 'Calendar') {
            this.props.setMonth(this.props.calendar.month - 1);
        }
    }

    incMonth() {
        if (this.props.route === 'CalendarTeam') {
            this.props.setTeamMonth(this.props.calendar.teamMonth + 1);
        } else if (this.props.route === 'Calendar') {
            this.props.setMonth(this.props.calendar.month + 1);
        }
    }

    dateDisplay() {
        if (this.props.route === 'CalendarTeam') {
            return this.props.t('month.'+moment.months(this.props.calendar.teamMonth)) + " " + this.props.calendar.teamYear;
        } else if (this.props.route === 'Calendar') {
            return this.props.t('month.'+moment.months(this.props.calendar.month)) + " " + this.props.calendar.year;
        }
    }

    render() {
        const { t } = this.props;
        const date = [0, 1, 2, 3, 4, 5, 6];

        return (
            <Box>
                {
                    this.props.changeable ? (
                        <HStack>
                            <IconButton width="15%" icon={<Icon as={Icons.AntDesign} name="left"/>} onPress={() => this.decMonth()}/>
                            <Text width="70%" pt="1.5" textAlign="center" fontWeight={700} fontSize={"2xl"}>{this.dateDisplay()}</Text>
                            <IconButton width="15%" icon={<Icon as={Icons.AntDesign} name="right"/>} onPress={() => this.incMonth()}/>
                        </HStack>
                    ) : (
                        <Text textAlign="center" fontWeight={700} fontSize={"2xl"}>{t('month.'+moment.months(this.state.month))} {this.state.year}</Text>
                    )
                }
                <HStack>
                    {
                        date.map((object, i) =>
                            <Center w="14.28%" key={i}><Icon as={Icons.FontAwesome} name="circle" size="xs" color={this.checkDate(object)}/></Center>
                        )
                    }
                </HStack>
                <HStack>
                    <Center w="14.28%">{t('day.sun')}</Center>
                    <Center w="14.28%">{t('day.mon')}</Center>
                    <Center w="14.28%">{t('day.tue')}</Center>
                    <Center w="14.28%">{t('day.wed')}</Center>
                    <Center w="14.28%">{t('day.thu')}</Center>
                    <Center w="14.28%">{t('day.fri')}</Center>
                    <Center w="14.28%">{t('day.sat')}</Center>
                </HStack>
            </Box>

        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps())(withTranslation()(WeekDay));
