import React from 'react';
import {Center, HStack, Stack} from 'native-base';
import SmallBox from "../atoms/smallBox";

class BoxPasscode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Center flex={1}>
                <Stack space="2" alignItems="center">
                    <HStack space="1" alignItems="center">
                        <SmallBox/>
                        <SmallBox/>
                        <SmallBox/>
                        <SmallBox/>
                        <SmallBox/>
                        <SmallBox/>
                    </HStack>
                </Stack>
            </Center>
        );
    }
}

export default BoxPasscode;
