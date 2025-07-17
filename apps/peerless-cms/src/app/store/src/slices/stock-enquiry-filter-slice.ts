import { DropDownData } from "@peerless/models";
import { createSlice } from "@reduxjs/toolkit";

export interface StockEnquiryFilter{
    productCode: string;
    productType: any;
    targetMarket: any;
    productOwner: any;
    market: any;
    exdc: any;
    view: any;
    dateType: any;
    showWip: any;
    showPromoForecast: any;
    showPromoSales: any;
    critical: any;
    short: any;
    exportedProductsOnly: any;
}

interface StockEnquiryFilterState {    
    productCode: null | DropDownData;
    productType: DropDownData;
    productOwner: null | DropDownData;
    market: null | DropDownData;
    targetMarket: null | DropDownData;
    exdc: DropDownData;
    view: DropDownData;
    dateType: string;
    showWip: boolean;
    showPromoForecast: boolean;
    showPromoSales: boolean;
    critical: boolean;
    short: boolean;
    exportedProductsOnly: boolean;
    isFetchingStockEnquiryList: boolean;
    stockEnqFilters: StockEnquiryFilter|null;
    selectedStockEnquiry: any;
    isFormSubmit: boolean;
}

const initialState: StockEnquiryFilterState = {    
    productCode: null,
    productType: {text: 'Refinery', value: 'F' } as DropDownData,
    productOwner: null,
    market: null,
    targetMarket: null,
    exdc: {} as DropDownData,
    view: { text: 'Weekly', value: 'W' } as DropDownData,
    dateType: 'N',
    showWip: false,
    showPromoForecast: false,
    showPromoSales: false,
    critical: false,
    short: false,
    exportedProductsOnly: false,
    isFetchingStockEnquiryList: false,
    stockEnqFilters: null,
    selectedStockEnquiry: null,
    isFormSubmit: false
};

export const stockEnquiryFilterSlice = createSlice({
    name: 'stock-enquiry-filter-slice',
    initialState,
    reducers: {
        setStockEnqProductCode: (state, action) => {
            state.productCode = action.payload
        },
        setStockEnqProductType: (state, action) => {
            state.productType = action.payload
        },
        setStockEnqProductOwner: (state, action) => {
            state.productOwner = action.payload
        },
        setStockEnqMarket: (state, action) => {
            state.market = action.payload
        },
        setStockEnqTargetMarket: (state, action) => {
            state.targetMarket = action.payload
        },
        setStockEnqExdc: (state, action) => {
            state.exdc = action.payload
        },
        setStockEnqView: (state, action) => {
            state.view = action.payload
        },
        setStockEnqDateType: (state, action) => {
            state.dateType = action.payload
        },
        setStockEnqShowWip: (state, action) => {
            state.showWip = action.payload
        },
        setStockEnqShowPromoForecast: (state, action) => {
            state.showPromoForecast = action.payload
        },
        setStockEnqShowPromoSales: (state, action) => {
            state.showPromoSales = action.payload
        },
        setStockEnqCritical: (state, action) => {
            state.critical = action.payload
        },
        setStockEnqShort: (state, action) => {
            state.short = action.payload
        },
        setStockEnqExportedProductsOnly: (state, action) => {
            state.exportedProductsOnly = action.payload
        },
        setIsFetchingStockEnquiryList: (state, action) => {
            state.isFetchingStockEnquiryList = action.payload
        },
        setSelectedStockEnquiry: (state, action) => {
            state.selectedStockEnquiry = action.payload
        },
        setStockEnqFilters: (state, action) => {
            state.stockEnqFilters = action.payload
        },
        setTriggerStockEnquiryFiltersFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    }
});

export const { setIsFetchingStockEnquiryList, setSelectedStockEnquiry, setStockEnqFilters, setTriggerStockEnquiryFiltersFormSubmit, setStockEnqProductCode,setStockEnqCritical,setStockEnqDateType,setStockEnqExdc,setStockEnqExportedProductsOnly,setStockEnqMarket,setStockEnqProductOwner,setStockEnqProductType, setStockEnqShort,setStockEnqShowPromoForecast,setStockEnqShowPromoSales,setStockEnqShowWip,setStockEnqTargetMarket, setStockEnqView } = stockEnquiryFilterSlice.actions;

export default stockEnquiryFilterSlice.reducer;