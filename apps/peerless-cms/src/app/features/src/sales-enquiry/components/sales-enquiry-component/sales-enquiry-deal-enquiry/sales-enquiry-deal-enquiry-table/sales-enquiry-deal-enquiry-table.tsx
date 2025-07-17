import { RootState, setIsFetchingDealEnquiryList } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetDealEnquiry } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SalesEnquiryDealEnquiryListDistributer, useResetTablePagination } from '@peerless/common';
import { DealEnquiryParameters, RenderStatusContentTable } from '@peerless/models';
import { DataGrid } from '@peerless/controls';

interface SalesEnquiryDealEnquiryListTableProps {
    heightOffset?: number;
}

const SalesEnquiryDealEnquiryListTable = ({ heightOffset }: SalesEnquiryDealEnquiryListTableProps) => {

    const { ref, inView } = useInView({ triggerOnce: false });
    const dispatch = useDispatch();
    const { isFetchingDealEnquiryList, dealEnquiryMarketDrop, dealEnquiryAsAtDate, dealEnquiryParentDrop, dealEnquirySubParentDrop, dealEnquiryRepDrop, dealEnquirySubGroupDrop, dealEnquiryPriceGroupDrop, dealEnquiryStatesDrop, dealCatalogueType, showForwardDeals } = useSelector((state: RootState) => state.salesEnquiryDealEnquiry);
    const { loggedUser, childOriginators } = useSelector((state: RootState) => state.header);
    const [pageState, setPageState] = useState({ first: 1, rows: 18 });
    const [pageSize, setPageSize] = useState(18);

    const payload: DealEnquiryParameters = {
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        originator: loggedUser.userName,
        market: dealEnquiryMarketDrop?.value || '',
        asAtDate: dealEnquiryAsAtDate,
        showForwardDeals: showForwardDeals,
        parentCustomer: dealEnquiryParentDrop?.value || '',
        rep: dealEnquiryRepDrop?.value || '',
        subParent: dealEnquirySubParentDrop?.value || '',
        subParentGroup: dealEnquirySubGroupDrop?.value || '',
        priceGroup: dealEnquiryPriceGroupDrop?.value || '',
        // state: dealEnquiryStatesDrop?.value || '',
        catalogueType: dealCatalogueType?.value || '',
        orderBy: 'cust_code asc',
        additionalParams: '',
        ignorePagination: false,
        startIndex: pageState.first,
        rowCount: pageState.rows
    };

    useResetTablePagination(18, setPageState, [dealEnquiryMarketDrop, dealEnquiryAsAtDate, dealEnquiryParentDrop, dealEnquiryRepDrop, dealEnquirySubGroupDrop, dealEnquiryPriceGroupDrop, dealEnquiryStatesDrop, showForwardDeals]);

    const { data: dealEnquiryListData, error, status } = GetDealEnquiry(payload, isFetchingDealEnquiryList);

    const renderStatusContent: RenderStatusContentTable = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingDealEnquiryList,
        error: error,
        setStateFunction: setIsFetchingDealEnquiryList,
        isStatusOutput: true
    };

    const salesEnquiryDealEnquiry = new SalesEnquiryDealEnquiryListDistributer();

    const onPage = (event: any) => {
        dispatch(setIsFetchingDealEnquiryList(true));
        const { first, rows } = event;
        setPageState({ first, rows });
    };

    const rowStyle = (rowData: any) => {
        if (rowData.isOverride)
            return 'row-override';
        else if (rowData.isOverlap)
            return 'row-overlap';
        else if (rowData.isFutureDeal)
            return 'row-future';
        else
            return '';
    }



    return (
        <div>
            <DataGrid
                dataTable={salesEnquiryDealEnquiry}
                data={dealEnquiryListData?.dealResponse || []}
                renderStatusContent={renderStatusContent}
                enablePagination={true}
                pageSize={pageSize}
                isServerSidePaging={true}
                firstIndex={pageState.first}
                onPage={onPage}
                totalRecords={dealEnquiryListData ? dealEnquiryListData.totalRecord : 0}
                rowClassName={rowStyle}
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                heightOffset={heightOffset}
                width='1550px'
            />
            <div ref={ref} style={{ height: '1px' }} />
        </div>
    );
};

export default SalesEnquiryDealEnquiryListTable;
