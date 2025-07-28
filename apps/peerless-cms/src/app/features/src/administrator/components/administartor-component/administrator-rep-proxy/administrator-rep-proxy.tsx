import { useState } from 'react';
import { useSelector } from 'react-redux';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import { ButtonWidget } from '@peerless/controls';
import { InsertRepProxy } from '@peerless/queries';
import { RootState } from '@peerless-cms/store';
import AdministratorRepProxyCheckList from './administrator-rep-proxy-check-list/administrator-rep-proxy-check-list';
import { InsertRepProxyParameters } from '@peerless/models';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { AdministratorRepProxyFilter } from './administrator-rep-proxy-filter'
import { toast } from 'sonner'

export function AdministratorRepProxy() {

  const { administratorRepProxy, administratorRepProxyList } = useSelector((state: RootState) => state.administrator);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { insertRepProxyMutate } = InsertRepProxy();

  const payload: InsertRepProxyParameters = {
    repCode: administratorRepProxy.value,
    repMarkets: administratorRepProxyList
  }

  const repProxyMutateFunction = () => {
    setIsLoading(true);
    insertRepProxyMutate(payload, {
      onSuccess: () => {
        toast.success('Rep Proxy saved successfully');
        setIsLoading(false);
      },
      onError: (error) => {
        toast.error('Rep Proxy failed to save');
        setIsLoading(false);
        console.error(error.message);
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
    </div>
  );

  const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main} footer={footer}></SectionMainBase>;

  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default AdministratorRepProxy;
