import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import FeaturesBase from "../../../lib/features-base";
import DashboardEndUserTransferLogList from "./dashboard-enduser-transferlogs-list/dashboard-enduser-transferlog-list";
import { ButtonWidget } from "@peerless/controls";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { DashBoardEndUserTransferLogsFilter } from './dashboard-enduser-transferlogs-filter'
import { RootState, setTriggerEndUserTransferLogsFormSubmit } from "@peerless-cms/store";

export function DashboardEndUserTransferLog() {
  const [isExporting, setIsExporting] = useState(false);
  const dispatch = useDispatch();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const { isDashEndUserTransferLogsListFetch } = useSelector((state: RootState) => state.dashboardEndUserTransferLogs);

  const handleExternalSubmit = () => {
    dispatch(setTriggerEndUserTransferLogsFormSubmit(true));
  };

  const handleExportClick = () => {
    setIsExporting(true);
  }

  const header = (
    <HeaderFilterContainer title="End User Transfer Logs" icon={fa2.faFileAlt} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <DashBoardEndUserTransferLogsFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} isExporting={isExporting} setIsExporting={setIsExporting} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isDashEndUserTransferLogsListFetch}
      inlineElements={
        <ButtonWidget id='endUser-excel-button' classNames='excel-export-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
      }
      setIsFilterExpanded={setIsFilterExpanded}
    />
  )

  const main = (
    <div className='content'>
      <DashboardEndUserTransferLogList heightOffset={isFilterExpanded ? 72 : 12} />
    </div>
  );

  const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />
}

export default DashboardEndUserTransferLog;
