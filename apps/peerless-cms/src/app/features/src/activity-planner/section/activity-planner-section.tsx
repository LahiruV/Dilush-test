import FeaturesBase from '../../lib/features-base';
import SectionMainBase from '../../lib/section-main-base';
import { Outlet } from 'react-router-dom';
import ActivityPlannerAreas from '../components/activity-planner-areas/activity-planner-areas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa2 from '@fortawesome/free-solid-svg-icons';

export const ActivityPlannerSection = () => {

  const aside = (
    <div>
      <div className='contact-type-header border-bottom'>
        <FontAwesomeIcon icon={fa2.faCalendar} className='heaader-icon' /> Activity Planner
      </div>
      <ActivityPlannerAreas />
    </div>
  );

  const main = <SectionMainBase main={<Outlet />}></SectionMainBase>;

  return <FeaturesBase main={main} />;
  // return <FeaturesBase aside={aside} main={main} />;
};
