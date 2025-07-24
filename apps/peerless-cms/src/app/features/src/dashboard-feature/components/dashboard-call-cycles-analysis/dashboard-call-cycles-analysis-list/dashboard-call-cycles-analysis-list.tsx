import { RootState, setCallCycleAnalysisTableFilters, setIsCallCyclesAnalysisListFetch } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllCallCycles } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './dashboard-call-cycles-analysis-list.css';
import { ListTable } from '@peerless-cms/features-common-components';
import { CallCyclesAnalysisParameters, RenderStatusContentTable } from '@peerless/models';
import { CallCycleAnalysisListDistributer, getDate, useResetTablePagination, useResetTableSorting } from '@peerless/common';
import { DataGrid } from '@peerless/controls';

const CallCyclesAnalysisList: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: false });
  const dispatch = useDispatch();
  const { callCyclesStartDate, callCyclesEndDate, isCallCyclesAnalysisListFetch, selectedOriginatorCallCyclesAnalysis, childOriginatorsCallCyclesAnalysis, isFormSubmit } = useSelector((state: RootState) => state.dashboardCallCyclesAnalysis);
  const [pageState, setPageState] = useState({ first: 1, rows: 9 });
  const [pageSize, setPageSize] = useState(9);
  const [multiSortMeta, setMultiSortMeta] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState("leadStage ASC");
  const [tableFilters, setTableFilters] = useState<any>();


  const payload: CallCyclesAnalysisParameters = {
    originator: selectedOriginatorCallCyclesAnalysis.userName,
    sStartDate: getDate(new Date(callCyclesStartDate)),
    sEndDate: getDate(new Date(callCyclesEndDate)),
    repType: selectedOriginatorCallCyclesAnalysis.repType,
    isIncludeContact: false,
    orderBy: orderBy,
    additionalParams: ``,
    childOriginators: ` ${childOriginatorsCallCyclesAnalysis}`,
    leadId: 0,
    ignorePagination: false,
    startIndex: pageState.first === 1 ? 1 : Math.floor(pageState.first / pageState.rows) + 1,
    rowCount: pageState.rows,
    callCyclesAnalysisFilterFilterPara: tableFilters,
  };

  useResetTablePagination(9, setPageState, [selectedOriginatorCallCyclesAnalysis, callCyclesStartDate, callCyclesEndDate, childOriginatorsCallCyclesAnalysis]);

  const { data: callCyclesAnalysisData, error, status, refetch } = GetAllCallCycles(payload, isCallCyclesAnalysisListFetch);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isCallCyclesAnalysisListFetch,
    error: error,
    setStateFunction: setIsCallCyclesAnalysisListFetch,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const onSort = (e: any) => {
    dispatch(setIsCallCyclesAnalysisListFetch(true));
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

  const callCycleAnalysisList = new CallCycleAnalysisListDistributer(multiSortMeta, onSort);

  const onPage = (event: any) => {
    dispatch(setIsCallCyclesAnalysisListFetch(true));
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  const onFilterStock = (e: any, isClear: boolean) => {
    setPageState({ first: 0, rows: pageState.rows });
    setTableFilters(e ? {
      callCycle: e.filters.callCycle,
      dueOn: e.filters.dueOn,
      organization: e.filters.organization,
      rep: e.filters.rep,
      leadStage: e.filters.leadStage,
      address: e.filters.address,
      city: e.filters.city,
      state: e.filters.state,
      postCode: e.filters.postCode,
    } : null);
    dispatch(setCallCycleAnalysisTableFilters(e ? {
      callCycle: e.filters.callCycle,
      dueOn: e.filters.dueOn,
      organization: e.filters.organization,
      rep: e.filters.rep,
      leadStage: e.filters.leadStage,
      address: e.filters.address,
      city: e.filters.city,
      state: e.filters.state,
      postCode: e.filters.postCode,
    } : null)
    )
  }

  useEffect(() => {
    if (tableFilters) {
      dispatch(setIsCallCyclesAnalysisListFetch(true));
    }
  }, [tableFilters]);

  useResetTableSorting({
    isFormSubmit,
    multiSortMeta,
    setMultiSortMeta,
    orderBy,
    setOrderBy: () => setOrderBy("leadStage ASC"),
    dispatcher: () => dispatch(setIsCallCyclesAnalysisListFetch(false)),
    refetch,
  });

  return (
    <div className='call-cycles-analysis-list-content'>
      <DataGrid
        dataTable={callCycleAnalysisList}
        data={callCyclesAnalysisData}
        // scrollHeight={'490px'}
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        pageSize={pageSize}
        isServerSidePaging={true}
        firstIndex={pageState.first}
        onPage={onPage}
        onFilterCallback={onFilterStock}
        totalRecords={callCyclesAnalysisData ? callCyclesAnalysisData[0]?.totalCount : 0}
        sortMode='multiple'
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
      />
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default CallCyclesAnalysisList;