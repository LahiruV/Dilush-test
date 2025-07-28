import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import AdministratorRepMarketCheckList from './administrator-rep-market-check-list/administrator-rep-market-check-list';
import { ButtonWidget, CustomToastMessage } from '@peerless/controls';
import { InsertRepMarket } from '@peerless/queries';
import { RootState, setAdministratorSelectedArea } from '@peerless-cms/store';
import { InsertRepMarketParameters } from '@peerless/models';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { AdministratorRepMarketFilter } from './administrator-rep-market-filter'
import './administrator-rep-market.css';
import { toast } from 'sonner';

export function AdministratorRepMarket() {
  const dispatch = useDispatch();
  const { administratorRep, administratorRepMarketList } = useSelector((state: RootState) => state.administrator);
  const { insertRepMarketMutate } = InsertRepMarket();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const payload: InsertRepMarketParameters = {
    repCode: administratorRep.value,
    repMarkets: administratorRepMarketList
  }

  const repMarketMutateFunction = () => {
    setIsLoading(true);
    insertRepMarketMutate(payload, {
      onSuccess: () => {
        toast.success('Rep Market saved successfully');
        setIsLoading(false);
      },
      onError: (error) => {
        console.error(error.message);
        toast.error('Rep Market failed to save');
        setIsLoading(false);
      }
    }
    )
  }

  useEffect(() => {
    dispatch(setAdministratorSelectedArea('administrator-rep-markets'));
  }, []);

  const header = (
    <HeaderFilterContainer title='Rep Markets' icon={fa2.faTag} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <AdministratorRepMarketFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
    )}
    />
  )

  const main = (
    <div className='content'>
      <AdministratorRepMarketCheckList />
    </div>
  );


  const footer = (
    <div className='form-button-container footer-content'>
      <span className='footer-span-content'>! Make sure you have verified all your changes before save</span>
      <ButtonWidget
        id='administrator-rep-market-save-button'
        classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
        Function={() => repMarketMutateFunction()}
        name={isLoading ? 'Saving...' : 'Save'}
      />
    </div>
  );

  const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main} footer={footer}></SectionMainBase>;

  return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default AdministratorRepMarket;
