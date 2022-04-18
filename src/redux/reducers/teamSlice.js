import {createSlice} from '@reduxjs/toolkit'

export const teamSlice = createSlice({
    name: 'auth',
    initialState: {
        team: false,
        teamInfo: {}
    },
    reducers: {
        setTeam: (state, action) => {
            state.team = action.payload
        },
        setTeamInfo: (state, action) => {
            state.teamInfo = action.payload
        },
    },
});

export const { setTeam, setTeamInfo } = teamSlice.actions;

export default teamSlice.reducer;
