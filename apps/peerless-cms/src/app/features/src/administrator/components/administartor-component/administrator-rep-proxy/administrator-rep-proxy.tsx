import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import { ButtonWidget, CustomToastMessage } from '@peerless/controls';
import { InsertRepProxy } from '@peerless/queries';
import { RootState } from '@peerless-cms/store';
import AdministratorRepProxyCheckList from './administrator-rep-proxy-check-list/administrator-rep-proxy-check-list';
import { InsertRepProxyParameters } from '@peerless/models';
import { randomKeyFunction } from '@peerless/common';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { AdministratorRepProxyFilter } from './administrator-rep-proxy-filter'

export function AdministratorRepProxy() {

  const { administratorRepProxy, administratorRepProxyList } = useSelector((state: RootState) => state.administrator);
  const [status, setStatus] = useState<string>('');
  const [labelText, setLabelText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [triggerKey, setTriggerKey] = useState(0);
  const [open, setOpen] = useState(false);

  const { insertRepProxyMutate } = InsertRepProxy();

  const payload: InsertRepProxyParameters = {
    repCode: administratorRepProxy.value,
    repMarkets: administratorRepProxyList
  }

  const repProxyMutateFunction = () => {
    setIsLoading(true);
    insertRepProxyMutate(payload, {
      onSuccess: () => {
        setStatus('success-notification-color');
        setLabelText('Save Successfully');
        setTriggerKey((prevKey) => prevKey + 1);
        setIsLoading(false);
      },
      onError: () => {
        setStatus('error-notification-color');
        setLabelText('Save Not Successfully');
        setTriggerKey((prevKey) => prevKey + 1);
        setIsLoading(false);
      }
    }
    )
  }

  const header = (
    <HeaderFilterContainer title='Rep Proxy' icon={fa2.faTag} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <AdministratorRepProxyFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )} />
  )

  const main = (
    <div className='content'>
      <AdministratorRepProxyCheckList />
    </div>
  );

  const footer = (
    <div className='form-button-container footer-content'>
      <span className='footer-span-content'>! Make sure you have verified all your changes before save</span>
      <ButtonWidget
        id='administrator-rep-market-save-button'
        classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
        Function={() => repProxyMutateFunction()}
        name={isLoading ? 'Saving...' : 'Save'}
      />
      <CustomToastMessage status={status || ''} labelText={labelText} state={open} setState={setOpen} triggerKey={triggerKey} />
    </div>
  );

  const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main} footer={footer}></SectionMainBase>;

  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default AdministratorRepProxy;
