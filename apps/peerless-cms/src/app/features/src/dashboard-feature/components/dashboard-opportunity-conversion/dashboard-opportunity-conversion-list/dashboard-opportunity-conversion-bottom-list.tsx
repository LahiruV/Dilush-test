import { RootState, setIsLeaderCustomerOpportunityFetch } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetLeaderCustomerOpportunity } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ListTable } from '@peerless-cms/features-common-components';
import { LeaderCustomerOpportunityParameters, RenderStatusContentTable } from '@peerless/models';
import { getDate, OpportunityConversionBottomListDistributer, useResetTablePagination, useResetTableSorting } from '@peerless/common';
import { DataGrid } from '@peerless/controls';

const OpportunityConversionBottomList: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: false });
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((state: RootState) => state.header);
  const { opportunityConversionStartDate, opportunityConversionEndDate, opportunityConversionState, opportunityConversionMarket, isLeaderCustomerOpportunityFetch, selectedOriginatorOpportunityConversion, childOriginatorsOpportunityConversion, isFormSubmit } = useSelector((state: RootState) => state.dashBoarOpportunityConversion);
  const [pageState, setPageState] = useState({ first: 1, rows: 5 });
  const [pageSize, setPageSize] = useState(5);
  const [multiSortMeta, setMultiSortMeta] = useState<any[]>([]);
  const [orderBy, setOrderBy] = useState("originator ASC");

  const payload: LeaderCustomerOpportunityParameters = {
    originator: loggedUser.userName,
    childOriginators: ` ${childOriginatorsOpportunityConversion}`,
    market: opportunityConversionMarket.value,
    state: opportunityConversionState.value,
    repType: selectedOriginatorOpportunityConversion.repType,
    sStartDate: getDate(new Date(opportunityConversionStartDate)),
    sEndDate: getDate(new Date(opportunityConversionEndDate)),
    orderBy: orderBy,
    ignorePagination: false,
    startIndex: pageState.first === 1 ? 1 : Math.floor(pageState.first / pageState.rows) + 1,
    rowCount: pageState.rows
  };

  useResetTablePagination(5, setPageState, [opportunityConversionStartDate, opportunityConversionEndDate, opportunityConversionState, opportunityConversionMarket, selectedOriginatorOpportunityConversion]);

  const { data: LeaderCustomerOpportunityData, error, status, refetch } = GetLeaderCustomerOpportunity(payload, isLeaderCustomerOpportunityFetch);

  const columns = [
    { name: 'Rep', selector: (row: any) => row.originator, sortable: true },
    { name: 'Opportunity', selector: (row: any) => row.opportunity, sortable: true },
    { name: 'RepName', selector: (row: any) => row.repName, sortable: true },
    { name: 'Status', selector: (row: any) => row.stage, sortable: true },
    { name: 'Created Date', selector: (row: any) => getDate(new Date(row.createdDate)), sortable: true },
    { name: 'Amount', selector: (row: any) => "$" + row.amount, sortable: true, right: true, },
    { name: 'Units', selector: (row: any) => row.tonnes, sortable: true, right: true, },
    { name: 'State', selector: (row: any) => row.state, sortable: true },
    { name: 'Market', selector: (row: any) => row.market, sortable: true },
  ];

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLeaderCustomerOpportunityFetch,
    error: error,
    setStateFunction: setIsLeaderCustomerOpportunityFetch,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const onSort = (e: any) => {
    dispatch(setIsLeaderCustomerOpportunityFetch(true));
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

  const opportunityConversionBottomList = new OpportunityConversionBottomListDistributer(multiSortMeta, onSort);

  const onPage = (event: any) => {
    dispatch(setIsLeaderCustomerOpportunityFetch(true));
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  useResetTableSorting({
    isFormSubmit,
    multiSortMeta,
    setMultiSortMeta,
    orderBy,
    setOrderBy: () => setOrderBy("originator ASC"),
    dispatcher: () => dispatch(setIsLeaderCustomerOpportunityFetch(false)),
    refetch,
  });

  return (
    <div className='call-cycles-analysis-list-content table-container'>
      <DataGrid
        dataTable={opportunityConversionBottomList}
        data={LeaderCustomerOpportunityData}
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        pageSize={pageSize}
        isServerSidePaging={true}
        firstIndex={pageState.first}
        onPage={onPage}
        totalRecords={LeaderCustomerOpportunityData ? LeaderCustomerOpportunityData[0]?.totalCount : 0}
        sortMode='multiple'
        scrollHeight={'186px'}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
      />
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default OpportunityConversionBottomList;
