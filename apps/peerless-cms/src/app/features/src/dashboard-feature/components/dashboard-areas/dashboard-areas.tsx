import { Link } from 'react-router-dom';
import './dashboard-areas.css';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { SearchBox } from '@peerless/controls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSelectedArea, setSearchByActivity, setSearchByDashEndUserLogs } from '@peerless-cms/store';
import DashBoardRepFilter from './dashboard-rep-filter';
import DashBoardActivityFilter from './dashboard-activity-filter';
import DashBoardEndUserTransferLogsFilter from './dashboard-enduser-transferlogs-filter';
import DashBoardOpportunityFilter from './dashboard-opportunity-filter';
import DashBoardCallCyclesFilter from './dashboard-call-cycles-analysis-filter';
import DashBoarOpportunityConversionFilter from './dashboard-opportunity-conversion-filter';
import DashAchievementByRegionFilter from './dashboard-achievement-by-region-filter';
import DashBoardBusinessSalesEnquiryFilter from './dashboard-business-sales-enquiry-filter';
import DashBoardEndUserPriceFilter from './dashboard-end-user-price-report-filter';
import DashboardEndUserSalesFilter from './dashboard-end-user-sales-filter';

export interface DashBoardAreasProps { }

const areaLinks = [
  { id: 'activity-analysis', path: '/dashboard/activityAnalysis', icon: fa2.faCopy, label: 'Activity Analysis' },
  { id: 'call-cycles', path: '/dashboard/callCyclesAnalysis', icon: fa2.faPhone, label: 'Call Cycles' },
  { id: 'rep-performance', path: '/dashboard/rep', icon: fa2.faPager, label: 'Rep Performance' },
  { id: 'opportunity-analysis', path: '/dashboard/opportunityAnalysis', icon: fa2.faAreaChart, label: 'Opportunity Analysis' },
  { id: 'opportunity-conversion', path: '/dashboard/oppotunityConversion', icon: fa2.faCoins, label: 'Opportunity Conversion' },
  { id: 'end-user-transfer-logs', path: '/dashboard/endUserLogs', icon: fa2.faFileAlt, label: 'End User Transfer Logs' },
  { id: 'end-user-price-report', path: '/dashboard/endUserPrice', icon: fa2.faFileAlt, label: 'End User Price' },
  { id: 'end-user-sales', path: '/dashboard/endUserSales', icon: fa2.faFileAlt, label: 'End User Sales' },
  { id: 'achievement-by-region', path: '/dashboard/achievementByRegion', icon: fa2.faTasks, label: 'Achievement By Region' },
  { id: 'business-sales-enquiry', path: '/dashboard/businessSalesEnquiry', icon: fa2.faBusinessTime, label: 'Business Sales Enquiry' },
];

/**
 * DashBoardAreas component is responsible for rendering different dashboard areas
 * and their respective search boxes and filters based on the selected area.
 *
 * @param {DashBoardAreasProps} props - The properties passed to the component.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @component
 *
 * @example
 * <DashBoardAreas />
 *
 * @function
 * @name DashBoardAreas
 *
 * @description
 * This component uses Redux to manage the state of the selected area and the search criteria.
 * It renders a search box and a filter component based on the selected area.
 *
 * @typedef {Object} DashBoardAreasProps
 *
 * @property {Function} useDispatch - Hook to dispatch actions to the Redux store.
 * @property {Function} useSelector - Hook to access the Redux store's state.
 * @property {Function} handleSearchByActivity - Dispatches an action to set the search criteria for activity analysis.
 * @property {Function} handleSearchByEndUserTransferLog - Dispatches an action to set the search criteria for end-user transfer logs.
 * @property {Function} handleSelectArea - Dispatches an action to set the selected area.
 * @property {Function} renderSearchBox - Renders the appropriate search box based on the selected area.
 * @property {Function} renderFilter - Renders the appropriate filter component based on the selected area.
 *
 * @typedef {Object} RootState
 * @property {Object} dashboardActivityAnalysis - State slice for dashboard activity analysis.
 * @property {Object} dashboardEndUserTransferLogs - State slice for dashboard end-user transfer logs.
 *
 * @typedef {Object} areaLink
 * @property {string} id - The unique identifier for the area link.
 * @property {string} path - The path for the area link.
 * @property {Object} icon - The icon for the area link.
 * @property {string} label - The label for the area link.
 */

export function DashBoardAreas(props: DashBoardAreasProps) {
  const dispatch = useDispatch();
  const { selectedArea, searchByActivity } = useSelector((state: RootState) => state.dashboardActivityAnalysis);
  const { searchByDashEndUserLogs } = useSelector((state: RootState) => state.dashboardEndUserTransferLogs);

  const handleSearchByActivity = (value: any) => {
    dispatch(setSearchByActivity(value));
  };

  const handleSearchByEndUserTransferLog = (value: any) => {
    dispatch(setSearchByDashEndUserLogs(value));
  };

  const handleSelectArea = (area: string) => {
    dispatch(setSelectedArea(area));
  };

  const renderSearchBox = () => {
    if (selectedArea === 'activity-analysis') {
      return <SearchBox searchBy={searchByActivity} setSearchBy={handleSearchByActivity} />;
    }
    if (selectedArea === 'end-user-transfer-logs') {
      return <SearchBox searchBy={searchByDashEndUserLogs} setSearchBy={handleSearchByEndUserTransferLog} />;
    }
    return <div style={{ paddingBottom: '32px' }}></div>;
  };

  const renderFilter = () => {
    if (selectedArea === 'rep-performance') {
      return <DashBoardRepFilter />;
    }
    if (selectedArea === 'activity-analysis') {
      return <DashBoardActivityFilter />;
    }
    if (selectedArea === 'end-user-transfer-logs') {
      return <DashBoardEndUserTransferLogsFilter />;
    }
    if (selectedArea === 'opportunity-analysis') {
      return <DashBoardOpportunityFilter />;
    }
    if (selectedArea === 'call-cycles') {
      return <DashBoardCallCyclesFilter />;
    }
    if (selectedArea === 'opportunity-conversion') {
      return <DashBoarOpportunityConversionFilter />;
    }
    if (selectedArea === 'achievement-by-region') {
      return <DashAchievementByRegionFilter />;
    }
    if (selectedArea === 'business-sales-enquiry') {
      return <DashBoardBusinessSalesEnquiryFilter />;
    }
    if (selectedArea === 'end-user-price-report') {
      return <DashBoardEndUserPriceFilter />;
    }
    if (selectedArea === 'end-user-sales') {
      return <DashboardEndUserSalesFilter />;
    }
    return null;
  };

  return (
    <div className='area-container'>
      {/* <div className='area-searchbox-container'>
        {renderSearchBox()}
      </div> */}
      <div style={{ marginTop: '-15px' }}></div>
      <span>AREAS</span>
      {/* <div style={{ maxHeight: '300px', overflowY: 'auto' }}> */}
      <ul>
        {areaLinks.map((link) => (
          <li key={link.id}>
            <Link
              id={link.id}
              to={link.path}
              className={selectedArea === link.id ? 'selected' : ''}
              onClick={() => handleSelectArea(link.id)}
            >
              <FontAwesomeIcon icon={link.icon} size='1x' /> {link.label}
            </Link>
          </li>
        ))}
      </ul>
      {/* </div> */}
      {renderFilter()}
    </div>
  );
}

export default DashBoardAreas;