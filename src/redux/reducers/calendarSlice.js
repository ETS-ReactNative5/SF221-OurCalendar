import {createSlice} from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        date: new Date().getDate(),
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
    },
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        setMonth: (state, action) => {
            state.month = action.payload
        },
        setYear: (state, action) => {
            state.year = action.payload
        },
    },
});

export const { setDate, setMonth, setYear } = calendarSlice.actions;

export default calendarSlice.reducer;
