import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsDashboardOpportunityAnalysisFetch, setOpportunityStage, setSelectedOpportunityAnalysis, setSelectedOriginatorOpportunityAnalysis } from '@peerless-cms/store';
import { useState } from 'react';
import { ButtonWidget, ButtonWidgetCollapse, DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

const stageList = [
    { id: 1, text: 'All', value: 0 },
    { id: 2, text: 'New', value: 1 },
    { id: 3, text: 'Validation', value: 2 },
    { id: 4, text: 'Conversion', value: 7 },
    { id: 5, text: 'Won', value: 8 },
    { id: 6, text: 'Lost', value: 9 },
];

export interface DashBoardOpportunityFilterProps { }

export function DashBoardOpportunityFilter(props: DashBoardOpportunityFilterProps) {
    const dispatch = useDispatch();
    const [openStage, setOpenStage] = useState(false);
    const { selectedOriginator } = useSelector((state: RootState) => state.header);
    const { isDashboardOpportunityAnalysisFetch } = useSelector((state: RootState) => state.dashboardOpportunityAnalysis);
    const [opportunityStageData, setOpportunityStageData] = useState(stageList[1]);

    const onFilterClick = () => {
        dispatch(setSelectedOriginatorOpportunityAnalysis(selectedOriginator));
        dispatch(setOpportunityStage(opportunityStageData));
        dispatch(setIsDashboardOpportunityAnalysisFetch(true));
        dispatch(setSelectedOpportunityAnalysis({}));
    };

    const clearFilters = () => {
        setOpportunityStageData(stageList[1]);
    }

    const opportunityStageDataDefault = stageList[1];

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
                    <ButtonWidgetCollapse id={"dash-collapse-stage"} name={"Stage"} classNames={"dash-collapse-button"} numSpaces={28} state={openStage} setState={setOpenStage} />
                </div>
                <Collapse in={openStage}> */}
                <div>
                    <div className='dashboard-filter-header'> Stage </div>
                    <DropDown id={"opportunity-stage-drop"} className={"dashboard-filter"} setValue={(e) => setOpportunityStageData(e)} defaultValue={opportunityStageDataDefault} value={opportunityStageData} datalist={stageList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                {/* </Collapse> */}
                <ButtonWidget id='opportunity-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isDashboardOpportunityAnalysisFetch} isFetching={true} />
            </form>
        </>
    );
}

export default DashBoardOpportunityFilter;