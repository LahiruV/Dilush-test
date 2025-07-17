import { createSlice } from '@reduxjs/toolkit';

interface DashEndUserTransferLogState {
    endUserLogStartDate: string;
    endUserLogEndDate: string;
    searchByDashEndUserLogs: string;
    childOriginatorsDashEndUserTransferLogs: string;
    isDashEndUserTransferLogsListFetch: boolean;
    isFormSubmit: boolean;
}

const subtractMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
};

const endDate = new Date();
const startDate = subtractMonths(endDate, 3);

const initialState: DashEndUserTransferLogState = {
    endUserLogStartDate: startDate.toISOString(),
    endUserLogEndDate: endDate.toISOString(),
    searchByDashEndUserLogs: '',
    childOriginatorsDashEndUserTransferLogs: '',
    isDashEndUserTransferLogsListFetch: false,
    isFormSubmit: false
};

export const dashboardEndUserTransferLogsSlice = createSlice({
    name: 'dashboard-activity-analysis',
    initialState,
    reducers: {
        setEndUserLogStartDate: (state, action) => {
            state.endUserLogStartDate = action.payload;
        },
        setEndUserLogEndDate: (state, action) => {
            state.endUserLogEndDate = action.payload;
        },
        setSearchByDashEndUserLogs: (state, action) => {
            state.searchByDashEndUserLogs = action.payload;
        },
        setChildOriginatorsDashEndUserTransferLogs: (state, action) => {
            state.childOriginatorsDashEndUserTransferLogs = action.payload;
        },
        setIsDashEndUserTransferLogsListFetch: (state, action) => {
            state.isDashEndUserTransferLogsListFetch = action.payload;
        },
        setTriggerEndUserTransferLogsFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setEndUserLogStartDate, setEndUserLogEndDate, setSearchByDashEndUserLogs, setIsDashEndUserTransferLogsListFetch, setChildOriginatorsDashEndUserTransferLogs,setTriggerEndUserTransferLogsFormSubmit } = dashboardEndUserTransferLogsSlice.actions;

export default dashboardEndUserTransferLogsSlice.reducer;
