import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsquarterlyUnitSalesTable, setQuarterlyUnitSalesApplyRebate, setQuarterlyUnitSalesCustomer, setQuarterlyUnitSalesDisplay, setQuarterlyUnitSalesForGrowth, setQuarterlyUnitSalesParent, setQuarterlyUnitSalesPeriod, setQuarterlyUnitSalesRep, setQuarterlyUnitSalesReportCust, setQuarterlyUnitSalesReportNo, setQuarterlyUnitSalesState, setQuarterlyUnitSalesSubParent, setQuarterlyUnitSalesSubParentGroup, setQuarterlyUnitSalesYear } from '@peerless-cms/store';
import { useEffect, useState } from "react";
import { GetAllCallCyclesExcel, GetAllRepsForLookup, GetCustomerLookup, GetGeneralLookupEntries, GetParentCustomer, GetReportNumbers, GetReps, GetStatesOfReps } from "@peerless/queries";
import { DropDownData, GetAllParentCustomersLookupParameters, GetAllRepsForLookupParameters, GetCustomerLookupParameters, GetGeneralLookupEntriesParameters, GetParentCustomerParameters, GetReportNumbersParameters } from "@peerless/models";
import { ButtonWidget, ButtonWidgetCollapse, DropDown, InputWidget, MultiColumnComboBoxWidget } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { dropDownDataConverter } from '@peerless/common';

export interface QuarterlyUnitSalesFilterProps { }

const periodList: DropDownData[] = [
    { text: '1st Quarter', value: '1', id: 1 },
    { text: '2nd Quarter', value: '2', id: 2 },
    { text: '3rd Quarter', value: '3', id: 3 },
    { text: '4th Quarter', value: '4', id: 4 }
]

const yearList: DropDownData[] = [
    { text: '2023', value: '2023', id: 1 },
    { text: '2024', value: '2024', id: 2 },
    { text: '2025', value: '2025', id: 3 }
]

const displayList: DropDownData[] = [
    { text: 'Tonnes', value: '1', id: 1 },
    { text: 'Units', value: '2', id: 2 },
]

export function QuarterlyUnitSalesFilter(props: QuarterlyUnitSalesFilterProps) {
    const dispatch = useDispatch();
    const [openDuration, setOpenDuration] = useState(false);
    const [openParent, setOpenParent] = useState(false);
    const [openReport, setOpenReport] = useState(false);
    const [openOthers, setOpenOthers] = useState(false);

    const [period, setPeriod] = useState(periodList[0]);
    const [year, setYear] = useState(yearList[yearList.length - 1]);
    const [forGrowth, setForGrowth] = useState();
    const [applyRebate, setApplyRebate] = useState();
    const [parent, setParent] = useState();
    const [subParent, setSubParent] = useState();
    const [subParentGroup, setSubParentGroup] = useState();
    const [reportNo, setReportNo] = useState();
    const [reportCust, setReportCust] = useState();
    const [customer, setCustomer] = useState();
    const [rep, setRep] = useState();
    const [state, setState] = useState();
    const [display, setDisplay] = useState(displayList[0]);

    const { callCyclesStartDate, callCyclesEndDate, isCallCyclesAnalysisListFetch, selectedOriginatorCallCyclesAnalysis, childOriginatorsCallCyclesAnalysis } = useSelector((state: RootState) => state.dashboardCallCyclesAnalysis);
    const { loggedUser, childOriginators, selectedOriginator } = useSelector((state: RootState) => state.header);

    const payload: any = {
        // originator: selectedOriginatorCallCyclesAnalysis.userName,
        // sStartDate: getDate(new Date(callCyclesStartDate)),
        // sEndDate: getDate(new Date(callCyclesEndDate)),
        // repType: selectedOriginatorCallCyclesAnalysis.repType,
        // isIncludeContact: false,
        // orderBy: 'lead_name ASC',
        // additionalParams: ``,
        // childOriginators: ` ${childOriginatorsCallCyclesAnalysis}`,
        // leadId: 0,
        // ignorePagination: true,
    };

    const [isExporting, setIsExporting] = useState(false);

    const payloadParentCustomer: GetParentCustomerParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        orderBy: 'cust_code ASC',
        isBrowsAvailable: true,
    }

    const payloadCustomerLookup: GetCustomerLookupParameters = {
        additionalParams: childOriginators,
        childOriginators: childOriginators,
        defaultDepartmentId: selectedOriginator.defaultDepartmentId,
        leadStage: 'C',
        orderBy: 'name ASC',
        originator: selectedOriginator.userName,
        startIndex: 1,
        rowCount: 1000
    }

    const payloadSubGroupLookup: GetGeneralLookupEntriesParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        sTableID: 'CSPG'
    }

    const payloadAllRepsLookup: GetAllRepsForLookupParameters = {
        orderby: 'rep_code asc',
        startIndex: 1,
        rowCount: 1000,
    }

    const payloadReportNumbers: GetReportNumbersParameters = {
        startIndex: 1,
        rowCount: 1000,
        additionalParams: ''
    }

    // GetAllCallCyclesExcel({ ...payload, rowCount: 1, startIndex: 1 }, isExporting, setIsExporting, true);
    const { data: parentCustomer } = GetParentCustomer(payloadParentCustomer, true)
    const { data: customerLookup } = GetCustomerLookup(payloadCustomerLookup, true);
    const { data: subParentGroupLookup } = GetGeneralLookupEntries(payloadSubGroupLookup, true)
    // const { data: allRepsForLookup } = GetAllRepsForLookup(payloadAllRepsLookup, true);
    const { data: statesOfReps } = GetStatesOfReps(true);
    const { data: reportNumbers } = GetReportNumbers(payloadReportNumbers, true);
    const { data: allReps } = GetReps(true);


    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'tableDescription', 'tableCode');
    const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
    const subParentGroupLookupData = dropDownDataConverter.dropDownDataConverter(subParentGroupLookup || [], 'tableDescription', 'tableCode');
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allReps || [], 'name', 'repCode',);
    const statesOfRepsData = dropDownDataConverter.dropDownDataConverter(statesOfReps || [], 'stateName', 'stateName');
    const reportNumbersData = dropDownDataConverter.dropDownDataConverter(reportNumbers || [], 'period', 'payNo', undefined, undefined, ['custCode']);

    const onFilterClick = async () => {
        dispatch(setIsquarterlyUnitSalesTable(true));
        dispatch(setQuarterlyUnitSalesPeriod(period));
        dispatch(setQuarterlyUnitSalesYear(year));
        dispatch(setQuarterlyUnitSalesForGrowth(forGrowth));
        dispatch(setQuarterlyUnitSalesApplyRebate(applyRebate));
        dispatch(setQuarterlyUnitSalesParent(parent));
        dispatch(setQuarterlyUnitSalesSubParent(subParent));
        dispatch(setQuarterlyUnitSalesSubParentGroup(subParentGroup));
        dispatch(setQuarterlyUnitSalesReportNo(reportNo));
        dispatch(setQuarterlyUnitSalesReportCust(reportCust));
        dispatch(setQuarterlyUnitSalesCustomer(customer));
        dispatch(setQuarterlyUnitSalesRep(rep));
        dispatch(setQuarterlyUnitSalesState(state));
        dispatch(setQuarterlyUnitSalesDisplay(display));
    };

    const handleExportClick = async () => {
    };

    const clearFilters = () => {
    };

    const popUpSettings = {
        width: '150px'
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <div>
                <ButtonWidgetCollapse id={"dash-collapse-duration"} name={"Duration"} classNames={"dash-collapse-button"} numSpaces={20} state={openDuration} setState={setOpenDuration} />
            </div>

            <Collapse in={openDuration}>
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Period </div>
                        <DropDown id={"quater-unit-sales-period-drop"} className={"dashboard-filter"} setValue={(e) => setPeriod(e)} value={period} defaultValue={periodList[0]} datalist={periodList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        <div className="paddingTop-12">
                            <DropDown id={"quater-unit-sales-period-year-drop"} className={"dashboard-filter"} setValue={(e) => setYear(e)} value={year} defaultValue={yearList[yearList.length - 1]} datalist={yearList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className='pad-top-5 pad-left-90 bolder dashboard-filter-header' style={{ fontSize: '11px' }}>
                            {
                                period.value === '1' ? 'JUL - AUG - SEP' :
                                    period.value === '2' ? 'OCT - NOV - DEC' :
                                        period.value === '3' ? 'JAN - FEB - MAR' :
                                            period.value === '4' ? 'APR - MAY - JUN' : ''
                            }
                        </div>
                    </div>
                    <div className="">
                        <div className='dashboard-filter-header'> For Growth % {'>'} =</div>
                        <InputWidget id={"quater-unit-sales-for-growth-input"} className={"dashboard-filter sales-enquiry-border"} setValue={(e) => setForGrowth(e)} value={forGrowth} type='number' />
                    </div>
                    <div className="paddingTop-12  paddingBottom-12">
                        <div className='dashboard-filter-header'> Apply Rebate %</div>
                        <InputWidget id={"quater-unit-sales-apply-rebate-input"} className={"dashboard-filter sales-enquiry-border"} setValue={(e) => setApplyRebate(e)} value={applyRebate} type='number' />
                    </div>
                </div>
            </Collapse>

            <div>
                <ButtonWidgetCollapse id={"dash-collapse-parent"} name={"Parent"} classNames={"dash-collapse-button"} numSpaces={24} state={openParent} setState={setOpenParent} />
            </div>
            <Collapse in={openParent}>
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Parent </div>
                        <MultiColumnComboBoxWidget id={"quater-unit-sales-parent-drop"} className={"dashboard-filter"} setValue={(e) => setParent(e)} value={parent} datalist={parentCustomerData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Customer Code', width: '150px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> Sub Parent </div>
                        <DropDown id={"quater-unit-sales-sub-parent-drop"} className={"dashboard-filter"} setValue={(e) => setSubParent(e)} value={subParent} defaultValue={''} datalist={[]} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                    </div>
                    <div className="paddingTop-12 paddingBottom-12">
                        <div className='dashboard-filter-header'> Sub Parent Group </div>
                        <MultiColumnComboBoxWidget id={"quater-unit-sales-sub-parent-group-drop"} className={"dashboard-filter"} setValue={(e) => setSubParentGroup(e)} value={subParentGroup} datalist={subParentGroupLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Customer Code', width: '150px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                </div>
            </Collapse>

            <div>
                <ButtonWidgetCollapse id={"dash-collapse-report"} name={"Report"} classNames={"dash-collapse-button"} numSpaces={24} state={openReport} setState={setOpenReport} />
            </div>
            <Collapse in={openReport}>
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Report No </div>
                        <MultiColumnComboBoxWidget id={"quater-unit-sales-report-drop"} className={"dashboard-filter"} setValue={(e) => setReportNo(e)} value={reportNo} datalist={reportNumbersData} isFilterable={true} textField={"custCode"} valueField={"value"} columns={[{ field: 'value', header: 'Pay No', width: '90px' }, { field: 'text', header: 'Period', width: '200px' }, { field: 'custCode', header: 'Cust Code', width: '200px' }]} />
                    </div>
                    <div className="paddingTop-12 paddingBottom-12">
                        <div className='dashboard-filter-header'> Report Cust </div>
                        <MultiColumnComboBoxWidget id={"quater-unit-sales-report-cust-drop"} className={"dashboard-filter"} setValue={(e) => setReportCust(e)} value={reportCust} datalist={customerLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Customer Code', width: '150px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                </div>
            </Collapse>

            <div>
                <ButtonWidgetCollapse id={"dash-collapse-others"} name={"Others"} classNames={"dash-collapse-button"} numSpaces={24} state={openOthers} setState={setOpenOthers} />
            </div>
            <Collapse in={openOthers}>
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Customer </div>
                        <MultiColumnComboBoxWidget id={"quater-unit-sales-customer-drop"} className={"dashboard-filter"} setValue={(e) => setCustomer(e)} value={customer} datalist={customerLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Customer Code', width: '150px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> Rep </div>
                        <MultiColumnComboBoxWidget id={"quater-unit-sales-rep-drop"} className={"dashboard-filter"} setValue={(e) => setRep(e)} value={rep} datalist={allRepsForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Rep Code', width: '90px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                    </div>
                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> State </div>
                        <DropDown id={"quater-unit-sales-state-drop"} className={"dashboard-filter"} setValue={(e) => setState(e)} value={state} defaultValue={statesOfRepsData[0]} datalist={statesOfRepsData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                    </div>
                    <div className="paddingTop-12 paddingBottom-12">
                        <div className='dashboard-filter-header'> Display </div>
                        <DropDown id={"quater-unit-sales-display-drop"} className={"dashboard-filter"} setValue={(e) => setDisplay(e)} value={display} defaultValue={displayList[0]} datalist={displayList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                    </div>
                </div>
            </Collapse>

            <ButtonWidget id='quater-unit-sales-filter-button' classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' Function={onFilterClick} isDisabled={isCallCyclesAnalysisListFetch} isFetching={true} />
            <ButtonWidget id='quater-unit-sales-excel-button' classNames='k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
        </>
    );
}

export default QuarterlyUnitSalesFilter;