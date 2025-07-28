import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSStartDate, setSEndDate, setActivityStatus, setRepActivityList, setRepActivity, setSelectedActivityAnalysis, setIsFetchActivityAnalysisList, setTriggerActivityAnalysisFormSubmit } from '@peerless-cms/store';
import { useEffect, useRef, useState } from "react";
import { GetAllActivitiesByTypeExcel, GetChildOriginatorsList } from "@peerless/queries";
import { ActivityAnalysisParameters, DropDownData } from "@peerless/models";
import { ButtonWidget, DatePickerWidget, DropDown, FilterNonButton } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import Collapse from 'react-bootstrap/esm/Collapse';
import { useFilterForm } from '@peerless-cms/features'

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

export interface DashBoardActivityFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    isExporting?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
    setIsExporting?: (isExporting: boolean) => void;
}

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
    const [durationData, setDurationData] = useState<DropDownData>(durationDataList[2]);

    const { sStartDate, sEndDate, activityStatus, repActivityList, repActivity, searchByActivity, isFetchActivityAnalysisList, isFormSubmit } = useSelector((state: RootState) => state.dashboardActivityAnalysis);
    const { loggedUser, isManagerMode, selectedOriginator } = useSelector((state: RootState) => state.header);
    const modifiedList = [{ name: "Select All", userName: "All" }, { ...loggedUser }, ...repActivityList];
    const { responseData: childOriginatorsListData } = GetChildOriginatorsList({
        originator: loggedUser.userName,
        childOriginators: `(originator = '${loggedUser.userName}')`,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        managerMode: !isManagerMode
    }, true);

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

    GetAllActivitiesByTypeExcel({ ...payload, rowCount: 999999, startIndex: 0 }, props.isExporting ?? false, props.setIsExporting, true);

    const onFilterClick = async () => {
        dispatch(setSelectedActivityAnalysis({}));
        dispatch(setIsFetchActivityAnalysisList(true));
    };

    const clearFilters = () => {
        setDurationData(durationDataList[2])
        dispatch(setActivityStatus(activityStatusList[0]));
        dispatch(setRepActivity(loggedUser));
        dispatch(setSStartDate(new Date().toISOString()));
        dispatch(setSEndDate(new Date().toISOString()));
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
            dispatch(setSStartDate(startDate.toISOString()));
            dispatch(setSEndDate(endDate.toISOString()));
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
            dispatch(setRepActivity(selectedOriginator));
        }
    }, [selectedOriginator]);

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({
        isFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerActivityAnalysisFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [repActivity, activityStatus, sStartDate, sEndDate, durationData]
    });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Reps'>
                                <DropDown id={"activity-rep-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setRepActivity(e))} value={repActivity} defaultValue={repActivityDefault} datalist={modifiedList} textField={"name"} dataItemKey={"userName"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>

                            <FilterFormGroup label='Activity Status'>
                                <DropDown id={"activity-status-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setActivityStatus(e))} value={activityStatus} defaultValue={activityStatusDefault} datalist={activityStatusList} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Start Date'>
                                <DatePickerWidget id={"activity-start-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={sStartDate} setValue={(e) => dispatch(setSStartDate(e))} />
                            </FilterFormGroup>
                            <FilterFormGroup label='End Date'>
                                <DatePickerWidget id={"activity-end-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={sEndDate} setValue={(e) => dispatch(setSEndDate(e))} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Duration'>
                                <DropDown id={"activity-duration-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => setDurationData(e)} value={durationData} defaultValue={durationDataDefault} datalist={durationDataList} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashBoardActivityFilter;