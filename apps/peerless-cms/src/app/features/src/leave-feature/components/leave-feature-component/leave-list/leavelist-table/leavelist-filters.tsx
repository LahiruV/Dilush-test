import { ClearFilterBox } from "@peerless-cms/features-common-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ButtonWidget, DropDown, InputWidget } from "@peerless/controls";
import { GetAllLeaves, GetAllOriginatorsByDep } from "@peerless/queries";
import { GetDepartments } from "@peerless/queries";
import { Departments } from "@peerless/models";
import { dropDownDataConverter } from "@peerless/common";
import { RootState, setDepartmentsMainDrop, setIsFetchingLeaveEntryList, setIsFetchingShowLeaveList, setLeavetypeMainDrop, setOriginatorMainDrop, setRenderNumLeaveEntry, setYeartype } from "@peerless-cms/store";

export interface LeaveListFiltersProps { }

const dropDownleavetype = [
    { text: "Annual Leave", value: "Annual", id: 1 },
    { text: "Personal Leave", value: "Personal Leave", id: 2 },
    { text: "Long Service Leave", value: "Long Service Leave", id: 3 },
    { text: "Leave Without Pay", value: "Leave Without Pay", id: 4 },
    { text: "Cancelled", value: "Cancelled", id: 5 },
    { text: "Other Leave", value: "Other Leave", id: 6 },
    { text: "All Leave", value: "All Leave", id: 7 },
];

export function LeaveListFilters(props: LeaveListFiltersProps) {
    const dispatch = useDispatch();
    const [isExporting, setIsExporting] = useState(false);
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { DepartmentsMainDrop, OriginatorMainDrop, LeavetypeMainDrop, isFetchingLeaveEntryList, Yeartype } = useSelector((state: RootState) => state.leaveEntry);
    let isDeptDropdownDisabled = false;
    let isOrigDropdownDisabled = false;

    const depPayload: Departments = {
        tableCode: '',
        tableDescription: ''
    }

    const { data: departmentstList } = GetDepartments(depPayload, true);
    const { data: originatortList } = GetAllOriginatorsByDep(DepartmentsMainDrop.value, true);

    const departmentsData = dropDownDataConverter.dropDownDataConverter(departmentstList || [], 'description', 'tableCode');
    const originatorData = dropDownDataConverter.dropDownDataConverter(originatortList || [], 'name', 'originator', 'originatorId');
    const selectedDepartment = departmentsData.find((item: any) => item.value === loggedUser.leaveDept);

    useEffect(() => {
        if (departmentsData.length > 0) {
            dispatch(setDepartmentsMainDrop({ text: selectedDepartment.text, value: loggedUser.leaveDept, id: 0 }));
        }
    }, [departmentstList, setDepartmentsMainDrop]);

    useEffect(() => {
        dispatch(setOriginatorMainDrop({ id: loggedUser.originatorId, text: loggedUser.name, value: loggedUser.userName }));
        dispatch(setYeartype(new Date().getFullYear().toString()));
    }, [dispatch, loggedUser.originatorId, loggedUser.name, loggedUser.userName]);

    const onFilterClick = () => {
        dispatch(setIsFetchingLeaveEntryList(true));
        dispatch(setIsFetchingShowLeaveList(true));
    }

    const clearFiltersWithoutDep = () => {
        dispatch(setOriginatorMainDrop({ id: 0, text: '', value: '' }));
        dispatch(setLeavetypeMainDrop({ text: '', value: '', id: 0 }));
    }

    const clearFilters = () => {
        dispatch(setDepartmentsMainDrop({ text: '', value: '', id: 0 }));
        dispatch(setOriginatorMainDrop({ id: 0, text: '', value: '' }));
        dispatch(setLeavetypeMainDrop({ text: '', value: '', id: 0 }));
        dispatch(setYeartype(new Date().getFullYear().toString()));
    }

    const [renderNum, setRenderNum] = useState(0);

    useEffect(() => {
        setRenderNum(prev => {
            const newNum = prev + 1;
            dispatch(setRenderNumLeaveEntry(newNum));
            return newNum;
        });
    }, [DepartmentsMainDrop, OriginatorMainDrop, LeavetypeMainDrop, Yeartype])

    const popUpSettings = {
        width: '150px'
    }

    const handleExportClick = async () => {
        setIsExporting(true);
    };

    const payload = {
        deptId: DepartmentsMainDrop.value,
        origator: OriginatorMainDrop.value,
        year: parseInt(Yeartype),
        leaveType: LeavetypeMainDrop.text,
        originatorId: OriginatorMainDrop.id,
        showRejected: true,
        NextRecord: 1,
        NumberOfRecords: 999999,
    };

    GetAllLeaves(payload, isExporting, setIsExporting, true);

    return (
        <div className='area-container'>
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div>
                    <div className='dashboard-filter-header'> Department </div>
                    <DropDown id={"department-by-drop"}
                        className={"administrator-filter"}
                        setValue={(e: any) => {
                            dispatch(setDepartmentsMainDrop(e));
                            clearFiltersWithoutDep();
                        }}
                        defaultValue={''}
                        value={DepartmentsMainDrop}
                        datalist={departmentsData}
                        textField={"text"}
                        dataItemKey={"value"}
                        fillMode={"outline"}
                        size={"small"}
                        isDisabled={isDeptDropdownDisabled}
                        isFilterable={true}
                        popupSettings={popUpSettings} />
                </div>
                <div className="paddingTop-12">
                    <div>
                        <div className='dashboard-filter-header'> Originator </div>
                        <DropDown id={"originator-by-drop"}
                            className={"administrator-filter"}
                            setValue={(e) => dispatch(setOriginatorMainDrop(e))}
                            defaultValue={''}
                            value={OriginatorMainDrop}
                            datalist={originatorData}
                            textField={"text"}
                            dataItemKey={"value"}
                            fillMode={"outline"}
                            size={"small"}
                            isDisabled={isOrigDropdownDisabled}
                            isFilterable={true}
                            popupSettings={popUpSettings}
                        />
                    </div>
                </div>
                <div className="paddingTop-12">
                    <div>
                        <div className='dashboard-filter-header'> Type </div>
                        <DropDown id={"type-by-drop"}
                            className={"administrator-filter"}
                            setValue={(e) => dispatch(setLeavetypeMainDrop(e))}
                            defaultValue={''}
                            value={LeavetypeMainDrop}
                            datalist={dropDownleavetype}
                            textField={"text"}
                            dataItemKey={"value"}
                            fillMode={"outline"}
                            size={"small"}
                            popupSettings={popUpSettings}
                            isFilterable={true}
                        />
                    </div>
                </div>
                <div className="paddingTop-12">
                    <div>
                        <div className='dashboard-filter-header'> Year </div>
                        <InputWidget
                            id={"sales-enquiry-invoice-enquiry-invoice-number"}
                            className={"administrator-filter"}
                            setValue={(e) => { dispatch(setYeartype(e)) }}
                            value={Yeartype}
                            type='number' />
                    </div>
                </div>
                <ButtonWidget type='submit' id='call-cycle-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' isDisabled={isFetchingLeaveEntryList} isFetching={true} />
                <ButtonWidget id='activity-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
            </form>
        </ div>
    );
}