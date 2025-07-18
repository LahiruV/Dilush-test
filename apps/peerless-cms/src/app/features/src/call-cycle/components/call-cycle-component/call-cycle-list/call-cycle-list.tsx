import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import ContainerHeader from '../../../../dashboard-feature/components/container-header/container-header';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import { setSelectedArea } from '@peerless-cms/store';
import CallCycleActivityTable from './call-cycle-activity-table/call-cycle-activity-table';

export function CallCycleList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedArea('call-cycle'));
  }, []);

  const header = (
    <>
      <ContainerHeader icon={fa2.faPhone} name={`Call Cycle`} />
    </>
  )
  const main = (
    <div className='content'>
      <CallCycleActivityTable />
    </div>
  );

  const mainContent = (
    <SectionMainBase header={header} main={main}></SectionMainBase>
  );

  return (
    <FeaturesBase main={mainContent} cssClass="remove-margin-top-article" />
  );
}

export default CallCycleList;
