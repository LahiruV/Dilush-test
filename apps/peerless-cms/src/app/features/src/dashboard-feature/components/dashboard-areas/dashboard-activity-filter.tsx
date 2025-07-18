import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSStartDate, setSEndDate, setActivityStatus, setRepActivityList, setRepActivity, setSelectedActivityAnalysis, setIsFetchActivityAnalysisList } from '@peerless-cms/store';
import { useEffect, useState } from "react";
import { GetAllActivitiesByTypeExcel, GetChildOriginatorsList } from "@peerless/queries";
import { ActivityAnalysisParameters, DropDownData } from "@peerless/models";
import { ButtonWidget, ButtonWidgetCollapse, DatePickerWidget, DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import Collapse from 'react-bootstrap/esm/Collapse';

const durationDataList = [
    { id: 1, text: 'Today', value: 0 },
    { id: 2, text: 'Week', value: 1 },
    { id: 3, text: 'Month', value: 2 },
    { id: 4, text: '3 Months', value: 3 },
    { id: 5, text: '6 Months', value: 4 }
];

const activityStatusList = [
    { id: 1, text: 'To Be Actioned', value: 'ACTN' },
    { id: 2, text: 'Complete', value: 'COMP' },
];

export interface DashBoardActivityFilterProps { }

/**
 * DashBoardActivityFilter component is responsible for rendering the activity filter section
 * on the dashboard. It allows users to filter activities based on various criteria such as
 * representative, duration, start date, end date, and activity status. It also provides
 * functionality to export the filtered activities to an Excel file.
 *
 * @param {DashBoardActivityFilterProps} props - The properties passed to the component.
 * @returns {JSX.Element} The rendered component.
 *
 * @component
 * @example
 * <DashBoardActivityFilter />
 *
 * @remarks
 * This component uses several hooks such as useState, useEffect, and useDispatch from React
 * and Redux to manage state and side effects. It also interacts with various selectors to
 * retrieve necessary data from the Redux store.
 *
 * @function
 * @name DashBoardActivityFilter
 *
 * @property {DropDownData} durationData - The selected duration data for filtering activities.
 * @property {string} sStartDate - The start date for filtering activities.
 * @property {string} sEndDate - The end date for filtering activities.
 * @property {ActivityStatus} activityStatus - The selected activity status for filtering activities.
 * @property {Array} repActivityList - The list of representative activities.
 * @property {User} repActivity - The selected representative activity.
 * @property {string} searchByActivity - The search term for filtering activities by name.
 * @property {boolean} isFetchActivityAnalysisList - Flag indicating if the activity analysis list is being fetched.
 * @property {User} loggedUser - The logged-in user.
 * @property {boolean} isManagerMode - Flag indicating if the manager mode is enabled.
 * @property {User} selectedOriginator - The selected originator.
 * @property {boolean} isExporting - Flag indicating if the export to Excel is in progress.
 * @property {Array} childOriginatorsListData - The list of child originators.
 * @property {string} startDate - The start date for filtering activities.
 * @property {string} endDate - The end date for filtering activities.
 * @property {ActivityStatus} activityStatusData - The selected activity status data.
 * @property {User} repActivityData - The selected representative activity data.
 * @property {ActivityAnalysisParameters} payload - The payload for fetching activity analysis.
 *
 * @method onFilterClick - Handles the filter button click event to dispatch actions for setting filter criteria.
 * @method handleExportClick - Handles the export button click event to dispatch actions for exporting activities to Excel.
 * @method clearFilters - Clears the filter criteria and resets to default values.
*
* @hook useEffect - Updates the start and end dates based on the selected duration.
* @hook useEffect - Updates the representative activity list based on the child originators list data.
* @hook useEffect - Updates the representative activity data based on the selected originator.
*/
export function DashBoardActivityFilter(props: DashBoardActivityFilterProps) {
    const dispatch = useDispatch();
    const [openRep, setOpenRep] = useState(false);
    const [openDuration, setOpenDuration] = useState(false);
    const [openStatus, setOpenStatus] = useState(false);
    const [durationData, setDurationData] = useState<DropDownData>(durationDataList[2]);
    const { sStartDate, sEndDate, activityStatus, repActivityList, repActivity, searchByActivity, isFetchActivityAnalysisList } = useSelector((state: RootState) => state.dashboardActivityAnalysis);
    const { loggedUser, isManagerMode, selectedOriginator } = useSelector((state: RootState) => state.header);
    const modifiedList = [{ name: "Select All", userName: "All" }, { ...loggedUser }, ...repActivityList];
    const [isExporting, setIsExporting] = useState(false);
    const { responseData: childOriginatorsListData } = GetChildOriginatorsList({
        originator: loggedUser.userName,
        childOriginators: `(originator = '${loggedUser.userName}')`,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        managerMode: !isManagerMode
    }, true);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [activityStatusData, setActivityStatusData] = useState(activityStatusList[0]);
    const [repActivityData, setRepActivityData] = useState(loggedUser);
    const payload: ActivityAnalysisParameters = {
        activityStatus: activityStatus.value,
        originator: repActivity.userName,
        childOriginators: ` (originator = '${repActivity.userName}')`,
        additionalParams: searchByActivity ? `lead_name like '%${searchByActivity}%'` : "",
        sStartDate,
        sEndDate,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        orderBy: 'start_date asc',
        sector: '',
        loggedInOriginator: loggedUser.userName,
        managerMode: isManagerMode,
        ignorePagination: true,
    };

    GetAllActivitiesByTypeExcel({ ...payload, rowCount: 20, startIndex: 1 }, isExporting, setIsExporting, true);

    const onFilterClick = async () => {
        dispatch(setSelectedActivityAnalysis({}));
        dispatch(setSStartDate(startDate));
        dispatch(setSEndDate(endDate));
        dispatch(setActivityStatus(activityStatusData));
        dispatch(setRepActivity(repActivityData));
        dispatch(setIsFetchActivityAnalysisList(true));
    };

    const handleExportClick = async () => {
        dispatch(setSStartDate(startDate));
        dispatch(setSEndDate(endDate));
        dispatch(setActivityStatus(activityStatusData));
        dispatch(setRepActivity(repActivityData));
        setIsExporting(true);
    };

    const clearFilters = () => {
        setDurationData(durationDataList[2])
        setActivityStatusData(activityStatusList[0]);
        setRepActivityData(loggedUser);
    };

    const durationDataDefault = durationDataList[2];
    const activityStatusDefault = activityStatusList[0];
    const repActivityDefault = loggedUser;

    useEffect(() => {
        if (durationData) {
            const today = new Date();
            const startDate = new Date(today);
            const endDate = new Date(today);

            switch (durationData.value) {
                case 0:
                    break;
                case 1:
                    startDate.setDate(today.getDate() - 7);
                    break;
                case 2:
                    startDate.setMonth(today.getMonth() - 1);
                    break;
                case 3:
                    startDate.setMonth(today.getMonth() - 3);
                    break;
                case 4:
                    startDate.setMonth(today.getMonth() - 6);
                    break;
                default:
                    break;
            }
            setStartDate(startDate.toISOString());
            setEndDate(endDate.toISOString());
        }
    }, [durationData, dispatch]);

    useEffect(() => {
    }, [isManagerMode]);

    useEffect(() => {
        if (childOriginatorsListData && childOriginatorsListData.length > 0) {
            dispatch(setRepActivityList(childOriginatorsListData));
        }
    }, [childOriginatorsListData]);

    useEffect(() => {
        if (selectedOriginator) {
            setRepActivityData(selectedOriginator);
        }
    }, [selectedOriginator]);

    const popUpSettings = {
        width: '150px'
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
                    <ButtonWidgetCollapse id={"dash-activity-collapse-rep"} name={"Reps"} classNames={"dash-collapse-button"} numSpaces={30} state={openRep} setState={setOpenRep} />
                </div> */}
                {/* <Collapse in={openRep}> */}
                <div className='paddingBottom-12'>
                    <div className='dashboard-filter-header'> Reps </div>
                    <DropDown id={"activity-rep-drop"} className={"dashboard-filter"} setValue={(e) => setRepActivityData(e)} value={repActivityData} defaultValue={repActivityDefault} datalist={modifiedList} textField={"name"} dataItemKey={"userName"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                {/* </Collapse> */}
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-activity-collapse-status"} name={"Status"} classNames={"dash-collapse-button"} numSpaces={28} state={openStatus} setState={setOpenStatus} />
                    </div>
                    <Collapse in={openStatus}> */}
                <div className='paddingBottom-12'>
                    <div className='dashboard-filter-header'> Activity Status </div>
                    <DropDown id={"activity-status-drop"} className={"dashboard-filter"} setValue={(e) => setActivityStatusData(e)} value={activityStatusData} defaultValue={activityStatusDefault} datalist={activityStatusList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                {/* </Collapse> */}
                <div>
                    <ButtonWidgetCollapse id={"dash-activity-collapse-duration"} name={"Duration"} classNames={"dash-collapse-button"} numSpaces={24} state={openDuration} setState={setOpenDuration} />
                </div>
                <Collapse in={openDuration}>
                    <div>
                        <div >
                            <div className='dashboard-filter-header'> Duration </div>
                            <DropDown id={"activity-duration-drop"} className={"dashboard-filter"} setValue={(e) => setDurationData(e)} value={durationData} defaultValue={durationDataDefault} datalist={durationDataList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>

                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Start Date </div>
                            <DatePickerWidget id={"activity-start-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={startDate} setValue={(e) => setStartDate(e)} />
                        </div>

                        <div className="paddingTop-12 ">
                            <div className='dashboard-filter-header'> End Date </div>
                            <DatePickerWidget id={"activity-end-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={endDate} setValue={(e) => setEndDate(e)} />
                        </div>
                    </div>
                </Collapse>
                <ButtonWidget id='activity-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isFetchActivityAnalysisList} isFetching={true} />
                <ButtonWidget id='activity-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
            </form>
        </>
    );
}

export default DashBoardActivityFilter;