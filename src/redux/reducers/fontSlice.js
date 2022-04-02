import {createSlice} from '@reduxjs/toolkit'

export const fontSlice = createSlice({
    name: 'font',
    initialState: {
        value: 'default',
    },
    reducers: {
        set: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { set } = fontSlice.actions;

export default fontSlice.reducer;
