import * as fa2 from '@fortawesome/free-solid-svg-icons';
import ContainerHeader from '../../../../dashboard-feature/components/container-header/container-header';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import { ButtonWidget, CustomToastMessage } from '@peerless/controls';
import './administrator-settings.css';
import { SaveResponseTime } from '@peerless/queries';
import { useSelector } from 'react-redux';
import { RootState } from '@peerless-cms/store';
import AdministratorSettingsList from './administrator-settings-list/administrator-settings-list';
import { SaveResponseTimeParameters } from '@peerless/models';
import { useState } from 'react';
import { toast } from 'sonner';

export function AdministratorSettings() {

  const { responseTimeHrs } = useSelector((state: RootState) => state.administratorSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { saveResponseTimeMutate } = SaveResponseTime();

  const payload: SaveResponseTimeParameters = {
    time: responseTimeHrs.value
  }

  const saveResponseTimeMutateFunction = () => {
    setIsLoading(true);
    saveResponseTimeMutate(payload, {
      onSuccess: () => {
        toast.success(' Response Time saved successfully');
        setIsLoading(false);
      },
      onError: (error) => {
        console.error(error.message);
        toast.error('Response Time failed to save');
        setIsLoading(false);
      }
    }
    )
  }

  const header = (
    <>
      <ContainerHeader icon={fa2.faCog} name={"Settings"} />
    </>
  )

  const main = (
    <div className='content'>
      <AdministratorSettingsList />
    </div>
  );

  const footer = (
    <div className='form-button-container footer-content'>
      <span className='footer-span-content'>! Make sure you have verified all your changes before save</span>
      <ButtonWidget
        id='administrator-rep-market-save-button'
        classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
        Function={() => saveResponseTimeMutateFunction()}
        name={isLoading ? 'Saving...' : 'Save'}
      />
    </div>
  );

  const mainContent = <SectionMainBase header={header} main={main} footer={footer}></SectionMainBase>;

  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default AdministratorSettings;
