import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';
import { set } from 'date-fns';

interface QuarterlyUnitSales {
    isquarterlyUnitSalesTable: boolean;
    quarterlyUnitSalesPeriod: DropDownData,
    quarterlyUnitSalesYear: DropDownData;
    quarterlyUnitSalesForGrowth: any;
    quarterlyUnitSalesApplyRebate: any;
    quarterlyUnitSalesParent: DropDownData;
    quarterlyUnitSalesSubParent: DropDownData;
    quarterlyUnitSalesSubParentGroup: DropDownData;
    quarterlyUnitSalesReportNo: any;
    quarterlyUnitSalesReportCust: DropDownData;
    quarterlyUnitSalesCustomer: DropDownData;
    quarterlyUnitSalesRep: DropDownData;
    quarterlyUnitSalesState: DropDownData;
    quarterlyUnitSalesDisplay: DropDownData;
}

const initialState: QuarterlyUnitSales = {
    isquarterlyUnitSalesTable: false,
    quarterlyUnitSalesPeriod: { text: '', value: '', id: 0 },
    quarterlyUnitSalesYear: { text: '', value: '', id: 0 },
    quarterlyUnitSalesForGrowth: '',
    quarterlyUnitSalesApplyRebate: '',
    quarterlyUnitSalesParent: { text: '', value: '', id: 0 },
    quarterlyUnitSalesSubParent: { text: '', value: '', id: 0 },
    quarterlyUnitSalesSubParentGroup: { text: '', value: '', id: 0 },
    quarterlyUnitSalesReportNo: { text: '', value: '', id: 0, custCode: '' },
    quarterlyUnitSalesReportCust: { text: '', value: '', id: 0 },
    quarterlyUnitSalesCustomer: { text: '', value: '', id: 0 },
    quarterlyUnitSalesRep: { text: '', value: '', id: 0 },
    quarterlyUnitSalesState: { text: '', value: '', id: 0 },
    quarterlyUnitSalesDisplay: { text: '', value: '', id: 0 }
};

export const quarterlyUnitSalesSlice = createSlice({
    name: 'quarterly-unit-sales',
    initialState,
    reducers: {
        setIsquarterlyUnitSalesTable: (state, action) => {
            state.isquarterlyUnitSalesTable = action.payload;
        },
        setQuarterlyUnitSalesPeriod: (state, action) => {
            state.quarterlyUnitSalesPeriod = action.payload;
        },
        setQuarterlyUnitSalesYear: (state, action) => {
            state.quarterlyUnitSalesYear = action.payload;
        },
        setQuarterlyUnitSalesForGrowth: (state, action) => {
            state.quarterlyUnitSalesForGrowth = action.payload;
        },
        setQuarterlyUnitSalesApplyRebate: (state, action) => {
            state.quarterlyUnitSalesApplyRebate = action.payload;
        },
        setQuarterlyUnitSalesParent: (state, action) => {
            state.quarterlyUnitSalesParent = action.payload;
        },
        setQuarterlyUnitSalesSubParent: (state, action) => {
            state.quarterlyUnitSalesSubParent = action.payload;
        },
        setQuarterlyUnitSalesSubParentGroup: (state, action) => {
            state.quarterlyUnitSalesSubParentGroup = action.payload;
        },
        setQuarterlyUnitSalesReportNo: (state, action) => {
            state.quarterlyUnitSalesReportNo = action.payload;
        },
        setQuarterlyUnitSalesReportCust: (state, action) => {
            state.quarterlyUnitSalesReportCust = action.payload;
        },
        setQuarterlyUnitSalesCustomer: (state, action) => {
            state.quarterlyUnitSalesCustomer = action.payload;
        },
        setQuarterlyUnitSalesRep: (state, action) => {
            state.quarterlyUnitSalesRep = action.payload;
        },
        setQuarterlyUnitSalesState: (state, action) => {
            state.quarterlyUnitSalesState = action.payload;
        },
        setQuarterlyUnitSalesDisplay: (state, action) => {
            state.quarterlyUnitSalesDisplay = action.payload;
        }
    }
});

export const {
    setIsquarterlyUnitSalesTable,
    setQuarterlyUnitSalesPeriod,
    setQuarterlyUnitSalesYear,
    setQuarterlyUnitSalesForGrowth,
    setQuarterlyUnitSalesApplyRebate,
    setQuarterlyUnitSalesParent,
    setQuarterlyUnitSalesSubParent,
    setQuarterlyUnitSalesSubParentGroup,
    setQuarterlyUnitSalesReportNo,
    setQuarterlyUnitSalesReportCust,
    setQuarterlyUnitSalesCustomer,
    setQuarterlyUnitSalesRep,
    setQuarterlyUnitSalesState,
    setQuarterlyUnitSalesDisplay
} = quarterlyUnitSalesSlice.actions;

export default quarterlyUnitSalesSlice.reducer;
