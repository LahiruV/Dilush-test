import * as fa2 from '@fortawesome/free-solid-svg-icons';
import ContainerHeader from '../../../../dashboard-feature/components/container-header/container-header';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';

export function QuarterlyUnitSales() {

    const header = (
        <>
            <ContainerHeader icon={fa2.faTag} name={`Quarterly Unit Sales`} />
        </>
    )
    const main = (
        <div className='content'>
            {/* <SalesEnquiryDealEnquiryListTable /> */}
        </div>
    );

    const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;

    return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default QuarterlyUnitSales;