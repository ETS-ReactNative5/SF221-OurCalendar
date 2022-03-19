import React from 'react';
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
                    <Center w="14.28%">Sun</Center>
                    <Center w="14.28%">Mon</Center>
                    <Center w="14.28%">Tue</Center>
                    <Center w="14.28%">Wed</Center>
                    <Center w="14.28%">Thu</Center>
                    <Center w="14.28%">Fri</Center>
                    <Center w="14.28%">Sat</Center>
                </HStack>
            </Box>

        );
    }
}

export default WeekDay;
