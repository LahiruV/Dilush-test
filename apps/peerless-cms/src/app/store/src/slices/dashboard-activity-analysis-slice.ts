import { ActivityAnalysis, DropDownData, Originator } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashActivityState {
    selectedArea: string | null;
    selectedActivityAnalysis: ActivityAnalysis;
    sStartDate: string;
    sEndDate: string;
    activityStatus: DropDownData;
    repActivityList: string[];
    repActivity: Originator;    
    searchByActivity: string;
    isFetchActivityAnalysisList: boolean;
    isFormSubmit: boolean;
}

const today = new Date();
let startDate = new Date(today);
startDate.setMonth(today.getMonth() - 1);

const initialState: DashActivityState = {
    selectedArea: 'leeds-and-customers',
    selectedActivityAnalysis: {} as ActivityAnalysis,
    sStartDate: startDate.toISOString(),
    sEndDate: today.toISOString(),
    activityStatus: { id: 1, text: 'To Be Actioned', value: 'ACTN' } as DropDownData,
    repActivityList: [],
    repActivity: {} as Originator,    
    searchByActivity: '',
    isFetchActivityAnalysisList: false,
    isFormSubmit: false
};

export const dashboardActivityAnalysisSlice = createSlice({
    name: 'dashboard-activity-analysis',
    initialState,
    reducers: {
        setSelectedActivityAnalysis: (state, action) => {
            state.selectedActivityAnalysis = action.payload;
        },
        setSStartDate: (state, action) => {
            state.sStartDate = action.payload;
        },
        setSEndDate: (state, action) => {
            state.sEndDate = action.payload;
        },
        setActivityStatus: (state, action) => {
            state.activityStatus = action.payload;
        },
        setRepActivityList: (state, action) => {
            state.repActivityList = action.payload;
        },
        setRepActivity: (state, action) => {
            state.repActivity = action.payload;
        },
        setSelectedArea: (state, action) => {
            state.selectedArea = action.payload;
        },
        setSearchByActivity: (state, action) => {
            state.searchByActivity = action.payload;
        },
        setIsFetchActivityAnalysisList: (state, action) => {
            state.isFetchActivityAnalysisList = action.payload;
        },
        setTriggerActivityAnalysisFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setSelectedArea, setSelectedActivityAnalysis, setSStartDate, setSEndDate, setActivityStatus, setRepActivityList, setRepActivity, setSearchByActivity, setIsFetchActivityAnalysisList,setTriggerActivityAnalysisFormSubmit } = dashboardActivityAnalysisSlice.actions;

export default dashboardActivityAnalysisSlice.reducer;
