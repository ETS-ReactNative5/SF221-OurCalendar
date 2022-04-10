import AsyncStorage from '@react-native-async-storage/async-storage';

const Functions = {
    async insertJson(id, json, item) {
        const eventStorage = await AsyncStorage.getItem(item);
        const eventStorageJson = eventStorage != null ? JSON.parse(eventStorage) : {};

        const jsonEventValue = JSON.stringify({...eventStorageJson, [id]: json});
        await AsyncStorage.setItem(item, jsonEventValue);
    },

    async insertId(id, item) {
        const eventIdStorage = await AsyncStorage.getItem(item);
        let jsonValue = eventIdStorage != null ? JSON.parse(eventIdStorage) : {};

        const currentDate = new Date().getFullYear() + "_" + new Date().getMonth();

        if (jsonValue[currentDate]) {
            jsonValue[currentDate].push(id);
        } else {
            jsonValue = {...jsonValue, [currentDate]: [id]};
        }

        await AsyncStorage.setItem(item, JSON.stringify(jsonValue));
    },

    async getItem(item) {
        const storage = await AsyncStorage.getItem(item);

        return storage != null ? JSON.parse(storage) : {};
    }
}

export default Functions;
