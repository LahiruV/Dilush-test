import { RootState, setIsFetchActivityAnalysisList, setSelectedActivityAnalysis } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAllActivitiesByType } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './dashboard-activity-list.css';
import { ActivityAnalysisListDistributer, useResetTablePagination } from '@peerless/common';
import { DataGrid } from '@peerless/controls';
import { RenderStatusContentTable } from '@peerless/models';

/**
 * ActivityAnalysisList component is responsible for rendering a list of activity analysis data.
 * It fetches data based on the current state and handles pagination when the user scrolls to the bottom.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @constant {Function} useDispatch - Redux hook to dispatch actions.
 * @constant {Function} useInView - Hook to detect when an element is in view.
 * @constant {Function} useSelector - Redux hook to access the state.
 * @constant {Object} payload - The payload object containing parameters for fetching activity analysis data.
 * @constant {Function} getAllActivitiesByType - Function to fetch activity analysis data based on the payload.
 * @constant {Function} handleRowClick - Function to handle row click events.
 * @constant {Function} useEffect - Hook to perform side effects in the component.
 * @constant {Object} renderStatusContent - Object containing status content configuration for rendering.
 * @constant {Object} activityAnalysisTable - Instance of ActivityAnalysisListDistributer for managing the data grid.
 *
 * @param {Object} state - The current state of the application.
 * @param {Object} state.dashboardActivityAnalysis - The state slice for dashboard activity analysis.
 * @param {Object} state.header - The state slice for header information.
 * @param {Object} state.header.selectedOriginator - The selected originator from the header state.
 * @param {Object} state.header.loggedUser - The logged-in user from the header state.
 * @param {boolean} state.header.isManagerMode - The manager mode flag from the header state.
 * @param {Object} row - The row data for the clicked row.
 * @param {Object} result - The result of the fetchNextPage function.
 * @param {Object} result.data - The data from the fetchNextPage function.
 * @param {Object} error - The error object from the fetchNextPage function.
 * @param {boolean} inView - Boolean indicating if the element is in view.
 * @param {boolean} hasNextPage - Boolean indicating if there are more pages to fetch.
 * @param {boolean} isFetchingNextPage - Boolean indicating if the next page is being fetched.
 * @param {Function} fetchNextPage - Function to fetch the next page of data.
 * @param {Function} setSelectedActivityAnalysis - Redux action to set the selected activity analysis.
 * @param {Function} setIsFetchActivityAnalysisList - Function to set the fetch activity analysis list state.
 */

interface ActivityAnalysisListProps {
  heightOffset?: number;
}

const ActivityAnalysisList: React.FC<ActivityAnalysisListProps> = ({ heightOffset }) => {

  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: false });
  const { selectedActivityAnalysis, sEndDate, sStartDate, activityStatus, repActivity, searchByActivity, isFetchActivityAnalysisList } = useSelector((state: RootState) => state.dashboardActivityAnalysis);
  const { loggedUser, managerMode } = useSelector((state: RootState) => ({
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    managerMode: state.header.isManagerMode
  }));
  const [pageSize, setPageSize] = useState(20);
  const [pageState, setPageState] = useState({ first: 1, rows: 20 });

  const [tableFilters, setTableFilters] = useState<any>();
  const [multiSortMeta, setMultiSortMeta] = useState([]);
  const [orderBy, setOrderBy] = useState("startDate ASC");

  // useEffect(() => {
  //   const handleResize = () => {
  //     const newSize = calculatePageSize();
  //     setPageSize(newSize);
  //     setPageState(prev => ({ ...prev, rows: newSize }));
  //   };

  //   handleResize(); // run once on mount
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);


  const payload = {
    activityStatus: activityStatus.value,
    originator: repActivity.userName || loggedUser.userName,
    childOriginators: ` (originator = '${repActivity.userName || loggedUser.userName}')`,
    additionalParams: searchByActivity ? `lead_name like '%${searchByActivity}%'` : "",
    sStartDate: sStartDate,
    sEndDate: sEndDate,
    defaultDepartmentId: loggedUser.defaultDepartmentId,
    orderBy: orderBy,
    sector: '',
    loggedInOriginator: loggedUser.userName,
    managerMode: managerMode,
    ignorePagination: false,
    startIndex: pageState.first === 1 ? 1 : Math.floor(pageState.first / pageState.rows) + 1,
    rowCount: pageState.rows,
    activityAnalysisFilterFilterPara: tableFilters,
  };

  useResetTablePagination(25, setPageState, [activityStatus.value, repActivity.userName, searchByActivity, sStartDate, sEndDate, managerMode]);

  const { data: activityAnalysisData, error, status } = getAllActivitiesByType(payload, isFetchActivityAnalysisList);

  const handleRowClick = (row: any) => {
    dispatch(setSelectedActivityAnalysis(row));
  };

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isFetchActivityAnalysisList,
    error: error,
    setStateFunction: setIsFetchActivityAnalysisList,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const onSort = (e: any) => {
    dispatch(setIsFetchActivityAnalysisList(true));
    setMultiSortMeta(e.multiSortMeta);
    const updatedSortMeta = e.multiSortMeta.map((sort: any) => {
      const field = sort.field
      return { ...sort, field };
    });
    const orderByString = updatedSortMeta
      .map((sort: any) => `${sort.field} ${sort.order === 1 ? "asc" : "desc"}`)
      .join(", ");
    setOrderBy(orderByString);
  };

  const activityAnalysisTable = new ActivityAnalysisListDistributer(multiSortMeta, onSort);

  const onPage = (event: any) => {
    dispatch(setIsFetchActivityAnalysisList(true));
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  const onFilterStock = (e: any, isClear: boolean) => {
    setPageState({ first: 0, rows: pageState.rows });
    setTableFilters(e ? {
      leadName: e.filters.leadName,
      activityType: e.filters.activityType,
      leadStage: e.filters.leadStage,
      subject: e.filters.subject,
      startDate: e.filters.startDate,
      endDate: e.filters.endDate,
    } : null);
  }

  useEffect(() => {
    if (tableFilters) {
      dispatch(setIsFetchActivityAnalysisList(true));
    }
  }, [tableFilters]);

  return (
    <div className='table-container'>
      <DataGrid
        dataTable={activityAnalysisTable}
        data={activityAnalysisData}
        selectedRow={selectedActivityAnalysis}
        setSelectedRow={handleRowClick}
        selectionMode='single'
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        pageSize={pageSize}
        isServerSidePaging={true}
        firstIndex={pageState.first}
        onPage={onPage}
        onFilterCallback={onFilterStock}
        totalRecords={activityAnalysisData ? activityAnalysisData[0]?.totalCount : 0}
        sortMode='multiple'
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
        isSelectionColumnShow={false}
        heightOffset={heightOffset}
      />
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default ActivityAnalysisList;
