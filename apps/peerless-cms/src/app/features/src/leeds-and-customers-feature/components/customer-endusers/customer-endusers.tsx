import { Outlet, useNavigate } from "react-router-dom";
import SectionMainBase from "../../../lib/section-main-base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setCustomerEnduserPageMode } from "@peerless-cms/store";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";
import { HeaderFilterContainer } from "@peerless-cms/features-common-components";
import { CustomerEnduserListFilters } from "../customer-endusers-list/customer-enduser-list-filters";


export interface CustomerEndusersProps { }

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
    <>
      <HeaderFilterContainer title="End User" icon={fa.faUserCircle} renderFilters={({ isFiltersOpen, isClearFilters, setIsActiveFilters }) => (
        <CustomerEnduserListFilters isClearFilters={isClearFilters} isFiltersOpen={isFiltersOpen} setIsActiveFilters={setIsActiveFilters} />
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
            <span className="section-title font-light sub-heading-clipped">{`(${selectedLeedOrCustomer.name})`}</span>
          </>
        }
        inlineElements={
          <>
            {customerEnduserPageMode === pageModeEnum.List ?
              (<button className="header-btn-add filter-area" style={{ marginLeft: "auto" }} onClick={handleAddAddressClick}>Add Enduser</button>) :
              (<button className="btn btn-outline-secondary header-btn-cancel" style={{ marginLeft: "auto" }} onClick={handleCancelAddAddressClick}>Back</button>)}
          </>
        }
      />
    </>
  );

  return <SectionMainBase header={header} main={<Outlet />}></SectionMainBase>;
}