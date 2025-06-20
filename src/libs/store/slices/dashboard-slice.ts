import { createSlice } from '@reduxjs/toolkit';

type DashboardState = {
    monthWiseYear: string;
};

const initialState: DashboardState = {
    monthWiseYear: new Date().getFullYear().toString()
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setMonthWiseYear: (state, action) => {
            state.monthWiseYear = action.payload;
        }
    },
});

export const { setMonthWiseYear } = dashboardSlice.actions;
export default dashboardSlice.reducer;
