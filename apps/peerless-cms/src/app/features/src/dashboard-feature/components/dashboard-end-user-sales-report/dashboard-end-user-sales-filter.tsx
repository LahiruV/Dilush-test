import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    RootState, setDashEndUserSalesCheckArea, setDashEndUserSalesCostPeriod, setDashEndUserSalesCostYear, setDashEndUserSalesDistributor, setDashEndUserSalesEnduser, setDashEndUserSalesRep, setIsFetchEndUserSalesListReport,
    setIsFetchPdfEndUserSalesListReport,
    setTriggerEndUserSalesFormSubmit
} from '@peerless-cms/store';
import { DropDown, FilterNonButton, MultiColumnComboBoxWidget } from '@peerless/controls';
import { GetAllCostPeriod, GetAllEndusers, getEnduserSalesCostYears, getEnduserSalesCurrentCostPeriods, GetERPCustomers, GetReps, } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { DropDownData } from '@peerless/models';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features'

const checkBoxData = [
    { id: 1, text: 'Last 12 Months', value: 0 },
    { id: 2, text: 'Last 12 Months Summary', value: 1 },
    { id: 3, text: '12 Months Sales Comparison', value: 2 },
    { id: 4, text: 'Summary by Customer', value: 3 },
    { id: 5, text: 'End User Products - Current', value: 4 },
    { id: 6, text: 'Last 12 Months End User Summary', value: 5 },
    { id: 7, text: 'Last 12 Months by Product', value: 6 },
    { id: 8, text: '% Contract Sales', value: 7 },
];

const yearDropData = [
    { text: "This Year Sales", value: new Date().getFullYear(), id: 1 },
    { text: "Last Year Sales", value: new Date().getFullYear() - 1, id: 2 },
]

export interface DashboardEndUserSalesFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function DashboardEndUserSalesFilter(props: DashboardEndUserSalesFilterProps) {
    const dispatch = useDispatch();
    const { dashEnduserSalesCostYear, dashEnduserSalesCostPeriod, dashEnduserSalesDistributor, dashEnduserSalesEnduser, dashEnduserSalesRep, dashEnduserSalesCheckArea } = useSelector((state: RootState) => state.dashboardEndUserSales);
    const [isDisabledEndUser, setIsDisabledEndUser] = useState<boolean>(false);
    const [isDisabledContractSales, setIsDisabledContractSales] = useState<boolean>(false);

    useEffect(() => {
        const isEndUserDisabled = dashEnduserSalesCheckArea?.value === 4;
        const isContractSalesDisabled = dashEnduserSalesCheckArea?.value === 7;
        const isSummaryByCustomerDisabled = dashEnduserSalesCheckArea?.value === 3;

        setIsDisabledEndUser(isEndUserDisabled);
        setIsDisabledContractSales(isContractSalesDisabled);

        if (isEndUserDisabled) {
            dispatch(setDashEndUserSalesCostYear({ id: 0, text: '', value: '' }));
            dispatch(setDashEndUserSalesCostPeriod({ id: 0, text: '', value: '' }));
        } else {
            dispatch(setDashEndUserSalesCostPeriod(allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]));
            dispatch(setDashEndUserSalesCostYear(allCostYearsData.filter((costYear: DropDownData) => costYear.value === euSalesCurrentCostPeriodData?.currentYear)[0] || allCostYearsData[0]));
        }

        if (isContractSalesDisabled) {
            dispatch(setDashEndUserSalesEnduser({ id: 0, text: '', value: '' }));
        }

        if (isSummaryByCustomerDisabled) {
            dispatch(setDashEndUserSalesCostYear(yearDropData[0]));
        }

    }, [dashEnduserSalesCheckArea]);

    const { loggedUser, childOriginators, selectedOriginator } = useSelector((state: RootState) => state.header);
    const {
        isFormSubmit
    } = useSelector((state: RootState) => ({
        isFetchPdfEndUserSaleListReport: state.dashboardEndUserSales.isFetchPdfEndUserSaleListReport,
        isFormSubmit: state.enduserSalesFilters.isFormSubmit
    }));

    const endUserPayload = {
        Originator: selectedOriginator.userName,
        ChildOriginator: childOriginators,
        ChildOriginators: childOriginators,
        DefaultDepId: loggedUser.defaultDepartmentId,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        OrderBy: "Name ASC",
        AddParams: ` name like '%%'`,
        LeadStageId: 0,
        RetreiveActive: true,
        IsReqSentVisible: false,
        LeadStage: "enduser",
        DisplayInCRM: true,
        additionalParams: '',
        repType: 'F',
        isNew: true,
        IsShowLeastActive: false,
        ActiveInactiveChecked: true,
        ChildReps: selectedOriginator.childReps,
        "startIndex": 1,
        "rowCount": 20000
    }

    const { data: allReps } = GetReps(true);
    const { data: allCostPeriod } = GetAllCostPeriod(true);
    const { data: euSalesCurrentCostPeriodData } = getEnduserSalesCurrentCostPeriods();
    const { data: euSalesCostYearsListData } = getEnduserSalesCostYears();
    const { data: euCustomerListData } = GetERPCustomers(true);
    const { data: endUsersListData } = GetAllEndusers(endUserPayload, true);


    const allRepsData = dropDownDataConverter.dropDownDataConverter(allReps || [], 'name', 'repCode',);
    const allCostPeriodData = dropDownDataConverter.dropDownDataConverter(allCostPeriod || [], 'month', 'costPeriod', '', true);
    const allCostYearsData = dropDownDataConverter.dropDownDataConverter(euSalesCostYearsListData || [], 'year', 'year');
    const allEuCustomerListData = dropDownDataConverter.dropDownDataConverter(euCustomerListData || [], 'name', 'customerCode',);
    const allEndUsersListData = dropDownDataConverter.dropDownDataConverter(endUsersListData || [], 'name', 'endUserCode',);

    const onFilterClick = () => {
        dispatch(setIsFetchEndUserSalesListReport(true));
        dispatch(setIsFetchPdfEndUserSalesListReport(true));
    }

    const distrubutorDefault = allEuCustomerListData[0];
    const repDefault = allRepsData[0];

    const clearFilters = () => {
        dispatch(setDashEndUserSalesCostPeriod(allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]));
        dispatch(setDashEndUserSalesCostYear(allCostYearsData.filter((costYear: DropDownData) => costYear.value === euSalesCurrentCostPeriodData?.currentYear)[0] || allCostYearsData[0]));
        dispatch(setDashEndUserSalesCheckArea(checkBoxData[0]));
        dispatch(setDashEndUserSalesRep({ id: 0, text: '', value: '' }));
        dispatch(setDashEndUserSalesDistributor({ id: 0, text: '', value: '' }));
        dispatch(setDashEndUserSalesEnduser({ id: 0, text: '', value: '' }));
    }

    useEffect(() => {
        if (allCostPeriodData) {
            dispatch(setDashEndUserSalesCostPeriod(allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]));
        }
        if (allCostYearsData) {
            dispatch(setDashEndUserSalesCostYear(allCostYearsData.filter((costYear: DropDownData) => costYear.value === euSalesCurrentCostPeriodData?.currentYear)[0] || allCostYearsData[0]));
        }
        if (allRepsData) {
            dispatch(setDashEndUserSalesRep(allRepsData[0]));
        }
        if (allEuCustomerListData) {
            dispatch(setDashEndUserSalesDistributor(allEuCustomerListData[0]));
        }
        dispatch(setDashEndUserSalesCheckArea(checkBoxData[0]));
    }, [allCostPeriod, euSalesCostYearsListData, allReps, euCustomerListData]);

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerEndUserSalesFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Cost Year'>
                                <DropDown id={"end-user-sales-cost-year"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDashEndUserSalesCostYear(e))} value={dashEnduserSalesCostYear} defaultValue={allCostYearsData.filter((costYear: DropDownData) => costYear.value === euSalesCurrentCostPeriodData?.currentYear)[0] || allCostYearsData[0]} datalist={
                                    (dashEnduserSalesCheckArea?.value === 3) ? yearDropData :
                                        allCostYearsData
                                } textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings}
                                    isDisabled={isDisabledEndUser}
                                />
                            </FilterFormGroup>

                            <FilterFormGroup label='Cost Period'>
                                <DropDown id={"end-user-sales-cost-period"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDashEndUserSalesCostPeriod(e))} value={dashEnduserSalesCostPeriod} defaultValue={allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod)[0] || allCostPeriodData[0]} datalist={allCostPeriodData} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings}
                                    isDisabled={isDisabledEndUser}
                                />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Distributor'>
                                <MultiColumnComboBoxWidget id={"end-user-sales-distributor"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDashEndUserSalesDistributor(e))} value={dashEnduserSalesDistributor} defaultValue={distrubutorDefault} datalist={allEuCustomerListData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Customer Code', width: '122px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>

                            <FilterFormGroup label='End User'>
                                <MultiColumnComboBoxWidget id={"end-user-sales-enduser"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDashEndUserSalesEnduser(e))} value={dashEnduserSalesEnduser} datalist={allEndUsersListData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Enduser Code', width: '122px' }, { field: 'text', header: 'Name', width: '300px' }]}
                                    isDisabled={isDisabledContractSales}
                                />
                            </FilterFormGroup>

                        </div>

                        <div>
                            <FilterFormGroup label='Rep'>
                                <MultiColumnComboBoxWidget id={"end-user-sales-rep"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDashEndUserSalesRep(e))} value={dashEnduserSalesRep} defaultValue={repDefault} datalist={allRepsData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '60px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>

                            <FilterFormGroup label='Check Area'>
                                <MultiColumnComboBoxWidget id={"end-user-sales-check-area"} className={"administrator-filter filter-form-filter"} defaultValue={checkBoxData[0]} setValue={(e) => dispatch(setDashEndUserSalesCheckArea(e))} value={dashEnduserSalesCheckArea} datalist={checkBoxData} isFilterable={true} textField={"text"} columns={[{ field: 'text', header: 'Area', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashboardEndUserSalesFilter;
