import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setEndUserLogStartDate, setEndUserLogEndDate, setIsDashEndUserTransferLogsListFetch, setChildOriginatorsDashEndUserTransferLogs } from '@peerless-cms/store';
import { GetEndUserTransferLogsExcel } from "@peerless/queries";
import { EndUserTransferLogParameters } from "@peerless/models";
import { ButtonWidget, ButtonWidgetCollapse, DatePickerWidget } from "@peerless/controls";
import { ClearFilterBox } from "@peerless-cms/features-common-components";
import { Collapse } from "react-bootstrap";

export interface DashBoardEndUserTransferLogsFilterProps { }

export function DashBoardEndUserTransferLogsFilter(props: DashBoardEndUserTransferLogsFilterProps) {
    const dispatch = useDispatch();
    const [openDuration, setOpenDuration] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const { endUserLogStartDate, endUserLogEndDate, searchByDashEndUserLogs, isDashEndUserTransferLogsListFetch, childOriginatorsDashEndUserTransferLogs } = useSelector((state: RootState) => state.dashboardEndUserTransferLogs);
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

    const [startDate, setStartDate] = useState(startDates.toISOString());
    const [endDate, setEndDate] = useState(endDates.toISOString());

    const onFilterClick = async () => {
        dispatch(setEndUserLogStartDate(startDate));
        dispatch(setEndUserLogEndDate(endDate));
        setChildOriginatorsDashEndUserTransferLogs(childOriginators);
        dispatch(setIsDashEndUserTransferLogsListFetch(true));
    };

    const handleExportClick = async () => {
        dispatch(setEndUserLogStartDate(startDate));
        dispatch(setEndUserLogEndDate(endDate));
        setChildOriginatorsDashEndUserTransferLogs(childOriginators);
        setIsExporting(true);
    };

    const clearFilters = () => {
        setStartDate(startDates.toISOString());
        setEndDate(endDates.toISOString());
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-collapse-duration"} name={"Duration"} classNames={"dash-collapse-button"} numSpaces={23} state={openDuration} setState={setOpenDuration} />
                </div>
                <Collapse in={openDuration}> */}
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Start Date </div>
                        <DatePickerWidget id={"endUser-start-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={startDate} setValue={(e) => setStartDate(e)} />
                    </div>

                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> End Date </div>
                        <DatePickerWidget id={"endUser-end-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={endDate} setValue={(e) => setEndDate(e)} />
                    </div>
                </div>
                {/* </Collapse> */}
                <ButtonWidget id='endUser-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type="submit" isDisabled={isDashEndUserTransferLogsListFetch} isFetching={true} />
                <ButtonWidget id='endUser-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
            </form>
        </>
    );
}

export default DashBoardEndUserTransferLogsFilter;
