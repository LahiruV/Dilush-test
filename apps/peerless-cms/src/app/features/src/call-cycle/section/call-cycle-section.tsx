import FeaturesBase from '../../lib/features-base';
import { CallCycleAreas, CallCycleList } from '../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';


export const CallCycleSection = () => {

    const side = (
        <div>
            <div className='contact-type-header border-bottom'>
                <FontAwesomeIcon icon={fa.faPhone} className='heaader-icon' /> Call Cycle
            </div>
            <CallCycleAreas />
        </div>
    );


    return <FeaturesBase aside={side} main={<CallCycleList />} />;
};
