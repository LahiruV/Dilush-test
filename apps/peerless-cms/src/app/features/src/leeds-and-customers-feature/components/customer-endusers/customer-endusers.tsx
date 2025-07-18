import { Outlet, useNavigate } from "react-router-dom";
import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setCustomerEnduserPageMode } from "@peerless-cms/store";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";


export interface CustomerEndusersProps {}

export function CustomerEndusers(props: CustomerEndusersProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, readonly, customerEnduserPageMode, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,
        customerEnduserPageMode: state.leedsAndCustomers.customerEnduserPageMode,
        contactType: state.leedsAndCustomers.selectedContactType,
    }));

    const handleAddAddressClick = () => {
        navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/endusers/update`); 
        dispatch(setCustomerEnduserPageMode(pageModeEnum.New));
    };

    const handleCancelAddAddressClick = () => {
      navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/endusers`); 
      dispatch(setCustomerEnduserPageMode(pageModeEnum.List));      
    };

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align section-title">
            {contactTypeName[contactType]} 
            <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
            <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faUserCircle} size='1x' />End User</span> 
            <span className="font-light">&nbsp; | &nbsp;</span>
            <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
          </span>           
          {customerEnduserPageMode === pageModeEnum.List ? (<button className="header-btn-add filter-area" onClick={handleAddAddressClick}>Add Enduser</button>) : 
          (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelAddAddressClick}>Back</button>)} 
          
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}