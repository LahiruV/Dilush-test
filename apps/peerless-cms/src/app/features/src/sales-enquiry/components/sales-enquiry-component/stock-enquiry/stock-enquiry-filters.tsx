import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { FilterForm, FilterFormGroup } from "@peerless-cms/features-common-components";
import { RootState, setIsFetchingStockEnquiryList, setStockEnqFilters, setTriggerStockEnquiryFiltersFormSubmit, setStockEnqProductCode, setStockEnqCritical, setStockEnqDateType, setStockEnqExdc, setStockEnqExportedProductsOnly, setStockEnqMarket, setStockEnqProductOwner, setStockEnqProductType, setStockEnqShort, setStockEnqShowPromoForecast, setStockEnqShowPromoSales, setStockEnqShowWip, setStockEnqTargetMarket, setStockEnqView } from "@peerless-cms/store";
import { dropDownDataConverter } from "@peerless/common";
import { CheckBox, DropDown, FilterNonButton, MultiColumnComboBoxWidget, RadioButtonWidget } from "@peerless/controls";
import { GetLookup, useProductsLookupData } from "@peerless/queries";
import { useFilterForm } from '@peerless-cms/features';

export interface StockEnquiryFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}


export function StockEnquiryFilters(props: StockEnquiryFilterProps) {
    const dispatch = useDispatch();

    const { selectedOriginator: originator, childOriginators } = useSelector((state: RootState) => (state.header));
    const { isFormSubmit, productCode, productType, targetMarket, productOwner, market, exdc, view, dateType, showWip, showPromoForecast, showPromoSales, critical, short, exportedProductsOnly } = useSelector((state: RootState) => (state.stockEnquiryFilters));

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
    const { data: productData, error: productDataError, isLoading: isProductDataLoading } = useProductsLookupData(args);

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
            dispatch(setStockEnqExdc(exdcList.find((item: any) => item.value === 'E1')));
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
        dispatch(setStockEnqProductCode(null));
        dispatch(setStockEnqProductType(productTypeList[0]));
        dispatch(setStockEnqTargetMarket(null));
        dispatch(setStockEnqProductOwner(null));
        dispatch(setStockEnqMarket(null));
        dispatch(setStockEnqExdc(null));
        dispatch(setStockEnqView({ text: 'Weekly', value: 'W' }));
        dispatch(setStockEnqDateType('N'));
        dispatch(setStockEnqShowWip(false));
        dispatch(setStockEnqShowPromoForecast(false));
        dispatch(setStockEnqShowPromoSales(false));
        dispatch(setStockEnqCritical(false));
        dispatch(setStockEnqShort(false));
        dispatch(setStockEnqExportedProductsOnly(false));
    }

    // const setGlobalFilters = () => {
    //     dispatch(setStockEnqFilters({
    //         productCode: productCode != null ? productCode.value : '',
    //         productType: productType != null ? productType.value : '',
    //         targetMarket: targetMarket != null ? targetMarket.value : '',
    //         productOwner: productOwner != null ? productOwner.value : '',
    //         market: market != null ? market.value : '',
    //         exdc: exdc != null ? exdc.value : '',
    //         view: view != null ? view.value : '',
    //         dateType,
    //         showWip,
    //         showPromoForecast: showPromoForecast,
    //         showPromoSales: showPromoSales,
    //         critical,
    //         short,
    //         exportedProductsOnly
    //     }));
    // }

    const onFilterClick = () => {
        // setGlobalFilters();
        dispatch(setIsFetchingStockEnquiryList(true));
    }

    const submitHandler = () => {
        onFilterClick();
    }

    const { formComponentRef } = useFilterForm({
        isFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerStockEnquiryFiltersFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [productCode, productType, targetMarket, productOwner, market, exdc, view, dateType, showWip, showPromoForecast, showPromoSales, critical, short, exportedProductsOnly]
    });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id="filter-form" onSubmit={submitHandler} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label="Product Code">
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-product-code"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqProductCode(e))}
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
                            </FilterFormGroup>

                            <FilterFormGroup label="Product Type">
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-product-type"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqProductType(e))}
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
                            </FilterFormGroup>

                            <FilterFormGroup label="Product Owner">
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-product-owner"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqProductOwner(e))}
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
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label="Market">
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-market"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqMarket(e))}
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
                            </FilterFormGroup>

                            <FilterFormGroup label="Target Market">
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-target-market"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqTargetMarket(e))}
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
                            </FilterFormGroup>

                            <FilterFormGroup label="EX DC">
                                <MultiColumnComboBoxWidget
                                    id="stock-enquiry-ex-dc"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqExdc(e))}
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
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label="View">
                                <DropDown
                                    id="stock-enquiry-view"
                                    className="administrator-filter filter-form-filter"
                                    setValue={(e: any) => dispatch(setStockEnqView(e))}
                                    value={view}
                                    datalist={viewTypeList}
                                    textField={"text"}
                                    popupSettings={{
                                        width: '208px',
                                        fontSize: '12px'
                                    }}
                                    defaultValue={viewTypeList[0]}
                                    isFilterable={true}
                                />
                            </FilterFormGroup>

                            <FilterFormGroup label="Date Type" hasColumns isBlockColumns>
                                <RadioButtonWidget id='"stock-enquiry-dr' className="stock-enquiry-radio-check" name="chartType2" value="N" checked={dateType === "N"} label={"Date Required"} setValue={(e) => dispatch(setStockEnqDateType(e))} />
                                <RadioButtonWidget id='"stock-enquiry-pdr' className="stock-enquiry-radio-check" name="chartType2" value="P" checked={dateType === "P"} label={"Previous Date Required"} setValue={(e) => dispatch(setStockEnqDateType(e))} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup>
                                <CheckBox id={"wip-chk"} className={"filter-form-group-check"} setValue={(e) => dispatch(setStockEnqShowWip(e))} value={showWip} label='Show WIP' />
                            </FilterFormGroup>

                            <FilterFormGroup>
                                <CheckBox id={"promo-forecast-chk"} className={"filter-form-group-check"} setValue={(e) => dispatch(setStockEnqShowPromoForecast(e))} value={showPromoForecast} label='Show Promo Forecast' />
                            </FilterFormGroup>

                            <FilterFormGroup>
                                <CheckBox id={"promo-sales-chk"} className={"filter-form-group-check"} setValue={(e) => dispatch(setStockEnqShowPromoSales(e))} value={showPromoSales} label='Show Promo Sales' />
                            </FilterFormGroup>

                            <FilterFormGroup>
                                <CheckBox id={"critical-chk"} className={"filter-form-group-check"} setValue={(e) => dispatch(setStockEnqCritical(e))} value={critical} label='Critical' />
                            </FilterFormGroup>

                            <FilterFormGroup>
                                <CheckBox id={"short-chk"} className={"filter-form-group-check"} setValue={(e) => dispatch(setStockEnqShort(e))} value={short} label='Short' />
                            </FilterFormGroup>

                            <FilterFormGroup>
                                <CheckBox id={"exported-prods-only-chk"} className={"filter-form-group-check"} setValue={(e) => dispatch(setStockEnqExportedProductsOnly(e))} value={exportedProductsOnly} label='Exported Products Only' />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type="submit" />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    )
}