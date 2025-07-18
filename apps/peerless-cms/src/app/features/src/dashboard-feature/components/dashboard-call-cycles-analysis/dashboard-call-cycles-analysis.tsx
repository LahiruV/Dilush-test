import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import FeaturesBase from "../../../lib/features-base";
import CallCyclesAnalysisHeader from "./dashboard-call-cycles-analysis-header/dashboard-call-cycles-analysis-header";
import CallCyclesAnalysisList from "./dashboard-call-cycles-analysis-list/dashboard-call-cycles-analysis-list";
import { ButtonWidget } from "@peerless/controls";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { DashBoardCallCyclesFilter } from './dashboard-call-cycles-analysis-filter'
import { RootState, setTriggerCallCycleAnalysisFormSubmit } from "@peerless-cms/store";

export function DashboardCallCyclesAnalysis() {
  const [isExporting, setIsExporting] = useState(false);
  const dispatch = useDispatch();

  const { isCallCyclesAnalysisListFetch } = useSelector((state: RootState) => state.dashboardCallCyclesAnalysis);

  const handleExternalSubmit = () => {
    dispatch(setTriggerCallCycleAnalysisFormSubmit(true));
  };

  const handleExportClick = () => {
    setIsExporting(true);
  }

  const header = (
    <HeaderFilterContainer title="Call Cycle Analysis" icon={fa2.faPhone} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <DashBoardCallCyclesFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} isExporting={isExporting} setIsExporting={setIsExporting} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isCallCyclesAnalysisListFetch}
      inlineElements={
        <ButtonWidget id='call-cycle-excel-button' classNames='excel-export-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
      }
    />
  )

  const main = (
    <div className='content'>
      <CallCyclesAnalysisHeader />
      <div className="table-container-call-analysis">
        <CallCyclesAnalysisList />
      </div>
    </div>
  );

  const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />
}

export default DashboardCallCyclesAnalysis;
