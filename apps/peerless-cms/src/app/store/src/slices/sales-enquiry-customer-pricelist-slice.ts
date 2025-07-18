import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface SalesEnquiryPriceListState {
    customerPriceListMainDrop: DropDownData;
    customerPriceListRepGroup: DropDownData; // removed from active use
    customerPriceListMainDropType: DropDownData;
    customerPriceListCustomerCode: DropDownData;
    customerPriceListEffectiveDate: DropDownData;
    customerPriceListAsAtDate: string;
    customerPriceListEndDate: string;
    isFetchingCustomerPriceList: boolean;
    isFormSubmit: boolean;
}

const initialState: SalesEnquiryPriceListState = {
    customerPriceListMainDrop: {id: 0, text: '', value: ''} as DropDownData,
    customerPriceListRepGroup: { id: 0, text: '', value: '' } as DropDownData, // removed from active use
    customerPriceListMainDropType: { id: 0, text: '', value: '' } as DropDownData,
    customerPriceListCustomerCode: { id: 0, text: '', value: '' } as DropDownData,
    customerPriceListEffectiveDate: { id: 0, text: '', value: '' } as DropDownData,
    customerPriceListAsAtDate: '',
    customerPriceListEndDate: '',
    isFetchingCustomerPriceList: false,
    isFormSubmit: false
};

export const salesEnquiryCustomerPriceListSlice = createSlice({
    name: 'sales-enquiry-customer-pricelist-slice',
    initialState,
    reducers: {
        setCustomerPriceListMainDrop: (state, action) => {
            state.customerPriceListMainDrop = action.payload
        },
        setCustomerPriceListRepGroup: (state, action) => { // removed from active use
            state.customerPriceListRepGroup = action.payload
        },
        setCustomerPriceListMainDropType: (state, action) => {
            state.customerPriceListMainDropType = action.payload
        },
        setCustomerPriceListCustomerCode: (state, action) => {
            state.customerPriceListCustomerCode = action.payload
        },
        setCustomerPriceListEffectiveDate: (state, action) => {
            state.customerPriceListEffectiveDate = action.payload
        },
        setCustomerPriceListAsAtDate: (state, action) => {
            state.customerPriceListAsAtDate = action.payload
        },
        setCustomerPriceListEndDate: (state, action) => {
            state.customerPriceListEndDate = action.payload
        },
        setIsFetchingCustomerPriceList: (state, action) => {
            state.isFetchingCustomerPriceList = action.payload
        },
        setTriggerCustomerPriceListFiltersFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload
        }
    }
});

export const { setCustomerPriceListMainDrop, setCustomerPriceListRepGroup, setCustomerPriceListMainDropType, setCustomerPriceListAsAtDate, setCustomerPriceListCustomerCode, setCustomerPriceListEffectiveDate, setCustomerPriceListEndDate, setIsFetchingCustomerPriceList, setTriggerCustomerPriceListFiltersFormSubmit } = salesEnquiryCustomerPriceListSlice.actions;

export default salesEnquiryCustomerPriceListSlice.reducer;
