import { combineReducers } from 'redux';
import leedsAndCustomersReducer from './slices/leeds-and-customers-slice';
import headerReducer from './slices/header-slice';
import modalReducer from './slices/modal-slice'
import messageBoxReducer from './slices/message-box-slice'
import listTableReducer from './slices/list-table-slice';
import dashboardRepReducer from './slices/dashboard-rep-slice';
import dashboardActivityAnalysisReducer from './slices/dashboard-activity-analysis-slice';
import dashboardEndUserTransferLogsReducer from './slices/dashboard-enduser-transferlogs-slice';
import dashboardOpportunityAnalysisReducer from './slices/dashboard-opportunity-analysis-slice';
import dashboardCallCyclesAnalysisReducer from './slices/dashboard-call-cycles-analysis-slice';
import dashBoarOpportunityConversionReducer from './slices/dashboard-opportunity-conversion-slice';
import dashboardAchievementByRegionReducer from './slices/dashboard-achievement-by-region-slice';
import dashBoardBusinessSalesEnquiryReducer from './slices/dashboard-business-sales-enquiry-slice';
import dashboardEndUserPriceReducer from './slices/dashboard-enduser-price-slice';
import customerPageFilterReducer from './slices/customer-page-filters-slice';
import activityPlannerReducer from './slices/activity-planner-slice';
import administratorReducer from './slices/administrator-slice';
import administratorSettingsReducer from './slices/administrator-settings-slice';
import salesEnquirySliceReducer from './slices/sales-enquiry-slice';
import salesEnquiryCustomerPriceListReducer from './slices/sales-enquiry-customer-pricelist-slice';
import salesEnquiryDealEnquiryReducer from './slices/sales-enquiry-deal-enquiry-slice';
import salesEnquiryInvoiceEnquiryReducer from './slices/sales-enquiry-invoice-enquiry-slice';
import salesEnquiryOutstandingOrdersReducer from './slices/sales-enquiry-outstanding-orders-slice';
import enduserSalesFilterReducer from './slices/enduser-sales-filters-slice';
import enduserPriceFilterReducer from './slices/enduser-price-filter-slice';
import organisationReducer from './slices/organisation-slice';
import callCycleActivityReducer from './slices/call-cycle-slice';
import dashboardEndUserSalesReducer from './slices/dashboard-enduser-sales-slice';
import claimsEnquiryFilterReducer from './slices/claims-enquiry-filter-slice';
import stockEnquiryFilterReducer from './slices/stock-enquiry-filter-slice';
import quarterlyUnitSalesReducer from './slices/quarterly-unit-sales-slice';
import leaveEntryReducer from './slices/leave-entry-slice';


const RESET_STATE = 'RESET_STATE';

const appReducer = combineReducers({
  leedsAndCustomers: leedsAndCustomersReducer,
  header: headerReducer,
  modal: modalReducer,
  messageBox: messageBoxReducer,
  listTable: listTableReducer,
  dashoardRep: dashboardRepReducer,
  dashboardActivityAnalysis: dashboardActivityAnalysisReducer,
  dashboardEndUserTransferLogs: dashboardEndUserTransferLogsReducer,
  dashboardOpportunityAnalysis: dashboardOpportunityAnalysisReducer,
  dashboardCallCyclesAnalysis: dashboardCallCyclesAnalysisReducer,
  dashBoarOpportunityConversion: dashBoarOpportunityConversionReducer,
  dashboardAchievementByRegion: dashboardAchievementByRegionReducer,
  dashBoardBusinessSalesEnquiry: dashBoardBusinessSalesEnquiryReducer,
  dashboardEndUserPrice: dashboardEndUserPriceReducer,
  customerPageFilters: customerPageFilterReducer,
  activityPlanner: activityPlannerReducer,
  administrator: administratorReducer,
  administratorSettings: administratorSettingsReducer,
  salesEnquiry: salesEnquirySliceReducer,
  salesEnquiryCustomerPriceList: salesEnquiryCustomerPriceListReducer,
  salesEnquiryDealEnquiry: salesEnquiryDealEnquiryReducer,
  salesEnquiryInvoiceEnquiry: salesEnquiryInvoiceEnquiryReducer,
  salesEnquiryOutstandingOrders: salesEnquiryOutstandingOrdersReducer,
  enduserSalesFilters: enduserSalesFilterReducer,
  enduserPriceFilters: enduserPriceFilterReducer,
  organisations: organisationReducer,
  callCycleActivity: callCycleActivityReducer,
  dashboardEndUserSales: dashboardEndUserSalesReducer,
  claimsEnquiryFilters: claimsEnquiryFilterReducer,
  stockEnquiryFilters: stockEnquiryFilterReducer,
  quarterlyUnitSales: quarterlyUnitSalesReducer,
  leaveEntry: leaveEntryReducer
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
