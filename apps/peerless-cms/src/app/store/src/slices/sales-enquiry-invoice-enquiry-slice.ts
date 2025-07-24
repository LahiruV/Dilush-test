import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

const date = new Date();

interface SalesEnquiryInvoiceEnquiryState {
    invoiceCustomerGroup: DropDownData;
    invoiceSubGroup: DropDownData;
    invoicePriceGroup: DropDownData;
    invoiceProductGroup: DropDownData;
    invoiceParent: DropDownData;
    invoiceMarket: DropDownData;
    invoiceRep: DropDownData;
    invoiceCatalogueType: DropDownData;
    invoiceState: DropDownData;
    invoiceBrand: DropDownData;
    invoiceCustomer: DropDownData;
    invoiceFromDate: string;
    invoiceToDate: string;
    invoiceInvoiceNumber: '',
    invoiceBatchNumber: string;
    invoiceRadio: string;
    invoiceRadio2: string;
    isFetchingInvoiceEnquiryList: boolean;
    isFormSubmit: boolean;
    selectedInvoiceEnquiry: any;
    invoiceEnquiryTotalsData: any;
}

const initialState: SalesEnquiryInvoiceEnquiryState = {
    invoiceCustomerGroup: {} as DropDownData,
    invoiceSubGroup: {} as DropDownData,
    invoicePriceGroup: {} as DropDownData,
    invoiceProductGroup: {} as DropDownData,
    invoiceParent: {} as DropDownData,
    invoiceMarket: {} as DropDownData,
    invoiceRep: {} as DropDownData,
    invoiceCatalogueType: {} as DropDownData,
    invoiceState: {} as DropDownData,
    invoiceBrand: {} as DropDownData,
    invoiceCustomer: {} as DropDownData,
    invoiceFromDate: date.toISOString(),
    invoiceToDate: date.toISOString(),
    invoiceInvoiceNumber: '',
    invoiceBatchNumber: '',
    invoiceRadio: '',
    invoiceRadio2: '',
    isFetchingInvoiceEnquiryList: false,
    isFormSubmit: false,
    selectedInvoiceEnquiry: null,
    invoiceEnquiryTotalsData: null,
};

export const salesEnquiryInvoiceEnquirySlice = createSlice({
    name: 'sales-enquiry-invoice-enquiry-slice',
    initialState,
    reducers: {
        setInvoiceCustomerGroup: (state, action) => {
            state.invoiceCustomerGroup = action.payload
        },
        setInvoiceSubGroup: (state, action) => {
            state.invoiceSubGroup = action.payload
        },
        setInvoicePriceGroup: (state, action) => {
            state.invoicePriceGroup = action.payload
        },
        setInvoiceProductGroup: (state, action) => {
            state.invoiceProductGroup = action.payload
        },
        setInvoiceParent: (state, action) => {
            state.invoiceParent = action.payload
        },
        setInvoiceMarket: (state, action) => {
            state.invoiceMarket = action.payload
        },
        setInvoiceRep: (state, action) => {
            state.invoiceRep = action.payload
        },
        setInvoiceCatalogueType: (state, action) => {
            state.invoiceCatalogueType = action.payload
        },
        setInvoiceState: (state, action) => {
            state.invoiceState = action.payload
        },
        setInvoiceBrand: (state, action) => {
            state.invoiceBrand = action.payload
        },
        setInvoiceCustomer: (state, action) => {
            state.invoiceCustomer = action.payload
        },
        setInvoiceFromDate: (state, action) => {
            state.invoiceFromDate = action.payload
        },
        setInvoiceToDate: (state, action) => {
            state.invoiceToDate = action.payload
        },
        setInvoiceInvoiceNumber: (state, action) => {
            state.invoiceInvoiceNumber = action.payload
        },
        setInvoiceBatchNumber: (state, action) => {
            state.invoiceBatchNumber = action.payload
        },
        setInvoiceRadio: (state, action) => {
            state.invoiceRadio = action.payload
        },
        setInvoiceRadio2: (state, action) => {
            state.invoiceRadio2 = action.payload
        },
        setIsFetchingInvoiceEnquiryList: (state, action) => {
            state.isFetchingInvoiceEnquiryList = action.payload            
        },
        setTriggerInvoiceEnquiryFiltersFormSubmit: (state,action) => {
            state.isFormSubmit = action.payload;            
        },
        setSelectedInvoiceEnquiry: (state, action) => {
            state.selectedInvoiceEnquiry = action.payload;
        },
        setInvoiceEnquiryTotalsData: (state, action) => {
            state.invoiceEnquiryTotalsData = action.payload;
        }
    }
});

export const { setInvoiceCustomerGroup, setInvoiceSubGroup, setInvoicePriceGroup, setInvoiceProductGroup, setInvoiceParent, setInvoiceMarket, setInvoiceRep, setInvoiceCatalogueType, setInvoiceState, setInvoiceBrand, setInvoiceCustomer, setInvoiceFromDate, setInvoiceToDate, setInvoiceInvoiceNumber, setInvoiceBatchNumber, setInvoiceRadio, setInvoiceRadio2, setIsFetchingInvoiceEnquiryList, setTriggerInvoiceEnquiryFiltersFormSubmit, setSelectedInvoiceEnquiry, setInvoiceEnquiryTotalsData } = salesEnquiryInvoiceEnquirySlice.actions;

export default salesEnquiryInvoiceEnquirySlice.reducer;
