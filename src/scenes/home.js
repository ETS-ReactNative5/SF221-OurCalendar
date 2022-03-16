import React from 'react';
import {Center} from 'native-base';
import AppTemplate from '../components/templates/app';

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppTemplate {...this.props}>
                <Center flex={1}>
                    Hello I'm Home!
                </Center>
            </AppTemplate>
        );
    }
}

export default Home;
