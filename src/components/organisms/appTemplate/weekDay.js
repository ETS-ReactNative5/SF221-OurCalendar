import React from 'react';
import { withTranslation } from 'react-i18next';
import {Box, Center, HStack, Icon, Text} from 'native-base';
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";

class WeekDay extends React.Component {
    constructor(props) {
        super(props);

        this.date = new Date().getDate();
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
    }

    checkDate(num) {
        let day_checker = moment([this.year, this.month, this.date]).day();
        if (num === day_checker) {
            return "#90ae4f";
        } else {
            return "#f4be82";
        }
    }

    render() {
        const { t } = this.props;
        const date = [0, 1, 2, 3, 4, 5, 6];

        return (
            <Box>
                <Center>
                    <Text bold fontSize={"2xl"}>{moment.months(this.month)} {this.year}</Text>
                </Center>
                <HStack>
                    {
                        date.map((object, i) =>
                            <Center w="14.28%" key={i}><Icon as={FontAwesome} name="circle" size="xs" color={this.checkDate(object)}/></Center>
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
