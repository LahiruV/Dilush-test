import { RootState, setIsBusinessSalesEnqListFetch } from '@peerless-cms/store';
import { useSelector } from 'react-redux';
import { GetSalesInfoDetailViewState } from '@peerless/queries';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { CustomizedTableGrid, RenderStatusContentTable, SalesInfoDetailParameters } from '@peerless/models';
import { DataGrid } from '@peerless/controls';
import { BusinessSalesEnquiryListDistributer } from '@peerless/common';

const DashBoardBusinessSalesEnquiryList: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: false });
  const { businessSalesEnqSales, businessSalesEnqSortBy, businessSalesEnqGroupBy, isBusinessSalesEnqListFetch, selectedOriginatorBusinessSalesEnquiry } = useSelector((state: RootState) => state.dashBoardBusinessSalesEnquiry);

  const payload = {
    args: {
      rowCount: 20,
      startIndex: 1,
      orderBy: "",
      additionalParams: "",
      repCode: selectedOriginatorBusinessSalesEnquiry.userName
    },
    busSalesEnqSrc: {
      cDisplayOption: businessSalesEnqSales.value,
      sLastFlag: "n",
      detailType: businessSalesEnqGroupBy.value,
      catalogType: "F",
      repType: "F",
      backeryOption: 0,
      iCostPeriod: 11,
      sortField: businessSalesEnqSortBy.value,
    }
  } as SalesInfoDetailParameters

  const { businessSalesEnqSalesData, error, status, fetchNextPage, isFetchingNextPage, hasNextPage } = GetSalesInfoDetailViewState(payload, 20, isBusinessSalesEnqListFetch);

  const gridData = businessSalesEnqSalesData && businessSalesEnqSalesData.length > 0
    ? businessSalesEnqSalesData[0].lstCustomizedTableGrid.map((item: CustomizedTableGrid) => ({
      ...item
    }))
    : [];

  const formatNumber = (num: any) => typeof num === 'number' ? num.toFixed(2) : num;

  const footerD = {
    md: 'Total: ' + ((gridData[0]?.mdTot) ?? 'N/A'),
    m_m6D: formatNumber(gridData[0]?.m_m6DTot) ?? 'N/A',
    m_m5D: formatNumber(gridData[0]?.m_m5DTot) ?? 'N/A',
    m_m4D: formatNumber(gridData[0]?.m_m4DTot) ?? 'N/A',
    m_m3D: formatNumber(gridData[0]?.m_m3DTot) ?? 'N/A',
    m_m2D: formatNumber(gridData[0]?.m_m2DTot) ?? 'N/A',
    m_m1D: formatNumber(gridData[0]?.m_m1DTot) ?? 'N/A',
    m1D: formatNumber(gridData[0]?.m1DTot) ?? 'N/A',
    m2D: formatNumber(gridData[0]?.m2DTot) ?? 'N/A',
    m3D: formatNumber(gridData[0]?.m3DTot) ?? 'N/A',
    m4D: formatNumber(gridData[0]?.m4DTot) ?? 'N/A',
    m5D: formatNumber(gridData[0]?.m5DTot) ?? 'N/A',
    m6D: formatNumber(gridData[0]?.m6DTot) ?? 'N/A',
    mtd: formatNumber(gridData[0]?.mtdTot) ?? 'N/A',
    currentMonthBudget: formatNumber(gridData[0]?.currentMonthBudgetTot) ?? 'N/A',
    mtytdd: formatNumber(gridData[0]?.mtytddTot) ?? 'N/A',
    mlytdd: formatNumber(gridData[0]?.mlytddTot) ?? 'N/A',
    mpd: formatNumber(gridData[0]?.mpdTot) ?? 'N/A',
    budgetYTD: formatNumber(gridData[0]?.budgetYTDTot) ?? 'N/A',
    mY1D: formatNumber(gridData[0]?.mY1DTot) ?? 'N/A',
    mY2D: formatNumber(gridData[0]?.mY2DTot) ?? 'N/A',
  };

  const footerT = {
    md: formatNumber(gridData[0]?.mdTot) ?? 'N/A',
    m_m6T: formatNumber(gridData[0]?.m_m6TTot) ?? 'N/A',
    m_m5T: formatNumber(gridData[0]?.m_m5TTot) ?? 'N/A',
    m_m4T: formatNumber(gridData[0]?.m_m4TTot) ?? 'N/A',
    m_m3T: formatNumber(gridData[0]?.m_m3TTot) ?? 'N/A',
    m_m2T: formatNumber(gridData[0]?.m_m2TTot) ?? 'N/A',
    m_m1T: formatNumber(gridData[0]?.m_m1TTot) ?? 'N/A',
    m1T: formatNumber(gridData[0]?.m1TTot) ?? 'N/A',
    m2T: formatNumber(gridData[0]?.m2TTot) ?? 'N/A',
    m3T: formatNumber(gridData[0]?.m3TTot) ?? 'N/A',
    m4T: formatNumber(gridData[0]?.m4TTot) ?? 'N/A',
    m5T: formatNumber(gridData[0]?.m5TTot) ?? 'N/A',
    m6T: formatNumber(gridData[0]?.m6TTot) ?? 'N/A',
    mtt: formatNumber(gridData[0]?.mttTot) ?? 'N/A',
    currentMonthBudgetT: formatNumber(gridData[0]?.currentMonthBudgetTTot) ?? 'N/A',
    mtytdt: formatNumber(gridData[0]?.mtytdtTot) ?? 'N/A',
    mlytdt: formatNumber(gridData[0]?.mlytdtTot) ?? 'N/A',
    mpt: formatNumber(gridData[0]?.mptTot) ?? 'N/A',
    budgetYTD_T: formatNumber(gridData[0]?.budgetYTD_TTot) ?? 'N/A',
    mY1T: formatNumber(gridData[0]?.mY1TTot) ?? 'N/A',
    mY2T: formatNumber(gridData[0]?.mY2TTot) ?? 'N/A',
  };

  const footerU = {
    md: gridData[0]?.mdTot ?? 'N/A',
    m_m6U: formatNumber(gridData[0]?.m_m6UTot) ?? 'N/A',
    m_m5U: formatNumber(gridData[0]?.m_m5UTot) ?? 'N/A',
    m_m4U: formatNumber(gridData[0]?.m_m4UTot) ?? 'N/A',
    m_m3U: formatNumber(gridData[0]?.m_m3UTot) ?? 'N/A',
    m_m2U: formatNumber(gridData[0]?.m_m2UTot) ?? 'N/A',
    m_m1U: formatNumber(gridData[0]?.m_m1UTot) ?? 'N/A',
    m1U: formatNumber(gridData[0]?.m1UTot) ?? 'N/A',
    m2U: formatNumber(gridData[0]?.m2UTot) ?? 'N/A',
    m3U: formatNumber(gridData[0]?.m3UTot) ?? 'N/A',
    m4U: formatNumber(gridData[0]?.m4UTot) ?? 'N/A',
    m5U: formatNumber(gridData[0]?.m5UTot) ?? 'N/A',
    m6U: formatNumber(gridData[0]?.m6UTot) ?? 'N/A',
    mtu: formatNumber(gridData[0]?.mtuTot) ?? 'N/A',
    currentMonthBudgetU: formatNumber(gridData[0]?.currentMonthBudgetUTot) ?? 'N/A',
    mtytdu: formatNumber(gridData[0]?.mtytduTot) ?? 'N/A',
    mlytdu: formatNumber(gridData[0]?.mlytduTot) ?? 'N/A',
    mpu: formatNumber(gridData[0]?.mpuTot) ?? 'N/A',
    budgetYTD_U: formatNumber(gridData[0]?.budgetYTD_UTot) ?? 'N/A',
    mY1U: formatNumber(gridData[0]?.mY1UTot) ?? 'N/A',
    mY2U: formatNumber(gridData[0]?.mY2UTot) ?? 'N/A',
  }

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
    isFetch: isBusinessSalesEnqListFetch,
    error: error,
    setStateFunction: setIsBusinessSalesEnqListFetch,
    isStatusOutput: true
  } as RenderStatusContentTable;

  const businessSalesEnquiryTable = new BusinessSalesEnquiryListDistributer(businessSalesEnqSales.value, footerD, footerT, footerU);

  return (
    <div className=''>
      <DataGrid
        dataTable={businessSalesEnquiryTable}
        data={gridData}
        // scrollHeight={'890px'}
        renderStatusContent={renderStatusContent}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
      />
      <div ref={ref} style={{ height: '1px' }} />
    </div>
  );
};

export default DashBoardBusinessSalesEnquiryList;
