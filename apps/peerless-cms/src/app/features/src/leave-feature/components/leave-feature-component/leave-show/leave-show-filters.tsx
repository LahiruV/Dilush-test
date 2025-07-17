import { ClearFilterBox, KendoDropdown } from "@peerless-cms/features-common-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ButtonWidget, DatePickerWidget, DropDown, InputWidget } from "@peerless/controls";
import { GetAllOriginatorsByDep } from "@peerless/queries";
import { GetDepartments } from "@peerless/queries";
import { Departments, OriginatorsByDep } from "@peerless/models";
import { dropDownDataConverter } from "@peerless/common";
import { RootState, setDepartmentsMainDrop, setIsFetchingShowLeaveList, setLeavetypeMainDrop, setOriginatorMainDrop, setYeartype } from "@peerless-cms/store";

export interface LeaveShowFiltersProps { }

const dropDownleavetype = [
    { text: "Annual Leave", value: "Annual", id: 1 },
    { text: "Personal Leave", value: "Personal Leave", id: 2 },
    { text: "Long Service Leave", value: "Long Service Leave", id: 3 },
    { text: "Leave Without Pay", value: "Leave Without Pay", id: 4 },
    { text: "Cancelled", value: "Cancelled", id: 5 },
    { text: "Other Leave", value: "Other Leave", id: 6 },
    { text: "All Leave", value: "All Leave", id: 7 },
];

export function LeaveShowFilters(props: LeaveShowFiltersProps) {
    const dispatch = useDispatch();
    let isDeptDropdownDisabled = false;
    let isOrigDropdownDisabled = false;
    const [originator, setOriginator] = useState<string | null>(null);
    const [leavetype, setLeavetype] = useState('')
    const [yeartypee, setYeartypee] = useState(new Date().getFullYear().toString());

    const selectedOriginator = useSelector((state: RootState) => state.header.selectedOriginator);
    const { isFetchingShowLeaveList } = useSelector((state: RootState) => state.leaveEntry);

    const [departments, setDepartments] = useState<any>({ text: "", value: "", id: 1 })
    const depPayload: Departments = {
        tableCode: '',
        tableDescription: ''
    }

    const { data: departmentstList } = GetDepartments(depPayload, true);
    const { data: originatortList } = GetAllOriginatorsByDep(departments.value, true);

    const departmentsData = dropDownDataConverter.dropDownDataConverter(departmentstList || [], 'description', 'tableCode');
    const originatorData = dropDownDataConverter.dropDownDataConverter(originatortList || [], 'name', 'originator', 'originatorId');

    const selectedDepartment = departmentsData.find((item: any) => item.value === selectedOriginator.leaveDept);

    useEffect(() => {
        if (departmentsData.length > 0) {
            setDepartments({ text: selectedDepartment.text, value: selectedOriginator.leaveDept, id: 0 });
        }
    }, [departmentstList, setDepartments]);

    useEffect(() => {
        if (departmentsData.length > 0) {
            setOriginator("");
        }
    }, [originatortList, setOriginator]);


    const onFilterClick = () => {
        dispatch(setDepartmentsMainDrop(departments));
        dispatch(setOriginatorMainDrop(originator));
        dispatch(setLeavetypeMainDrop(leavetype));
        dispatch(setYeartype(yeartypee));
        dispatch(setIsFetchingShowLeaveList(true));
    }


    const clearFilters = () => {
        setDepartments("");
        setOriginator("");
        setLeavetype("");
        setYeartypee(new Date().getFullYear().toString());
    }

    const popUpSettings = {
        width: '150px'
    }

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
                        setValue={(e) => setDepartments(e)}
                        defaultValue={''}
                        value={departments}
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
                            setValue={(e) => setOriginator(e)}
                            defaultValue={''}
                            value={originator}
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
                            setValue={(e) => setLeavetype(e)}
                            defaultValue={''}
                            value={leavetype}
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
                        <InputWidget id={"sales-enquiry-invoice-enquiry-invoice-number"} className={"administrator-filter"} setValue={(e) => { setYeartypee(e) }} value={yeartypee} type='number' />
                    </div>
                </div>
                <ButtonWidget type='submit' id='call-cycle-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' isDisabled={isFetchingShowLeaveList} isFetching={true} />
            </form>
        </ div>
    );
}