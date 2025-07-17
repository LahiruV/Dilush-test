import { useLeadCustomerAddressData } from "@peerless/queries";
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setAddressPageMode, setIsAddressTblPopupOpen, setSelectedAddress } from "@peerless-cms/store";
import { useNavigate } from "react-router-dom";
import './leed-customer-address-list.css';
import { useEffect } from "react";
import { AddressGrid } from "@peerless/common";
import { DataGrid } from "@peerless/controls";
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import { RenderStatusContentTable } from "@peerless/models";

export interface LeedCustomerAddressListProps { }

export function LeedCustomerAddressList(props: LeedCustomerAddressListProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedLeedOrCustomer, contactType, selectedOrganisation, customerAddressStatus } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
    customerAddressStatus: state.customerPageFilters.customerAddressStatus
  }));

  useEffect(() => {
    if (dispatch) {
      dispatch(setAddressPageMode(pageModeEnum.List));
    }
  }, [dispatch]);

  const closeModal = () => {
    dispatch(setIsAddressTblPopupOpen(false));
  };

  const handleRowPopupClick = (type: string, row: any) => {
    dispatch(setSelectedAddress(row));
    dispatch(setAddressPageMode(pageModeEnum.Edit));
    navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/addresses/update`);
    closeModal();
  };

  let payload: any;

  if (contactType === contactTypeEnum.lead) {
    payload = {
      leadId: Number(selectedLeedOrCustomer?.[contactId[contactType]]),
      contactType: contactType
    };
  }
  else if (contactType === contactTypeEnum.customer) { //customer
    payload = {
      custCode: selectedLeedOrCustomer?.[contactId[contactType]],
      contactType: contactType,
      args: {
        //DefaultDepartmentId: loggedUser.defaultDepartmentId,
        AdditionalParams: customerAddressStatus?.value || ' ',
        //ChildOriginators: ` (originator = '${originator.userName}')`, 
        OrderBy: "assignee_no asc",
        //StartIndex: 1,
        //RowCount: 50
      }
    };
  }
  else { //organisation
    payload = {
      OrgId: selectedOrganisation?.[contactId[contactType]],
    };
  }

  const { data: leedCustomerAddressesData, status, error, isLoading } = useLeadCustomerAddressData(payload);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLoading,
    error: error,
    isStatusOutput: true
  } as RenderStatusContentTable;

  let addressGrid = new AddressGrid(handleRowPopupClick, contactType);
  return (
    <div className='table-container'>
      <DataGrid
        dataTable={addressGrid}
        data={leedCustomerAddressesData}
        renderStatusContent={renderStatusContent}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
      />
    </div>
  )
}