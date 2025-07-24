import { useDispatch, useSelector } from 'react-redux';
import { RootState, setActivityPlannerStatus, setActivityPlannerTerritory, setActivityPlannerType, setIsFetchActivityPlanner, setTriggerActivityPlannerFormSubmit } from '@peerless-cms/store';
import { useEffect } from 'react';
import { DropDown, FilterNonButton } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features';

const dropDownDataStatus = [
    { text: "All", value: "", id: 1 },
    { text: "To be Actioned", value: "ACTN", id: 2 },
    { text: "Completed", value: "COMP", id: 3 },
];

const dropDownDataTerritory = [
    { text: "All", value: "- All -", id: 1 },
    { text: "NSW", value: "NSW", id: 2 },
    { text: "NZ", value: "NZ", id: 3 },
];

const dropDownDataType = [
    { text: "All", value: "All", id: 1 },
    { text: "Meeting", value: "Meeting", id: 2 },
    { text: "Office/Admin", value: "Office/Admin", id: 3 },
    { text: "Phone Call", value: "Phone Call", id: 4 },
    { text: "Sample follow up call", value: "Sample follow up call", id: 5 },
];

export interface ActivityPlannerFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function ActivityPlannerFilter(props: ActivityPlannerFilterProps) {
    const dispatch = useDispatch();
    const { activityPlannerStatus, activityPlannerTerritory, isFormSubmit, activityPlannerType } = useSelector((state: RootState) => state.activityPlanner);

    const onFilterClick = async () => {
        dispatch(setIsFetchActivityPlanner(true));
    };

    const clearFilters = () => {
        dispatch(setActivityPlannerStatus(dropDownDataStatus[0]));
        dispatch(setActivityPlannerType(dropDownDataType[0]));
        dispatch(setActivityPlannerTerritory(dropDownDataTerritory[0]));
    }

    useEffect(() => {
        dispatch(setActivityPlannerStatus(dropDownDataStatus[0]));
        dispatch(setActivityPlannerType(dropDownDataType[0]));
        dispatch(setActivityPlannerTerritory(dropDownDataTerritory[0]));
    }, []);

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({
        isFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerActivityPlannerFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [activityPlannerStatus, activityPlannerTerritory, activityPlannerType]
    });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Status'>
                                <DropDown
                                    id={"activity-planner-status-drop"}
                                    className={"administrator-filter filter-form-filter"}
                                    setValue={(e) => dispatch(setActivityPlannerStatus(e))}
                                    value={activityPlannerStatus}
                                    datalist={dropDownDataStatus}
                                    textField={"text"}
                                    dataItemKey={"value"}
                                    fillMode={"solid"}
                                    size={"small"}
                                    popupSettings={popUpSettings}
                                    defaultValue={dropDownDataStatus[0]}
                                />
                            </FilterFormGroup>

                        </div>

                        <div>
                            <FilterFormGroup label='Territory'>
                                <DropDown
                                    id={"activity-planner-territory-drop"}
                                    className={"administrator-filter filter-form-filter"}
                                    setValue={(e) => dispatch(setActivityPlannerTerritory(e))}
                                    value={activityPlannerTerritory}
                                    datalist={dropDownDataTerritory}
                                    textField={"text"}
                                    dataItemKey={"value"}
                                    fillMode={"solid"}
                                    size={"small"}
                                    popupSettings={popUpSettings}
                                    defaultValue={dropDownDataTerritory[0]}
                                />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Activity Type'>
                                <DropDown
                                    id={"activity-Type-drop"}
                                    className={"administrator-filter filter-form-filter"}
                                    setValue={(e) => dispatch(setActivityPlannerType(e))}
                                    value={activityPlannerType}
                                    datalist={dropDownDataType}
                                    textField={"text"}
                                    dataItemKey={"value"}
                                    fillMode={"solid"}
                                    size={"small"}
                                    popupSettings={popUpSettings}
                                    defaultValue={dropDownDataType[0]}
                                />
                            </FilterFormGroup>
                        </div>

                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default ActivityPlannerFilter;
