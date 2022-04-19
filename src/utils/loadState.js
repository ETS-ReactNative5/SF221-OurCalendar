import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function (props) {
    // Load font from storage.
    const fontValue = await AsyncStorage.getItem('@font');
    if (fontValue === null) {
        await AsyncStorage.setItem('@font', 'null');
    }
    let font = fontValue === null ? 'null' : fontValue;
    await props.set(font);

    // Load user info from storage.
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo !== null) {
        await props.setGoogleAuth(true);
        await props.setUserInfo(JSON.parse(userInfo));
    }

    // Load team info from storage.
    const teamInfo = await AsyncStorage.getItem('teamInfo');
    if (teamInfo !== null) {
        await props.setTeam(true);
        await props.setTeamInfo(JSON.parse(teamInfo));
    }
};
