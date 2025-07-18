import { DropDownData } from "@peerless/models";
import { createSlice } from "@reduxjs/toolkit";

export interface ClaimFilter{
    fromDate: string,
    toDate: string,
    product?: any,
    reason?: any,
    parent?: any,
    subParent?: any,
    subParentGroup?: any,
    rep?: any,
    promo?: any,
    showQpr?: any,
    forProcessing?: any,
    processingStatus?: any,
    customer?: any,
    payMethod?: any,
    claimType?: any,
    claimStatus?: any,
}

const date = new Date();

interface ClaimsEnquiryFilterState {    
    fromDate: string,
    toDate: string,
    product: null | DropDownData,
    reason: null| DropDownData,
    parent: null| DropDownData,
    subParent: null|DropDownData,
    subParentGroup: null|DropDownData,
    rep: null | DropDownData,
    promo: string,
    customer: null | DropDownData,
    payMethod: DropDownData,
    claimType: DropDownData,
    claimStatus: DropDownData,
    isFetchingClaimsEnquiryList: boolean;
    // claimFilters: ClaimFilter|null;
    selectedClaim: any;
    isFormSubmit: boolean;
    claimEnquiryTotalsData: any;
}

const initialState: ClaimsEnquiryFilterState = {  
    fromDate: date.toISOString(),
    toDate: date.toISOString(),
    customer: null,
    product: null,
    reason: null,
    parent: {} as DropDownData,
    subParent: {} as DropDownData,  
    subParentGroup: {} as DropDownData,
    rep: {} as DropDownData,
    promo: '',
    payMethod: {} as DropDownData,
    claimType: {} as DropDownData,
    claimStatus: {} as DropDownData,
    isFetchingClaimsEnquiryList: false,
    // claimFilters: {
    //     fromDate: date.toISOString(), 
    //     toDate: date.toISOString(),        
    // },
    selectedClaim: null,
    isFormSubmit: false,
    claimEnquiryTotalsData: null
};

export const claimsEnquiryFilterSlice = createSlice({
    name: 'claims-enquiry-slice',
    initialState,
    reducers: {
        setClaimsEnquiryFromDate: (state, action) => {
            state.fromDate = action.payload;
        },
        setClaimsEnquiryToDate: (state, action) => {
            state.toDate = action.payload;
        },
        setClaimsEnquiryCustomer: (state, action) => {
            state.customer = action.payload;
        },
        setClaimsEnquiryProduct: (state, action) => {
            state.product = action.payload;
        },
        setClaimsEnquiryReason: (state, action) => {
            state.reason = action.payload;
        },
        setClaimsEnquiryParent: (state, action) => {
            state.parent = action.payload;
        },
        setClaimsEnquirySubParent: (state, action) => {
            state.subParent = action.payload;
        },
        setClaimsEnquirySubParentGroup: (state, action) => {
            state.subParentGroup = action.payload;
        },
        setClaimsEnquiryRep: (state, action) => {
            state.rep = action.payload;
        },
        setClaimsEnquiryPromo: (state, action) => {
            state.promo = action.payload;
        },
        setClaimsEnquiryPayMethod: (state, action) => {
            state.payMethod = action.payload;
        },
        setClaimsEnquiryClaimType: (state, action) => {
            state.claimType = action.payload;
        },
        setClaimsEnquiryClaimStatus: (state, action) => {
            state.claimStatus = action.payload;
        },
        setIsFetchingClaimsEnquiryList: (state, action) => {
            state.isFetchingClaimsEnquiryList = action.payload
        },
        setSelectedClaim: (state, action) => {
            state.selectedClaim = action.payload
        },
        // setClaimFilters: (state, action) => {
        //     state.claimFilters = action.payload
        // },
        setTriggerClaimsEnquiryFiltersFormSubmit: (state,action) => {
            state.isFormSubmit = action.payload;
        },
         setClaimEnquiryTotalsData: (state, action) => {
            state.claimEnquiryTotalsData = action.payload;
        }
    }
});

export const { setIsFetchingClaimsEnquiryList, setSelectedClaim, setTriggerClaimsEnquiryFiltersFormSubmit, setClaimEnquiryTotalsData, setClaimsEnquiryClaimStatus,setClaimsEnquiryClaimType,setClaimsEnquiryCustomer,setClaimsEnquiryFromDate,setClaimsEnquiryParent,setClaimsEnquiryPayMethod,setClaimsEnquiryProduct,setClaimsEnquiryPromo,setClaimsEnquiryReason,setClaimsEnquiryRep,setClaimsEnquirySubParent,setClaimsEnquirySubParentGroup,setClaimsEnquiryToDate } = claimsEnquiryFilterSlice.actions;

export default claimsEnquiryFilterSlice.reducer;