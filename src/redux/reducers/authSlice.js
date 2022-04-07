import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        googleAuth: false,
        userInfo: {}
    },
    reducers: {
        setGoogleAuth: (state, action) => {
            state.googleAuth = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    },
});

export const { setGoogleAuth, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
