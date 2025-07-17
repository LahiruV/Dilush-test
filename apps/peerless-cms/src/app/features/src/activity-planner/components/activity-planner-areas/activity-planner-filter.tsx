import { useDispatch, useSelector } from 'react-redux';
import { RootState, setActivityPlannerStatus, setActivityPlannerTerritory, setIsFetchActivityPlanner } from '@peerless-cms/store';
import { useEffect, useState } from 'react';
import { DropDownData } from '@peerless/models';
import { ButtonWidget, DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';

const dropDownDataStatus = [
    { text: "All", value: "", id: 1 },
    { text: "To be Actioned", value: "ACTN", id: 2 },
    { text: "Completed", value: "COMP", id: 3 },
];

const dropDownDataTerritory = [
    { text: "- All -", value: "- All -", id: 1 },
    { text: "NSW", value: "NSW", id: 2 },
    { text: "NZ", value: "NZ", id: 3 },
];

export interface ActivityPlannerFilterProps { }

export function ActivityPlannerFilter(props: ActivityPlannerFilterProps) {

    const dispatch = useDispatch();
    const { isFetchActivityPlanner } = useSelector((state: RootState) => state.activityPlanner);
    const [statusData, setStatusData] = useState<DropDownData>(dropDownDataStatus[0]);
    const [territoryData, setTerritoryData] = useState<DropDownData>(dropDownDataTerritory[1]);

    const onFilterClick = async () => {
        dispatch(setActivityPlannerStatus(statusData));
        dispatch(setActivityPlannerTerritory(territoryData));
        dispatch(setIsFetchActivityPlanner(true));
    };

    const clearFilters = () => {
        setStatusData(dropDownDataStatus[0]);
        setTerritoryData(dropDownDataTerritory[1]);
    }

    useEffect(() => {
        setStatusData(dropDownDataStatus[0]);
        setTerritoryData(dropDownDataTerritory[1]);
    }, []);

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
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Status </div>
                        <DropDown
                            id={"activity-planner-status-drop"}
                            className={"administrator-filter"}
                            setValue={(e) => setStatusData(e)}
                            value={statusData}
                            datalist={dropDownDataStatus}
                            textField={"text"}
                            dataItemKey={"value"}
                            fillMode={"outline"}
                            size={"small"}
                            popupSettings={popUpSettings}
                            defaultValue={dropDownDataStatus[0]}
                        />
                    </div>
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Territory  </div>
                    <DropDown
                        id={"activity-planner-territory-drop"}
                        className={"administrator-filter"}
                        setValue={(e) => setTerritoryData(e)}
                        value={territoryData}
                        datalist={dropDownDataTerritory}
                        textField={"text"}
                        dataItemKey={"value"}
                        fillMode={"outline"}
                        size={"small"}
                        popupSettings={popUpSettings}
                        defaultValue={dropDownDataTerritory[1]}
                    />
                </div>
                <ButtonWidget
                    id='activity-planner-filter-button'
                    classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn'
                    type='submit'
                    isDisabled={isFetchActivityPlanner}
                    isFetching={true} />
            </form >
        </>
    );
}

export default ActivityPlannerFilter;



ActivityPlannerFilter