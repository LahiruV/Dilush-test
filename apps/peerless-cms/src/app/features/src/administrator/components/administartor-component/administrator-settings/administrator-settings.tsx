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

export function AdministratorSettings() {

  const { responseTimeHrs } = useSelector((state: RootState) => state.administratorSettings);
  const [status, setStatus] = useState<string>('');
  const [labelText, setLabelText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);
  const { saveResponseTimeMutate } = SaveResponseTime();

  const payload: SaveResponseTimeParameters = {
    time: responseTimeHrs.value
  }

  const saveResponseTimeMutateFunction = () => {
    setIsLoading(true);
    saveResponseTimeMutate(payload, {
      onSuccess: () => {
        setStatus('success-notification-color');
        setLabelText('Save Successfully');
        setIsLoading(false);
        setOpen(true);
        setTriggerKey((prevKey) => prevKey + 1);
      },
      onError: () => {
        setStatus('error-notification-color');
        setLabelText('Save Not Successfully');
        setIsLoading(false);
        setOpen(true);
        setTriggerKey((prevKey) => prevKey + 1);
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
      <CustomToastMessage status={status || ''} labelText={labelText} state={open} setState={setOpen} triggerKey={triggerKey} />
    </div>
  );

  const mainContent = <SectionMainBase header={header} main={main} footer={footer}></SectionMainBase>;

  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default AdministratorSettings;
