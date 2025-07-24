import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsDashboardOpportunityAnalysisFetch, setIsDashboardOpportunityAnalysisFetchHeader, setOpportunityStage, setSelectedOpportunityAnalysis, setSelectedOriginatorOpportunityAnalysis, setTriggerOpportunityAnalysisFormSubmit } from '@peerless-cms/store';
import { useEffect, useState } from 'react';
import { ButtonWidget, DropDown, FilterNonButton } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features'

const stageList = [
    { id: 1, text: 'All', value: 0 },
    { id: 2, text: 'New', value: 1 },
    { id: 3, text: 'Validation', value: 2 },
    { id: 4, text: 'Conversion', value: 7 },
    { id: 5, text: 'Won', value: 8 },
    { id: 6, text: 'Lost', value: 9 },
];

export interface DashBoardOpportunityFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function DashBoardOpportunityFilter(props: DashBoardOpportunityFilterProps) {
    const dispatch = useDispatch();
    const { selectedOriginator } = useSelector((state: RootState) => state.header);
    const { opportunityStage, isFormSubmit } = useSelector((state: RootState) => state.dashboardOpportunityAnalysis);

    useEffect(() => {
        return () => {
            clearFilters();
        }
    }, [])

    const onFilterClick = () => {
        dispatch(setSelectedOriginatorOpportunityAnalysis(selectedOriginator));
        dispatch(setIsDashboardOpportunityAnalysisFetch(true));
        dispatch(setIsDashboardOpportunityAnalysisFetchHeader(true));
        dispatch(setSelectedOpportunityAnalysis({}));
    };

    const clearFilters = () => {
        dispatch(setOpportunityStage(stageList[1]));
    }

    const opportunityStageDataDefault = stageList[1];

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({
        isFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerOpportunityAnalysisFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [opportunityStage]
    });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Stage' isShortLabel>
                                <DropDown id={"opportunity-stage-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOpportunityStage(e))} defaultValue={opportunityStageDataDefault} value={opportunityStage} datalist={stageList} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashBoardOpportunityFilter;