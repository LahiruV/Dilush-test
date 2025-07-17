import { useDispatch, useSelector } from 'react-redux';
import { RootState, setBusinessSalesEnqGroupBy, setBusinessSalesEnqSortBy, setBusinessSalesEnqSales, setIsBusinessSalesEnqListFetch, setSelectedOriginatorBusinessSalesEnquiry, setTriggerBusinessSalesEnqFormSubmit, setBusinessSalesmarket, setBusinessSalesiCostPeriod, setBusinessSalesYear } from '@peerless-cms/store';
import { useEffect, useState } from 'react';
import { DropDownData, GetAllMarketForLookupParameters } from '@peerless/models';
import { DropDown, FilterNonButton, MultiColumnComboBoxWidget } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features';
import { dropDownDataConverter } from '@peerless/common';
import { GetAllCostPeriod, GetAllMarketForLookup, getEnduserSalesCurrentCostPeriods } from '@peerless/queries';

const dropDownDataSales = [
    { text: "Sales in Dollars", value: "D", id: 1 },
    { text: "Sales in Tonnes", value: "T", id: 2 },
    { text: "Sales in Units", value: "U", id: 3 },
];
const dropDownDataSortBy = [
    { text: "MTD (U)", value: "6", id: 1 },
    { text: "YTD (U)", value: "3", id: 2 },
    { text: "MTD ($)", value: "9", id: 3 },
    { text: "YTD ($)", value: "10", id: 4 },
    { text: "Last YTD (U)", value: "11", id: 5 },
    { text: "Last YTD ($)", value: "12", id: 6 },
    { text: "Code", value: "1", id: 7 },
];
const dropDownDataGroupBy = [
    { text: "Bus Area", value: "bus area", id: 1 },
    { text: "Market", value: "market", id: 2 },
    { text: "Brand", value: "brand", id: 3 },
    { text: "Cat Group", value: "cat_group", id: 4 },
    { text: "Sub Group", value: "cat_sub_group", id: 5 },
    { text: "Product", value: "product", id: 6 },
    { text: "Customer", value: "customer", id: 7 },
    { text: "Cust Group", value: "custgroup", id: 8 },
    { text: "Rep. Group", value: "repgroup", id: 9 },
    { text: "Rep", value: "rep", id: 10 },
    { text: "State", value: "state", id: 11 },
    { text: "All Reps", value: "ALL", id: 12 },
];

const yearDropData = [
    { text: "This Year", value: 'thisYear', id: 1 },
    { text: "Last Year", value: 'lastYear', id: 2 },
]

export interface DashBoardBusinessSalesEnquiryFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function DashBoardBusinessSalesEnquiryFilter(props: DashBoardBusinessSalesEnquiryFilterProps) {
    const dispatch = useDispatch();
    const { isFormSubmit, businessSalesEnqSales, businessSalesEnqSortBy, businessSalesEnqGroupBy, businessSalesmarket, businessSalesiCostPeriod, businessSalesYear } = useSelector((state: RootState) => state.dashBoardBusinessSalesEnquiry);
    const { selectedOriginator, loggedUser, childOriginators } = useSelector((state: RootState) => state.header);

    const payloadAllMarketForLookup: GetAllMarketForLookupParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        additionalParams: "group_type = 'MA'",
        orderBy: 'cat_grouping ASC',
        startIndex: 1,
        rowCount: 1000,
    }

    const { data: allMarketForLookup } = GetAllMarketForLookup(payloadAllMarketForLookup, true);
    const { data: allCostPeriod } = GetAllCostPeriod(true);
    const { data: euSalesCurrentCostPeriodData } = getEnduserSalesCurrentCostPeriods();

    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');
    const allCostPeriodData = dropDownDataConverter.dropDownDataConverter(allCostPeriod || [], 'month', 'costPeriod', '', true);

    // const [salesEnqSales, setSalesEnqSales] = useState<DropDownData>(dropDownDataSales[0]);
    // const [salesEnqSortBy, setSalesEnqSortBy] = useState<DropDownData>(dropDownDataSortBy[3]);
    // const [salesEnqGroupBy, setSalesEnqGroupBy] = useState<DropDownData>(dropDownDataGroupBy[6]);
    // const [marketDrop, setMarketDrop] = useState<DropDownData>({ value: '', text: '', id: 0 });
    // const [costPeriod, setCostPeriod] = useState<DropDownData>();
    // const [yearDropDown, setYearDropDown] = useState(yearDropData[0]);


    const marketDropDefault = allMarketForLookupData[0];

    const onFilterClick = async () => {
        dispatch(setSelectedOriginatorBusinessSalesEnquiry(selectedOriginator));
        dispatch(setIsBusinessSalesEnqListFetch(true));
    };

    const clearFilters = () => {
        dispatch(setBusinessSalesYear(yearDropData[0]));
        dispatch(setBusinessSalesEnqSales(dropDownDataSales[0]));
        dispatch(setBusinessSalesEnqSortBy(dropDownDataSortBy[3]));
        dispatch(setBusinessSalesEnqGroupBy(dropDownDataGroupBy[6]));
        dispatch(setBusinessSalesmarket(marketDropDefault));
        dispatch(setBusinessSalesiCostPeriod(allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]));
    }



    const salesEnqSalesDefault = dropDownDataSales[0];
    const salesEnqSortByDefault = dropDownDataSortBy[3];
    const salesEnqGroupByDefault = dropDownDataGroupBy[6];
    const yearDropDownDefault = yearDropData[0];


    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerBusinessSalesEnqFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    useEffect(() => {
        dispatch(setBusinessSalesYear(yearDropData[0]));
        dispatch(setBusinessSalesEnqSales(salesEnqSalesDefault));
        dispatch(setBusinessSalesEnqSortBy(salesEnqSortByDefault));
        dispatch(setBusinessSalesEnqGroupBy(salesEnqGroupByDefault));
        if (allMarketForLookup) {
            dispatch(setBusinessSalesmarket(marketDropDefault));
        }
        if (allCostPeriodData) {
            dispatch(setBusinessSalesiCostPeriod(allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]));
        }
    }, [allMarketForLookup, allCostPeriod, euSalesCurrentCostPeriodData]);

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Group By'>
                                <DropDown id={"business-sales-enquiry-group-by-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setBusinessSalesEnqGroupBy(e))} value={businessSalesEnqGroupBy} defaultValue={salesEnqGroupByDefault} datalist={dropDownDataGroupBy} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sort By'>
                                <DropDown id={"business-sales-enquiry-sort-by-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setBusinessSalesEnqSortBy(e))} value={businessSalesEnqSortBy} defaultValue={salesEnqSortByDefault} datalist={dropDownDataSortBy} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>
                        <div>
                            <FilterFormGroup label='Market'>
                                <MultiColumnComboBoxWidget id={"business-sales-enquiry-market"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setBusinessSalesmarket(e))} defaultValue={marketDropDefault} value={businessSalesmarket} datalist={allMarketForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sales'>
                                <DropDown id={"business-sales-enquiry-sales-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setBusinessSalesEnqSales(e))} value={businessSalesEnqSales} defaultValue={salesEnqSalesDefault} datalist={dropDownDataSales} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>
                        <div>
                            <FilterFormGroup label='Cost Period'>
                                <DropDown id={"business-sales-enquiry-cost-period"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setBusinessSalesiCostPeriod(e))} value={businessSalesiCostPeriod} defaultValue={allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]} datalist={allCostPeriodData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Year'>
                                <DropDown id={"business-sales-enquiry-year-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setBusinessSalesYear(e))} value={businessSalesYear} defaultValue={yearDropDownDefault} datalist={yearDropData} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashBoardBusinessSalesEnquiryFilter;
