import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashEndUserPriceState {
    repCodeEndUserPrice: DropDownData;
    baseCodeEndUserPrice: DropDownData;
    asAtDateEndUserPrice: string;
    isFetchEndUserPriceList: boolean;
    isFetchEndUserPriceListReport: boolean;
    isPdfView: boolean;
    isFormSubmit: boolean;
}

const initialState: DashEndUserPriceState = {
    repCodeEndUserPrice: { id: 0, text: '', value: '' },
    baseCodeEndUserPrice: { id: 0, text: '', value: '' },
    asAtDateEndUserPrice: new Date().toISOString(),
    isFetchEndUserPriceList: false,
    isFetchEndUserPriceListReport: false,
    isPdfView: false,
    isFormSubmit: false
};

export const dashboardEndUserPriceSlice = createSlice({
    name: 'dashboard-end-user-price',
    initialState,
    reducers: {
        setRepCodeEndUserPrice: (state, action) => {
            state.repCodeEndUserPrice = action.payload;
        },
        setBaseCodeEndUserPrice: (state, action) => {
            state.baseCodeEndUserPrice = action.payload;
        },
        setAsAtDateEndUserPrice: (state, action) => {
            state.asAtDateEndUserPrice = action.payload;
        },
        setIsFetchEndUserPriceList: (state, action) => {
            state.isFetchEndUserPriceList = action.payload;
        },
        setIsFetchEndUserPriceListReport: (state, action) => {
            state.isFetchEndUserPriceListReport = action.payload;
        },
        setIsPdfView: (state, action) => {
            state.isPdfView = action.payload;
        },
        setTriggerEndUserPriceFormSubmit: (state, action) => {
            state.isFormSubmit = action.payload;
        }
    },
});

export const { setRepCodeEndUserPrice, setBaseCodeEndUserPrice, setAsAtDateEndUserPrice, setIsFetchEndUserPriceList, setIsFetchEndUserPriceListReport, setIsPdfView, setTriggerEndUserPriceFormSubmit } = dashboardEndUserPriceSlice.actions;

export default dashboardEndUserPriceSlice.reducer;
