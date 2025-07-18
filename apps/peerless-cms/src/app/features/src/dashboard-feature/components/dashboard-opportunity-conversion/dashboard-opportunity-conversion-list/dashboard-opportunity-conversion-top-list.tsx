import { RootState, setIsLeaderCustomerOpportunityFetchCount } from '@peerless-cms/store';
import { useSelector } from 'react-redux';
import { GetLeaderCustomerOpportunityCount } from '@peerless/queries';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { LeaderCustomerOpportunityParameters, RenderStatusContentTable } from '@peerless/models';
import { getDate, OpportunityConversionTopListDistributer } from '@peerless/common';
import { DataGrid } from '@peerless/controls';

const OpportunityConversionTopList: React.FC = () => {

  const { ref, inView } = useInView({ triggerOnce: false });
  const { loggedUser } = useSelector((state: RootState) => state.header);
  const { opportunityConversionStartDate, opportunityConversionEndDate, opportunityConversionState, opportunityConversionMarket, isLeaderCustomerOpportunityFetchCount, selectedOriginatorOpportunityConversion, childOriginatorsOpportunityConversion } = useSelector((state: RootState) => state.dashBoarOpportunityConversion);

  const payload: LeaderCustomerOpportunityParameters = {
    originator: loggedUser.userName,
    childOriginators: ` ${childOriginatorsOpportunityConversion}`,
    market: opportunityConversionMarket.value,
    state: opportunityConversionState.value,
    repType: selectedOriginatorOpportunityConversion.repType,
    sStartDate: getDate(new Date(opportunityConversionStartDate)),
    sEndDate: getDate(new Date(opportunityConversionEndDate)),
    orderBy: ``,
    ignorePagination: false,
  };

  const { LeaderCustomerOpportunityCountData, error, status, fetchNextPage, isFetchingNextPage, hasNextPage } = GetLeaderCustomerOpportunityCount(payload, 5, isLeaderCustomerOpportunityFetchCount);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(result => {
        console.log("Fetched next page data:", result.data);
      }).catch(error => {
        console.error("Error fetching next page:", error);
      });
    }
  }, [fetchNextPage, inView]);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLeaderCustomerOpportunityFetchCount,
    error: error,
    setStateFunction: setIsLeaderCustomerOpportunityFetchCount,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const lastRow = {
    amount: LeaderCustomerOpportunityCountData.length > 0 && LeaderCustomerOpportunityCountData[0]?.sumOfAmount !== undefined
      ? '$' + LeaderCustomerOpportunityCountData[0].sumOfAmount.toFixed(2)
      : 'N/A',
    tonnes: LeaderCustomerOpportunityCountData.length > 0 && LeaderCustomerOpportunityCountData[0]?.sumOfTonnes !== undefined
      ? LeaderCustomerOpportunityCountData[0].sumOfTonnes.toFixed(2)
      : 'N/A',
  };

  const opportunityConversionTopList = new OpportunityConversionTopListDistributer(lastRow);

  return (
    <div className='call-cycles-analysis-list-content'>
      <div className='list-table-footer'>
        <DataGrid dataTable={opportunityConversionTopList} data={LeaderCustomerOpportunityCountData} scrollHeight={'179px'} renderStatusContent={renderStatusContent} cssClasses={"sticky-header"} />
        <div ref={ref} style={{ height: '1px' }} />
      </div>
    </div>
  );
};

export default OpportunityConversionTopList;
