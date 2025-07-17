import { DropDownData, Originator } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';

interface DashOpportunityConversionState {
    opportunityConversionStartDate: string;
    opportunityConversionEndDate: string;
    opportunityConversionReps: DropDownData;
    opportunityConversionState: DropDownData;
    opportunityConversionMarket: DropDownData;
    selectedOriginatorOpportunityConversion: Originator;
    childOriginatorsOpportunityConversion: string;
    isLeaderCustomerOpportunityFetch: boolean;
    isLeaderCustomerOpportunityFetchCount: boolean;
    isFormSubmit: boolean;
}

const subtractMonths = (date: Date, months: number): Date => {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() - months);
    return newDate;
};

const endDate = new Date();
const startDate = subtractMonths(endDate, 12);

const initialState: DashOpportunityConversionState = {
    opportunityConversionStartDate: startDate.toISOString(),
    opportunityConversionEndDate: endDate.toISOString(),
    opportunityConversionReps: '' as any,
    opportunityConversionState: { id: 0, text: 'ALL', value: '-ALL-' } as DropDownData,
    opportunityConversionMarket: { id: 0, text: 'ALL', value: 'ALL' } as DropDownData,
    selectedOriginatorOpportunityConversion: { repType: '' } as Originator,
    childOriginatorsOpportunityConversion: '',
    isLeaderCustomerOpportunityFetch: false,
    isLeaderCustomerOpportunityFetchCount: false,
    isFormSubmit: false
};

export const dashBoardOpportunityConversionSlice = createSlice({
    name: 'dashboard-opportunity-conversion',
    initialState,
    reducers: {
        setOpportunityConversionStartDate: (state, action) => {
            state.opportunityConversionStartDate = action.payload;
        },
        setOpportunityConversionEndDate: (state, action) => {
            state.opportunityConversionEndDate = action.payload;
        },
        setOpportunityConversionReps: (state, action) => {
            state.opportunityConversionReps = action.payload;
        },
        setOpportunityConversionState: (state, action) => {
            state.opportunityConversionState = action.payload;
        },
        setOpportunityConversionMarket: (state, action) => {
            state.opportunityConversionMarket = action.payload;
        },
        setSelectedOriginatorOpportunityConversion: (state, action) => {
            state.selectedOriginatorOpportunityConversion = action.payload;
        },
        setChildOriginatorsOpportunityConversion: (state, action) => {
            state.childOriginatorsOpportunityConversion = action.payload;
        },
        setIsLeaderCustomerOpportunityFetch: (state, action) => {
            state.isLeaderCustomerOpportunityFetch = action.payload
        },
        setIsLeaderCustomerOpportunityFetchCount: (state, action) => {
            state.isLeaderCustomerOpportunityFetchCount = action.payload
        },
        setTriggerOpportunityConversionFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setOpportunityConversionStartDate, setOpportunityConversionEndDate, setOpportunityConversionReps, setOpportunityConversionState, setOpportunityConversionMarket, setIsLeaderCustomerOpportunityFetch, setSelectedOriginatorOpportunityConversion, setChildOriginatorsOpportunityConversion, setIsLeaderCustomerOpportunityFetchCount, setTriggerOpportunityConversionFormSubmit } = dashBoardOpportunityConversionSlice.actions;

export default dashBoardOpportunityConversionSlice.reducer;
