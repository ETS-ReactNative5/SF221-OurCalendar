import {createSlice} from '@reduxjs/toolkit'

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),

        teamMonth: new Date().getMonth(),
        teamYear: new Date().getFullYear(),
    },
    reducers: {
        setMonth: (state, action) => {
            state.month = action.payload
        },
        setYear: (state, action) => {
            state.year = action.payload
        },

        setTeamMonth: (state, action) => {
            state.teamMonth = action.payload
        },
        setTeamYear: (state, action) => {
            state.teamYear = action.payload
        },
    },
});

export const { setDate, setMonth, setYear, setTeamDate, setTeamMonth, setTeamYear } = calendarSlice.actions;

export default calendarSlice.reducer;
