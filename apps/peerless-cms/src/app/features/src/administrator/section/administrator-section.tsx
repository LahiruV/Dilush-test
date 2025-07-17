import FeaturesBase from '../../lib/features-base';
import SectionMainBase from '../../lib/section-main-base';
import { Outlet } from 'react-router-dom';
import { AdministratorAreas } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';


export const AdministratorSection = () => {

  const side = (
    <div>
      <div className='contact-type-header border-bottom'>
        <FontAwesomeIcon icon={fa.faUser} className='heaader-icon' /> Administrator
      </div>
      <AdministratorAreas />
    </div>
  );

  const main = <SectionMainBase main={<Outlet />}></SectionMainBase>;

  // return <FeaturesBase aside={side} main={main} />;
  return <FeaturesBase main={main} />;
};
