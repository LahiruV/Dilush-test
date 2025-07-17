import { FilterForm, FilterFormGroup } from "@peerless-cms/features-common-components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ButtonWidget, DropDown, FilterNonButton, InputWidget } from "@peerless/controls";
import { GetAllLeaves, GetAllOriginatorsByDep } from "@peerless/queries";
import { GetDepartments } from "@peerless/queries";
import { Departments } from "@peerless/models";
import { dropDownDataConverter } from "@peerless/common";
import { RootState, setDepartmentsMainDrop, setIsFetchingLeaveEntryList, setIsFetchingShowLeaveList, setLeavetypeMainDrop, setOriginatorMainDrop, setTriggerLeaveListFormSubmit, setYeartype } from "@peerless-cms/store";
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features';

export interface LeaveListFiltersProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
    isExporting: boolean;
    setIsExporting: (isActive: boolean) => void;
}

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
    const getYear = new Date().getFullYear();
    const [defaultOriginator, setDefaultOriginator] = useState({ id: 0, text: '', value: '' });
    const [defaultDepartment, setDefaultDepartment] = useState({ id: 0, text: '', value: '' });
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { DepartmentsMainDrop, OriginatorMainDrop, LeavetypeMainDrop, Yeartype, isFormSubmit } = useSelector((state: RootState) => state.leaveEntry);
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
    // const selectedDepartment = departmentsData.find((item: any) => item.value === loggedUser.deptString);
    const selectedDepartment = departmentsData.find((item: any) => item.value === loggedUser.leaveDept);

    useEffect(() => {
        if (departmentsData.length > 0) {
            dispatch(setDepartmentsMainDrop({ text: selectedDepartment.text, value: loggedUser.leaveDept, id: 0 }));
            setDefaultDepartment({ id: 0, text: selectedDepartment.text, value: loggedUser.leaveDept });
        }
    }, [departmentstList, setDepartmentsMainDrop]);

    useEffect(() => {
        dispatch(setOriginatorMainDrop({ id: loggedUser.originatorId, text: loggedUser.name, value: loggedUser.userName }));
        dispatch(setYeartype(new Date().getFullYear().toString()));
        setDefaultOriginator({ id: loggedUser.originatorId, text: loggedUser.name, value: loggedUser.userName });
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

    GetAllLeaves(payload, props.isExporting, props.setIsExporting, true);

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerLeaveListFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    return (
        <Collapse in={props.isFiltersOpen}>
            <div className="filters-container">
                <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                    <div>
                        <FilterFormGroup label='Department'>
                            <DropDown id={"department-by-drop"}
                                className={"administrator-filter filter-form-filter"}
                                setValue={(e: any) => {
                                    dispatch(setDepartmentsMainDrop(e));
                                    clearFiltersWithoutDep();
                                }}
                                defaultValue={defaultDepartment}
                                value={DepartmentsMainDrop}
                                datalist={departmentsData}
                                textField={"text"}
                                dataItemKey={"value"}
                                fillMode={"outline"}
                                size={"small"}
                                isDisabled={isDeptDropdownDisabled}
                                isFilterable={true}
                                popupSettings={popUpSettings} />
                        </FilterFormGroup>

                        <FilterFormGroup label='Originator'>
                            <DropDown id={"originator-by-drop"}
                                className={"administrator-filter filter-form-filter"}
                                setValue={(e) => dispatch(setOriginatorMainDrop(e))}
                                defaultValue={defaultOriginator}
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
                        </FilterFormGroup>
                    </div>

                    <div>
                        <FilterFormGroup label='Type'>
                            <DropDown id={"type-by-drop"}
                                className={"administrator-filter filter-form-filter"}
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
                        </FilterFormGroup>

                        <FilterFormGroup label='Year'>
                            <InputWidget
                                id={"sales-enquiry-invoice-enquiry-invoice-number"}
                                className={"administrator-filter filter-form-filter"}
                                setValue={(e) => { dispatch(setYeartype(e)) }}
                                value={Yeartype}
                                type='number'
                                maxLength={getYear + 30}
                                minLength={getYear - 30}
                                required={true}
                                placeholder='Enter Year'
                            />
                        </FilterFormGroup>
                    </div>
                    <FilterNonButton type='submit' />
                </FilterForm>
            </ div>
        </Collapse>
    );
}