import React from 'react';
import {LogBox, SafeAreaView} from 'react-native';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from './src/utils/i18n';
import AppNavigator from './src/navigations/app-navigator';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        (async () => {
            const localeValue = await AsyncStorage.getItem('@locale');
            if (localeValue === null) {
                await AsyncStorage.setItem('@locale', 'en');
            }
            let locale = localeValue === null ? 'en' : localeValue;
            await i18n.changeLanguage(locale);
        })();
    }

    render() {
        //LogBox.ignoreLogs(['NativeBase:']);

        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <SafeAreaView style={{flex: 1}}>
                        <AppNavigator/>
                    </SafeAreaView>
                </I18nextProvider>
            </Provider>
        );
    }
}

export default App;
