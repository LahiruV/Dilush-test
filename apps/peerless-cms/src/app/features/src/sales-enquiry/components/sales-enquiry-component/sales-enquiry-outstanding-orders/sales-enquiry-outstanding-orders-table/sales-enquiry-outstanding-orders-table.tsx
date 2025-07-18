import { RootState, setIsFetchingOutstandingOrdersList } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetOutstandingOrders } from '@peerless/queries';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SalesEnquiryOutStandingEnquiryListDistributer, useResetTablePagination } from '@peerless/common';
import { DataGrid } from '@peerless/controls';
import { RenderStatusContentTable } from '@peerless/models';

interface SalesEnquiryOutstandingOrdersListTableProps {
    heightOffset?: number;
};

const SalesEnquiryOutstandingOrdersListTable = ({ heightOffset }: SalesEnquiryOutstandingOrdersListTableProps) => {
    const { ref, inView } = useInView({ triggerOnce: false });
    const dispatch = useDispatch();
    const [pageState, setPageState] = useState({ first: 1, rows: 18 });
    const [pageSize, setPageSize] = useState(18);
    const {
        outstandingOrdersCustomer, outstandingOrdersCustomerGroup, outstandingOrdersSubGroup, outstandingOrdersPriceGroup, outstandingOrdersParent, outstandingOrdersMarket, outstandingOrdersRep, outstandingOrdersExDc,
        outstandingOrdersCatalogueType, outstandingOrdersOrderType, outstandingOrdersStates, outstandingOrdersFromDate, outstandingOrdersToDate, outstandingOrdersRadio, outstandingOrdersCurrentOrCompleted,
        isFetchingOutstandingOrdersList, outstandingOrdersSubParent
    } = useSelector((state: RootState) => state.salesEnquiryOutstandingOrders);

    const payload = {
        orderBy: "cust_code asc",
        additionalParams: "",
        catType: outstandingOrdersCatalogueType?.value,
        defWarehouse: outstandingOrdersExDc?.value,
        reqDateRdo: parseInt(outstandingOrdersRadio),
        dateFromEnt: outstandingOrdersFromDate,
        dateToEnt: outstandingOrdersToDate,
        orderType: outstandingOrdersOrderType?.value,
        parentCustomer: outstandingOrdersParent?.value,
        viewType: parseInt(outstandingOrdersCurrentOrCompleted?.value),
        subParentGroup: outstandingOrdersSubGroup?.value,
        priceGroup: outstandingOrdersPriceGroup?.value,
        market: outstandingOrdersMarket?.value,
        custCode: outstandingOrdersCustomer?.value,
        subGroup: outstandingOrdersSubParent?.value,
        nextRecord: pageState.first,
        numberOfRecords: pageState.rows,
    };

    const { data: outstandingOrdersListData, error, status } = GetOutstandingOrders(payload, isFetchingOutstandingOrdersList);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingOutstandingOrdersList,
        error: error,
        setStateFunction: setIsFetchingOutstandingOrdersList,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const salesEnquiryOutStandingEnquiry = new SalesEnquiryOutStandingEnquiryListDistributer();

    const onPage = (event: any) => {
        dispatch(setIsFetchingOutstandingOrdersList(true));
        const { first, rows } = event;
        setPageState({ first, rows });
    };

    useResetTablePagination(18, setPageState, [outstandingOrdersCatalogueType, outstandingOrdersExDc, outstandingOrdersRadio, outstandingOrdersFromDate, outstandingOrdersToDate, outstandingOrdersOrderType, outstandingOrdersParent, outstandingOrdersCustomerGroup, outstandingOrdersSubGroup, outstandingOrdersPriceGroup, outstandingOrdersStates, outstandingOrdersRep, outstandingOrdersMarket, outstandingOrdersCustomer, outstandingOrdersSubParent]);

    return (
        <div>
            <DataGrid
                dataTable={salesEnquiryOutStandingEnquiry}
                data={outstandingOrdersListData?.outstandingOrderResponses || []}
                renderStatusContent={renderStatusContent}
                enablePagination={true}
                pageSize={pageSize}
                isServerSidePaging={true}
                firstIndex={pageState.first}
                onPage={onPage}
                totalRecords={outstandingOrdersListData ? outstandingOrdersListData?.totalRecord : 0}
                width='2180px'
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                heightOffset={heightOffset}
            />
            <div ref={ref} style={{ height: '1px' }} />
        </div>
    );
};

export default SalesEnquiryOutstandingOrdersListTable;