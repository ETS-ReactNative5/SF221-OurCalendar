import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        passcode: false,
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
        setPasscode: (state, action) => {
            state.passcode = action.payload
        },
    },
});

export const { setGoogleAuth, setUserInfo, setPasscode } = authSlice.actions;

export default authSlice.reducer;
