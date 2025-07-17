import { Originator } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashCallCyclesState {
    callCyclesStartDate: string;
    callCyclesEndDate: string;
    isCallCyclesAnalysisListFetch: boolean;
    isCallCyclesAnalysisListFetchChart: boolean;
    selectedOriginatorCallCyclesAnalysis: Originator;
    childOriginatorsCallCyclesAnalysis: string;
    callCycleAnalysisTableFilters?: {
        callCycle: any;
        dueOn: any;
        organization: any;
        rep: any;
        leadStage: any;
        address: any;
        city: any;
        state: any;
        postCode: any;
    };
    isFormSubmit: boolean;
}

const today = new Date();
let startDate = new Date(today);
startDate.setMonth(today.getMonth() - 1);

const initialState: DashCallCyclesState = {
    callCyclesStartDate: startDate.toISOString(),
    callCyclesEndDate: today.toISOString(),
    isCallCyclesAnalysisListFetch: false,
    isCallCyclesAnalysisListFetchChart: false,
    selectedOriginatorCallCyclesAnalysis: { userName: '', repType: '' } as Originator,
    childOriginatorsCallCyclesAnalysis: '',
    callCycleAnalysisTableFilters: {
        callCycle: { value: null, matchMode: 'contains' },
        dueOn: { value: null, matchMode: 'contains' },
        organization: { value: null, matchMode: 'contains' },
        rep: { value: null, matchMode: 'contains' },
        leadStage: { value: null, matchMode: 'contains' },
        address: { value: null, matchMode: 'contains' },
        city: { value: null, matchMode: 'contains' },
        state: { value: null, matchMode: 'contains' },
        postCode: { value: null, matchMode: 'contains' }
    },
    isFormSubmit: false
};

export const dashboardCallCyclesSlice = createSlice({
    name: 'dashboard-call-cycles-analysis',
    initialState,
    reducers: {
        setCallCyclesStartDate: (state, action) => {
            state.callCyclesStartDate = action.payload;
        },
        setCallCyclesEndDate: (state, action) => {
            state.callCyclesEndDate = action.payload;
        },
        setIsCallCyclesAnalysisListFetch: (state, action) => {
            state.isCallCyclesAnalysisListFetch = action.payload;
        },
        setisCallCyclesAnalysisListFetchChart: (state, action) => {
            state.isCallCyclesAnalysisListFetchChart = action.payload;
        },
        setSelectedOriginatorCallCyclesAnalysis: (state, action) => {
            state.selectedOriginatorCallCyclesAnalysis = action.payload;
        },
        setChildOriginatorsCallCyclesAnalysis: (state, action) => {
            state.childOriginatorsCallCyclesAnalysis = action.payload;
        },
        setCallCycleAnalysisTableFilters: (state, action) => {
            state.callCycleAnalysisTableFilters = action.payload;
        },
        setTriggerCallCycleAnalysisFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setCallCyclesStartDate, setCallCyclesEndDate, setIsCallCyclesAnalysisListFetch, setisCallCyclesAnalysisListFetchChart, setSelectedOriginatorCallCyclesAnalysis, setChildOriginatorsCallCyclesAnalysis, setCallCycleAnalysisTableFilters, setTriggerCallCycleAnalysisFormSubmit } = dashboardCallCyclesSlice.actions;

export default dashboardCallCyclesSlice.reducer;
