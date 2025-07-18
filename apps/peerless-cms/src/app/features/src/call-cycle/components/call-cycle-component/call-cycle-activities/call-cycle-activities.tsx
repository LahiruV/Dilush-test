import { RootState } from "@peerless-cms/store";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../../lib/section-main-base";
import ActivityColumns from "./activity-columns/activity-columns";
import Stack from '@mui/material/Stack';
import { customer_color, enduser_color, lead_color, organisation_color, other_activity_color } from '@peerless-cms/theme'

export const CallCycleActivity = () => {

    const { selectedCallCycleActivity } = useSelector((state: RootState) => state.callCycleActivity);

    const header = (
        <div style={{ backgroundColor: '#fff' }}>
            <div className="lead-customer-detail-section-header-container">
                <span className="center-align section-title">
                    Call Cycle
                    <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                    <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa2.faPhone} size='1x' />Call Cycle Planner</span>
                    <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                    {selectedCallCycleActivity.description}
                </span>
            </div>
            <div>
                <Stack direction="row" sx={{ padding: '5px' }} spacing={1.5}>
                    <div style={{ backgroundColor: lead_color, color: 'white', textAlign: 'center', width: '85px', paddingTop: 5, paddingBottom: 5, fontSize: '13px', borderRadius: '8.5px' }}>Lead</div>
                    <div style={{ backgroundColor: enduser_color, color: 'white', textAlign: 'center', width: '85px', paddingTop: 5, paddingBottom: 5, fontSize: '13px', borderRadius: '8.5px' }}>End User</div>
                    <div style={{ backgroundColor: customer_color, color: 'white', textAlign: 'center', width: '85px', paddingTop: 5, paddingBottom: 5, fontSize: '13px', borderRadius: '8.5px' }}>Customer</div>
                    <div style={{ backgroundColor: organisation_color, color: 'white', textAlign: 'center', width: '85px', paddingTop: 5, paddingBottom: 5, fontSize: '13px', borderRadius: '8.5px' }}>Organisation</div>
                    <div style={{ backgroundColor: other_activity_color, color: 'white', textAlign: 'center', width: '85px', paddingTop: 5, paddingBottom: 5, fontSize: '13px', borderRadius: '8.5px' }}>Other</div>
                </Stack>
            </div>
        </div>
    );

    const main = (
        <div className='content'>
            <div className="pad-5">
                <ActivityColumns />
            </div>
        </div >
    );

    return <SectionMainBase header={header} main={main}></SectionMainBase>;

};