import { configureStore } from '@reduxjs/toolkit';
import fontReducer from './reducers/fontSlice';
import authReducer from './reducers/authSlice';
import calendarReducer from './reducers/calendarSlice';
import teamReducer from './reducers/teamSlice';

export default configureStore({
    reducer: {
        font: fontReducer,
        auth: authReducer,
        calendar: calendarReducer,
        team: teamReducer
    },
});
