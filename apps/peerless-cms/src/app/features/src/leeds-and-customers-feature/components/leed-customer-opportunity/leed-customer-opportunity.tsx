import { pageModeEnum, RootState, setOpportunityPageMode, setSelectedOpportunity } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";


export interface LeedCustomerOpportunityProps {}

export function LeedCustomerOpportunity(props: LeedCustomerOpportunityProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, readonly, opportunityPageMode, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,
        opportunityPageMode: state.leedsAndCustomers.opportunityPageMode,
        contactType: state.leedsAndCustomers.selectedContactType,
    }));

    const handleAddOpportunityClick = () => {
        navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/opportunity/update`); 
        dispatch(setOpportunityPageMode(pageModeEnum.New));
        dispatch(setSelectedOpportunity(null));
    };

    const handleCancelOpportunityClick = () => {
      navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/opportunity`); 
      dispatch(setOpportunityPageMode(pageModeEnum.List));
    };

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align section-title">
            {contactTypeName[contactType]} 
            <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
            <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faBullseye} size='1x' />Opportunity</span>
            <span className="font-light">&nbsp; | &nbsp;</span>
            <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
          </span>            
          {opportunityPageMode === pageModeEnum.List ? (<button className="header-btn-add" onClick={handleAddOpportunityClick}>Add Opportunity</button>) : 
          (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelOpportunityClick}>Back</button>)} 
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}