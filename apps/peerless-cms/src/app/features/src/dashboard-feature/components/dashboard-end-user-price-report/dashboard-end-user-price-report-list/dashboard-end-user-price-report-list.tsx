import { RootState, setIsFetchEndUserPriceList, setIsFetchEndUserPriceListReport } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { GenerateEndUserPricePdf, GetEnduserProdutPrice } from '@peerless/queries';
import { EndUserPriceReportListDistributer, useResetTablePagination } from '@peerless/common';
import { DataGrid, PdfView } from '@peerless/controls';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { GenerateEndUserPricePdfParameters, RenderStatusContentTable } from '@peerless/models';

interface EndUserPriceReportListProps {
    heightOffset?: number;
}

const DashboardEndUserPriceReportList: React.FC<EndUserPriceReportListProps> = ({ heightOffset }) => {

    const dispatch = useDispatch();
    const { ref, inView } = useInView({ triggerOnce: false });
    const isInitialRender = useRef(true);
    const { repCodeEndUserPrice, baseCodeEndUserPrice, asAtDateEndUserPrice, isFetchEndUserPriceList, isFetchEndUserPriceListReport, isPdfView } = useSelector((state: RootState) => state.dashboardEndUserPrice);
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const [tableFilters, setTableFilters] = useState<any>();
    const [pageState, setPageState] = useState({ first: 1, rows: 25 });
    const [pageSize, setPageSize] = useState(25);
    const [countValue, setCountValue] = useState(0);

    const payload = {
        RepCode: repCodeEndUserPrice?.value,
        BaseCode: baseCodeEndUserPrice?.value,
        AsAtDate: asAtDateEndUserPrice,
        ignorePagination: false,
        nextRecord: pageState.first,
        numberOfRecords: pageState.rows,
        produtPriceFilterPara: tableFilters,
    };

    const reportPayload: GenerateEndUserPricePdfParameters =
    {
        effectiveDate: asAtDateEndUserPrice,
        originator: loggedUser.userName,
        repCode: repCodeEndUserPrice?.value,
        baseCode: baseCodeEndUserPrice?.value,
        produtPriceFilterPara: tableFilters,
    }

    useResetTablePagination(25, setPageState, [asAtDateEndUserPrice, loggedUser.userName, repCodeEndUserPrice?.value, baseCodeEndUserPrice?.value, tableFilters]);

    const { data: generateEndUserPricePdfData, status: reportStatus, error: reportEror } = GenerateEndUserPricePdf(reportPayload, isFetchEndUserPriceListReport)
    const { data: enduserProdutPriceList, error, status } = GetEnduserProdutPrice(payload, isFetchEndUserPriceList, countValue);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchEndUserPriceList,
        error: error,
        setStateFunction: setIsFetchEndUserPriceList,
        isStatusOutput: true,
        isHideClickFilterMessage: true,
    } as RenderStatusContentTable;

    const renderStatusContentPdf = {
        isRenderStatusContentTable: true,
        status: reportStatus,
        isFetch: isFetchEndUserPriceListReport,
        error: reportEror,
        setStateFunction: setIsFetchEndUserPriceListReport,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const endUserPriceReportTable = new EndUserPriceReportListDistributer();

    const onFilterStock = (e: any, isClear: boolean) => {
        setPageState({ first: 0, rows: pageState.rows });
        setTableFilters(e ? {
            distributor: e.filters.distributorCode,
            name: e.filters.distributorName,
            endUserCode: e.filters.endUserCode,
            endUserName: e.filters.endUserName,
            endUserRef: e.filters.endUserRef,
            prodCode: e.filters.productCode,
            prodDesc: e.filters.description,
            prodRef: e.filters.productRef,
        } : null);
    }

    useEffect(() => {
        if (isInitialRender.current) {
            // Skip the initial render
            isInitialRender.current = false;
            return;
        }
        dispatch(setIsFetchEndUserPriceList(true));
    }, [tableFilters]);

    const onPage = (event: any) => {
        dispatch(setIsFetchEndUserPriceList(true));
        const { first, rows } = event;
        setPageState({ first, rows });
    };

    useEffect(() => {
        if (!isInitialRender.current && enduserProdutPriceList) {
            setCountValue(enduserProdutPriceList.totalRecord);
        }
    }, [enduserProdutPriceList]);

    return (
        <div>
            {isPdfView
                ?
                (
                    <div>
                        <PdfView data={`${generateEndUserPricePdfData}`} renderStatusContent={renderStatusContentPdf} />
                    </div>
                )
                :
                (
                    <div className='table-container'>
                        <DataGrid
                            dataTable={endUserPriceReportTable}
                            data={enduserProdutPriceList && enduserProdutPriceList.response}
                            renderStatusContent={renderStatusContent}
                            enablePagination={true}
                            pageSize={pageSize}
                            isServerSidePaging={true}
                            firstIndex={pageState.first}
                            onPage={onPage}
                            onFilterCallback={onFilterStock}
                            isScrollable={true}
                            isAutoScrollHeight={true}
                            cssClasses={'sticky-header'}
                            totalRecords={enduserProdutPriceList ? enduserProdutPriceList.totalRecord : 0}
                            heightOffset={heightOffset}
                        />
                        <div ref={ref} style={{ height: '1px' }} />
                    </div>
                )
            }


        </div>
    );
};

export default DashboardEndUserPriceReportList;
