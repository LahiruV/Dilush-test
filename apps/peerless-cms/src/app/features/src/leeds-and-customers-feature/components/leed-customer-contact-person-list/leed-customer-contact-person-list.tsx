import { retireContactPerson, useLeadCustomerContactPersonData } from "@peerless/queries";
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setContactPersonPageMode, setIsContactPersonTblPopupOpen, setSelectedContactPerson } from "@peerless-cms/store";
import { useNavigate } from "react-router-dom";
import { contactId, contactOrderBy, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import { useEffect, useRef } from "react";
import { ContactPersonGrid } from "@peerless/common";
import { DataGrid, ToastManager } from "@peerless/controls";
import { useMutation } from "@tanstack/react-query";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { RenderStatusContentTable } from "@peerless/models";
import { toast } from "sonner";

export interface LeedCustomerContactPersonListProps { }

export function LeedCustomerContactPersonList(props: LeedCustomerContactPersonListProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);

  const { selectedLeedOrCustomer, originator, contactType, selectedOrganisation } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    originator: state.header.selectedOriginator,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
  }));

  const mutationRetireCP = useMutation<any, Error, any>({
    mutationFn: retireContactPerson
  });

  useEffect(() => {
    if (dispatch) {
      dispatch(setContactPersonPageMode(pageModeEnum.List));
    }
  }, [dispatch])

  const closeModal = () => {
    dispatch(setIsContactPersonTblPopupOpen(false));
  };

  const handleRowPopupClick = (type: string, rowData: any) => {
    if (type == 'edit') {
      dispatch(setSelectedContactPerson(rowData));
      dispatch(setContactPersonPageMode(pageModeEnum.Edit));
      navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/contact-person/update`);
    }
    else if (type == 'retireCP') {
      let retireRequest = {
        CustCode: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer.customerCode : '',
        ContactPersonID: rowData.contactPersonID
      }
      mutationRetireCP.mutate(retireRequest, {
        onSuccess: (response) => {
          if (response == true) {
            refetch();
            // messageMgr.showMessage('success', 'Success: ', 'Contact person updated');
            toast.success('Contact person retired successfully');
          }
          else {
            // messageMgr.showMessage('error', 'Error: ', 'Error occured');
            toast.error('Error occurred while retiring contact person');
          }
        },
        onError: (error) => {
          messageMgr.showMessage('error', 'Error: ', 'Error occured');
          console.error('Failed to update contact person');
        }
      });
    }
    closeModal();
  };

  let args: any;
  let includeChildReps: any;
  let custCode: any;
  let payload: any;
  if (contactType == contactTypeEnum.lead || contactType == contactTypeEnum.customer || contactType == contactTypeEnum.enduser) {
    args = {
      LeadId: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer?.sourceId : 0,
      Originator: originator.userName,
      ChildOriginators: ` (originator = '${originator.userName}')`,
      ClientType: originator.clientType,
      OrderBy: contactOrderBy[contactType],
      AdditionalParams: '',
      RepType: originator.repType,
      DefaultDepartmentId: originator.defaultDepartmentId,
      CustomerCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer?.customerCode : '',
      EnduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer?.endUserCode : '',
      StartIndex: 1,
      RowCount: 1000 //20
    }
    includeChildReps = true;
    const custCode = contactType == contactTypeEnum.customer ? selectedLeedOrCustomer?.[contactId[contactType]] : '';
    payload = { args, includeChildReps, contactType, custCode };
  }
  else if (contactType == contactTypeEnum.organisation) {
    payload = { contactType, OrgId: selectedOrganisation.orgnaisationID };
  }

  const { data: leedCustomerContactPersonData, status, error, isLoading, refetch } = useLeadCustomerContactPersonData(payload);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLoading,
    error: error,
    isStatusOutput: true
  } as RenderStatusContentTable;

  let contactPersonGrid = new ContactPersonGrid(handleRowPopupClick, contactType);
  return (
    <div className='table-container'>
      <ToastMessages ref={messagesRef} />
      <DataGrid
        dataTable={contactPersonGrid}
        data={leedCustomerContactPersonData}
        renderStatusContent={renderStatusContent}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
      />
    </div>
  )
}
