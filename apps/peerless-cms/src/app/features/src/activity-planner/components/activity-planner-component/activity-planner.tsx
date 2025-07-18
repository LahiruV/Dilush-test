import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stack } from 'react-bootstrap';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../lib/section-main-base';
import FeaturesBase from '../../../lib/features-base';
import ActivityPlannerSchedule from './activity-planner/activity-planner';
import { customer_color, enduser_color, lead_color, organisation_color, other_activity_color } from '@peerless-cms/theme';
import { RootState, setSelectedArea, setTriggerActivityPlannerFormSubmit } from '@peerless-cms/store';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { ActivityPlannerFilter } from './activity-planner-filter'
import { ButtonWidget } from '@peerless/controls';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ActivityPlanner() {
  const dispatch = useDispatch();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  useEffect(() => {
    dispatch(setSelectedArea('activity-planner'));
  }, []);

  const { isFetchActivityPlanner } = useSelector((state: RootState) => state.activityPlanner);

  const handleExternalSubmit = () => {
    dispatch(setTriggerActivityPlannerFormSubmit(true));
  };

  const headerInlineElements = (
    <>
      <ButtonWidget id='send-to-calender-button' name='Send to Calendar' classNames='send-button' Function={() => { }} isIcon={true} icon={<FontAwesomeIcon icon={fa2.faCalendar} />} iconCss="margin-left-2" />
      <div style={{ marginLeft: 'auto' }}>
        < Stack direction="horizontal" gap={2}  >
          <div style={{ backgroundColor: lead_color, color: 'white', textAlign: 'center', width: '75px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', fontWeight: 'lighter' }}>Lead</div>
          <div style={{ backgroundColor: enduser_color, color: 'white', textAlign: 'center', width: '75px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', fontWeight: 'lighter' }}>End User</div>
          <div style={{ backgroundColor: customer_color, color: 'white', textAlign: 'center', width: '75px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', fontWeight: 'lighter' }}>Customer</div>
          <div style={{ backgroundColor: organisation_color, color: 'white', textAlign: 'center', width: '75px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', fontWeight: 'lighter' }}>Organisation</div>
          <div style={{ backgroundColor: other_activity_color, color: 'white', textAlign: 'center', width: '75px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', fontWeight: 'lighter' }}>Other</div>
        </Stack>
      </div>
    </>
  )

  const header = (
    <HeaderFilterContainer title='Activity Planner' icon={fa2.faCalendar} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <ActivityPlannerFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )}
      onFilterClick={handleExternalSubmit}
      isFetching={isFetchActivityPlanner}
      inlineElements={headerInlineElements}
      setIsFilterExpanded={setIsFilterExpanded}
    />
  )

  const main = (
    <div className='content'>
      <ActivityPlannerSchedule
        height={isFilterExpanded ? 662 : 711}
      />
    </div>
  );

  const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;
  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />
}

export default ActivityPlanner;
