import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import FeaturesBase from "../../../lib/features-base";
import DashboardEndUserPriceReportList from "./dashboard-end-user-price-report-list/dashboard-end-user-price-report-list";
import { ButtonWidget } from "@peerless/controls";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { DashBoardEndUserPriceFilter } from './dashboard-end-user-price-report-filter'
import { RootState, setTriggerEndUserPriceFormSubmit } from "@peerless-cms/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DashboardEndUserPriceReport() {
    const [isHandlePDF, setIsHandlePDF] = useState(false);
    const dispatch = useDispatch();
    const [isFilterExpanded, setIsFilterExpanded] = useState(false);

    const { isFetchEndUserPriceList, isFetchEndUserPriceListReport, isPdfView } = useSelector((state: RootState) => state.dashboardEndUserPrice);

    const handleExternalSubmit = () => {
        dispatch(setTriggerEndUserPriceFormSubmit(true));
    };

    const handlePrintClick = () => {
        setIsHandlePDF(true);

        setTimeout(() => {
            setIsHandlePDF(false);
        }, 1000);
    }


    const header = (
        <HeaderFilterContainer title="End User Price" icon={fa2.faFileAlt} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <DashBoardEndUserPriceFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} isHandlePDF={isHandlePDF} setIsHandlePDF={handlePrintClick} />
        )}
            onFilterClick={handleExternalSubmit}
            isFetching={isFetchEndUserPriceList}
            inlineElements={
                <ButtonWidget id='end-user-price-pdf-button' classNames='pdf-button' isDisabled={isFetchEndUserPriceListReport} Function={handlePrintClick} name='PDF' isIcon={true} icon={<FontAwesomeIcon icon={fa2.faFilePdf} />} iconCss="margin-left-2" />
            }
            setIsFilterExpanded={setIsFilterExpanded}
        />
    )

    const main = (
        <div className='content'>
            <DashboardEndUserPriceReportList heightOffset={isFilterExpanded ? 102 : 38} />
        </div>
    );
    const maincon = isPdfView
        ? <SectionMainBase header={header} main={main}></SectionMainBase>
        : <SectionMainBase mainClassName="overflow-hidden" header={header} main={main}></SectionMainBase>;
    return <FeaturesBase main={maincon} cssClass='remove-margin-top-article' />
}

export default DashboardEndUserPriceReport;
