import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import FeaturesBase from "../../../lib/features-base";
import DashboardOpportunityAnalysisHeader from "./dashboard-opportunity-analysis-header/dashboard-opportunity-analysis-header";
import OpportunityAnalysisList from "./dashboard-opportunity-analysis-list/dashboard-opportunity-analysis-list";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setTriggerOpportunityAnalysisFormSubmit } from "@peerless-cms/store";
import { HeaderFilterContainer, InfoBox } from "@peerless-cms/features-common-components";
import { getDate } from "@peerless/common";
import { DashBoardOpportunityFilter } from './dashboard-opportunity-filter'

export function DashboardOpportunityAnalysis() {
  const dispatch = useDispatch();

  const { selectedOpportunityAnalysis, isDashboardOpportunityAnalysisFetch } = useSelector((state: RootState) => state.dashboardOpportunityAnalysis);

  const articleFn = () => {
    if (!selectedOpportunityAnalysis || Object.keys(selectedOpportunityAnalysis).length === 0) {
      return (
        <div className="customer-details-card">
          <div className="icon-container">
            <FontAwesomeIcon icon={fa2.faAreaChart} className="sliders-icon" />
          </div>
          <h2>Opportunity Analysis</h2>
          <p>Select a Opportunity to see the details</p>
        </div>
      );
    }

    let selectedRowList = [
      { label: "Name :", text: selectedOpportunityAnalysis.leadName },
      { label: "Rep :", text: selectedOpportunityAnalysis.originator },
      { label: "% :", text: selectedOpportunityAnalysis.probability },
      { label: "Amount :", text: selectedOpportunityAnalysis.amount },
      { label: "Units :", text: selectedOpportunityAnalysis.units },
      { label: "Tons :", text: selectedOpportunityAnalysis.tonnes },
      { label: "Lead Stage :", text: selectedOpportunityAnalysis.leadStage },
      { label: "Close Date :", text: getDate(new Date(selectedOpportunityAnalysis.closeDate)) },
      { label: "Opportunity :", text: selectedOpportunityAnalysis.name },
      { label: "Description :", text: selectedOpportunityAnalysis.description },
      { label: "Business :", text: selectedOpportunityAnalysis.business },
      { label: "Industry :", text: selectedOpportunityAnalysis.industryDescription },
      { label: "Address :", text: selectedOpportunityAnalysis.address },
      { label: "City :", text: selectedOpportunityAnalysis.city },
      { label: "State :", text: selectedOpportunityAnalysis.state },
      { label: "PostCode :", text: selectedOpportunityAnalysis.postCode }
    ]

    return (
      <InfoBox title="Opportunity Analysis Info" contentList={selectedRowList} cssClass='border-top-none border-bottom-none border-left-none border-right-none' labelWidthClass='w-114' />
    )
  }

  const handleExternalSubmit = () => {
    dispatch(setTriggerOpportunityAnalysisFormSubmit(true));
  };

  const header = (
    <HeaderFilterContainer title="Opportunity Analysis" icon={fa2.faAreaChart} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <DashBoardOpportunityFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isDashboardOpportunityAnalysisFetch}
      clearBtnText="Clear Filter"
    />
  )

  const main = (
    <div className='content'>
      <div>
        <DashboardOpportunityAnalysisHeader />
      </div>
      <div>
        <OpportunityAnalysisList />
      </div>
    </div>
  );

  const article = (
    articleFn()
  )
  const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} article={article} cssClass='remove-margin-top-article' />
}

export default DashboardOpportunityAnalysis;
