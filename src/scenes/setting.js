import React from 'react';
import AppTemplate from '../components/templates/app';
import LanguageSelection from '../components/molecules/languageSelection';

class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'English',
        }
    }

    render() {
        return (
            <AppTemplate  {...this.props}>
                <LanguageSelection language={this.state.language} test={() => this.state.language}/>
            </AppTemplate>
        );
    }
}

export default Setting;
