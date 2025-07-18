import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
    RootState, setDashEndUserSalesCheckArea, setDashEndUserSalesCostPeriod, setDashEndUserSalesCostYear, setDashEndUserSalesDistributor, setDashEndUserSalesEnduser, setDashEndUserSalesRep, setIsFetchEndUserSalesListReport,
    setIsFetchPdfEndUserSalesListReport
} from '@peerless-cms/store';
import { ButtonWidget, ButtonWidgetCollapse, DropDown, MultiColumnComboBoxWidget } from '@peerless/controls';
import { GetAllCostPeriod, GetAllEndusers, getCustomerLookupData, getEnduserSalesCostYears, getEnduserSalesCurrentCostPeriods, GetERPCustomers, GetReps, } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { DropDownData } from '@peerless/models';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

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

// Need to change
export interface DashboardEndUserSalesFilterProps { }

export function DashboardEndUserSalesFilter(props: DashboardEndUserSalesFilterProps) {
    const dispatch = useDispatch();
    const [openCost, setOpenCost] = useState<boolean>(false);
    const [openDistributor, setOpenDistributor] = useState<boolean>(false);
    const [openEndUser, setOpenEndUser] = useState<boolean>(false);
    const [openRep, setOpenRep] = useState<boolean>(false);
    const [openCheckArea, setOpenCheckArea] = useState<boolean>(false);
    const [costPeriod, setCostPeriod] = useState<DropDownData>();
    const [costYear, setCostYear] = useState<DropDownData>();
    const [rep, setRep] = useState<DropDownData>();
    const [distributor, setDistributor] = useState<DropDownData>();
    const [endUser, setEndUser] = useState<DropDownData>();
    const [checkArea, setCheckArea] = useState<DropDownData>();
    const [isDisabledEndUser, setIsDisabledEndUser] = useState<boolean>(false);
    const [isDisabledContractSales, setIsDisabledContractSales] = useState<boolean>(false);
    const [isDisabledSummaryByCustomer, setIsDisabledSummaryByCustomer] = useState<boolean>(false);

    useEffect(() => {
        const isEndUserDisabled = checkArea?.value === 4;
        const isContractSalesDisabled = checkArea?.value === 7;
        const isSummaryByCustomerDisabled = checkArea?.value === 3;

        setIsDisabledEndUser(isEndUserDisabled);
        setIsDisabledContractSales(isContractSalesDisabled);
        setIsDisabledSummaryByCustomer(isSummaryByCustomerDisabled);

        if (isEndUserDisabled) {
            setCostYear({ id: 0, text: '', value: '' });
            setCostPeriod({ id: 0, text: '', value: '' });
        } else {
            setCostPeriod(costPeriodDefault);
            setCostYear(costYearDefault);
        }

        if (isContractSalesDisabled) {
            setEndUser({ id: 0, text: '', value: '' });
        }

        if (isSummaryByCustomerDisabled) {
            setCostYear(yearDropData[0]);
        }

    }, [checkArea]);

    const { loggedUser, childOriginators, selectedOriginator } = useSelector((state: RootState) => state.header);
    const {
        isFetchPdfEndUserSaleListReport,
    } = useSelector((state: RootState) => state.dashboardEndUserSales);

    let custLookupPayload = {
        ChildOriginators: childOriginators,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        Originator: selectedOriginator.userName,
        AdditionalParams: "( " + selectedOriginator.childReps + ")",
        OrderBy: 'name ASC',
        StartIndex: 1,
        RowCount: 1000
    }

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
    // const { data: euCustomerListData } = getCustomerLookupData(custLookupPayload);
    const { data: euCustomerListData } = GetERPCustomers(true);
    const { data: endUsersListData } = GetAllEndusers(endUserPayload, true);


    const allRepsData = dropDownDataConverter.dropDownDataConverter(allReps || [], 'name', 'repCode',);
    const allCostPeriodData = dropDownDataConverter.dropDownDataConverter(allCostPeriod || [], 'month', 'costPeriod', '', true);
    const allCostYearsData = dropDownDataConverter.dropDownDataConverter(euSalesCostYearsListData || [], 'year', 'year');
    const allEuCustomerListData = dropDownDataConverter.dropDownDataConverter(euCustomerListData || [], 'name', 'customerCode',);
    const allEndUsersListData = dropDownDataConverter.dropDownDataConverter(endUsersListData || [], 'name', 'endUserCode',);

    const filterCostPeriod = () => {
        const costPeriodFilter: DropDownData[] = allCostPeriodData.filter((costPeriod: DropDownData) => costPeriod.value === euSalesCurrentCostPeriodData?.currentPeriod);
        return costPeriodFilter[0];
    }

    const filterCostYear = () => {
        const costYearFilter: DropDownData[] = allCostYearsData.filter((costYear: DropDownData) => costYear.value === euSalesCurrentCostPeriodData?.currentYear);
        return costYearFilter[0];
    }

    const onFilterClick = () => {
        dispatch(setIsFetchEndUserSalesListReport(true));
        dispatch(setIsFetchPdfEndUserSalesListReport(true));
        dispatch(setDashEndUserSalesCostYear(costYear));
        dispatch(setDashEndUserSalesCostPeriod(costPeriod));
        dispatch(setDashEndUserSalesDistributor(distributor));
        dispatch(setDashEndUserSalesEnduser(endUser));
        dispatch(setDashEndUserSalesRep(rep));
        dispatch(setDashEndUserSalesCheckArea(checkArea));
    }

    const costPeriodDefault = filterCostPeriod || allCostPeriodData[0];
    const costYearDefault = filterCostYear || allCostYearsData[0];
    const distrubutorDefault = allEuCustomerListData[0];
    const repDefault = allRepsData[0];

    const clearFilters = () => {
        setRep({ id: 0, text: '', value: '' });
        setDistributor({ id: 0, text: '', value: '' });
        setEndUser({ id: 0, text: '', value: '' });
        setCostPeriod(costPeriodDefault);
        setCostYear(costYearDefault);
        setCheckArea(checkBoxData[0]);
    }

    useEffect(() => {
        if (allCostPeriodData) {
            setCostPeriod(costPeriodDefault);
        }
        if (allCostYearsData) {
            setCostYear(costYearDefault);
        }
        if (allRepsData) {
            setRep(repDefault);
        }
        if (allEuCustomerListData) {
            setDistributor(distrubutorDefault);
        }
        setCheckArea(checkBoxData[0]);
    }, [allCostPeriod, euSalesCostYearsListData, allReps, euCustomerListData]);

    const popUpSettings = {
        width: '150px'
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
                        <ButtonWidgetCollapse id={"dash-collapse-cost"} name={"Cost"} classNames={"dash-collapse-button"} numSpaces={30} state={openCost} setState={setOpenCost} />
                    </div>
                    <Collapse in={openCost}>
                        <div className='paddingBottom-12'>
                            <div className="">
                                <div className='dashboard-filter-header'> Cost Year </div>
                                <DropDown id={"end-user-sales-cost-year"} className={"administrator-filter"} setValue={(e) => setCostYear(e)} value={costYear} defaultValue={costYearDefault} datalist={
                                    (checkArea?.value === 3) ? yearDropData :
                                        allCostYearsData
                                } textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings}
                                    isDisabled={isDisabledEndUser}
                                />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Cost Period </div>
                                <DropDown id={"end-user-sales-cost-period"} className={"administrator-filter"} setValue={(e) => setCostPeriod(e)} value={costPeriod} defaultValue={costPeriodDefault} datalist={allCostPeriodData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings}
                                    isDisabled={isDisabledEndUser}
                                />
                            </div>
                        </div>
                    </Collapse>
                    {/* <div>
                        <ButtonWidgetCollapse id={"dash-collapse-distributor"} name={"Distributor"} classNames={"dash-collapse-button"} numSpaces={20.5} state={openDistributor} setState={setOpenDistributor} />
                    </div>
                    <Collapse in={openDistributor}> */}
                    <div className='paddingBottom-12'>
                        <div className='dashboard-filter-header'> Distributor </div>
                        <MultiColumnComboBoxWidget id={"end-user-sales-distributor"} className={"administrator-filter"} setValue={(e) => setDistributor(e)} value={distributor} defaultValue={distrubutorDefault} datalist={allEuCustomerListData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Customer Code', width: '122px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                    {/* </Collapse> */}
                    {/* <div>
                        <ButtonWidgetCollapse id={"dash-collapse-distributor"} name={"End User"} classNames={"dash-collapse-button"} numSpaces={23.5} state={openEndUser} setState={setOpenEndUser} />
                    </div>
                    <Collapse in={openEndUser}> */}
                    <div className='paddingBottom-12'>
                        <div className='dashboard-filter-header'> End User </div>
                        <MultiColumnComboBoxWidget id={"end-user-sales-enduser"} className={"administrator-filter"} setValue={(e) => setEndUser(e)} value={endUser} datalist={allEndUsersListData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Enduser Code', width: '122px' }, { field: 'text', header: 'Name', width: '300px' }]}
                            isDisabled={isDisabledContractSales}
                        />
                    </div>
                    {/* </Collapse> */}
                    {/* <div>
                        <ButtonWidgetCollapse id={"dash-collapse-reps"} name={"Reps"} classNames={"dash-collapse-button"} numSpaces={30} state={openRep} setState={setOpenRep} />
                    </div>
                    <Collapse in={openRep}> */}
                    <div className='paddingBottom-12'>
                        <div className='dashboard-filter-header'> Rep </div>
                        <MultiColumnComboBoxWidget id={"end-user-sales-rep"} className={"administrator-filter"} setValue={(e) => setRep(e)} value={rep} defaultValue={repDefault} datalist={allRepsData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '60px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                    {/* </Collapse> */}
                    {/* <div>
                        <ButtonWidgetCollapse id={"dash-collapse-checkArea"} name={"Check Area"} classNames={"dash-collapse-button"} numSpaces={20} state={openCheckArea} setState={setOpenCheckArea} />
                    </div>
                    <Collapse in={openCheckArea}> */}
                    <div>
                        <div className='dashboard-filter-header'> Check Area </div>
                        <MultiColumnComboBoxWidget id={"end-user-sales-check-area"} className={"administrator-filter"} defaultValue={checkBoxData[0]} setValue={(e) => setCheckArea(e)} value={checkArea} datalist={checkBoxData} isFilterable={true} textField={"text"} columns={[{ field: 'text', header: 'Area', width: '300px' }]} />
                    </div>
                    {/* </Collapse> */}
                    <div className='paddingTop-12'>
                        <ButtonWidget id='end-user-sales-pdf-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' isDisabled={isFetchPdfEndUserSaleListReport} type='submit' name='Print' />
                    </div>
                </form>
            </div>
        </>
    );
}

export default DashboardEndUserSalesFilter;
