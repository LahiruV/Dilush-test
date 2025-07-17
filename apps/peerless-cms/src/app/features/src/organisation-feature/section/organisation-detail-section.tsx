import { Outlet, useNavigate } from "react-router-dom";
import SectionMainBase from "../../lib/section-main-base";
import FeaturesBase from "../../lib/features-base";
import { LeedsAndCustomersAreas } from "../../leeds-and-customers-feature/components";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from "react-redux";
import { RootState } from "@peerless-cms/store";
import { contactId, contactName } from "@peerless/utils";

export const OrganisationDetailSection = () => {
  const navigate = useNavigate();
  
  const { selectedOrganisation, contactType } = useSelector((state: RootState) => ({    
    selectedOrganisation: state.organisations.selectedOrganisation,        
    contactType: state.leedsAndCustomers.selectedContactType,
  }));

  const onClickBackToList = () => {
    navigate(`/organisation/`);
  }

  const orgDetails = (
    <div>
      <div className="company-info">
      <div className="company-header">
        <FontAwesomeIcon icon={fa.faSuitcase} size='1x' />
        <span className="company-name">{ selectedOrganisation?.[contactName[contactType]] }</span>
      </div>
      <div className="company-address">              
        { selectedOrganisation?.[contactId[contactType]] }
      </div>
    </div>
    <div className="options-button-container border-bottom">
      <button type="button" className="back-button" onClick={onClickBackToList}>
        <FontAwesomeIcon icon={fa.faArrowLeft} size='1x' /> Back to List
      </button>
    </div>
    </div>   
  )
      
    const aside =  (
      <div>
        {orgDetails}
        <LeedsAndCustomersAreas cssClasses=" border-bottom" />
      </ div>
      
    );

    const main = <SectionMainBase main={<Outlet />}></SectionMainBase>;

  return <FeaturesBase aside={aside} main={main} />;
};