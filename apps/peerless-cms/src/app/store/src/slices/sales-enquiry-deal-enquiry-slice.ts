import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface SalesEnquiryDealEnquiryState {
    dealEnquiryParentDrop: DropDownData;
    dealEnquirySubParentDrop: DropDownData;
    dealEnquirySubGroupDrop: DropDownData;
    dealEnquiryPriceGroupDrop: DropDownData;
    dealEnquiryMarketDrop: DropDownData;
    dealEnquiryRepDrop: DropDownData;
    dealEnquiryStatesDrop: DropDownData;
    dealCatalogueType: DropDownData;
    dealEnquiryAsAtDate: string;
    showForwardDeals: boolean;
    isFetchingDealEnquiryList: boolean;
    isFormSubmit: boolean;
}

const initialState: SalesEnquiryDealEnquiryState = {
    dealEnquiryParentDrop: {} as DropDownData,
    dealEnquirySubParentDrop: {} as DropDownData,
    dealEnquirySubGroupDrop: {} as DropDownData,
    dealEnquiryPriceGroupDrop: {} as DropDownData,
    dealEnquiryMarketDrop: {} as DropDownData,
    dealEnquiryRepDrop: {} as DropDownData,
    dealEnquiryStatesDrop: {} as DropDownData,
    dealCatalogueType: {} as DropDownData,
    dealEnquiryAsAtDate: '',
    showForwardDeals: true,
    isFetchingDealEnquiryList: false,
    isFormSubmit: false
};

export const salesEnquiryDealEnquirySlice = createSlice({
    name: 'sales-enquiry-deal-enquiry-slice',
    initialState,
    reducers: {
        setDealEnquiryParentDrop: (state, action) => {
            state.dealEnquiryParentDrop = action.payload
        },
        setDealEnquirySubGroupDrop: (state, action) => {
            state.dealEnquirySubGroupDrop = action.payload
        },
        setDealEnquirySubParentDrop: (state, action) => {
            state.dealEnquirySubParentDrop = action.payload
        },
        setDealEnquiryPriceGroupDrop: (state, action) => {
            state.dealEnquiryPriceGroupDrop = action.payload
        },
        setDealEnquiryMarketDrop: (state, action) => {
            state.dealEnquiryMarketDrop = action.payload
        },
        setDealEnquiryRepDrop: (state, action) => {
            state.dealEnquiryRepDrop = action.payload
        },
        setDealEnquiryStatesDrop: (state, action) => {
            state.dealEnquiryStatesDrop = action.payload
        },
        setDealCatalogueType: (state, action) => {
            state.dealCatalogueType = action.payload
        },
        setDealEnquiryAsAtDate: (state, action) => {
            state.dealEnquiryAsAtDate = action.payload
        },
        setShowForwardDeals: (state, action) => {
            state.showForwardDeals = action.payload
        },
        setIsFetchingDealEnquiryList: (state, action) => {
            state.isFetchingDealEnquiryList = action.payload
        },
        setTriggerDealEnquiryFiltersFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    }
});

export const { setDealEnquiryParentDrop, setDealEnquirySubParentDrop, setDealEnquirySubGroupDrop, setDealEnquiryPriceGroupDrop, setDealEnquiryMarketDrop, setDealEnquiryRepDrop, setDealEnquiryStatesDrop, setDealCatalogueType, setDealEnquiryAsAtDate, setIsFetchingDealEnquiryList, setShowForwardDeals, setTriggerDealEnquiryFiltersFormSubmit } = salesEnquiryDealEnquirySlice.actions;

export default salesEnquiryDealEnquirySlice.reducer;
