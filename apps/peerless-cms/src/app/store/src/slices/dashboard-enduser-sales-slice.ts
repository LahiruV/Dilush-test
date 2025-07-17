import { DropDownData } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

interface DashEndUserSalesState {
    isFetchEndUserSaleListReport: boolean;
    isFetchPdfEndUserSaleListReport: boolean;
    dashEnduserSalesCostYear: DropDownData;
    dashEnduserSalesCostPeriod: DropDownData;
    dashEnduserSalesDistributor: DropDownData;
    dashEnduserSalesEnduser: DropDownData;
    dashEnduserSalesRep: DropDownData;
    dashEnduserSalesCheckArea: DropDownData;
}

const initialState: DashEndUserSalesState = {
    isFetchEndUserSaleListReport: false,
    isFetchPdfEndUserSaleListReport: false,
    dashEnduserSalesCostYear: { id: 0, text: '', value: '' },
    dashEnduserSalesCostPeriod: { id: 0, text: '', value: '' },
    dashEnduserSalesDistributor: { id: 0, text: '', value: '' },
    dashEnduserSalesEnduser: { id: 0, text: '', value: '' },
    dashEnduserSalesRep: { id: 0, text: '', value: '' },
    dashEnduserSalesCheckArea: { id: 0, text: '', value: '' }
};

export const dashboardEndUserSalesSlice = createSlice({
    name: 'dashboard-end-sales',
    initialState,
    reducers: {
        setIsFetchEndUserSalesListReport: (state, action) => {
            state.isFetchEndUserSaleListReport = action.payload;
        },
        setIsFetchPdfEndUserSalesListReport: (state, action) => {
            state.isFetchPdfEndUserSaleListReport = action.payload;
        },
        setDashEndUserSalesCostYear: (state, action) => {
            state.dashEnduserSalesCostYear = action.payload;
        },
        setDashEndUserSalesCostPeriod: (state, action) => {
            state.dashEnduserSalesCostPeriod = action.payload;
        },
        setDashEndUserSalesDistributor: (state, action) => {
            state.dashEnduserSalesDistributor = action.payload;
        },
        setDashEndUserSalesEnduser: (state, action) => {
            state.dashEnduserSalesEnduser = action.payload;
        },
        setDashEndUserSalesRep: (state, action) => {
            state.dashEnduserSalesRep = action.payload;
        },
        setDashEndUserSalesCheckArea: (state, action) => {
            state.dashEnduserSalesCheckArea = action.payload;
        }
    },
});

export const { setIsFetchEndUserSalesListReport, setIsFetchPdfEndUserSalesListReport, setDashEndUserSalesCostYear, setDashEndUserSalesCostPeriod, setDashEndUserSalesDistributor, setDashEndUserSalesEnduser, setDashEndUserSalesRep, setDashEndUserSalesCheckArea } = dashboardEndUserSalesSlice.actions;

export default dashboardEndUserSalesSlice.reducer;
