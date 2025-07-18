import { Outlet, useNavigate } from "react-router-dom";
import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { contactId, contactTypeEnum, contactTypeName, sectionPathMap } from "@peerless/utils";
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setOrganisationEnduserPageMode } from "@peerless-cms/store";

export interface OrganisationEnduserProps {}

export function OrganisationEnduser(props: OrganisationEnduserProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { contactType, selectedOrganisation, orgEnduserPageMode } = useSelector((state: RootState) => ({ 
        contactType: state.leedsAndCustomers.selectedContactType,
        selectedOrganisation: state.organisations.selectedOrganisation,
        orgEnduserPageMode: state.organisations.organisationEnduserPageMode,
    }));

    const handleBackOrgEUClick = () => {
        if(orgEnduserPageMode == pageModeEnum.Edit){            
            dispatch(setOrganisationEnduserPageMode(pageModeEnum.List));
        }

        if(location.pathname == `${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/endusers/update`){
            navigate(`${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/endusers`);
        }
        else
        {
            navigate(`/organisation/`);
        }
    };

    const header = (    
        <div className="lead-customer-detail-section-header-container">
            <span className="center-align section-title">
                {contactTypeName[contactType]} 
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faUserCircle} size='1x' />End User</span> 
                <span className="font-light">&nbsp; | &nbsp;</span>
                <span className="center-align section-title font-light">{`(${selectedOrganisation.organisationName})`}</span>
            </span>           
            <button className="btn btn-outline-secondary header-btn-cancel" onClick={handleBackOrgEUClick}>Back</button>           
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}