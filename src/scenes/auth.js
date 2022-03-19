import React from 'react';
import {Center} from 'native-base';

import AuthTemplate from '../components/templates/auth';

class Auth extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AuthTemplate {...this.props}>
                <Center flex={1}>
                    Hello I'm Auth!
                </Center>
            </AuthTemplate>
        );
    }
}

export default Auth;
