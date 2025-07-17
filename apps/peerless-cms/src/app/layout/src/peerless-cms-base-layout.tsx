import {
  AboutPage,
  ActivityPlannerPage,
  AdministratorPage,
  CallCyclePage,
  DashboardPage,
  HomePage,
  LeavePage,
  LeedsAndCustomersPage,
  LoginPage,
  OrganisationPage,
  SalesEnquiryPage,
} from '@peerless-cms/pages';
import { CommonProps } from '@peerless/models';
import { FC, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useAppRouterState } from '@peerless/common';
import { useAuthContext } from '@peerless/providers';
import { default as PrivateRouteValidator } from './private-routes';
import {
  LeedAndCustomerInfoSection,
  LeedsAndCustomersSection,
  LeedAndCustomerDetailSection,
  LeedsAndCustomersContactDetail,
  DashboardSection,
  DashboardRepPerformance,
  DashboardActivityAnalysis,
  LeedsCustomersDetails,
  LeedCustomerAddresses,
  LeedCustomerAddressList,
  LeedCustomerAddressForm,
  LeedCustomerContactPerson,
  LeedCustomerContactPersonList,
  LeedCustomerContactPersonForm,
  DashboardEndUserTransferLog,
  DashboardOpportunityAnalysis,
  LeedCustomerActivity,
  LeedCustomerActivityList,
  LeedCustomerActivityForm,
  LeedCustomerDocuments,
  DashboardCallCyclesAnalysis,
  DashboardOpportunityConversion,
  LeedCustomerOpportunity,
  LeedCustomerOpportunityList,
  LeedCustomerOpportunityForm,
  LeedCustomerEmails,
  DashboardAchievementByRegion,
  DashBoardBusinessSalesEnquiry,
  CustomersDetails,
  CustomersContactDetail,
  CustomerSalesHistory,
  ActivityPlannerSection,
  ActivityPlanner,
  AdministratorSection,
  AdministratorRepMarket,
  CustomersAddress,
  CustomerContactPerson,
  CustomerEndusers,
  CustomerEndusersList,
  CustomerEUListPrice,
  CustomerEUPriceList,
  CustomerEUPriceListForm,
  CustomerActivity,
  CustomerDocuments,
  CustomerOpportunity,
  CustomerEmails,
  CustomerPrice,
  CustomerPantryList,
  CustomerCRMOrders,
  CustomerCRMOrdersList,
  CustomerCRMOrdersForm,
  AdministratorRepProxy,
  AdministratorSettings,
  AdministratorPantryList,
  SalesEnquirySection,
  SalesEnquiryCustomerPriceList,
  EnduserDetails,
  SalesEnquiryDealEnquiry,
  SalesEnquiryInvoiceEnquiry,
  CustomerEnduserEntry,
  EnduserContactPerson,
  EnduserActivity,
  SalesEnquiryOutstandingOrders,
  DashboardEndUserPriceReport,
  EnduserDocuments,
  EnduserOpportunity,
  EnduserSales,
  EnduserPantryList,
  EnduserTioList,
  EnduserPrice,
  OrganisationSection,
  OrganisationDetailSection,
  OrganisationDetails,
  CallCycleSection,
  OrganisationAddress,
  OrganisationContactPerson,
  OrganisationActivity,
  OrganisationEnduser,
  OrganisationEnduserList,
  OrganisationEnduserEntry,
  DashboardEndUserSalesReport,
  CallCycleDetailSection,
  CallCycleDetails,
  OrganisationSubOrganisation,
  OrganisationSubOrganisationList,
  OrganisationSubOrganisationEntry,
  OrganisationDistributor,
  OrganisationDistributorList,
  OrganisationDistributorEntry,
  CallCyclePlanner,
  ClaimsEnquiry,
  CallCycleActivity,
  StockEnquiry,
  QuarterlyUnitSales,
  LeaveFeatureSection,
  LeaveList,
  LeaveViewComponent,
  LeaveViewMainComponent,
  LeaveShow,
} from '@peerless-cms/features';

let PeerlessCMSBaseLayoutRender = 0;

export const PeerlessCMSBaseLayout: FC<CommonProps> = () => {
  useAppRouterState();

  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && window.location.pathname === '/login') {
      // navigate('/dashboard/activityAnalysis');
      navigate('/leeds-and-customers');
    }
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [navigate, isAuthenticated]);

  PeerlessCMSBaseLayoutRender++;

  return (
    <Routes>
      <Route path="/login" Component={LoginPage} />
      <Route element={<PrivateRouteValidator />}>
        <Route path="/" element={<LeedsAndCustomersPage />} />
        <Route path="/organisation" element={<OrganisationPage />}>
          <Route index element={<OrganisationSection />} />
          <Route path=":id" element={<OrganisationDetailSection />}>
            <Route index element={<OrganisationDetails />} />
            <Route path="addresses" element={<OrganisationAddress />}>
              <Route index element={<LeedCustomerAddressList />} />
              <Route path="update" element={<LeedCustomerAddressForm />} />
            </Route>
            <Route
              path="contact-person"
              element={<OrganisationContactPerson />}
            >
              <Route index element={<LeedCustomerContactPersonList />} />
              <Route
                path="update"
                element={<LeedCustomerContactPersonForm />}
              />
            </Route>
            <Route path="activity" element={<OrganisationActivity />}>
              <Route index element={<LeedCustomerActivityList />} />
              <Route path="update" element={<LeedCustomerActivityForm />} />
            </Route>
            <Route path="endusers" element={<OrganisationEnduser />}>
              <Route index element={<OrganisationEnduserList />} />
              <Route path="update" element={<OrganisationEnduserEntry />} />
            </Route>
            <Route
              path="sub-organisation"
              element={<OrganisationSubOrganisation />}
            >
              <Route index element={<OrganisationSubOrganisationList />} />
              <Route
                path="update"
                element={<OrganisationSubOrganisationEntry />}
              />
            </Route>
            <Route path="distributor" element={<OrganisationDistributor />}>
              <Route index element={<OrganisationDistributorList />} />
              <Route path="update" element={<OrganisationDistributorEntry />} />
            </Route>
          </Route>
        </Route>
        <Route path="/leeds-and-customers" element={<LeedsAndCustomersPage />}>
          <Route index element={<LeedsAndCustomersSection />} />
          <Route path=":id" element={<LeedAndCustomerDetailSection />}>
            <Route index element={<LeedsCustomersDetails />} />
            <Route
              path="contact-details"
              element={<LeedsAndCustomersContactDetail />}
            />
            <Route path="addresses" element={<LeedCustomerAddresses />}>
              <Route index element={<LeedCustomerAddressList />} />
              <Route path="update" element={<LeedCustomerAddressForm />} />
            </Route>
            <Route
              path="contact-person"
              element={<LeedCustomerContactPerson />}
            >
              <Route index element={<LeedCustomerContactPersonList />} />
              <Route
                path="update"
                element={<LeedCustomerContactPersonForm />}
              />
            </Route>
            <Route path="activity" element={<LeedCustomerActivity />}>
              <Route index element={<LeedCustomerActivityList />} />
              <Route path="update" element={<LeedCustomerActivityForm />} />
            </Route>
            <Route path="document" element={<LeedCustomerDocuments />} />
            <Route path="opportunity" element={<LeedCustomerOpportunity />}>
              <Route index element={<LeedCustomerOpportunityList />} />
              <Route path="update" element={<LeedCustomerOpportunityForm />} />
            </Route>
            <Route path="emails" element={<LeedCustomerEmails />} />
          </Route>
          <Route path="customer/:id" element={<LeedAndCustomerDetailSection />}>
            <Route index element={<CustomersDetails />} />
            <Route
              path="contact-details"
              element={<CustomersContactDetail />}
            />
            <Route path="sales-history" element={<CustomerSalesHistory />} />
            <Route path="addresses" element={<CustomersAddress />}>
              <Route index element={<LeedCustomerAddressList />} />
              <Route path="update" element={<LeedCustomerAddressForm />} />
            </Route>
            <Route path="contact-person" element={<CustomerContactPerson />}>
              <Route index element={<LeedCustomerContactPersonList />} />
              <Route
                path="update"
                element={<LeedCustomerContactPersonForm />}
              />
            </Route>
            <Route path="endusers" element={<CustomerEndusers />}>
              <Route index element={<CustomerEndusersList />} />
              <Route path="update" element={<CustomerEnduserEntry />} />
            </Route>
            <Route path="eu-list-price" element={<CustomerEUListPrice />}>
              <Route index element={<CustomerEUPriceList />} />
              <Route path="update" element={<CustomerEUPriceListForm />} />
            </Route>
            <Route path="activity" element={<CustomerActivity />}>
              <Route index element={<LeedCustomerActivityList />} />
              <Route path="update" element={<LeedCustomerActivityForm />} />
            </Route>
            <Route path="document" element={<CustomerDocuments />} />
            <Route path="opportunity" element={<CustomerOpportunity />}>
              <Route index element={<LeedCustomerOpportunityList />} />
              <Route path="update" element={<LeedCustomerOpportunityForm />} />
            </Route>
            <Route path="emails" element={<CustomerEmails />} />
            <Route path="customer-price" element={<CustomerPrice />} />
            <Route path="pantry-list" element={<CustomerPantryList />} />
            <Route path="crm-orders" element={<CustomerCRMOrders />}>
              <Route index element={<CustomerCRMOrdersList />} />
              <Route path="update" element={<CustomerCRMOrdersForm />} />
            </Route>
          </Route>
          <Route path="enduser/:id" element={<LeedAndCustomerDetailSection />}>
            <Route index element={<EnduserDetails />} />
            <Route path="contact-person" element={<EnduserContactPerson />}>
              <Route index element={<LeedCustomerContactPersonList />} />
              <Route
                path="update"
                element={<LeedCustomerContactPersonForm />}
              />
            </Route>
            <Route path="activity" element={<EnduserActivity />}>
              <Route index element={<LeedCustomerActivityList />} />
              <Route path="update" element={<LeedCustomerActivityForm />} />
            </Route>
            <Route path="document" element={<EnduserDocuments />} />
            <Route path="opportunity" element={<EnduserOpportunity />}>
              <Route index element={<LeedCustomerOpportunityList />} />
              <Route path="update" element={<LeedCustomerOpportunityForm />} />
            </Route>
            <Route path="enduser-price" element={<EnduserPrice />}>
              <Route index element={<CustomerEUPriceList />} />
              <Route path="update" element={<CustomerEUPriceListForm />} />
            </Route>
            <Route path="sales" element={<EnduserSales />} />
            <Route path="pantry-list" element={<EnduserPantryList />} />
            <Route path="tio-list" element={<EnduserTioList />}>
              <Route index element={<CustomerCRMOrdersList />} />
              <Route path="update" element={<CustomerCRMOrdersForm />} />
            </Route>
          </Route>
          <Route path="new" element={<LeedAndCustomerInfoSection />} />
        </Route>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route element={<DashboardSection />}>
            <Route index element={<DashboardActivityAnalysis />} />
            <Route path="rep" element={<DashboardRepPerformance />} />
            <Route
              path="activityAnalysis"
              element={<DashboardActivityAnalysis />}
            />
            <Route
              path="endUserLogs"
              element={<DashboardEndUserTransferLog />}
            />
            <Route
              path="opportunityAnalysis"
              element={<DashboardOpportunityAnalysis />}
            />
            <Route
              path="callCyclesAnalysis"
              element={<DashboardCallCyclesAnalysis />}
            />
            <Route
              path="oppotunityConversion"
              element={<DashboardOpportunityConversion />}
            />
            <Route
              path="achievementByRegion"
              element={<DashboardAchievementByRegion />}
            />
            <Route
              path="businessSalesEnquiry"
              element={<DashBoardBusinessSalesEnquiry />}
            />
            <Route
              path="endUserPrice"
              element={<DashboardEndUserPriceReport />}
            />
            <Route
              path="endUserSales"
              element={<DashboardEndUserSalesReport />}
            />
          </Route>
        </Route>
        <Route path="/activity-planner" element={<ActivityPlannerPage />}>
          <Route element={<ActivityPlannerSection />}>
            <Route index element={<ActivityPlanner />} />
            <Route path="activity-planner" element={<ActivityPlanner />} />
          </Route>
        </Route>
        <Route path="/administrator" element={<AdministratorPage />}>
          <Route element={<AdministratorSection />}>
            <Route index element={<AdministratorRepMarket />} />
            <Route path="rep-markets" element={<AdministratorRepMarket />} />
            <Route path="rep-proxy" element={<AdministratorRepProxy />} />
            <Route path="setting" element={<AdministratorSettings />} />
            <Route path="pantry-list" element={<AdministratorPantryList />} />
          </Route>
        </Route>
        <Route path="/sales-enquiry" element={<SalesEnquiryPage />}>
          <Route element={<SalesEnquirySection />}>
            <Route index element={<ClaimsEnquiry />} />
            <Route path="claims-enquiry" element={<ClaimsEnquiry />} />
            <Route
              path="customer-pricelist"
              element={<SalesEnquiryCustomerPriceList />}
            />
            <Route path="deal-enquiry" element={<SalesEnquiryDealEnquiry />} />
            <Route
              path="invoice-enquiry"
              element={<SalesEnquiryInvoiceEnquiry />}
            />
            <Route
              path="outstanding-orders"
              element={<SalesEnquiryOutstandingOrders />}
            />
            <Route path="stock-enquiry" element={<StockEnquiry />} />
            <Route
              path="quarterly-unit-sales"
              element={<QuarterlyUnitSales />}
            />
          </Route>
        </Route>

        {/* <Route path="/sales-enquiry2" element={<SalesEnquiryPage />}>
          <Route element={<SalesEnquirySection />}>
            <Route index element={<ClaimsEnquiry />} />
            <Route
              path="customer-pricelist"
              element={<SalesEnquiryCustomerPriceList />}
            />
            <Route path="deal-enquiry" element={<SalesEnquiryDealEnquiry />} />
            <Route
              path="invoice-enquiry"
              element={<SalesEnquiryInvoiceEnquiry />}
            />
            <Route
              path="outstanding-orders"
              element={<SalesEnquiryOutstandingOrders />}
            />
            <Route path="stock-enquiry" element={<StockEnquiry />} />
            <Route
              path="quarterly-unit-sales"
              element={<QuarterlyUnitSales />}
            />
          </Route>
        </Route> */}

        <Route path="/call-cycle" element={<CallCyclePage />}>
          <Route index element={<CallCycleSection />} />
          <Route path=":id" element={<CallCycleDetailSection />}>
            <Route index element={<CallCycleDetails />} />
            <Route path="call-cycle-planner" element={<CallCycleActivity />} />
          </Route>
        </Route>
        <Route path="/leave" element={<LeavePage />}>
          <Route element={<LeaveFeatureSection />}>
            <Route index element={<LeaveList />} />
            <Route path="leave-list" element={<LeaveList />} />
            <Route path="leave-view" element={<LeaveShow />} />
          </Route>
        </Route>
        <Route element={<AboutPage />} path="/about" />
      </Route>
    </Routes>
  );
};
