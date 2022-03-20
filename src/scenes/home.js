import React from 'react';
import AppTemplate from '../components/templates/app';
import EventBoxHome from "../components/molecules/eventBoxHome";
import {Stack, View} from "native-base";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <AppTemplate {...this.props}>
                <View width="100%" marginTop="7%" marginBottom="7%">
                    <Stack space="3">
                        <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell" color="#ffffff"/>
                        <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell"/>
                        <EventBoxHome name="วิ่ง" time="7:00-8:00" icon="dumbbell"/>
                        <EventBoxHome name="ersg" time="1:00-8:00" icon="dumbbell"/>

                    </Stack>
                </View>
            </AppTemplate>
        );
    }
}

export default Home;
