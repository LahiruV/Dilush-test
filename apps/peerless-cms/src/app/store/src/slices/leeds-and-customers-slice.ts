import { createCustomer, Customer } from '@peerless/models';
import { createSlice } from '@reduxjs/toolkit';

export enum pageModeEnum {
  List = 1,
  New = 2,
  Edit = 3
}

interface LeedsAndCustomersState {
  value: number;
  searchBy: string;
  selectedContactType: string;
  selectedLeedOrCustomer: any;
  filter: {
    type: string;
    status: string;
    businessType: string;
    repType: string;
    showLeastActive: boolean;
  };
  readonly: boolean;
  contacts: any;
  articleAddress: string;
  addressPageMode: pageModeEnum;
  selectedAddress: any;
  contactPersonPageMode: pageModeEnum;
  selectedContactPerson: any;
  selectedContactPersonImage: any;
  activityPageMode: pageModeEnum;
  selectedActivity: any;
  selectedDocument: any;
  opportunityPageMode: pageModeEnum;
  selectedOpportunity: any;
  selectedOpportunityProduct: any;
  selectedEmail: any;
  selectedCustomer: Customer;
  salesHistoryChartData: any;
  debtorChartData: any;
  SalesHistoryTotalSales: any;
  debtorTotal: any;
  customerEnduserPageMode: pageModeEnum;
  selectedCustomerEnduser: any;
  selectedCustomerForEnduserTransfer: any;
  customerEUListPricePageMode: pageModeEnum;
  selectedCustomerEUPrice: any;
  customerEUPriceList: any;
  selectedCustomerPriceListItem: any;
  selectedCustomerPantry: any;
  crmOrdersPageMode: pageModeEnum;
  selectedCRMOrder: any;
  selectedEnduser: any;
  enduserDetailPageMode: pageModeEnum;
  leadDetailPageMode: pageModeEnum;
  isShowAddContactPerson: boolean;
}

const initialState: LeedsAndCustomersState = {
  value: 0,
  searchBy: '',
  selectedContactType: 'customer',
  selectedLeedOrCustomer: {},
  filter: {
    type: 'all',
    status: '1',
    businessType: 'all',
    repType: '',
    showLeastActive: false,
  },
  readonly: true,
  contacts: {},
  articleAddress: '',
  addressPageMode: pageModeEnum.List,
  selectedAddress: {},
  contactPersonPageMode: pageModeEnum.List,
  selectedContactPerson: {},
  selectedContactPersonImage: null,
  activityPageMode: pageModeEnum.List,
  selectedActivity: {},
  selectedDocument: {},
  opportunityPageMode: pageModeEnum.List,
  selectedOpportunity: {},
  selectedOpportunityProduct: {},
  selectedEmail: {},
  selectedCustomer: createCustomer(),
  salesHistoryChartData: {},
  debtorChartData: {},
  SalesHistoryTotalSales: 0,
  debtorTotal: 0,
  customerEnduserPageMode: pageModeEnum.List,
  selectedCustomerEnduser: {},
  selectedCustomerForEnduserTransfer: null,
  customerEUListPricePageMode: pageModeEnum.List,
  selectedCustomerEUPrice: {},
  customerEUPriceList: [],
  selectedCustomerPriceListItem: {},
  selectedCustomerPantry: {},
  crmOrdersPageMode: pageModeEnum.List,
  selectedCRMOrder: {},
  selectedEnduser: {},
  enduserDetailPageMode: pageModeEnum.Edit,
  leadDetailPageMode: pageModeEnum.Edit,
  isShowAddContactPerson: true,
};

export const leedsAndCustomersSlice = createSlice({
  name: 'leedsAndCustomers',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setSearchBy: (state, action) => {
      state.searchBy = action.payload;
    },
    setSelectedContactType: (state, action) => {
      state.selectedContactType = action.payload;
    },
    setSelectedLeedOrCustomer: (state, action) => {
      state.selectedLeedOrCustomer = action.payload;
    },
    updateDetails: (state, action) => {
      state.readonly = action.payload;
    },
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    setArticleAddress: (state, action) => {
      state.articleAddress = action.payload;
    },
    setAddressPageMode: (state, action) => {
      state.addressPageMode = action.payload;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setContactPersonPageMode: (state, action) => {
      state.contactPersonPageMode = action.payload;
    },
    setSelectedContactPerson: (state, action) => {
      state.selectedContactPerson = action.payload;
    },
    setSelectedContactPersonImage: (state, action) => {
      state.selectedContactPersonImage = action.payload;
    },
    setActivityPageMode: (state, action) => {
      state.activityPageMode = action.payload;
    },
    setSelectedActivity: (state, action) => {
      state.selectedActivity = action.payload;
    },
    setSelectedDocument: (state, action) => {
      state.selectedDocument = action.payload;
    },
    setOpportunityPageMode: (state, action) => {
      state.opportunityPageMode = action.payload;
    },
    setSelectedOpportunity: (state, action) => {
      state.selectedOpportunity = action.payload;
    },
    setSelectedOpportunityProduct: (state, action) => {
      state.selectedOpportunityProduct = action.payload;
    },
    setSelectedEmail: (state, action) => {
      state.selectedEmail = action.payload;
    },
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    setSalesHistoryChartData: (state, action) => {
      state.salesHistoryChartData = action.payload;
    },
    setDebtorChartData: (state, action) => {
      state.debtorChartData = action.payload;
    },
    setSetSalesHistoryTotalSales: (state, action) => {
      state.SalesHistoryTotalSales = action.payload;
    },
    setSetDebtorTotalSales: (state, action) => {
      state.debtorTotal = action.payload;
    },
    setCustomerEnduserPageMode: (state, action) => {
      state.customerEnduserPageMode = action.payload;
    },
    setSelectedCustomerEnduser: (state, action) => {
      state.selectedCustomerEnduser = action.payload;
    },
    setSelectedCustomerForEnduserTransfer: (state, action) => {      
      state.selectedCustomerForEnduserTransfer = action.payload;
    },
    setCustomerEUListPricePageMode: (state, action) => {      
      state.customerEUListPricePageMode = action.payload;
    },
    setSelectedCustomerEUPrice: (state, action) => {      
      state.selectedCustomerEUPrice = action.payload;
    },
    setcustomerEUPriceList: (state, action) => {      
      state.customerEUPriceList = action.payload;
    },
    setSelectedCustomerPriceListItem: (state, action) => {      
      state.selectedCustomerPriceListItem = action.payload;
    },
    setSelectedCustomerPantry: (state, action) => {      
      state.selectedCustomerPantry = action.payload;
    },
    setCrmOrdersPageMode: (state, action) => {      
      state.crmOrdersPageMode = action.payload;
    },
    setSelectedCRMOrder: (state, action) => {      
      state.selectedCRMOrder = action.payload;
    },
    setSelectedEnduser: (state, action) => {      
      state.selectedEnduser = action.payload;
    },
    setEnduserDetailPageMode: (state, action) => {      
      state.enduserDetailPageMode = action.payload;
    },
    setLeadDetailPageMode: (state, action) => {      
      state.leadDetailPageMode = action.payload;
    },
    setFilter:(state, action) => {      
      state.filter = action.payload;
    },
    resetFilter:(state, action) => {      
      state.filter.status = initialState.filter.status;
    },
    resetSelectedContactType:(state, action) => {      
      state.selectedContactType = initialState.selectedContactType;
    },
    resetShowLeastActive:(state, action) => {      
      state.filter.showLeastActive = initialState.filter.showLeastActive;
    },
    setIsShowAddContactPerson:(state, action) => {      
      state.isShowAddContactPerson = action.payload;
    },
  },
});

export const { increment, decrement, setSearchBy, setSelectedContactType, setSelectedLeedOrCustomer, updateDetails, setContacts, setArticleAddress, 
  setAddressPageMode, setSelectedAddress, setContactPersonPageMode, setSelectedContactPerson, setSelectedContactPersonImage, 
  setActivityPageMode, setSelectedActivity, setSelectedDocument, setOpportunityPageMode, setSelectedOpportunity, setSelectedOpportunityProduct, 
  setSelectedEmail, setSelectedCustomer, setSalesHistoryChartData, setDebtorChartData, setSetSalesHistoryTotalSales, setSetDebtorTotalSales, setCustomerEnduserPageMode, 
  setSelectedCustomerEnduser, setSelectedCustomerForEnduserTransfer, setCustomerEUListPricePageMode, setSelectedCustomerEUPrice, setcustomerEUPriceList, 
  setSelectedCustomerPriceListItem, setSelectedCustomerPantry, setCrmOrdersPageMode, setSelectedCRMOrder, setSelectedEnduser, setEnduserDetailPageMode,
  setLeadDetailPageMode, setFilter, resetFilter, resetSelectedContactType, resetShowLeastActive, setIsShowAddContactPerson } =
  leedsAndCustomersSlice.actions;

export default leedsAndCustomersSlice.reducer;
