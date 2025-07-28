import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setAddressPageMode } from "@peerless-cms/store";
import SectionMainBase from "../../../lib/section-main-base";
import './leed-customer-addresses.css';
import { Outlet, useNavigate } from "react-router-dom";
import { contactId, contactTypeEnum, contactTypeName, sectionPathMap } from "@peerless/utils";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { LeedCustomerAddressListFilters } from "../leed-customer-address-list/leed-customer-address-list-filters";

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
    <HeaderFilterContainer title="Address" icon={fa.faMapMarkedAlt} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
      <LeedCustomerAddressListFilters isClearFilters={isClearFilters} isFiltersOpen={isFiltersOpen} setIsActiveFilters={setIsActiveFilters} />
    )}
      hideClearFilters
      titleInlineBeforeElements={
        <>
          {contactTypeName[contactType]}
          <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
        </>
      }
      titleInlineAfterElements={
        <>
          <span className="font-light">&nbsp; | &nbsp;</span>
          <span className="section-title font-light sub-heading-clipped">{`(${selectedLeedOrCustomer?.name ?? selectedOrganisation.organisationName})`}</span>
        </>
      }
      inlineElements={
        <>
          {contactType != contactTypeEnum.enduser ? addressMode === pageModeEnum.List ?
            (<button className="header-btn-add filter-area" style={{ marginLeft: 'auto' }} onClick={handleAddAddressClick}>Add Address</button>) :
            (<button className="btn btn-outline-secondary header-btn-cancel" style={{ marginLeft: 'auto' }} onClick={handleCancelAddAddressClick}>Back</button>) : null}
        </>
      }
    />
  );



  return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}