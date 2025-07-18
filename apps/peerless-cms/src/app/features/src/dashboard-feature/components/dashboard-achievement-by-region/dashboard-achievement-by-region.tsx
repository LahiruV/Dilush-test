import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { Card } from '@progress/kendo-react-layout';
import SectionMainBase from "../../../lib/section-main-base";
import FeaturesBase from "../../../lib/features-base";
import AchievementByRegionGraph from "./achievement-by-region-graph/achievement-by-region-graph";
import AchievementByRegionFilters from "./dashboard-achievement-by-region-filters/dashboard-achievement-by-region-filters";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { DashAchievementByRegionFilter } from './dashboard-achievement-by-region-filter'
import { RootState, setTriggerAcByRegFormSubmit } from "@peerless-cms/store";

export function DashboardAchievementByRegion() {
  const dispatch = useDispatch();

  const { isAcByRegFilters } = useSelector((state: RootState) => state.dashboardAchievementByRegion);

  const handleExternalSubmit = () => {
    dispatch(setTriggerAcByRegFormSubmit(true));
  };

  const header = (
    <HeaderFilterContainer title="Achievement By Region" icon={fa2.faTasks} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <DashAchievementByRegionFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isAcByRegFilters}
    />
  )

  const main = (
    <Card>
      <div className="dashboard-achievement-container">
        <div className="achievements-flex-container">
          <div className="achievement-filters">
            <AchievementByRegionFilters />
          </div>
          <div className="achievement-chart">
            <AchievementByRegionGraph />
          </div>
        </div>
      </div>
    </Card>
  );

  const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />
}

export default DashboardAchievementByRegion;
