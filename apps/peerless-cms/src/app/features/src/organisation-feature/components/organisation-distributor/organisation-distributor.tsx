import { pageModeEnum, RootState, setOrganisationDistributorPageMode } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import SectionMainBase from "../../../lib/section-main-base";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';

export interface OrganisationDistributorProps {}

export function OrganisationDistributor(props: OrganisationDistributorProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { contactType, selectedOrganisation, orgDistributorPageMode } = useSelector((state: RootState) => ({ 
        contactType: state.leedsAndCustomers.selectedContactType,
        selectedOrganisation: state.organisations.selectedOrganisation,
        orgDistributorPageMode: state.organisations.organisationDistributorPageMode,
    }));

    const handleBackOrgEUClick = () => {
        if(orgDistributorPageMode == pageModeEnum.Edit){            
            dispatch(setOrganisationDistributorPageMode(pageModeEnum.List));
        }

        if(location.pathname == `${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/distributor/update`){
            navigate(`${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/distributor`);
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
                <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faTruck} size='1x' />Distributor</span>
                <span className="font-light">&nbsp; | &nbsp;</span>
                <span className="center-align section-title font-light">{`(${selectedOrganisation.organisationName})`}</span>
            </span>           
            <button className="btn btn-outline-secondary header-btn-cancel" onClick={handleBackOrgEUClick}>Back</button>           
        </div>
    );
    
    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;

}