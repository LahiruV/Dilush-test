import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setEndUserLogStartDate, setEndUserLogEndDate, setIsDashEndUserTransferLogsListFetch, setChildOriginatorsDashEndUserTransferLogs, setTriggerEndUserTransferLogsFormSubmit } from '@peerless-cms/store';
import { GetEndUserTransferLogsExcel } from "@peerless/queries";
import { EndUserTransferLogParameters } from "@peerless/models";
import { DatePickerWidget, FilterNonButton } from "@peerless/controls";
import { FilterForm, FilterFormGroup } from "@peerless-cms/features-common-components";
import { Collapse } from "react-bootstrap";
import { useFilterForm } from '@peerless-cms/features';

export interface DashBoardEndUserTransferLogsFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
    isExporting: boolean;
    setIsExporting: (isActive: boolean) => void;
}

export function DashBoardEndUserTransferLogsFilter(props: DashBoardEndUserTransferLogsFilterProps) {
    const dispatch = useDispatch();
    const [isExporting, setIsExporting] = useState(false);
    const { endUserLogStartDate, endUserLogEndDate, searchByDashEndUserLogs, childOriginatorsDashEndUserTransferLogs, isFormSubmit } = useSelector((state: RootState) => state.dashboardEndUserTransferLogs);
    const { loggedUser, childOriginators } = useSelector((state: RootState) => state.header);
    const payload: EndUserTransferLogParameters = {
        startDate: endUserLogStartDate,
        endDate: endUserLogEndDate,
        additionalParams: searchByDashEndUserLogs ? `name like '%${searchByDashEndUserLogs}%'` : "",
        repType: loggedUser.repType,
        originator: loggedUser.userName,
        childOriginators: childOriginatorsDashEndUserTransferLogs,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        isNew: true,
        ignorePagination: true,
    };

    const subtractMonths = (date: Date, months: number): Date => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - months);
        return newDate;
    };

    const endDates = new Date();
    const startDates = subtractMonths(endDates, 3);

    GetEndUserTransferLogsExcel({ ...payload, rowCount: 1000, startIndex: 1 }, isExporting, setIsExporting, true);//Need to change

    const onFilterClick = async () => {
        setChildOriginatorsDashEndUserTransferLogs(childOriginators);
        dispatch(setIsDashEndUserTransferLogsListFetch(true));
    };

    const handleExportClick = async () => {
        setChildOriginatorsDashEndUserTransferLogs(childOriginators);
        setIsExporting(true);
    };

    const clearFilters = () => {
        dispatch(setEndUserLogStartDate(startDates.toISOString()));
        dispatch(setEndUserLogEndDate(endDates.toISOString()));
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerEndUserTransferLogsFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    useEffect(() => {
        if (props.isExporting) {
            handleExportClick();
        }
    }, [props.isExporting])

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id="filter-form" onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label="Start Date">
                                <DatePickerWidget id={"endUser-start-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={endUserLogStartDate} setValue={(e) => dispatch(setEndUserLogStartDate(e))} />
                            </FilterFormGroup>
                        </div>
                        <div>
                            <FilterFormGroup label="End Date">
                                <DatePickerWidget id={"endUser-end-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={endUserLogEndDate} setValue={(e) => dispatch(setEndUserLogEndDate(e))} />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type="submit" />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashBoardEndUserTransferLogsFilter;
