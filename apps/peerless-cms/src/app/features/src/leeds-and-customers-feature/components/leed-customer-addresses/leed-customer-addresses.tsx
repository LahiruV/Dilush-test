import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setAddressPageMode } from "@peerless-cms/store";
import SectionMainBase from "../../../lib/section-main-base";
import './leed-customer-addresses.css';
import { Outlet, useNavigate } from "react-router-dom";
import { contactId, contactTypeEnum, contactTypeName, sectionPathMap } from "@peerless/utils";

export interface LeedCustomerAddressesProps { }

export function LeedCustomerAddresses(props: LeedCustomerAddressesProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedLeedOrCustomer, addressMode, contactType, selectedOrganisation } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    addressMode: state.leedsAndCustomers.addressPageMode,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
  }));

  const handleAddAddressClick = () => {
    navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/addresses/update`);
    dispatch(setAddressPageMode(pageModeEnum.New));
  };

  const handleCancelAddAddressClick = () => {
    navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/addresses`);
    dispatch(setAddressPageMode(pageModeEnum.List));
  };

  const header = (
    <div className="lead-customer-detail-section-header-container">
      <span className="center-align section-title">
        {contactTypeName[contactType]}
        <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
        <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faMapMarkedAlt} size='1x' />Address</span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer?.name ?? selectedOrganisation.organisationName})`}</span>
      </span>
      {contactType != contactTypeEnum.enduser ? addressMode === pageModeEnum.List ? (<button className="header-btn-add filter-area" onClick={handleAddAddressClick}>Add Address</button>) :
        (<button className="btn btn-outline-secondary header-btn-cancel" onClick={handleCancelAddAddressClick}>Back</button>) : null}

    </div>
  );



  return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}