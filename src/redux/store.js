import { configureStore } from '@reduxjs/toolkit';
import fontReducer from './reducers/fontSlice';

export default configureStore({
    reducer: {
        font: fontReducer,
    },
});
