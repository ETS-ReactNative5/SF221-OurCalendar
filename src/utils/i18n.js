import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import th from '../locales/th.json';
import ja from '../locales/ja.json';

const resources = {
    en: {translation: en},
    th: {translation: th},
    ja: {translation: ja}
};

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
