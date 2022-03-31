import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigator from './src/navigations/app-navigator';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <AppNavigator/>
            </SafeAreaView>
        );
    }
}

export default App;
