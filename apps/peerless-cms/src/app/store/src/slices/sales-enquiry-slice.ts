import { createSlice } from '@reduxjs/toolkit';

interface SalesEnquiryAreasState {
  salesEnquirySelectedArea: string | null;
}

const initialState: SalesEnquiryAreasState = {
  salesEnquirySelectedArea: 'claims-enquiry', //sales-enquiry-customer-pricelist
};

export const salesEnquirySlice = createSlice({
  name: 'sales-enquiry-slice',
  initialState,
  reducers: {
    setSalesEnquirySelectedArea: (state, action) => {
      state.salesEnquirySelectedArea = action.payload;
    },
  },
});

export const { setSalesEnquirySelectedArea } = salesEnquirySlice.actions;

export default salesEnquirySlice.reducer;
