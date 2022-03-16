import React from 'react';
import AppNavigator from './src/navigations/app-navigator';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppNavigator/>
        );
    }
}

export default App;
