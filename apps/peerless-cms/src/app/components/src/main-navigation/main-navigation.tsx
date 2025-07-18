import { NavLink } from 'react-router-dom';
import * as fa from '@fortawesome/free-regular-svg-icons';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import './main-navigation.css';
import { Navigation } from '@peerless/models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LogoutBox } from '@peerless-cms/features-common-components';
import { useEffect, useState } from 'react';
import { ButtonWidget } from '@peerless/controls';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsAddLeaveButton, setSelectedArea } from '@peerless-cms/store';

export interface MainNavigationProps { }

const dashboardSubNavLinks = [
  {
    id: 'activity-analysis',
    path: '/dashboard/activityAnalysis',
    icon: fa2.faCopy,
    label: 'Activity Analysis',
  },
  {
    id: 'call-cycles',
    path: '/dashboard/callCyclesAnalysis',
    icon: fa2.faPhone,
    label: 'Call Cycles',
  },
  {
    id: 'rep-performance',
    path: '/dashboard/rep',
    icon: fa2.faPager,
    label: 'Rep Performance',
  },
  {
    id: 'opportunity-analysis',
    path: '/dashboard/opportunityAnalysis',
    icon: fa2.faAreaChart,
    label: 'Opportunity Analysis',
  },
  {
    id: 'opportunity-conversion',
    path: '/dashboard/oppotunityConversion',
    icon: fa2.faCoins,
    label: 'Opportunity Conversion',
  },
  {
    id: 'end-user-transfer-logs',
    path: '/dashboard/endUserLogs',
    icon: fa2.faFileAlt,
    label: 'End User Transfer Logs',
  },
  {
    id: 'end-user-price-report',
    path: '/dashboard/endUserPrice',
    icon: fa2.faFileAlt,
    label: 'End User Price',
  },
  {
    id: 'end-user-sales',
    path: '/dashboard/endUserSales',
    icon: fa2.faFileAlt,
    label: 'End User Sales',
  },
  {
    id: 'achievement-by-region',
    path: '/dashboard/achievementByRegion',
    icon: fa2.faTasks,
    label: 'Achievement By Region',
  },
  {
    id: 'business-sales-enquiry',
    path: '/dashboard/businessSalesEnquiry',
    icon: fa2.faBusinessTime,
    label: 'Business Sales Enquiry',
  },
];

const salesInquirySubNavLinks = [
  {
    id: 'claims-enquiry',
    path: '/sales-enquiry/claims-enquiry',
    icon: fa2.faBriefcase,
    label: 'Claims Enquiry',
  },
  {
    id: 'sales-enquiry-customer-pricelist',
    path: '/sales-enquiry/customer-pricelist',
    icon: fa2.faTag,
    label: 'Customer Price List'
  },
  {
    id: 'sales-enquiry-deal-enquiry',
    path: '/sales-enquiry/deal-enquiry',
    icon: fa2.faFileInvoiceDollar,
    label: 'Deal Enquiry',
  },
  {
    id: 'stock-enquiry',
    path: '/sales-enquiry/stock-enquiry',
    icon: fa2.faLightbulb,
    label: 'Stock Enquiry',
  },
  {
    id: 'sales-enquiry-invoice-enquiry',
    path: '/sales-enquiry/invoice-enquiry',
    icon: fa2.faFileInvoice,
    label: 'Invoice Enquiry',
  },
  {
    id: 'sales-enquiry-outstanding-orders',
    path: '/sales-enquiry/outstanding-orders',
    icon: fa2.faTag,
    label: 'Outstanding Orders'
  },
  // { id: 'quarterly-unit-sales', path: '/sales-enquiry/quarterly-unit-sales', icon: fa2.faTag, label: 'Quarterly Unit Sales' },
];

const adminSubNavLinks = [
  { id: 'administrator-rep-markets', path: '/administrator/rep-markets', icon: fa2.faShuffle, label: 'Rep Markets' },
  { id: 'administrator-rep-proxy', path: '/administrator/rep-proxy', icon: fa2.faTag, label: 'Rep Proxy' },
  { id: 'administrator-pantry-list', path: '/administrator/pantry-list', icon: fa2.faListAlt, label: 'Pantry List' },
  { id: 'administrator-setting', path: '/administrator/setting', icon: fa2.faCog, label: 'Setting' },
];

const leaveSubNavLinks = [
  { id: 'leave-application', path: '/leave/leave-list', icon: fa2.faWalking, label: 'Leave Application' },
  { id: 'leave-view', path: '/leave/leave-view', icon: fa2.faCalendar, label: 'View Leave' }
]

// Define your icon mapping here
const iconMapping: any = {
  analytics: fa.faHourglassEmpty,
  leadsAndCustomers: fa.faAddressCard,
  organisation: fa.faCalendarCheck,
  callCycle: fa2.faPhone,
  activityPlanner: fa.faCalendar,
  salesEnquiry: fa2.faTag,
  businessRevTemplate: fa.faMehBlank,
  home: fa.faWindowMaximize,
  administrator: fa.faUser,
  leave: fa.faArrowAltCircleLeft,
};

export function MainNavigation(props: MainNavigationProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const [expandedPath, setExpandedPath] = useState('');

  const dispatch = useDispatch();

  const { selectedArea } = useSelector(
    (state: RootState) => state.dashboardActivityAnalysis
  );

  const navigationData = [
    {
      id: 1,
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'analytics',
      subNavData: dashboardSubNavLinks,
    },
    {
      id: 2,
      title: 'Leads & Customers',
      path: '/leeds-and-customers',
      icon: 'leadsAndCustomers',
    },
    {
      id: 3,
      title: 'Organisation',
      path: '/organisation',
      icon: 'organisation',
    },
    {
      id: 4,
      title: 'Call Cycle',
      path: '/call-cycle',
      icon: 'callCycle',
    },
    {
      id: 5,
      title: 'Activity Planner',
      path: '/activity-planner',
      icon: 'activityPlanner',
    },
    {
      id: 6,
      title: 'Sales Enquiry',
      path: '/sales-enquiry',
      icon: 'salesEnquiry',
      subNavData: salesInquirySubNavLinks,
    },

    // {
    //   "id": 7,
    //   "title": "Business Rev. Template",
    //   "path": "/business-rev-template",
    //   "icon": "businessRevTemplate"
    // },
    // {
    //   "id": 8,
    //   "title": "Home",
    //   "path": "/",
    //   "icon": "home"
    // },
    {
      id: 9,
      title: 'Administrator',
      path: '/administrator',
      icon: 'administrator',
      subNavData: adminSubNavLinks,
    },
    {
      id: 10,
      title: 'Leave',
      path: '/leave',
      icon: 'leave',
      subNavData: leaveSubNavLinks,
    },
  ];

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const handleSelectArea = (area: string) => {
    dispatch(setSelectedArea(area));
  };

  const expandNav = (path: string) => {
    if (expandedPath === path) {
      setExpandedPath('');
      return;
    }

    setExpandedPath(path);
  };

  useEffect(() => {
    navigationData.forEach((nav: Navigation) => {
      if (nav.subNavData) {
        nav.subNavData.forEach((link) => {
          if (link.id === selectedArea) {
            setExpandedPath(nav.path);
          }
        });
      }
    });
  }, [selectedArea])

  useEffect(() => {
    if (selectedArea === 'leave-application') {
      dispatch(setIsAddLeaveButton(true));
    }
    else {
      dispatch(setIsAddLeaveButton(false));
    }
  }, [selectedArea]);

  return (
    <>
      <nav className="main-navigation">
        <div>Peerless Foods CRM</div>
        <ul style={expandedPath ? { overflowY: 'scroll' } : {}}>
          {navigationData?.map((nav: Navigation) => (
            <li key={nav.id} id={nav.icon} className="nav-item">
              {nav?.subNavData ? (
                <>
                  <div
                    id={nav.icon}
                    className="nav-item-inner"
                    onClick={() => expandNav(nav.path)}
                  >
                    <div className="nav-item-label">
                      <FontAwesomeIcon icon={iconMapping[nav.icon]} size="1x" />{' '}
                      <span>{nav.title}</span>
                    </div>

                    <FontAwesomeIcon
                      icon={
                        expandedPath === nav.path
                          ? fa2.faChevronUp
                          : fa2.faChevronDown
                      }
                      size="1x"
                    />
                  </div>

                  <ul
                    className={`subNav ${expandedPath === nav.path ? 'expanded' : ''
                      }`}
                  >
                    {nav.subNavData.map((link) => (
                      <li key={link.id}>
                        <NavLink
                          id={link.id}
                          to={link.path}
                          // className={selectedArea === link.id ? 'selected' : ''}
                          onClick={() => handleSelectArea(link.id)}
                        >
                          <FontAwesomeIcon icon={link.icon} size="1x" />{' '}
                          <span>{link.label}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink id={nav.icon} to={nav.path}>
                  <FontAwesomeIcon icon={iconMapping[nav.icon]} size="1x" />{' '}
                  <span>{nav.title}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <div className="logout-section">
          {/* <ButtonWidget id='logout-button' classNames=" k-button-solid logout-button" Function={toggleDialog} name='Log Out' /> */}
        </div>
      </nav>
      {/* <LogoutBox isOpen={visible} setIsSetOpen={setVisible} /> */}
    </>
  );
}

export default MainNavigation;
