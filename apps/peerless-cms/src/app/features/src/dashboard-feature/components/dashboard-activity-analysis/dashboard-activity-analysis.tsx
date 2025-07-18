import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FeaturesBase from "../../../lib/features-base";
import ActivityAnalysisList from "./dashboard-activity-list/dashboard-activity-list";
import { HeaderFilterContainer, InfoBox } from "@peerless-cms/features-common-components";
import { RootState, setSelectedArea, setTriggerActivityAnalysisFormSubmit } from "@peerless-cms/store";
import { getDate } from "@peerless/common";
import { DashBoardActivityFilter } from './dashboard-activity-filter'

/**
 * Component that displays the activity analysis information.
 * 
 * This component uses Redux to dispatch actions and select state. It displays a message
 * prompting the user to select an activity if no activity analysis is selected. If an 
 * activity analysis is selected, it displays the details of the selected activity in an 
 * InfoBox component.
 * 
 * @returns {JSX.Element} The rendered component.
 */

const articleFn = () => {
  const dispatch = useDispatch();
  const { selectedActivityAnalysis } = useSelector((state: RootState) => state.dashboardActivityAnalysis);

  useEffect(() => {
    dispatch(setSelectedArea('activity-analysis'));
  }, []);

  if (!selectedActivityAnalysis || Object.keys(selectedActivityAnalysis).length === 0) {
    return (
      <div className="customer-details-card">
        <div className="icon-container">
          <FontAwesomeIcon icon={fa2.faCopy} className="sliders-icon" />
        </div>
        <h2>Activity Analysis</h2>
        <p>Select a Activity to see the details</p>
      </div>
    );
  }

  let selectedRowList = [
    { label: "Activity Type :", text: selectedActivityAnalysis.activityType },
    { label: "Sample Issued :", text: selectedActivityAnalysis.sampleIssued },
    { label: "Name :", text: selectedActivityAnalysis.leadName },
    { label: "Lead Stage :", text: selectedActivityAnalysis.leadStage },
    { label: "Subject :", text: selectedActivityAnalysis.subject },
    { label: "Comments :", text: selectedActivityAnalysis.comments },
    { label: "Start Date :", text: getDate(selectedActivityAnalysis.startDate) },
    { label: "End Date :", text: getDate(selectedActivityAnalysis.endDate) },
    { label: "Rep :", text: selectedActivityAnalysis.assignedToName },
    { label: "Sample Feedback :", text: selectedActivityAnalysis.sampleFedbackDescription },
    { label: "Turn In Order :", text: selectedActivityAnalysis.turnInOrder },
    { label: "Quantity :", text: selectedActivityAnalysis.quantity },
    { label: "Distributor :", text: selectedActivityAnalysis.enduserCustDistributor }
  ]

  return (
    <InfoBox title="Activity Analysis Info" contentList={selectedRowList} cssClass='border-top-none border-bottom-none border-left-none border-right-none' labelWidthClass='w-140 flex-104' />
  )
}

export function DashboardActivityAnalysis() {
  const dispatch = useDispatch();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const { isFetchActivityAnalysisList } = useSelector((state: RootState) => state.dashboardActivityAnalysis);

  const handleExternalSubmit = () => {
    dispatch(setTriggerActivityAnalysisFormSubmit(true));
  };

  const header = (
    <>
      <HeaderFilterContainer title="Activity Analysis" icon={fa2.faCopy} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
        <DashBoardActivityFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
      )}
        onFilterClick={handleExternalSubmit}
        isFetching={isFetchActivityAnalysisList}
        setIsFilterExpanded={setIsFilterExpanded}
      />
    </>
  )

  const main = (
    <div className='content'>
      <ActivityAnalysisList heightOffset={isFilterExpanded ? 210 : 18} />
    </div>
  );

  const article = (
    articleFn()
  )
  const maincon = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={maincon} article={article} cssClass='remove-margin-top-article' />
}

export default DashboardActivityAnalysis;
