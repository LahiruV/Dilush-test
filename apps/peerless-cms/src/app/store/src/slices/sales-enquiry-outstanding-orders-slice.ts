import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface SalesEnquiryOutstandingOrdersState {
    outstandingOrdersCustomer: DropDownData;
    outstandingOrdersCustomerGroup: DropDownData;
    outstandingOrdersSubGroup: DropDownData;
    outstandingOrdersPriceGroup: DropDownData;
    outstandingOrdersParent: DropDownData;
    outstandingOrdersMarket: DropDownData;
    outstandingOrdersRep: DropDownData;
    outstandingOrdersExDc: DropDownData;
    outstandingOrdersCatalogueType: DropDownData;
    outstandingOrdersOrderType: DropDownData;
    outstandingOrdersStates: DropDownData;
    outstandingOrdersSubParent: DropDownData;
    outstandingOrdersFromDate: string;
    outstandingOrdersToDate: string;
    outstandingOrdersRadio: string;
    outstandingOrdersCurrentOrCompleted: DropDownData;
    outstandingOrdersBackOrderOnly: boolean;
    isFetchingOutstandingOrdersList: boolean;
    isFormSubmit: boolean;
    isDateDisabledOutStandingOrders: boolean;
    outstandingOrdersCustOrderNo: string;
    outstandingOrdersOrderNumber: string;
    outstandingOrdersProductCode: string;
}

const initialState: SalesEnquiryOutstandingOrdersState = {
    outstandingOrdersCustomer: {} as DropDownData,
    outstandingOrdersCustomerGroup: {} as DropDownData,
    outstandingOrdersSubGroup: {} as DropDownData,
    outstandingOrdersPriceGroup: {} as DropDownData,
    outstandingOrdersParent: {} as DropDownData,
    outstandingOrdersMarket: {} as DropDownData,
    outstandingOrdersRep: {} as DropDownData,
    outstandingOrdersExDc: {} as DropDownData,
    outstandingOrdersCatalogueType: {} as DropDownData,
    outstandingOrdersOrderType: {} as DropDownData,
    outstandingOrdersStates: {} as DropDownData,
    outstandingOrdersSubParent: {} as DropDownData,
    outstandingOrdersFromDate: '',
    outstandingOrdersToDate: '',
    outstandingOrdersRadio: '',
    outstandingOrdersCurrentOrCompleted: {} as DropDownData,
    outstandingOrdersBackOrderOnly: false,
    isFetchingOutstandingOrdersList: false,
    isFormSubmit: false,
    isDateDisabledOutStandingOrders: false,
    outstandingOrdersCustOrderNo: '',
    outstandingOrdersOrderNumber: '',
    outstandingOrdersProductCode: ''
};

export const salesEnquiryOutstandingOrdersSlice = createSlice({
    name: 'sales-enquiry-outstanding-orders-slice',
    initialState,
    reducers: {
        setOutstandingOrdersCustomer: (state, action) => {
            state.outstandingOrdersCustomer = action.payload
        },
        setOutstandingOrdersCustomerGroup: (state, action) => {
            state.outstandingOrdersCustomerGroup = action.payload
        },
        setOutstandingOrdersSubGroup: (state, action) => {
            state.outstandingOrdersSubGroup = action.payload
        },
        setOutstandingOrdersPriceGroup: (state, action) => {
            state.outstandingOrdersPriceGroup = action.payload
        },
        setOutstandingOrdersParent: (state, action) => {
            state.outstandingOrdersParent = action.payload
        },
        setOutstandingOrdersMarket: (state, action) => {
            state.outstandingOrdersMarket = action.payload
        },
        setOutstandingOrdersRep: (state, action) => {
            state.outstandingOrdersRep = action.payload
        },
        setOutstandingOrdersExDc: (state, action) => {
            state.outstandingOrdersExDc = action.payload
        },
        setOutstandingOrdersCatalogueType: (state, action) => {
            state.outstandingOrdersCatalogueType = action.payload
        },
        setOutstandingOrdersOrderType: (state, action) => {
            state.outstandingOrdersOrderType = action.payload
        },
        setOutstandingOrdersStates: (state, action) => {
            state.outstandingOrdersStates = action.payload
        },
        setOutstandingOrdersFromDate: (state, action) => {
            state.outstandingOrdersFromDate = action.payload
        },
        setOutstandingOrdersToDate: (state, action) => {
            state.outstandingOrdersToDate = action.payload
        },
        setOutstandingOrdersRadio: (state, action) => {
            state.outstandingOrdersRadio = action.payload
        },
        setOutstandingOrdersCurrentOrCompleted: (state, action) => {
            state.outstandingOrdersCurrentOrCompleted = action.payload
        },
        setOutstandingOrdersBackOrderOnly: (state, action) => {
            state.outstandingOrdersBackOrderOnly = action.payload
        },
        setIsFetchingOutstandingOrdersList: (state, action) => {
            state.isFetchingOutstandingOrdersList = action.payload
        },
        setTriggerOutstandingOrdersFiltersFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        },
        setOutstandingOrdersSubParent: (state, action) => {
            state.outstandingOrdersSubParent = action.payload;
        },
        setIsDateDisabledOutStandingOrders: (state, action) => {
            state.isDateDisabledOutStandingOrders = action.payload;
        },
        setOutstandingOrdersCustOrderNo: (state, action) => {
            state.outstandingOrdersCustOrderNo = action.payload;
        },
        setOutstandingOrdersOrderNumber: (state, action) => {
            state.outstandingOrdersOrderNumber = action.payload;
        },
        setOutstandingOrdersProductCode: (state, action) => {
            state.outstandingOrdersProductCode = action.payload;
        },
    }
});

export const { setOutstandingOrdersCustomer, setOutstandingOrdersCustomerGroup, setOutstandingOrdersSubGroup, setOutstandingOrdersPriceGroup, setOutstandingOrdersParent, setOutstandingOrdersMarket, setOutstandingOrdersRep, setOutstandingOrdersExDc, setOutstandingOrdersCatalogueType, setOutstandingOrdersOrderType, setOutstandingOrdersStates, setOutstandingOrdersFromDate, setOutstandingOrdersToDate, setOutstandingOrdersRadio, setOutstandingOrdersCurrentOrCompleted, setOutstandingOrdersBackOrderOnly, setIsFetchingOutstandingOrdersList, setTriggerOutstandingOrdersFiltersFormSubmit, setOutstandingOrdersSubParent, setIsDateDisabledOutStandingOrders, setOutstandingOrdersCustOrderNo, setOutstandingOrdersOrderNumber, setOutstandingOrdersProductCode } = salesEnquiryOutstandingOrdersSlice.actions;

export default salesEnquiryOutstandingOrdersSlice.reducer;
