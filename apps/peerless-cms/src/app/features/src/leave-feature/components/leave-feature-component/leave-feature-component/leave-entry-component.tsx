import * as fa2 from '@fortawesome/free-solid-svg-icons';
import ContainerHeader from '../../../../dashboard-feature/components/container-header/container-header';
import SectionMainBase from '../../../../lib/section-main-base';
import FeaturesBase from '../../../../lib/features-base';


export function LeaveEntry() {

    const header = (
        <>
            <ContainerHeader icon={fa2.faTag} name={`Leave Entry`} />
        </>
    )
    const main = (
        <div className='content'>
            {/* <SalesEnquiryCustomerPriceListTable /> */}
        </div>
    );

    const mainContent = <SectionMainBase header={header} main={main}></SectionMainBase>;

    return <FeaturesBase main={mainContent} cssClass='remove-margin-top-article' />;
}

export default LeaveEntry;