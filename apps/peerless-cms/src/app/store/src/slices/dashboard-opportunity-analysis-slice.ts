import { DropDownData, OpportunityAnalysis, Originator } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashOpportunityState {
    opportunityStage: DropDownData;
    selectedOpportunityAnalysis: OpportunityAnalysis;
    isDashboardOpportunityAnalysisFetch: boolean;
    isDashboardOpportunityAnalysisFetchHeader: boolean;
    selectedOriginatorOpportunityAnalysis: Originator;
    opportunityAnalysisTableFilters?: {
        leadName: { value: any; matchMode: string };
        originator: { value: any; matchMode: string };
        probability: { value: any; matchMode: string };
        amount: { value: any; matchMode: string };
        units: { value: any; matchMode: string };
        tonnes: { value: any; matchMode: string };
        leadStage: { value: any; matchMode: string };
        closeDate: { value: any; matchMode: string };
    }
    isFormSubmit: boolean;
}

const initialState: DashOpportunityState = {
    opportunityStage: { id: 2, text: 'New', value: 1 } as DropDownData,
    selectedOpportunityAnalysis: {} as OpportunityAnalysis,
    selectedOriginatorOpportunityAnalysis: { userName: '' } as Originator,
    isDashboardOpportunityAnalysisFetch: false,
    isDashboardOpportunityAnalysisFetchHeader: false,
    opportunityAnalysisTableFilters: {
        leadName: { value: null, matchMode: 'contains' },
        originator: { value: null, matchMode: 'contains' },
        probability: { value: null, matchMode: 'contains' },
        amount: { value: null, matchMode: 'contains' },
        units: { value: null, matchMode: 'contains' },
        tonnes: { value: null, matchMode: 'contains' },
        leadStage: { value: null, matchMode: 'contains' },
        closeDate: { value: null, matchMode: 'contains' }
    },
    isFormSubmit: false
};

export const dashboardOpportunityAnalysisSlice = createSlice({
    name: 'dashboard-opportunity-analysis',
    initialState,
    reducers: {
        setOpportunityStage: (state, action) => {
            state.opportunityStage = action.payload;
        },
        setSelectedOpportunityAnalysis: (state, action) => {
            state.selectedOpportunityAnalysis = action.payload;
        },
        setSelectedOriginatorOpportunityAnalysis: (state, action) => {
            state.selectedOriginatorOpportunityAnalysis = action.payload;
        },
        setIsDashboardOpportunityAnalysisFetch: (state, action) => {
            state.isDashboardOpportunityAnalysisFetch = action.payload;
        },
        setIsDashboardOpportunityAnalysisFetchHeader: (state, action) => {
            state.isDashboardOpportunityAnalysisFetchHeader = action.payload;
        },
        setOpportunityAnalysisTableFilters: (state, action) => {
            state.opportunityAnalysisTableFilters = action.payload;
        },
        setTriggerOpportunityAnalysisFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setOpportunityStage, setSelectedOpportunityAnalysis, setSelectedOriginatorOpportunityAnalysis, setIsDashboardOpportunityAnalysisFetch, setIsDashboardOpportunityAnalysisFetchHeader, setOpportunityAnalysisTableFilters, setTriggerOpportunityAnalysisFormSubmit } = dashboardOpportunityAnalysisSlice.actions;

export default dashboardOpportunityAnalysisSlice.reducer;
