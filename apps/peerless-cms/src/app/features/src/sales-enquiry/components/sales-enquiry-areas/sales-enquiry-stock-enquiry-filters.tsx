import { ClearFilterBox } from "@peerless-cms/features-common-components";
import { RootState, setIsFetchingStockEnquiryList, setStockEnqFilters } from "@peerless-cms/store";
import { dropDownDataConverter } from "@peerless/common";
import { ButtonWidget, ButtonWidgetCollapse, CheckBox, MultiColumnComboBoxWidget, RadioButtonWidget } from "@peerless/controls";
import { GetLookup, useProductsLookupData } from "@peerless/queries";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export interface StockEnquiryFilterProps { }

export function StockEnquiryFilters(props: StockEnquiryFilterProps) {
    const dispatch = useDispatch();
    const [openProdMarketFilters, setOpenProdMarketFilters] = useState(false);
    const [openViewTypeFilters, setOpenViewTypeFilters] = useState(false);
    const [openOtherFilters, setOpenOtherFilters] = useState(false);
    const [productCode, setProductCode] = useState<any>();
    const [productType, setProductType] = useState<any>({ text: 'Refinery', value: 'F' });
    const [targetMarket, setTargetMarket] = useState<any>();
    const [productOwner, setProductOwner] = useState<any>();
    const [market, setMarket] = useState<any>();
    const [exdc, setExdc] = useState<any>();
    const [view, setView] = useState<any>({ text: 'Weekly', value: 'W' });
    const [dateRequiredRadio, setDateRequiredRadio] = useState("N"); //DR
    const [showWip, setShowWip] = useState(false);
    const [showPromoForecast, setShowPromoForecast] = useState(false);
    const [showPromoSales, setShowPromoSales] = useState(false);
    const [showCritical, setShowCritical] = useState(false);
    const [showShort, setShowShort] = useState(false);
    const [showExportedProdsOnly, setShowExportedProdsOnly] = useState(false);

    const { originator, childOriginators, isFetchingStockEnquiryList } = useSelector((state: RootState) => ({
        originator: state.header.selectedOriginator,
        childOriginators: state.header.childOriginators,
        isFetchingStockEnquiryList: state.stockEnquiryFilters.isFetchingStockEnquiryList,
    }));

    // products
    let productList: any = [];
    let args = {
        ChildOriginators: childOriginators,
        DefaultDepartmentId: originator.defaultDepartmentId,
        Originator: originator.userName,
        AdditionalParams: '',
        OrderBy: 'catlog_code ASC',
        DisplayInCRM: false,
        StartIndex: 1,
        RowCount: 1000
    }
    const { data: productData, error: producttDataError, isLoading: isProductDataLoading } = useProductsLookupData(args);

    if (isProductDataLoading)
        productList = [{ text: 'Loading...', value: '' }];

    if (productData) {
        productList = productData.map((item: any) => ({
            text: item.description,
            value: item.catlogCode,
        }));
    }

    // product type
    const productTypeList: any = [{ text: 'Refinery', value: 'F' }, { text: 'Rendering', value: 'R' }];

    // target market
    let targetMarketList: any = [];
    const { data: targetMarketData, isLoading: isTargetMarketLoading } = GetLookup('PRTA', true);

    if (isTargetMarketLoading)
        targetMarketList = [{ text: 'Loading...', value: '' }];

    if (targetMarketData) {
        targetMarketList = dropDownDataConverter.dropDownDataConverter(targetMarketData || [], 'description', 'tableCode', undefined, true);
    }

    // exdc
    let exdcList: any = [];
    const { data: exdcData, isLoading: isExdcLoading } = GetLookup('warehouse', true);

    if (isExdcLoading)
        exdcList = [{ text: 'Loading...', value: '' }];

    if (exdcData) {
        exdcList = dropDownDataConverter.dropDownDataConverter(exdcData || [], 'description', 'tableCode', undefined, true);
    }

    useEffect(() => {
        if (exdcData) {
            setExdc(exdcList.find((item: any) => item.value === 'E1'));
        }
    }, [exdcData]);

    // product owner
    let productOwnerList: any = [];
    const { data: prodOwnerData, isLoading: isProdOwnerLoading } = GetLookup('ownercode', true);

    if (isProdOwnerLoading)
        productOwnerList = [{ text: 'Loading...', value: '' }];

    if (prodOwnerData) {
        productOwnerList = dropDownDataConverter.dropDownDataConverter(prodOwnerData || [], 'description', 'tableCode', undefined, true);
    }

    // market
    let marketList: any = [];
    const { data: marketData, isLoading: isMarketLoading } = GetLookup('PRMR', true);

    if (isMarketLoading)
        marketList = [{ text: 'Loading...', value: '' }];

    if (marketData) {
        marketList = dropDownDataConverter.dropDownDataConverter(marketData || [], 'description', 'tableCode', undefined, true);
    }

    // view type
    const viewTypeList: any = [{ text: 'Monthly', value: 'M' }, { text: 'Weekly', value: 'W' }];

    const clearFilters = () => {
        setProductCode(null);
        setProductType(productTypeList[0]);
        setTargetMarket(null);
        setProductOwner(null);
        setMarket(null);
        setExdc(null);
        setView({ text: 'Weekly', value: 'W' });
        setDateRequiredRadio('N');
        setShowWip(false);
        setShowPromoForecast(false);
        setShowPromoSales(false);
        setShowCritical(false);
        setShowShort(false);
        setShowExportedProdsOnly(false);
    }

    const popUpSettings = {
        width: '150px'
    }

    const setGlobalFilters = () => {
        dispatch(setStockEnqFilters({
            productCode: productCode != null ? productCode.value : '',
            productType: productType != null ? productType.value : '',
            targetMarket: targetMarket != null ? targetMarket.value : '',
            productOwner: productOwner != null ? productOwner.value : '',
            market: market != null ? market.value : '',
            exdc: exdc != null ? exdc.value : '',
            view: view != null ? view.value : '',
            dateType: dateRequiredRadio,
            showWip: showWip,
            showPromoForecast: showPromoForecast,
            showPromoSales: showPromoSales,
            critical: showCritical,
            short: showShort,
            exportedProductsOnly: showExportedProdsOnly
        }));
    }

    const onFilterClick = () => {
        setGlobalFilters();
        dispatch(setIsFetchingStockEnquiryList(true));
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onFilterClick();
                }}>
                    <div>
                        <ButtonWidgetCollapse id={"stock-enquiry-prod-and-market-collapse"} name={"Product & Market"} classNames={"dash-collapse-button"}
                            numSpaces={15} state={openProdMarketFilters} setState={setOpenProdMarketFilters} />
                    </div>
                    <Collapse in={openProdMarketFilters}>
                        <div>
                            <div>
                                <div className='dashboard-filter-header'> Product Code </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-product-code"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setProductCode(e))}
                                    value={productCode}
                                    datalist={productList}
                                    textField={"value"}
                                    valueField={"text"}
                                    columns={[{ field: 'value', header: 'Code', width: '122px' },
                                    { field: 'text', header: 'Name', width: '250px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Product Type </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-product-type"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setProductType(e))}
                                    value={productType}
                                    datalist={productTypeList}
                                    textField={"text"}
                                    valueField={"value"}
                                    columns={[{ field: 'text', header: '', width: '308px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Target Market </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-target-market"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setTargetMarket(e))}
                                    value={targetMarket}
                                    datalist={targetMarketList}
                                    textField={"text"}
                                    columns={[{ field: 'value', header: 'Code', width: '90px' },
                                    { field: 'text', header: 'Name', width: '308px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Product Owner </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-product-owner"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setProductOwner(e))}
                                    value={productOwner}
                                    datalist={productOwnerList}
                                    textField={"text"}
                                    columns={[{ field: 'value', header: 'Code', width: '90px' },
                                    { field: 'text', header: 'Name', width: '308px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Market </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-market"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setMarket(e))}
                                    value={market}
                                    datalist={marketList}
                                    textField={"text"}
                                    valueField={"value"}
                                    columns={[{ field: 'value', header: 'Code', width: '90px' },
                                    { field: 'text', header: 'Name', width: '308px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> EX DC </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-ex-dc"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setExdc(e))}
                                    value={exdc}
                                    datalist={exdcList}
                                    textField={"text"}
                                    columns={[{ field: 'value', header: 'Code', width: '90px' },
                                    { field: 'text', header: 'Name', width: '308px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <hr />
                        </div>
                    </Collapse>
                    <div>
                        <ButtonWidgetCollapse id={"stock-enquiry-view-and-date-collapse"} name={"View Type & Dates"} classNames={"dash-collapse-button"}
                            numSpaces={13} state={openViewTypeFilters} setState={setOpenViewTypeFilters} />
                    </div>
                    <Collapse in={openViewTypeFilters}>
                        <div className='stock-enquiry-view-type filter-group-container'>
                            <div>
                                <div className='dashboard-filter-header'> View </div>
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-view"
                                    className="administrator-filter"
                                    setValue={(e: any) => (setView(e))}
                                    value={view}
                                    datalist={viewTypeList}
                                    textField={"text"}
                                    valueField={"value"}
                                    columns={[{ field: 'text', header: '', width: '308px' }]}
                                    popupSettings={{
                                        width: '418px',
                                        fontSize: '12px'
                                    }}
                                    isFilterable={true}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Date Type </div>
                                <RadioButtonWidget id='"stock-enquiry-dr' className="stock-enquiry-radio-check" name="chartType2" value="N" checked={dateRequiredRadio === "N"} label={"Date Required"} setValue={(e) => setDateRequiredRadio(e)} />
                                <RadioButtonWidget id='"stock-enquiry-pdr' className="stock-enquiry-radio-check" name="chartType2" value="P" checked={dateRequiredRadio === "P"} label={"Previous Date Required"} setValue={(e) => setDateRequiredRadio(e)} />
                            </div>
                            <hr />
                        </div>
                    </Collapse>
                    <div>
                        <ButtonWidgetCollapse id={"stock-enquiry-show-hide-collapse"} name={"Other"} classNames={"dash-collapse-button"}
                            numSpaces={34} state={openOtherFilters} setState={setOpenOtherFilters} />
                    </div>
                    <Collapse in={openOtherFilters}>
                        <div className='stock-enquiry-other filter-group-container'>
                            <div>
                                <CheckBox id={"wip-chk"} className={"stock-enquiry-wip-check"} setValue={(e) => setShowWip(e)} value={showWip} label='Show WIP' />
                            </div>
                            <div className="paddingTop-12">
                                <CheckBox id={"promo-forecast-chk"} className={"stock-enquiry-promo-forecast"} setValue={(e) => setShowPromoForecast(e)} value={showPromoForecast} label='Show Promo Forecast' />
                            </div>
                            <div className="paddingTop-12">
                                <CheckBox id={"promo-sales-chk"} className={"stock-enquiry-promo-sales"} setValue={(e) => setShowPromoSales(e)} value={showPromoSales} label='Show Promo Sales' />

                            </div>
                            <div className="paddingTop-12">
                                <CheckBox id={"critical-chk"} className={"stock-enquiry-critical"} setValue={(e) => setShowCritical(e)} value={showCritical} label='Critical' />
                            </div>
                            <div className="paddingTop-12">
                                <CheckBox id={"short-chk"} className={"stock-enquiry-short"} setValue={(e) => setShowShort(e)} value={showShort} label='Short' />
                            </div>
                            <div className="paddingTop-12">
                                <CheckBox id={"exported-prods-only-chk"} className={"stock-enquiry-exported-prods-only"} setValue={(e) => setShowExportedProdsOnly(e)} value={showExportedProdsOnly} label='Exported Products Only' />
                            </div>
                            <hr />
                        </div>
                    </Collapse>
                    <ButtonWidget id='stock-enquiry-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn'
                        type="submit" isDisabled={isFetchingStockEnquiryList} isFetching={true} />
                </form>
            </div>
        </>
    )
}