import { RootState, setSelectedInvoiceEnquiry, setIsFetchingInvoiceEnquiryList, setInvoiceEnquiryTotalsData } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GetInvoiceEnquiry } from '@peerless/queries';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { SalesEnquiryInvoiceEnquiryListDistributer, useResetTablePagination } from '@peerless/common';
import { GetInvoiceEnquiryParameters, RenderStatusContentTable } from '@peerless/models';
import { DataGrid } from '@peerless/controls';

interface SalesEnquiryInvoiceEnquiryListTableProps {
    heightOffset?: number;
}

const SalesEnquiryInvoiceEnquiryListTable = ({ heightOffset }: SalesEnquiryInvoiceEnquiryListTableProps) => {

    const { ref, inView } = useInView({ triggerOnce: false });
    const dispatch = useDispatch();
    const [isCustomerRepType, setIsCustomerRepType] = useState(false);
    const [isInvoiceRepType, setIsInvoiceRepType] = useState(true);
    const [pageState, setPageState] = useState({ first: 0, rows: 20 });
    const [pageSize, setPageSize] = useState(20);
    const [tableFilters, setTableFilters] = useState<any>({
        enduserCode: { value: null, matchMode: 'contains' },
        enduserName: { value: null, matchMode: 'contains' },
        transferredOn: { value: null, matchMode: 'contains' },
        oldCustomer: { value: null, matchMode: 'contains' },
        newCustomer: { value: null, matchMode: 'contains' }
    });
    const [isDataFiltered, setIsDataFiltered] = useState(false);

    const {
        invoiceCustomerGroup, invoiceSubGroup, invoicePriceGroup, invoiceProductGroup, invoiceParent, invoiceMarket, invoiceRep, invoiceCatalogueType,
        invoiceState, invoiceBrand, invoiceCustomer, invoiceFromDate, invoiceToDate, invoiceBatchNumber, invoiceInvoiceNumber, invoiceRadio, isFetchingInvoiceEnquiryList, invoiceRadio2, selectedInvoiceEnquiry
    } = useSelector((state: RootState) => state.salesEnquiryInvoiceEnquiry);
    const { loggedUser, selectedOriginator } = useSelector((state: RootState) => state.header);

    const payload: GetInvoiceEnquiryParameters = {
        cutomerCode: invoiceCustomer?.value,
        catalogueType: invoiceCatalogueType?.value,
        // state: invoiceState?.value,
        customerRep: 0,
        invoicedRep: 0,
        fromDate: invoiceFromDate,
        toDate: invoiceToDate,
        // productGroup: "",
        warehouse: invoiceProductGroup?.value,
        invoiceNo: parseInt(invoiceInvoiceNumber),
        batchNo: parseInt(invoiceBatchNumber),
        invoiceCreditNotesStatus: invoiceRadio,
        parent: invoiceParent?.value,
        // custGroup: invoiceCustomerGroup?.value,
        subGroup: invoiceSubGroup?.value,
        priceGroup: invoicePriceGroup?.value,
        market: invoiceMarket?.value,
        subParentGroup: invoiceBrand?.value,
        orderBy: "ivce_no asc",
        additionalParams: "",
        // repCode: invoiceRep?.value,
        loggedUserRepCode: loggedUser?.repCode,
        childReps: selectedOriginator?.childReps,
        // childReps: '',
        clientType: loggedUser.clientType,
        nextRecord: pageState.first,
        numberOfRecords: pageState.rows,
        repCodeDelection: invoiceRadio2
    };

    const { data: invoiceEnquiryListData, error, status, isFetching, isFetched } = GetInvoiceEnquiry(payload, isFetchingInvoiceEnquiryList);

    const renderStatusContent: RenderStatusContentTable = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingInvoiceEnquiryList || isFetching,
        error: error,
        setStateFunction: setIsFetchingInvoiceEnquiryList,
        isStatusOutput: true,
        isHideClickFilterMessage: true
    };
    const onPage = (event: any) => {
        dispatch(setIsFetchingInvoiceEnquiryList(true));
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
        if (invoiceRadio2 === '1') {
            setIsCustomerRepType(false);
            setIsInvoiceRepType(true);
        }
        else {
            setIsCustomerRepType(true);
            setIsInvoiceRepType(false);
        }
    }, [invoiceRadio2]);

    useEffect(() => {
        if (Object.keys(invoiceEnquiryListData || {}).length > 0) {
            const data = Object.assign({}, invoiceEnquiryListData);
            delete data.invoiceResponses;
            dispatch(setInvoiceEnquiryTotalsData(data));
        }
    }, [isFetched])

    const salesEnquiryInvoiceEnquiry = new SalesEnquiryInvoiceEnquiryListDistributer(isCustomerRepType, isInvoiceRepType);

    useResetTablePagination(20, setPageState, [
        invoiceCustomer?.value,
        invoiceCatalogueType?.value,
        invoiceState?.value,
        invoiceFromDate,
        invoiceToDate,
        invoiceBatchNumber,
        invoiceRadio,
        invoiceParent?.value,
        invoiceCustomerGroup?.value,
        invoiceSubGroup?.value,
        invoicePriceGroup?.value,
        invoiceMarket?.value,
        invoiceBrand?.value,
        invoiceRep?.value,
    ]);

    useEffect(() => {
        if (isFetchingInvoiceEnquiryList) {
            setIsDataFiltered(true);
        }
    }, [isFetchingInvoiceEnquiryList])

    const handleSelectionChange = (row: any) => {
        if (row == null || selectedInvoiceEnquiry?.invUniqueId === row.invUniqueId) {
            dispatch(setSelectedInvoiceEnquiry(null));
        } else {
            dispatch(setSelectedInvoiceEnquiry(row));
        }
    };

    useEffect(() => {
        if (
            status === 'success' &&
            invoiceEnquiryListData.invoiceResponses &&
            invoiceEnquiryListData.invoiceResponses.length > 0
        ) {
            handleSelectionChange(invoiceEnquiryListData.invoiceResponses[0]);
        }
    }, [status, invoiceEnquiryListData]);

    return (
        <div>
            <DataGrid
                uniqueId='invUniqueId'
                dataTable={salesEnquiryInvoiceEnquiry}
                data={invoiceEnquiryListData && invoiceEnquiryListData.invoiceResponses}
                renderStatusContent={renderStatusContent}
                emptyMessage={isDataFiltered ? 'No records available' : 'Please click on filter to view data'}
                enablePagination={true}
                pageSize={pageSize}
                isServerSidePaging={true}
                firstIndex={pageState.first}
                onPage={onPage}
                onFilterCallback={onFilterStock}
                totalRecords={invoiceEnquiryListData ? invoiceEnquiryListData?.totalRecord : 0}
                sortMode='multiple'
                selectionMode={"single"}
                selectedRow={selectedInvoiceEnquiry}
                setSelectedRow={handleSelectionChange}
                isScrollable={true}
                isAutoScrollHeight={true}
                isSelectionColumnShow={false}
                cssClasses={'sticky-header'}
                width={'1240px'}
                heightOffset={heightOffset}
            />
            <div ref={ref} style={{ height: '1px' }} />
        </div>
    );
};

export default SalesEnquiryInvoiceEnquiryListTable;
