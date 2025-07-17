import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashboardAchievementByRegionState {
    acByRegSalesDropdown: DropDownData
    acByRegAchievementRadio: string
    acByRegMonthDropdown: DropDownData
    acByRegYearDropdown: DropDownData
    acByRegFilters: string[]
    acByRegFiltersReq: any[]
    isAcByRegFilters: boolean
    isFormSubmit: boolean;
}

const initialState: DashboardAchievementByRegionState = {
    acByRegSalesDropdown: { text: "", value: 0, id: 0 },
    acByRegAchievementRadio: "",
    acByRegMonthDropdown: { text: "", value: "", id: 0 },
    acByRegYearDropdown: { text: "", value: 0, id: 0 },
    acByRegFilters: [],
    acByRegFiltersReq: [],
    isAcByRegFilters: false,
    isFormSubmit: false
};

export const dashboardAchievementByRegionSlice = createSlice({
    name: 'dashboard-achievement-by-region',
    initialState,
    reducers: {
        setAcByRegSalesDropdown: (state, action) => {
            state.acByRegSalesDropdown = action.payload;
        },
        setAcByRegAchievementRadio: (state, action) => {
            state.acByRegAchievementRadio = action.payload;
        },
        setAcByRegMonthDropdown: (state, action) => {
            state.acByRegMonthDropdown = action.payload;
        },
        setAcByRegFilters: (state, action) => {
            state.acByRegFilters = action.payload
        },
        setAcByRegFiltersReq: (state, action) => {
            state.acByRegFiltersReq = action.payload
        },
        setAcByRegYearDropdown: (state, action) => {
            state.acByRegYearDropdown = action.payload
        },
        setIsAcByRegFilters: (state, action) => {
            state.isAcByRegFilters = action.payload
        },
        setTriggerAcByRegFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setAcByRegSalesDropdown, setAcByRegAchievementRadio, setAcByRegMonthDropdown, setAcByRegFilters, setAcByRegFiltersReq, setAcByRegYearDropdown, setIsAcByRegFilters, setTriggerAcByRegFormSubmit } = dashboardAchievementByRegionSlice.actions;

export default dashboardAchievementByRegionSlice.reducer;
