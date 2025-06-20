import { createSlice } from '@reduxjs/toolkit';

type CommonState = {
    routeTitle: string;
    sideBarSelected: string;
};

const initialState: CommonState = {
    routeTitle: 'Dashboard',
    sideBarSelected: 'dashboard',
};

export const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setRouteTitle: (state, action) => {
            state.routeTitle = action.payload;
        },
        setSideBarSelected: (state, action) => {
            state.sideBarSelected = action.payload;
        }
    },
});

export const { setRouteTitle, setSideBarSelected } = commonSlice.actions;
export default commonSlice.reducer;
