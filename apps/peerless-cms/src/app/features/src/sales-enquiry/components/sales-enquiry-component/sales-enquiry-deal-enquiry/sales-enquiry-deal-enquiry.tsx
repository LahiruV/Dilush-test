import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import SalesEnquiryDealEnquiryListTable from './sales-enquiry-deal-enquiry-table/sales-enquiry-deal-enquiry-table';
import './sales-enquiry-deal-enquiry.css';
import { HeaderFilterContainer } from '@peerless-cms/features-common-components';
import { SalesEnquiryDealEnquiryFilter } from './sales-enquiry-deal-enquiry-filter'
import { RootState, setTriggerDealEnquiryFiltersFormSubmit } from "@peerless-cms/store";
import { useState } from "react";

export function SalesEnquiryDealEnquiry() {
    const dispatch = useDispatch();
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);
    const { isFetchingDealEnquiryList } = useSelector((state: RootState) => ({
        isFetchingDealEnquiryList: state.salesEnquiryDealEnquiry.isFetchingDealEnquiryList,
    }));

    const handleExternalSubmit = () => {
        dispatch(setTriggerDealEnquiryFiltersFormSubmit(true));
    };

    const headerInlineElements = (
        <div className="pad-right-10" style={{ marginLeft: 'auto' }}>
            <div className="stock-enq-legends">
                <div className=" rounded-lg bg-white">
                    <div className="flex gap-4 mt-2 text-sm">
                        <span className="flex items-center gap-2"><span className="legend-short"></span> Overlapping Deals</span>
                        <span className="flex items-center gap-2"><span className="legend-available"></span> Overriding Deals</span>
                        <span className="flex items-center gap-2"><span className="legend-critical"></span> Future Deals</span>
                    </div>
                </div>
            </div>
        </div>
    )

    const header = (
        <HeaderFilterContainer title='Deal Enquiry' icon={fa2.faFileInvoiceDollar} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <SalesEnquiryDealEnquiryFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isFetchingDealEnquiryList}
            inlineElements={headerInlineElements}
            setIsFilterExpanded={setIsFilterExpanded}
        />
    )
    const main = (
        <div className='content'>
            <SalesEnquiryDealEnquiryListTable
                heightOffset={isFilterExpanded ? 215 : 30}
            />
        </div>
    );

    const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>;

    return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default SalesEnquiryDealEnquiry;