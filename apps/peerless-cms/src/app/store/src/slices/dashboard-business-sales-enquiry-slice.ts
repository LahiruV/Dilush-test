import { DropDownData, Originator } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashBoardBusinessSalesEnquiryState {
    businessSalesEnqSales: DropDownData;
    businessSalesEnqSortBy: DropDownData;
    businessSalesEnqGroupBy: DropDownData;
    businessSalesmarket: DropDownData;
    businessSalesiCostPeriod: DropDownData;
    businessSalesYear: DropDownData;
    isBusinessSalesEnqListFetch: boolean;
    selectedOriginatorBusinessSalesEnquiry: Originator;
    isFormSubmit: boolean;
}

const initialState: DashBoardBusinessSalesEnquiryState = {
    businessSalesEnqSales: { id: 0, text: '', value: '' } as DropDownData,
    businessSalesEnqSortBy: { id: 0, text: '', value: '' } as DropDownData,
    businessSalesEnqGroupBy: { id: 0, text: '', value: '' } as DropDownData,
    businessSalesmarket: { id: 0, text: '', value: '' } as DropDownData,
    businessSalesiCostPeriod: { id: 0, text: '', value: '11' } as DropDownData,
    businessSalesYear: { id: 0, text: 'This Year', value: 'thisYear' } as DropDownData,
    isBusinessSalesEnqListFetch: false,
    selectedOriginatorBusinessSalesEnquiry: { userName: '' } as Originator,
    isFormSubmit: false,
};

export const dashBoardBusinessSalesEnquiry = createSlice({
    name: 'dashboard-business-sales-enquiry',
    initialState,
    reducers: {
        setBusinessSalesEnqSales: (state, action) => {
            state.businessSalesEnqSales = action.payload;
        },
        setBusinessSalesEnqSortBy: (state, action) => {
            state.businessSalesEnqSortBy = action.payload;
        },
        setBusinessSalesEnqGroupBy: (state, action) => {
            state.businessSalesEnqGroupBy = action.payload;
        },
        setIsBusinessSalesEnqListFetch: (state, action) => {
            state.isBusinessSalesEnqListFetch = action.payload;
        },
        setSelectedOriginatorBusinessSalesEnquiry: (state, action) => {
            state.selectedOriginatorBusinessSalesEnquiry = action.payload;
        },
        setTriggerBusinessSalesEnqFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        },
        setBusinessSalesmarket: (state, action) => {
            state.businessSalesmarket = action.payload;
        },
        setBusinessSalesiCostPeriod: (state, action) => {
            state.businessSalesiCostPeriod = action.payload;
        },
        setBusinessSalesYear: (state, action) => {
            state.businessSalesYear = action.payload;
        },
    },
});

export const { setBusinessSalesEnqSales, setBusinessSalesEnqSortBy, setBusinessSalesEnqGroupBy, setIsBusinessSalesEnqListFetch, setSelectedOriginatorBusinessSalesEnquiry, setTriggerBusinessSalesEnqFormSubmit, setBusinessSalesmarket, setBusinessSalesiCostPeriod, setBusinessSalesYear } = dashBoardBusinessSalesEnquiry.actions;

export default dashBoardBusinessSalesEnquiry.reducer;
