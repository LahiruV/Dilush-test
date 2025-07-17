import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';
import SalesEnquiryInvoiceEnquiryListTable from './sales-enquiry-invoice-enquiry-table/sales-enquiry-invoice-enquiry-table';
import { HeaderFilterContainer, InfoBox } from '@peerless-cms/features-common-components';
import SalesEnquiryInvoiceEnquiryFilter from './sales-enquiry-invoice-enquiry-filter';
import '../../../../styles/header-top-filter.css'
import { RootState, setSelectedInvoiceEnquiry, setTriggerInvoiceEnquiryFiltersFormSubmit } from '@peerless-cms/store';
import { formatNumber } from "@peerless/common";

export function SalesEnquiryInvoiceEnquiry() {
    const dispatch = useDispatch();
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const { isFetchingInvoiceEnquiryList, selectedInvoiceEnquiry, invoiceEnquiryTotalsData } = useSelector(
        (state: RootState) => state.salesEnquiryInvoiceEnquiry,
    );

    useEffect(() => {
        dispatch(setSelectedInvoiceEnquiry(null));
    }, []);

    const handleExternalSubmit = () => {
        dispatch(setTriggerInvoiceEnquiryFiltersFormSubmit(true));
    };

    const header = (
        <HeaderFilterContainer title='Invoice Enquiry' icon={fa2.faFileInvoice} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <SalesEnquiryInvoiceEnquiryFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isFetchingInvoiceEnquiryList}
            setIsFilterExpanded={setIsFilterExpanded}
        />
    )
    const main = (
        <div className='content'>
            <SalesEnquiryInvoiceEnquiryListTable
                heightOffset={isFilterExpanded ? 300 : 18}
            />
        </div>
    );

    const articleData = [
        {
            label: "Customer :",
            text: selectedInvoiceEnquiry?.customerName
        },
        {
            label: "Product :",
            text: selectedInvoiceEnquiry?.catalogDescription
        },
        {
            label: "Rep :",
            text: selectedInvoiceEnquiry?.repName
        },
    ]

    const totalsDataUpper = [
        {
            label: "Net Amt :",
            text: formatNumber(invoiceEnquiryTotalsData?.totalNetAmount, { isCurrency: true })
        },
        {
            label: "GST Amt :",
            text: formatNumber(invoiceEnquiryTotalsData?.totalGstAmount, { isCurrency: true })
        },
        {
            label: "Total Amt :",
            text: formatNumber(invoiceEnquiryTotalsData?.totalAmount, { isCurrency: true })
        }
    ]

    const totalsDataLower = [
        {
            label: "Total Ton :",
            text: formatNumber(invoiceEnquiryTotalsData?.totalTonnes)
        },
        {
            label: "$/T :",
            text: formatNumber(invoiceEnquiryTotalsData?.dolTonEnt),
        },
        {
            label: "Pallets :",
            text: formatNumber(invoiceEnquiryTotalsData?.totalPalletQTY)
        },
    ]

    const articleDefault = (
        <div className="customer-details-card">
            <div className="icon-container">
                <FontAwesomeIcon icon={fa2.faCopy} className="sliders-icon" />
            </div>
            <h2>Invoice Details</h2>
            <p>Select an invoice to see the details</p>
        </div>
    );

    const article = selectedInvoiceEnquiry ? (
        <>
            <InfoBox
                header={"Narration on invoice: "}
                headerClass="title-1"
                headerSpannedValue={selectedInvoiceEnquiry.invoiceNo}
                cssClass="border-left-none border-top-none padding-top-10"
                labelWidthClass="title-1 padding-left-none"
            />
            <InfoBox
                contentList={articleData}
                cssClass='border-top-none border-bottom-none border-left-none border-right-none'
                labelWidthClass="title-1 padding-left-none"
            />
            <InfoBox
                contentList={totalsDataUpper}
                cssClass='border-bottom-none border-left-none border-right-none'
                labelWidthClass="title-1 padding-left-none"
                listParentClass="padding-right-30"
                valueClass="text-right font-bold-last"
            />
            <InfoBox
                contentList={totalsDataLower}
                cssClass='border-bottom-none border-left-none border-right-none'
                labelWidthClass="title-1 padding-left-none"
                listParentClass="padding-right-30"
                valueClass="text-right"
            />
        </>
    ) : (
        articleDefault
    );

    const mainContent = <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>;

    return <FeaturesBase main={mainContent} article={article} cssClass='remove-margin-top-article' />;
}

export default SalesEnquiryInvoiceEnquiry;