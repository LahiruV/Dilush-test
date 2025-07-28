import { RootState, setIsDashboardOpportunityAnalysisFetch, setOpportunityAnalysisTableFilters, setSelectedOpportunityAnalysis } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllOpportunities } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './dashboard-opportunity-analysis-list.css';
import { OpportunityAnalysisParameters, RenderStatusContentTable } from '@peerless/models';
import { OpportunityAnalysisDistributer, useResetTablePagination, useClearQueryCache, useResetTableSorting } from '@peerless/common';
import { DataGrid } from '@peerless/controls';

const OpportunityAnalysisList: React.FC = () => {
  const dispatch = useDispatch();
  const { ref, inView } = useInView({ triggerOnce: false });
  const { loggedUser } = useSelector((state: RootState) => state.header);
  const { opportunityStage, selectedOpportunityAnalysis, isDashboardOpportunityAnalysisFetch, selectedOriginatorOpportunityAnalysis, isFormSubmit } = useSelector((state: RootState) => state.dashboardOpportunityAnalysis);
  const [pageState, setPageState] = useState({ first: 0, rows: 10 });
  const [pageSize, setPageSize] = useState(10);
  const [multiSortMeta, setMultiSortMeta] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState("closeDate ASC");
  const [tableFilters, setTableFilters] = useState<any>();

  const { clearCache } = useClearQueryCache();

  const payload: OpportunityAnalysisParameters = {
    childOriginators: ` (originator = '${selectedOriginatorOpportunityAnalysis.userName}')`,
    defaultDepartmentId: loggedUser.defaultDepartmentId,
    sStartDate: null,
    orderBy: orderBy,
    additionalParams: ``,
    ignorePagination: false,
    startIndex: pageState.first === 1 ? 1 : Math.floor(pageState.first / pageState.rows) + 1,
    rowCount: pageState.rows,
    opportunityAnalysisFilterPara: tableFilters,
  };
  useResetTablePagination(10, setPageState, [opportunityStage.value, selectedOriginatorOpportunityAnalysis.userName], 0);
  const { data: opportunityAnalysisData, error, status, refetch } = GetAllOpportunities(payload, opportunityStage.value, isDashboardOpportunityAnalysisFetch);

  useEffect(() => {
    return () => clearCache(['opportunity-analysis-list']);
  }, []);

  const handleRowClick = (row: any) => {
    dispatch(setSelectedOpportunityAnalysis(row));
  };

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isDashboardOpportunityAnalysisFetch,
    error: error,
    setStateFunction: setIsDashboardOpportunityAnalysisFetch,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const onSort = (e: any) => {
    dispatch(setIsDashboardOpportunityAnalysisFetch(true));
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

  const opportunityAnalysisTable = new OpportunityAnalysisDistributer(multiSortMeta, onSort);

  const onPage = (event: any) => {
    dispatch(setIsDashboardOpportunityAnalysisFetch(true));
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  const onFilterStock = (e: any, isClear: boolean) => {
    dispatch(setIsDashboardOpportunityAnalysisFetch(true));
    setPageState({ first: 0, rows: pageState.rows });
    setTableFilters(e ? {
      leadName: e.filters.leadName,
      originator: e.filters.originator,
      probability: e.filters.probability,
      amount: e.filters.amount,
      units: e.filters.units,
      tonnes: e.filters.tonnes,
      leadStage: e.filters.leadStage,
      closeDate: e.filters.closeDate
    } : null);
    dispatch(setOpportunityAnalysisTableFilters(e ? {
      leadName: e.filters.leadName,
      originator: e.filters.originator,
      probability: e.filters.probability,
      amount: e.filters.amount,
      units: e.filters.units,
      tonnes: e.filters.tonnes,
      leadStage: e.filters.leadStage,
      closeDate: e.filters.closeDate
    } : null)
    )
  }

  useEffect(() => {
    if (tableFilters) {
      dispatch(setIsDashboardOpportunityAnalysisFetch(true));
    }
  }, [tableFilters]);


  useEffect(() => {
    dispatch(setOpportunityAnalysisTableFilters({
      leadName: { value: null, matchMode: 'contains' },
      originator: { value: null, matchMode: 'contains' },
      probability: { value: null, matchMode: 'contains' },
      amount: { value: null, matchMode: 'contains' },
      units: { value: null, matchMode: 'contains' },
      tonnes: { value: null, matchMode: 'contains' },
      leadStage: { value: null, matchMode: 'contains' },
      closeDate: { value: null, matchMode: 'contains' }
    }))
  }, []);

  useResetTableSorting({
    isFormSubmit,
    multiSortMeta,
    setMultiSortMeta,
    orderBy,
    setOrderBy: () => setOrderBy("leadStage ASC"),
    dispatcher: () => dispatch(setIsDashboardOpportunityAnalysisFetch(false)),
    refetch,
  });

  return (
    <div className='opportunity-analysis-list-content'>
      <DataGrid
        dataTable={opportunityAnalysisTable}
        data={opportunityAnalysisData}
        selectedRow={selectedOpportunityAnalysis}
        setSelectedRow={handleRowClick}
        selectionMode='single'
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        pageSize={pageSize}
        isServerSidePaging={true}
        firstIndex={pageState.first}
        onPage={onPage}
        onFilterCallback={onFilterStock}
        totalRecords={opportunityAnalysisData ? opportunityAnalysisData[0]?.totalCount : 0}
        sortMode='multiple'
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
        isSelectionColumnShow={false}
        width='1000px'
        isFullDetailPagination={true}
      />
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default OpportunityAnalysisList;
