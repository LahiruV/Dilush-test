import FeaturesBase from '../../lib/features-base';
import SectionMainBase from '../../lib/section-main-base';
import { Outlet } from 'react-router-dom';
import { DashBoardAreas } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';

export const DashboardSection = () => {

  const aside = (
    <div>
      <div className='contact-type-header border-bottom'>
        <FontAwesomeIcon icon={fa.faHourglassEmpty} className='heaader-icon' /> Dashboard
      </div>
      <DashBoardAreas />
    </div>
  );

  const main = <SectionMainBase main={<Outlet />}></SectionMainBase>;

  // return <FeaturesBase aside={aside} main={main} />;
  return <FeaturesBase main={main} />;
};
