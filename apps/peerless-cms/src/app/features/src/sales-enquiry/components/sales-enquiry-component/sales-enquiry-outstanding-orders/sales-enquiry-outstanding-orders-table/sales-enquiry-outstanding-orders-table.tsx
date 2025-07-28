import { RootState, setIsFetchingOutstandingOrdersList } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetOutstandingOrders } from '@peerless/queries';
import { useEffect, useState } from 'react';
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
    const [tableFilters, setTableFilters] = useState<any>();
    const [pageState, setPageState] = useState({ first: 0, rows: 17 });
    const [pageSize, setPageSize] = useState(17);
    const {
        outstandingOrdersCustomer, outstandingOrdersCustomerGroup, outstandingOrdersSubGroup, outstandingOrdersPriceGroup, outstandingOrdersParent, outstandingOrdersMarket, outstandingOrdersRep, outstandingOrdersExDc,
        outstandingOrdersCatalogueType, outstandingOrdersOrderType, outstandingOrdersStates, outstandingOrdersFromDate, outstandingOrdersToDate, outstandingOrdersRadio, outstandingOrdersCurrentOrCompleted,
        isFetchingOutstandingOrdersList, outstandingOrdersSubParent, isDateDisabledOutStandingOrders, outstandingOrdersOrderNumber, outstandingOrdersCustOrderNo, outstandingOrdersProductCode
    } = useSelector((state: RootState) => state.salesEnquiryOutstandingOrders);

    const payload = {
        orderBy: "cust_code asc",
        additionalParams: "",
        catType: outstandingOrdersCatalogueType?.value,
        defWarehouse: outstandingOrdersExDc?.value,
        reqDateRdo: parseInt(outstandingOrdersRadio),
        dateFromEnt: (!isDateDisabledOutStandingOrders ? outstandingOrdersFromDate : undefined),
        dateToEnt: (!isDateDisabledOutStandingOrders ? outstandingOrdersToDate : undefined),
        orderType: outstandingOrdersOrderType?.value,
        parentCustomer: outstandingOrdersParent?.value,
        viewType: parseInt(outstandingOrdersCurrentOrCompleted?.value),
        subParentGroup: outstandingOrdersSubGroup?.value,
        priceGroup: outstandingOrdersPriceGroup?.value,
        market: outstandingOrdersMarket?.value,
        custCode: outstandingOrdersCustomer?.value,
        repCode: outstandingOrdersRep?.value,
        subGroup: outstandingOrdersSubParent?.value,
        nextRecord: pageState.first,
        numberOfRecords: pageState.rows,
        sOrderNo: (outstandingOrdersOrderNumber === '') ? 0 : parseInt(outstandingOrdersOrderNumber),
        catlogCode: outstandingOrdersProductCode,
        custOrderNo: outstandingOrdersCustOrderNo,
        tableFilters: tableFilters,
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

    const onFilterStock = (e: any, isClear: boolean) => {
        setPageState({ first: 0, rows: pageState.rows });
        setTableFilters(e ? {
            orderNo: e.filters.orderNo,
            custOrderNo: e.filters.customerOrderNo,
            productCode: e.filters.product
        } : null);
    }

    useEffect(() => {
        if (tableFilters) {
            dispatch(setIsFetchingOutstandingOrdersList(true));
        }
    }, [tableFilters]);

    useResetTablePagination(17, setPageState, [outstandingOrdersCatalogueType, outstandingOrdersExDc, outstandingOrdersRadio, outstandingOrdersFromDate, outstandingOrdersToDate, outstandingOrdersOrderType, outstandingOrdersParent, outstandingOrdersCustomerGroup, outstandingOrdersSubGroup, outstandingOrdersPriceGroup, outstandingOrdersStates, outstandingOrdersRep, outstandingOrdersMarket, outstandingOrdersCustomer, outstandingOrdersSubParent], 0);

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
                onFilterCallback={onFilterStock}
                totalRecords={outstandingOrdersListData ? outstandingOrdersListData?.totalRecord : 0}
                width='2170px'
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                heightOffset={heightOffset}
                isFullDetailPagination={true}
            />
            <div ref={ref} style={{ height: '1px' }} />
        </div>
    );
};

export default SalesEnquiryOutstandingOrdersListTable;