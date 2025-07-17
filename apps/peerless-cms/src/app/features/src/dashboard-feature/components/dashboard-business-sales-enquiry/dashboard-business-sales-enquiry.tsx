import SectionMainBase from "../../../lib/section-main-base";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import FeaturesBase from "../../../lib/features-base";
import DashboardEndUserTransferLogList from "./dashboard-business-sales-enquiry-list/dashboard-business-sales-enquiry-list";
import { RootState, setTriggerBusinessSalesEnqFormSubmit } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import DashBoardBusinessSalesEnquiryTable from "./dashboard-business-sales-enquiry-list/dashboard-business-sales-enquiry-table";
import { DashBoardBusinessSalesEnquiryFilter } from './dashboard-business-sales-enquiry-filter'
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { useState } from "react";

export function DashBoardBusinessSalesEnquiry() {
  const dispatch = useDispatch();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const { businessSalesEnqGroupBy, isBusinessSalesEnqListFetch } = useSelector((state: RootState) => state.dashBoardBusinessSalesEnquiry);

  const handleExternalSubmit = () => {
    dispatch(setTriggerBusinessSalesEnqFormSubmit(true));
  };

  const header = (
    <HeaderFilterContainer isFiltersOpened={true} title={"Business Sales Enquiry - " + businessSalesEnqGroupBy.text} icon={fa2.faBusinessTime} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <DashBoardBusinessSalesEnquiryFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isBusinessSalesEnqListFetch}
      setIsFilterExpanded={setIsFilterExpanded}
    />
  )

  const main = (
    <div className='content'>
      <DashBoardBusinessSalesEnquiryTable heightOffset={isFilterExpanded ? 510 : 570} />
    </div>
  );

  const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />
}

export default DashBoardBusinessSalesEnquiry;
