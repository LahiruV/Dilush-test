import { DropDownData } from "@peerless/models";
import { createSlice } from "@reduxjs/toolkit";

interface CustomerPageFilterState {
  loadData: boolean;
  /* sales history filters */
  salesHistoryBy: any;
  outstandingOrderType: any;
  inView: any;
  enduserStatus: any;
  customerAddressStatus: any;
  cusSalesOrderType: any;
  cusCurrentOrCompleted: any;
  cusCatalogueType: any;

  /* price list filters */
  asAtDate: any;
  cusPriceRepGroup: DropDownData;
  cusPriceEffectiveDate: DropDownData;
  state: any,
  isSalesHistoryFetch: boolean;
  isFetchingLeadCustomerPriceList: boolean;
  isCustomerSalesHistoryFiltersFormSubmit: boolean;
  isCustomerPriceFiltersFormSubmit: boolean;
}

const initialState: CustomerPageFilterState = {
  salesHistoryBy: { text: 'Dollar', value: 'd' },
  outstandingOrderType: { text: 'All', value: 0 },
  loadData: false,
  inView: {},
  enduserStatus: { text: 'Active', value: 'Active' },
  asAtDate: new Date().toISOString(),
  cusPriceRepGroup: {} as DropDownData,
  cusPriceEffectiveDate: {} as DropDownData,
  state: 'All',
  isSalesHistoryFetch: false,
  customerAddressStatus: { text: 'All', value: ' ' },
  cusSalesOrderType: { text: 'Standard', value: 'Standard' },
  cusCurrentOrCompleted: { text: 'Current', value: '1' },
  cusCatalogueType: { text: 'F - Refinery Products', value: 'F' },
  isFetchingLeadCustomerPriceList: false,
  isCustomerSalesHistoryFiltersFormSubmit: false,
  isCustomerPriceFiltersFormSubmit: false,
};

export const customerPageFilterSlice = createSlice({
  name: 'customerPageFilter',
  initialState,
  reducers: {
    setSalesHistoryBy: (state, action) => {
      state.salesHistoryBy = action.payload;
    },
    setOutstandingOrderType: (state, action) => {
      state.outstandingOrderType = action.payload;
    },
    setLoadData: (state, action) => {
      state.loadData = action.payload;
    },
    setInView: (state, action) => {
      state.inView = action.payload;
    },
    setEnduserStatus: (state, action) => {
      state.enduserStatus = action.payload;
    },
    setAsAtDate: (state, action) => {
      state.asAtDate = action.payload;
    },
    setCusPriceRepGroup: (state, action) => {
      state.cusPriceRepGroup = action.payload;
    },
    setCusPriceEffectiveDate: (state, action) => {
      state.cusPriceEffectiveDate = action.payload;
    },
    setState: (state, action) => {
      state.state = action.payload;
    },
    setIsSalesHistoryFetch: (state, action) => {
      state.isSalesHistoryFetch = action.payload;
    },
    resetEnduserStatus: (state, action) => {
      state.enduserStatus = initialState.enduserStatus;
    },
    setCustomerAddressStatus: (state, action) => {
      state.customerAddressStatus = action.payload;
    },
    resetCustomerAddressStatus: (state, action) => {
      state.customerAddressStatus = initialState.customerAddressStatus;
    },
    setCusSalesOrderType: (state, action) => {
      state.cusSalesOrderType = action.payload;
    },
    setCusCurrentOrCompleted: (state, action) => {
      state.cusCurrentOrCompleted = action.payload;
    },
    setCusCatalogueType: (state, action) => {
      state.cusCatalogueType = action.payload;
    },
    setIsFetchingLeadCustomerPriceList: (state, action) => {
      state.isFetchingLeadCustomerPriceList = action.payload;
    },
    setTriggerCustomerSalesHistoryFiltersFormSubmit: (state,action) => {
      state.isCustomerSalesHistoryFiltersFormSubmit = action.payload;
    },
    setTriggerCustomerPriceFiltersFormSubmit: (state,action) => {
      state.isCustomerPriceFiltersFormSubmit = action.payload;
    },
  },
});

export const { setSalesHistoryBy, setOutstandingOrderType, setLoadData, setInView,
  setEnduserStatus, setAsAtDate,  setCusPriceEffectiveDate, setCusPriceRepGroup, setState, setIsSalesHistoryFetch,
  resetEnduserStatus, setCustomerAddressStatus, resetCustomerAddressStatus,
  setCusSalesOrderType, setCusCurrentOrCompleted, setCusCatalogueType, setIsFetchingLeadCustomerPriceList, setTriggerCustomerSalesHistoryFiltersFormSubmit, setTriggerCustomerPriceFiltersFormSubmit } =
  customerPageFilterSlice.actions;

export default customerPageFilterSlice.reducer;