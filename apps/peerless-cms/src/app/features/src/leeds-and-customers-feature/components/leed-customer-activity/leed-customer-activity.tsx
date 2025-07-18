import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { pageModeEnum, RootState, setActivityPageMode, setSelectedActivity } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { contactId, contactTypeEnum, contactTypeName, sectionPathMap } from "@peerless/utils";


export interface LeedCustomerActivityProps {}

export function LeedCustomerActivity(props: LeedCustomerActivityProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, activityPageMode, contactType, selectedOrganisation } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        activityPageMode: state.leedsAndCustomers.activityPageMode,
        contactType: state.leedsAndCustomers.selectedContactType,
        selectedOrganisation: state.organisations.selectedOrganisation,
    }));

    const handleAddActivityClick = () => {
        navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/activity/update`); 
        dispatch(setActivityPageMode(pageModeEnum.New));  
    };

    const handleCancelAddActivityClick = () => {
      navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/activity`); 
      dispatch(setActivityPageMode(pageModeEnum.List));
    };

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align section-title">
            {contactTypeName[contactType]} 
            <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
            <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faClipboardList} size='1x' />Activity</span> 
            <span className="font-light">&nbsp; | &nbsp;</span>
            <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer?.name ?? selectedOrganisation.organisationName})`}</span>
          </span>           
          {activityPageMode === pageModeEnum.List ? (<button className="header-btn-add" onClick={handleAddActivityClick}>Add Activity</button>) : 
          (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelAddActivityClick}>Back</button>)}           
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}