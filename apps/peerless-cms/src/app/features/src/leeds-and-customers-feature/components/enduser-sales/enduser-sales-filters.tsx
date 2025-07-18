import { ClearFilterBox, KendoDropdown } from "@peerless-cms/features-common-components";
import { RootState, setEnduserSalesFilterPeriod, setEnduserSalesFilterYear, setIsFilterBtnDisabled, setIsIncludeProductsWithNoSales, setIsQueryEnabled } from "@peerless-cms/store";
import { getEnduserSalesCostPeriods, getEnduserSalesCostYears, getEnduserSalesCurrentCostPeriods } from "@peerless/queries";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox, DropDown } from "@peerless/controls";
import './enduser-sales-filters.css';

export interface EnduserSalesFiltersProps { }

export function EnduserSalesFilters(props: EnduserSalesFiltersProps) {
    const dispatch = useDispatch();

    const { selectedLeedOrCustomer, originator, filterYear, filterPeriod, isFilterBtnDisabled, isIncludeProductsWithNoSales, isQueryEnabled } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        originator: state.header.selectedOriginator,
        filterYear: state.enduserSalesFilters.year,
        filterPeriod: state.enduserSalesFilters.period,
        isFilterBtnDisabled: state.enduserSalesFilters.isFilterBtnDisabled,
        isIncludeProductsWithNoSales: state.enduserSalesFilters.isIncludeProductsWithNoSales,
        isQueryEnabled: state.enduserSalesFilters.isQueryEnabled,
    }));

    const [selectedCostYear, setSelectedCostYear] = useState<any>({ text: 'Loading...', value: '' });
    const [selectedCostPeriod, setSelectedCostPeriod] = useState<any>({ text: 'Loading...', value: '' });
    const [selectedIsIncludeProd, setSelectedIsIncludeProd] = useState(true);
    const [defaultCostYear, setDefaultCostYear] = useState<any>();
    const [defaultCostPeriod, setDefaultCostPeriod] = useState<any>();

    let costYearsList: any = [];
    let costPeriodsList: any = [];

    // get cost years
    const { data: euSalesCostYearsListData, error: errorYears, isLoading: isLoadingYears } = getEnduserSalesCostYears();

    if (isLoadingYears)
        costYearsList = [{ text: 'Loading...', value: '' }];

    if (euSalesCostYearsListData) {
        costYearsList = euSalesCostYearsListData.map((item: any) => ({
            text: item.year.toString(),
            value: item.year,
        }));
    }

    // get cost periods
    let payload = {
        DefaultDepartmentId: originator.defaultDepartmentId,
    }

    const { data: euSalesCostPeriodsListData, error: errorPeriods, isLoading: isLoadingPeriods } = getEnduserSalesCostPeriods(payload);

    if (isLoadingPeriods)
        costPeriodsList = [{ text: 'Loading...', value: '' }];

    if (euSalesCostPeriodsListData) {
        costPeriodsList = euSalesCostPeriodsListData.map((item: any) => ({
            text: item.description,
            value: item.period,
        }));
    }

    // get current cost period
    const { data: euSalesCurrentCostPeriodData, error: errorCurrentCostPeriod, isLoading: isLoadingCurrentCostPeriod } = getEnduserSalesCurrentCostPeriods();

    useEffect(() => {
        if (euSalesCostYearsListData && euSalesCostPeriodsListData && euSalesCurrentCostPeriodData) {
            let cy = costYearsList.find((item: any) => item.value === euSalesCurrentCostPeriodData.currentYear);
            let cp = costPeriodsList.find((item: any) => item.value === euSalesCurrentCostPeriodData.currentPeriod);
            let defaultCYear = filterYear.value == null || filterYear.value == '' ? cy : filterYear;
            let defaultCPeriod = filterPeriod == '' || filterPeriod.value == null || filterPeriod.value == '' ? cp : filterPeriod;
            setSelectedCostYear(defaultCYear);
            setSelectedCostPeriod(defaultCPeriod);
            dispatch(setIsFilterBtnDisabled(false));

            //set default values
            setDefaultCostYear(defaultCYear);
            setDefaultCostPeriod(defaultCPeriod);
        }
    }, [euSalesCostYearsListData, euSalesCostPeriodsListData, euSalesCurrentCostPeriodData]);

    const onFilterClick = () => { //just to fire the event      
        dispatch(setEnduserSalesFilterYear(selectedCostYear));
        dispatch(setEnduserSalesFilterPeriod(selectedCostPeriod));
        dispatch(setIsIncludeProductsWithNoSales(selectedIsIncludeProd));
        dispatch(setIsQueryEnabled(true));
    }

    const euSalesPopUpSettings = {
        width: '150px'
    }

    const clearFilters = () => {
        setSelectedCostYear(defaultCostYear);
        setSelectedCostPeriod(defaultCostPeriod);
        dispatch(setIsFilterBtnDisabled(false));
    }

    return (
        <div className="sales-history-filter-container">
            <ClearFilterBox onClick={clearFilters} />
            <div>
                <div className='dashboard-filter-header'> Year </div>
                <DropDown id={"activity-rep-drop"} className={"dashboard-filter"} setValue={(e) => setSelectedCostYear(e)} value={selectedCostYear}
                    defaultValue={defaultCostYear} datalist={costYearsList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={euSalesPopUpSettings} />
            </div>
            <hr />
            <div>
                <div className='dashboard-filter-header'> Period </div>
                <DropDown id={"cp-drop"} className={"dashboard-filter"} setValue={(e: any) => (e == null ? setSelectedCostPeriod(defaultCostPeriod) : setSelectedCostPeriod(e))} value={selectedCostPeriod}
                    datalist={costPeriodsList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={euSalesPopUpSettings} />
            </div>
            <hr />
            <div>
                <CheckBox id='chk-is-include-products-with-no-sales' className="chk-filter" label='Include Products with No Sales'
                    value={selectedIsIncludeProd} setValue={(isChecked) => setSelectedIsIncludeProd(isChecked)} size="small" />
            </div>
            <button
                disabled={isFilterBtnDisabled}
                id="activity-filter-button"
                className={(isFilterBtnDisabled ? "dash-filter-button dash-filter-btn-disabled" : "dash-filter-button dash-filter-btn")}
                onClick={onFilterClick}>
                {isFilterBtnDisabled ? 'Filtering...' : 'Filter'}
            </button>

        </ div>
    );
}