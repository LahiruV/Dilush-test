import SectionMainBase from "../../../lib/section-main-base";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import FeaturesBase from "../../../lib/features-base";
import OpportunityConversionHeader from "./dashboard-oppotunity-conversion-header/dashboard-oppotunity-conversion-header";
import OpportunityConversionTopList from "./dashboard-opportunity-conversion-list/dashboard-opportunity-conversion-top-list";
import OpportunityConversionBottomList from "./dashboard-opportunity-conversion-list/dashboard-opportunity-conversion-bottom-list";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { DashBoarOpportunityConversionFilter } from './dashboard-opportunity-conversion-filter'
import { useDispatch, useSelector } from "react-redux";
import { RootState, setTriggerOpportunityConversionFormSubmit } from "@peerless-cms/store";

export function DashboardOpportunityConversion() {
  const dispatch = useDispatch();

  const { isLeaderCustomerOpportunityFetch, isLeaderCustomerOpportunityFetchCount } = useSelector((state: RootState) => state.dashBoarOpportunityConversion);

  const handleExternalSubmit = () => {
    dispatch(setTriggerOpportunityConversionFormSubmit(true));
  };

  const header = (
    <HeaderFilterContainer title="Oppotunity Conversion" icon={fa2.faCoins} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <DashBoarOpportunityConversionFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isLeaderCustomerOpportunityFetch || isLeaderCustomerOpportunityFetchCount}
    />
  )

  const main = (
    <div className='content'>
      <OpportunityConversionHeader />
      <div className="table-container-call-analysis" style={{ height: "180px" }}>
        <OpportunityConversionTopList />
      </div> <div className="table-container-call-analysis" style={{ height: "280px" }}>
        <OpportunityConversionBottomList />
      </div>
    </div>
  );

  const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />
}

export default DashboardOpportunityConversion;
