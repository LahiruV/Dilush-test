import { RootState, setIsFetchingCustomerPriceList } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetCustomerPricelist } from '@peerless/queries';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GetCustomerPricelistParameters, RenderStatusContentTable } from '@peerless/models';
import { SalesEnquiryCustomerPriceListDistributer, useResetTableSorting } from '@peerless/common';
import { DataGrid } from '@peerless/controls';
interface SalesEnquiryCustomerPriceListTableProps {
    heightOffset?: number;
}

const SalesEnquiryCustomerPriceListTable = ({ heightOffset }: SalesEnquiryCustomerPriceListTableProps) => {
    const dispatch = useDispatch();
    const { ref, inView } = useInView({ triggerOnce: false });
    const { customerPriceListMainDropType, customerPriceListCustomerCode, customerPriceListEffectiveDate, customerPriceListAsAtDate, customerPriceListMainDrop, isFetchingCustomerPriceList, customerPriceListEndDate, isFormSubmit } = useSelector((state: RootState) => state.salesEnquiryCustomerPriceList);
    const [pageState, setPageState] = useState({ first: 0, rows: 25 });
    const [pageSize, setPageSize] = useState(25)
    const [tableFilters, setTableFilters] = useState<any>();
    const [multiSortMeta, setMultiSortMeta] = useState<any[]>([]);
    const [orderBy, setOrderBy] = useState("catlog_code asc");
    const isInitialRender = useRef(true);

    const payload: GetCustomerPricelistParameters = {
        type: customerPriceListMainDrop?.value || '',
        code: customerPriceListMainDropType?.value || '',
        custCode: customerPriceListCustomerCode?.value || '',
        effectiveDate: customerPriceListEffectiveDate?.value || '',
        endDate: customerPriceListEndDate,
        asAtDate: customerPriceListAsAtDate,
        additionalParams: '',
        orderBy: orderBy,
        ignorePagination: false,
        startIndex: pageState.first,
        rowCount: pageState.rows,
        filterPara: tableFilters,
    }

    const { data: customerPricelistData, error, status, refetch } = GetCustomerPricelist(payload, isFetchingCustomerPriceList);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingCustomerPriceList,
        error: error,
        setStateFunction: setIsFetchingCustomerPriceList,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const onSort = (e: any) => {
        dispatch(setIsFetchingCustomerPriceList(true));
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

    const salesEnquiryCustomerPrice = new SalesEnquiryCustomerPriceListDistributer(multiSortMeta, onSort);

    const onPage = (event: any) => {
        dispatch(setIsFetchingCustomerPriceList(true));
        const { first, rows } = event;
        setPageState({ first, rows });
    };

    const onFilterStock = (e: any, isClear: boolean) => {
        setPageState({ first: 0, rows: pageState.rows });
        setTableFilters(e ? {
            catlogCode: e.filters.catlogCode,
            description: e.filters.description,
            minQty: e.filters.minQty,
            discPercentage: e.filters.discPercentage,
            listPrice: e.filters.listPrice,
            dealFrom: e.filters.dealFrom,
            dealTo: e.filters.dealTo,
            price: e.filters.price,
            dealPrice: e.filters.dealPrice,
            dealDiscPercentage: e.filters.dealDiscPercentage,
            netPrice: e.filters.netPrice,
        } : null);
    }

    useEffect(() => {
        if (isInitialRender.current) {
            // Skip the initial render
            isInitialRender.current = false;
            return;
        }
        dispatch(setIsFetchingCustomerPriceList(true));
    }, [tableFilters]);


    useResetTableSorting({
        isFormSubmit,
        multiSortMeta,
        setMultiSortMeta,
        orderBy,
        setOrderBy: () => setOrderBy("catlog_code asc"),
        dispatcher: () => dispatch(setIsFetchingCustomerPriceList(false)),
        refetch,
    });

    return (
        <div className='table-container'>
            <DataGrid
                dataTable={salesEnquiryCustomerPrice}
                data={customerPricelistData || []}
                renderStatusContent={renderStatusContent}
                onPage={onPage}
                onFilterCallback={onFilterStock}
                sortMode='multiple'
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                heightOffset={heightOffset}
            />
            <div ref={ref} style={{ height: '1px' }} />
        </div>
    );
};

export default SalesEnquiryCustomerPriceListTable;
