import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import th from '../locales/th.json';
import ja from '../locales/ja.json';

i18n.defaultLocale = 'en';
i18n.fallbacks = true;
i18n.translations = { en, th, ja };

let locale;
async function getLocale() {
    try {
        const localeValue = await AsyncStorage.getItem('@locale');

        if (localeValue === null) {
            await AsyncStorage.setItem('@locale', 'en');
            locale = 'en';
        } else {
            locale = localeValue;
        }
    } catch(e) {}
}
getLocale().then(() => {
    i18n.locale = locale;
});

export default i18n;
