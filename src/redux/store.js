import { configureStore } from '@reduxjs/toolkit';
import fontReducer from './reducers/fontSlice';
import authReducer from './reducers/authSlice';

export default configureStore({
    reducer: {
        font: fontReducer,
        auth: authReducer
    },
});
