import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import SalesEnquiryOutstandingOrdersListTable from './sales-enquiry-outstanding-orders-table/sales-enquiry-outstanding-orders-table';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { SalesEnquiryOutstandingOrdersFilter } from './sales-enquiry-outstanding-orders-filter'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setTriggerOutstandingOrdersFiltersFormSubmit } from '@peerless-cms/store';
import { useState } from 'react';
import { Stack } from 'react-bootstrap';

export function SalesEnquiryOutstandingOrders() {
    const dispatch = useDispatch();
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const { isFetchingOutstandingOrdersList } = useSelector((state: RootState) => ({
        isFetchingOutstandingOrdersList: state.salesEnquiryOutstandingOrders.isFetchingOutstandingOrdersList
    }))

    const headerBottomElements = (
        <div style={{ backgroundColor: '#fff' }}>
            < Stack direction="horizontal" gap={2}  >
                <div style={{ backgroundColor: '#FF9898', color: 'black', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px', }}>Back Order</div>
                <div style={{ backgroundColor: '#FFB854', color: 'black', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Not Printed</div>
                <div style={{ backgroundColor: '#fc1414bd', color: 'black', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Notes Overdue</div>
                <div style={{ backgroundColor: '#9898FF', color: 'black', textAlign: 'center', width: '95px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Plist On Hold</div>
                <div style={{ backgroundColor: '#c91818b6', color: 'black', textAlign: 'center', width: '80px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Promised</div>
                <div style={{ backgroundColor: '#98FF98', color: 'black', textAlign: 'center', width: '170px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Un-Acknowledged EDI Orders</div>
                <div style={{ backgroundColor: '#FFFF00', color: 'black', textAlign: 'center', width: '150px', paddingTop: 5, paddingBottom: 5, fontSize: '12px', borderRadius: '8.5px' }}>Non-02, 05 Credit Status</div>
            </ Stack>
        </div>
    )

    const handleExternalSubmit = () => {
        dispatch(setTriggerOutstandingOrdersFiltersFormSubmit(true));
    };

    const header = (
        <HeaderFilterContainer title='Outstanding Orders' icon={fa2.faTag} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <SalesEnquiryOutstandingOrdersFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isFetchingOutstandingOrdersList}
            setIsFilterExpanded={setIsFilterExpanded}
            bottomBlockElements={headerBottomElements}
        />
    )
    const main = (
        <div className='content'>
            <SalesEnquiryOutstandingOrdersListTable heightOffset={isFilterExpanded ? 225 : 50} />
        </div>
    );

    const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;

    return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default SalesEnquiryOutstandingOrders;