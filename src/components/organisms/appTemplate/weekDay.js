import React from 'react';
import { withTranslation } from 'react-i18next';
import {Box, Center, HStack, Icon, IconButton, Text} from 'native-base';
import moment from "moment";
import Icons from "../../../utils/icons";

class WeekDay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date().getDate(),
            month: new Date().getMonth(),
            year: new Date().getFullYear(),
        }
    }

    checkDate(num) {
        let day_checker = moment([this.state.year, this.state.month, this.state.date]).day();
        if (num === day_checker) {
            return "#90ae4f";
        } else {
            return "#f4be82";
        }
    }

    componentDidUpdate() {
        if (this.state.month > 11) {
            this.setState({month: 0});
            this.setState({year: this.state.year + 1});
        } else if (this.state.month < 0) {
            this.setState({month: 11});
            this.setState({year: this.state.year - 1});
        }
    }

    render() {
        const { t } = this.props;
        const date = [0, 1, 2, 3, 4, 5, 6];

        return (
            <Box>
                <HStack>
                    <IconButton width="15%" icon={<Icon as={Icons.AntDesign} name="leftcircle"/>} onPress={() => this.setState({month: this.state.month - 1})}/>
                    <Text width="70%" textAlign="center" fontWeight={700} fontSize={"2xl"}>{moment.months(this.state.month)} {this.state.year}</Text>
                    <IconButton width="15%" icon={<Icon as={Icons.AntDesign} name="rightcircle"/>} onPress={() => this.setState({month: this.state.month + 1})}/>
                </HStack>
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

export default withTranslation()(WeekDay);
