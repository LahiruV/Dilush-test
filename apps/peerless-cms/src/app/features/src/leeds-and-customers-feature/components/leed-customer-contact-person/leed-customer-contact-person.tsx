import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setContactPersonPageMode } from "@peerless-cms/store";
import SectionMainBase from "../../../lib/section-main-base";
//import './leed-customer-addresses.css';
import { Outlet, useNavigate  } from "react-router-dom";
import { contactId, contactTypeEnum, contactTypeName, sectionPathMap } from "@peerless/utils";

export interface LeedCustomerContactPersonProps {}

export function LeedCustomerContactPerson(props: LeedCustomerContactPersonProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, readonly, contactPersonPageMode, contactType, selectedOrganisation, isShowAddContactPerson } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,
        contactPersonPageMode: state.leedsAndCustomers.contactPersonPageMode,
        contactType: state.leedsAndCustomers.selectedContactType,
        selectedOrganisation: state.organisations.selectedOrganisation,
        isShowAddContactPerson: state.leedsAndCustomers.isShowAddContactPerson,
    }));

    const handleAddAddressClick = () => {
        navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/contact-person/update`); 
        dispatch(setContactPersonPageMode(pageModeEnum.New));
    };

    const handleCancelAddAddressClick = () => {
      navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/contact-person`); 
      dispatch(setContactPersonPageMode(pageModeEnum.List));
    };

    const header = (    
        <div className="lead-customer-detail-section-header-container">
          <span className="center-align section-title">
            {contactTypeName[contactType]} 
            <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
            <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faUser} size='1x' />Contact Person</span> 
            <span className="font-light">&nbsp; | &nbsp;</span>
            <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer?.name ?? selectedOrganisation.organisationName})`}</span>
          </span>           
          {contactPersonPageMode === pageModeEnum.List ? (isShowAddContactPerson && <button className="header-btn-add" onClick={handleAddAddressClick}>Add Contact</button>) : 
          (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelAddAddressClick}>Back</button>)} 
          
        </div>
    );

    return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}