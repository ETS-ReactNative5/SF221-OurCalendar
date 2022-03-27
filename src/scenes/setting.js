import React from 'react';
import AppTemplate from '../components/templates/app';

class Setting extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <AppTemplate  {...this.props}>

            </AppTemplate>
        );
    }
}

export default Setting;
