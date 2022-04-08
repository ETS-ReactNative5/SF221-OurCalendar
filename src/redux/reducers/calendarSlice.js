import {createSlice} from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        date: null,
        month: null,
        year: null,
    },
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload
        },
        incDate: (state) => {
            state.date += 1
        },
        decDate: (state) => {
            state.date -= 1
        },
        setMonth: (state, action) => {
            state.month = action.payload
        },
        incMonth: (state) => {
            state.month += 1
        },
        decMonth: (state) => {
            state.month -= 1
        },
        setYear: (state, action) => {
            state.year = action.payload
        },
        incYear: (state) => {
            state.year += 1
        },
        decYear: (state) => {
            state.year -= 1
        },
    },
});

export const { setDate, incDate, decDate, setMonth, incMonth, decMonth, setYear, incYear, decYear } = calendarSlice.actions;

export default calendarSlice.reducer;
