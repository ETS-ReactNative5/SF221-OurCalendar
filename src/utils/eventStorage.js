import AsyncStorage from '@react-native-async-storage/async-storage';

const Functions = {
    async insertJson(id, json, item) {
        const eventStorage = await AsyncStorage.getItem(item);
        const eventStorageJson = eventStorage != null ? JSON.parse(eventStorage) : {};

        const jsonEventValue = JSON.stringify({...eventStorageJson, [id]: json});
        await AsyncStorage.setItem(item, jsonEventValue);
    },

    async editJson(id, json, item) {
        const eventStorage = await AsyncStorage.getItem(item);
        let eventStorageJson = eventStorage != null ? JSON.parse(eventStorage) : {};
        eventStorageJson[id] = json;

        const jsonEventValue = JSON.stringify(eventStorageJson);
        await AsyncStorage.setItem(item, jsonEventValue);
    },

    async deleteJson(id, item) {
        const eventStorage = await AsyncStorage.getItem(item);
        let eventStorageJson = eventStorage != null ? JSON.parse(eventStorage) : {};
        delete eventStorageJson[id];

        const jsonEventValue = JSON.stringify(eventStorageJson);
        await AsyncStorage.setItem(item, jsonEventValue);
    },

    async getItem(item) {
        const storage = await AsyncStorage.getItem(item);

        return storage != null ? JSON.parse(storage) : {};
    }
}

export default Functions;
