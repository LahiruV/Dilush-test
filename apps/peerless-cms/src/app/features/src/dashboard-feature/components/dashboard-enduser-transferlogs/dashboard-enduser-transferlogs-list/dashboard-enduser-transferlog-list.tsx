import { RootState, setIsDashEndUserTransferLogsListFetch } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetEndUserTransferLog } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { EndUserTransferLogListDistributer, useResetTablePagination } from '@peerless/common';
import { DataGrid } from '@peerless/controls';
import { RenderStatusContentTable } from '@peerless/models';

interface EndUserTransferLogListProps {
  heightOffset?: number;
}

const DashboardEndUserTransferLogList: React.FC<EndUserTransferLogListProps> = ({ heightOffset }) => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: false });
  const { endUserLogStartDate, endUserLogEndDate, searchByDashEndUserLogs, isDashEndUserTransferLogsListFetch, childOriginatorsDashEndUserTransferLogs } = useSelector((state: RootState) => state.dashboardEndUserTransferLogs);
  const { loggedUser } = useSelector((state: RootState) => state.header);
  const [pageState, setPageState] = useState({ first: 1, rows: 20 });
  const [pageSize, setPageSize] = useState(20);
  const [multiSortMeta, setMultiSortMeta] = useState([]);
  const [orderBy, setOrderBy] = useState("enduserCode ASC");
  const [tableFilters, setTableFilters] = useState<any>({
    enduserCode: { value: null, matchMode: 'contains' },
    enduserName: { value: null, matchMode: 'contains' },
    transferredOn: { value: null, matchMode: 'contains' },
    oldCustomer: { value: null, matchMode: 'contains' },
    newCustomer: { value: null, matchMode: 'contains' }
  });

  const payload = {
    startDate: endUserLogStartDate,
    endDate: endUserLogEndDate,
    additionalParams: searchByDashEndUserLogs ? `name like '%${searchByDashEndUserLogs}%'` : "",
    repType: loggedUser.repType,
    originator: loggedUser.userName,
    childOriginators: childOriginatorsDashEndUserTransferLogs,
    defaultDepartmentId: loggedUser.defaultDepartmentId,
    isNew: true,
    ignorePagination: false,
    startIndex: pageState.first === 1 ? 1 : Math.floor(pageState.first / pageState.rows) + 1,
    rowCount: pageState.rows,
    orderBy: orderBy,
    endUserTransferLogFilterPara: tableFilters,
  };

  useResetTablePagination(20, setPageState, [endUserLogStartDate, endUserLogEndDate, childOriginatorsDashEndUserTransferLogs]);

  const { data: endUserTransferLogsData, error, status } = GetEndUserTransferLog(payload, isDashEndUserTransferLogsListFetch);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isDashEndUserTransferLogsListFetch,
    error: error,
    setStateFunction: setIsDashEndUserTransferLogsListFetch,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const onSort = (e: any) => {
    dispatch(setIsDashEndUserTransferLogsListFetch(true));
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

  const endUserTransferLogTable = new EndUserTransferLogListDistributer(multiSortMeta, onSort);

  const onPage = (event: any) => {
    dispatch(setIsDashEndUserTransferLogsListFetch(true));
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  const onFilterStock = (e: any, isClear: boolean) => {
    setPageState({ first: 0, rows: pageState.rows });
    setTableFilters(e ? {
      enduserCode: e.filters.enduserCode,
      enduserName: e.filters.enduserName,
      transferredOn: e.filters.transferredOn,
      oldCustomer: e.filters.oldCustomer,
      newCustomer: e.filters.newCustomer
    } : {
      enduserCode: { value: null, matchMode: 'contains' },
      enduserName: { value: null, matchMode: 'contains' },
      transferredOn: { value: null, matchMode: 'contains' },
      oldCustomer: { value: null, matchMode: 'contains' },
      newCustomer: { value: null, matchMode: 'contains' }
    });
  }

  useEffect(() => {
    if (tableFilters) {
      dispatch(setIsDashEndUserTransferLogsListFetch(true));
    }
  }, [tableFilters]);


  return (
    <div className='table-container'>
      <DataGrid
        dataTable={endUserTransferLogTable}
        data={endUserTransferLogsData}
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        pageSize={pageSize}
        isServerSidePaging={true}
        firstIndex={pageState.first}
        onPage={onPage}
        onFilterCallback={onFilterStock}
        totalRecords={endUserTransferLogsData ? endUserTransferLogsData[0]?.totalCount : 0}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
        sortMode='multiple'
        heightOffset={heightOffset}
      />
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default DashboardEndUserTransferLogList;
