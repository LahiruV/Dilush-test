import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import SalesEnquiryCustomerPriceListTable from './sales-enquiry-customer-pricelist-table/sales-enquiry-customer-pricelist-table';
import { RootState, setSelectedArea, setTriggerCustomerPriceListFiltersFormSubmit } from '@peerless-cms/store';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { SalesEnquiryCustomerPriceListFilter } from './sales-enquiry-customer-pricelist-filters'

export function SalesEnquiryCustomerPriceList() {
  const dispatch = useDispatch();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  useEffect(() => {
    dispatch(setSelectedArea('sales-enquiry-customer-pricelist'));
  }, []);

  const { isFetchingCustomerPriceList } = useSelector((state: RootState) => state.salesEnquiryCustomerPriceList);

  const handleExternalSubmit = () => {
    dispatch(setTriggerCustomerPriceListFiltersFormSubmit(true));
  };

  const header = (
    <>
      <HeaderFilterContainer title='Customer Price List' icon={fa2.faTag}
        renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
          <SalesEnquiryCustomerPriceListFilter
            isFiltersOpen={isFiltersOpen}
            isClearFilters={isClearFilters}
            setIsActiveFilters={setIsActiveFilters}
          />
        )}
        onFilterClick={handleExternalSubmit}
        isFetching={isFetchingCustomerPriceList}
        setIsFilterExpanded={setIsFilterExpanded}
      />
    </>
  );
  const main = (
    <div className="content">
      <SalesEnquiryCustomerPriceListTable
        heightOffset={isFilterExpanded ? 100 : 0}
      />
    </div>
  );

  const mainContent = (
    <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>
  );

  return (
    <FeaturesBase main={mainContent} cssClass="remove-margin-top-article" />
  );
}

export default SalesEnquiryCustomerPriceList;
