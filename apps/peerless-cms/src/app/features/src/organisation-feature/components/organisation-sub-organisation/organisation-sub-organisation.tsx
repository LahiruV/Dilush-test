import { pageModeEnum, RootState, setOrganisationSubOrgPageMode } from "@peerless-cms/store";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";

export interface OrganisationSubOrganisationProps {}

export function OrganisationSubOrganisation(props: OrganisationSubOrganisationProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const { contactType, selectedOrganisation, orgEnduserPageMode } = useSelector((state: RootState) => ({ 
        contactType: state.leedsAndCustomers.selectedContactType,
        selectedOrganisation: state.organisations.selectedOrganisation,
        orgEnduserPageMode: state.organisations.organisationEnduserPageMode,
    }));

    const handleBackOrgSubOrgClick = () => {
        if(orgEnduserPageMode == pageModeEnum.Edit){
            
            dispatch(setOrganisationSubOrgPageMode(pageModeEnum.List));
        }
        
        if(location.pathname == `${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/sub-organisation/update`){
            navigate(`${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/sub-organisation`);
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
                    <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faBuilding} size='1x' />Sub Organisation</span> 
                    <span className="font-light">&nbsp; | &nbsp;</span>
                    <span className="center-align section-title font-light">{`(${selectedOrganisation.organisationName})`}</span>
                </span>           
                <button className="btn btn-outline-secondary header-btn-cancel" onClick={handleBackOrgSubOrgClick}>Back</button>           
            </div>
        );
    
        return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}