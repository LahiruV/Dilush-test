import { FeaturesBase } from "@peerless-cms/features";
import { RootState, setIsFetchingStockEnquiryList, setSelectedStockEnquiry, setTriggerStockEnquiryFiltersFormSubmit } from "@peerless-cms/store";
import { StockEnquiryGrid } from "@peerless/common";
import { DataGrid } from "@peerless/controls";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import './stock-enquiry.css';
import { getStockEnquiry } from "@peerless/queries";
import { RenderStatusContentTable } from "@peerless/models";
import SectionMainBase from "../../../../lib/section-main-base";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { StockEnquiryFilters } from './stock-enquiry-filters'

export function StockEnquiry() {
    const dispatch = useDispatch();
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const [pageState, setPageState] = useState({ first: 0, rows: 22 });
    const [tableFilters, setTableFilters] = useState<any>();
    const [isDataFiltered, setIsDataFiltered] = useState<any>();
    const isInitialRender = useRef(true);

    const { stockEnqFilters: stockFilters, isFetchingStockEnquiryList, selectedStockEnquiry, productCode, productType, targetMarket, productOwner, market, exdc, view, dateType, showWip, showPromoForecast, showPromoSales, critical, short, exportedProductsOnly } = useSelector((state: RootState) => (state.stockEnquiryFilters));

    // useEffect(() => {
    //     setPageState({ first: 0, rows: 22 });
    // }, [stockFilters]);

    useEffect(() => {
        if (isFetchingStockEnquiryList) {
            setIsDataFiltered(true);
        }
    }, [isFetchingStockEnquiryList]);

    const payload = {
        nextRecord: pageState.first,
        numberOfRecords: pageState.rows,
        warehouseId: exdc?.value,
        partNumberPattern: targetMarket?.value ?? '',
        ownerCode: productOwner?.value ?? '',
        market: market?.value ?? '',
        catalogType: productType?.value,
        isProduced: false,
        status: '',
        sellingCode: '',
        View: view?.value,
        ReqDateType: dateType,
        CatalogCode: productCode?.value ?? '',
        OptionalFieldVisibility: (showWip || showPromoForecast || showPromoSales) ? 'T' : 'F',
        IsCriticalChecked: critical,
        IsShortChecked: short,
        TableFilters: tableFilters,
        IsExported: exportedProductsOnly,
    }

    const { data: stockEnquiryList, status, error, isLoading } = getStockEnquiry(payload, isFetchingStockEnquiryList);

    const onFilterStock = (e: any, isClear: boolean) => {
        setPageState({ first: 0, rows: pageState.rows });
        setTableFilters(e ? { LineNo: e.filters.lineNumber, Description: e.filters.description } : null);
    }

    useEffect(() => {
        if (isInitialRender.current) {
            // Skip the initial render
            isInitialRender.current = false;
            return;
        }
        dispatch(setIsFetchingStockEnquiryList(true));
    }, [tableFilters]);

    const onPage = (event: any) => {
        const { first, rows } = event;
        setPageState({ first, rows: rows });
        dispatch(setIsFetchingStockEnquiryList(true));
    };

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchingStockEnquiryList,
        error: error,
        setStateFunction: setIsFetchingStockEnquiryList,
        isStatusOutput: true,
        isHideClickFilterMessage: true,
    } as RenderStatusContentTable;

    const stockEnqGrid = new StockEnquiryGrid({
        hideWip: (!showWip),
        hidePromoForecast: (!showPromoForecast),
        hidePromoSales: (!showPromoSales),
        viewType: view ?? 'W'
    });

    const rowStyle = (rowData: any) => {
        if (rowData.isCritical)
            return 'row-critical';
        else if (rowData.isShort)
            return 'row-short';
        else
            return '';
    }

    const handleSelectionChange = (row: any) => {
        if (row == null || selectedStockEnquiry?.uniqueId === row.uniqueId) {
            dispatch(setSelectedStockEnquiry(null));
        } else {
            dispatch(setSelectedStockEnquiry(row));
        }
    };

    const handleExternalSubmit = () => {
        dispatch(setTriggerStockEnquiryFiltersFormSubmit(true));
    };

    const headerInlineElements = (
        <div className="pad-right-10" style={{ marginLeft: 'auto' }}>
            <div className="stock-enq-legends">
                <div className="rounded-lg bg-white">
                    <div className="flex gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-2"><span className="legend-critical"></span> Critical</span>
                        <span className="flex items-center gap-2"><span className="legend-short"></span> Short</span>
                        <span>|</span>
                        <span className="flex items-center gap-2"><span className="">O - </span> Make to Order</span>
                        <span className="flex items-center gap-2"><span className="">M - </span> Make and Delivered</span>
                        <span className="flex items-center gap-2"><span className="">R - </span> Runout</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const header = (
        <HeaderFilterContainer title="Stock Enquiry" icon={fa2.faLightbulb} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <StockEnquiryFilters isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isFetchingStockEnquiryList}
            inlineElements={headerInlineElements}
            setIsFilterExpanded={setIsFilterExpanded}
        />
    );

    const main = (
        <div className="stock-enquiry-content-container">
            <div className="stock-enq-table-container">
                {/* {isFilterExpanded ? <div > T </div> : <div > F </div>} */}
                <DataGrid dataTable={stockEnqGrid} data={stockEnquiryList && stockEnquiryList.stockItemResponse} isScrollable={true}
                    renderStatusContent={renderStatusContent} selectedRow={selectedStockEnquiry} setSelectedRow={handleSelectionChange}
                    emptyMessage={isDataFiltered ? 'No records available' : 'Please click on filter to view data'} enablePagination={true}
                    pageSize={pageState.rows} onFilterCallback={onFilterStock} isServerSidePaging={true} firstIndex={pageState.first}
                    totalRecords={stockEnquiryList && stockEnquiryList.totalRecord} onPage={onPage} rowClassName={rowStyle}
                    isAutoScrollHeight={true}
                    cssClasses={'sticky-header'}
                    isSelectionColumnShow={false}
                    heightOffset={isFilterExpanded ? 324 : 42}
                    width="1900px"
                />
            </div>

        </ div>
    );
    const mainContent = <SectionMainBase header={header} mainClassName="overflow-hidden" main={main}></SectionMainBase>;
    return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default StockEnquiry;