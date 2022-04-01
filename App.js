import React from 'react';
import { SafeAreaView } from 'react-native';
import { I18nextProvider } from 'react-i18next';
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
        return (
            <I18nextProvider i18n={i18n}>
                <SafeAreaView style={{flex: 1}}>
                    <AppNavigator/>
                </SafeAreaView>
            </I18nextProvider>
        );
    }
}

export default App;
