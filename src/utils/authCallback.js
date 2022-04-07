import axios from 'axios';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUniqueId } from 'react-native-device-info';
import { URL } from 'react-native-url-polyfill';
import {API_URL} from '@env';

export default async function (urlInput, props) {
    const url = new URL(urlInput.url);
    const tempToken = url.searchParams.get('temp');
    const appToken = await axios.post(API_URL + '/auth/google/token', {
        token: tempToken,
        device: base64.encode(getUniqueId())
    });
    await AsyncStorage.setItem('appSecretToken', appToken.data.token);
    const userInfo = await axios.get(API_URL + '/user/info', {
        headers: {
            Authorization: appToken.data.token,
            Device: base64.encode(getUniqueId())
        }
    });
    await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo.data));

    props.setGoogleAuth(true);
    props.setUserInfo(userInfo.data);
};
