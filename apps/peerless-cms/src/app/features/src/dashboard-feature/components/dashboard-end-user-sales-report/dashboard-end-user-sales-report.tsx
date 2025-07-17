import { useDispatch, useSelector } from "react-redux";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import FeaturesBase from "../../../lib/features-base";
import DashboardEndUserSalesReportList from "./dashboard-end-user-sales-report-list/dashboard-end-user-sales-report-list";
import { ButtonWidget } from "@peerless/controls";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { DashboardEndUserSalesFilter } from './dashboard-end-user-sales-filter'
import { RootState, setTriggerEndUserSalesFormSubmit } from "@peerless-cms/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function DashboardEndUserSalesReport() {
    const dispatch = useDispatch();

    const { isFetchPdfEndUserSaleListReport } = useSelector((state: RootState) => state.dashboardEndUserSales);

    const handlePrintClick = () => {
        dispatch(setTriggerEndUserSalesFormSubmit(true));
    }

    const header = (
        <HeaderFilterContainer title="End User Sales" icon={fa2.faFileAlt} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
            <DashboardEndUserSalesFilter isFiltersOpen={isFiltersOpen} isClearFilters={isClearFilters} setIsActiveFilters={setIsActiveFilters} />
        )}
            inlineElements={
                <ButtonWidget id='end-user-sales-pdf-button' classNames='pdf-button' isDisabled={isFetchPdfEndUserSaleListReport} Function={handlePrintClick} name='PDF' isIcon={true} icon={<FontAwesomeIcon icon={fa2.faFilePdf} />} iconCss="margin-left-2" />
                // <ButtonWidget id='end-user-sales-pdf-button' classNames="border-none" isDisabled={isFetchPdfEndUserSaleListReport} Function={handlePrintClick} isIcon={true} icon={<FontAwesomeIcon color="red" size="lg" icon={fa2.faFilePdf} />} iconCss="margin-left-2" />
            }
        />
    )

    const main = (
        <div className='content'>
            <DashboardEndUserSalesReportList />
        </div>
    );

    const maincon = <SectionMainBase header={header} main={main}></SectionMainBase>;
    return <FeaturesBase main={maincon} cssClass='remove-margin-top-article' />
}

export default DashboardEndUserSalesReport;
