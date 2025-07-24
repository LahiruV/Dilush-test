import {
  messageTypeEnum, pageModeEnum, RootState, setCustomerEnduserPageMode, setIsCustomerEnduserTblPopupOpen, setIsCustomerEnduserTransferPopupOpen,
  setSelectedCustomerEnduser, setSelectedCustomerForEnduserTransfer, showMessage
} from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { contactId, sectionPathMap } from "@peerless/utils";
import { getCustomerEndusersList, saveEnduserTransfer, useNewCustomerData } from "@peerless/queries";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { KendoDropdown } from "@peerless-cms/features-common-components";
import './customer-enduser-list.css';
import { useMutation } from "@tanstack/react-query";
import { DataGrid, ToastManager } from "@peerless/controls";
import { EnduserListGrid } from "@peerless/common";
import { Dialog } from "primereact/dialog";
import { RenderStatusContentTable } from "@peerless/models";
import ToastMessages from "libs/controls/src/toasts-message/messages";

export interface CustomerEndusersListProps { }

export function CustomerEndusersList(props: CustomerEndusersListProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: false });
  const [customerListParams, setCustomerListParams] = useState<any>(null);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isError, setIsError] = useState(false);
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);

  const { selectedLeedOrCustomer, loggedUser, contactType, selectedCustomerEnduser,
    childOriginator, originator, enduserStatus, isCustomerEnduserTransferPopupOpen,
    selectedCustomerForEnduserTransfer, childOriginators } = useSelector((state: RootState) => ({
      selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
      loggedUser: state.header.loggedUser,
      selectedCustomerEnduser: state.leedsAndCustomers.selectedCustomerEnduser,
      contactType: state.leedsAndCustomers.selectedContactType,
      childOriginator: state.header.childOriginators,
      originator: state.header.selectedOriginator,
      enduserStatus: state.customerPageFilters.enduserStatus,
      isCustomerEnduserTransferPopupOpen: state.modal.isCustomerEnduserTransferPopupOpen,
      selectedCustomerForEnduserTransfer: state.leedsAndCustomers.selectedCustomerForEnduserTransfer,
      childOriginators: state.header.childOriginators,
    }));

  const mutationSaveEnduserTransfer = useMutation<any, Error, any>({
    mutationFn: saveEnduserTransfer
  });

  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (dispatch) {
      dispatch(setCustomerEnduserPageMode(pageModeEnum.List));
    }
  }, [dispatch])

  const closeModal = () => {
    dispatch(setIsCustomerEnduserTblPopupOpen(false));
  };

  const closeEnduserTransferModal = () => {
    dispatch(setIsCustomerEnduserTransferPopupOpen(false));
    dispatch(setSelectedCustomerForEnduserTransfer(null));
    setIsError(false);
  };

  const handleRowPopupClick = (type: string, rowData: any) => {
    dispatch(setSelectedCustomerEnduser(rowData));
    if (type == 'edit') {
      dispatch(setCustomerEnduserPageMode(pageModeEnum.Edit));
      navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/endusers/update`);
      closeModal();
    }
    else if (type == 'transfer') {
      dispatch(setIsCustomerEnduserTransferPopupOpen(true));
      closeModal();
    }
  };

  const saveEnduserTransferClick = () => {
    if (selectedCustomerForEnduserTransfer == null) {
      setIsError(true);
      return;
    }
    setIsError(false);
    const transferPayload = {
      endUser: {
        EndUserCode: selectedCustomerEnduser.endUserCode,
        CustomerCode: selectedCustomerForEnduserTransfer.value
      },
      args: {
        DefaultDepartmentId: originator.defaultDepartmentId,
        CustomerCode: selectedLeedOrCustomer?.[contactId[contactType]],
        Originator: loggedUser.userName
      }
    }
    setIsTransfer(true);
    mutationSaveEnduserTransfer.mutate(transferPayload, {
      onSuccess: (responseSaveImage) => {
        setIsTransfer(false);
        closeEnduserTransferModal();
        refetch();
      },
      onError: (error) => {
        setIsTransfer(false);
        closeEnduserTransferModal();
        messageMgr.showMessage("error", 'Error: ', 'Error occured while updating');
      }
    });
  }

  const handleCustomerSearch = async (event: any) => {
    setLoading(true);
    try {
      setSearchText(event.filter.value);
    } catch (error) {
      console.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  let customerEnduserList: any = [];

  useEffect(() => {
    if (childOriginator != null && loggedUser != null && selectedCustomerEnduser != null) {
      let lookupSqlKey = 'CustomerLookup';
      let whereCls = ' AND' + childOriginators;
      let parameters: any = null;
      let hasArgs = true;
      let argsCE = {
        StartIndex: 1,
        RowCount: 1000,
        ChildOriginators: childOriginators,
        Originator: loggedUser.userName,
        DefaultDepartmentId: originator.defaultDepartmentId,
        CustomerCode: selectedLeedOrCustomer?.[contactId[contactType]],
        AdditionalParams: `${searchText}`,
      }
      let payloadCustomerEnduser = { lookupSqlKey, whereCls, parameters, args: argsCE, hasArgs }
      setCustomerListParams(payloadCustomerEnduser);
    }
  }, [childOriginators, loggedUser, selectedLeedOrCustomer, searchText]);

  const { data: customerListData, error: customerListError, isLoading: isCustomersLoading } = useNewCustomerData(customerListParams);

  if (isCustomersLoading)
    customerEnduserList = [{ label: 'Loading...', value: '' }];

  if (customerListData) {
    customerEnduserList = customerListData.map((item: { code: any; description: any; }) => ({
      label: item.code + ' - ' + item.description,
      value: item.code,
    }));

  }

  const args = {
    ChildOriginators: childOriginator,
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    Originator: originator.userName,
    CustomerCode: selectedLeedOrCustomer?.[contactId[contactType]],
    OrderBy: "cust_code asc",
    ManagerMode: true,
    StartIndex: 1,
    RowCount: 20
  };

  const payload = { args, status: enduserStatus.value };

  const { customerEndusersData, error, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = getCustomerEndusersList(payload, 20);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage().then(result => {
      }).catch(error => {
        console.error("Error fetching next page");
      });
    }
  }, [fetchNextPage, inView]);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLoading,
    error: error,
    isStatusOutput: true
  } as RenderStatusContentTable;

  let enduserListGrid = new EnduserListGrid(handleRowPopupClick);

  return (
    <div>
      <ToastMessages ref={messagesRef} />
      <DataGrid dataTable={enduserListGrid} data={customerEndusersData} renderStatusContent={renderStatusContent} enablePagination />
      <div ref={ref} style={{ height: '1px' }} />

      <Dialog visible={isCustomerEnduserTransferPopupOpen} onHide={closeEnduserTransferModal} header={`Transfer Enduser: ${selectedCustomerEnduser?.endUserCode}`}>
        {(
          <div className="transfer-enduser-modal">
            {/* <div className="modal-header">
                    <span className="modal-title">Transfer Enduser: {selectedCustomerEnduser?.endUserCode}</span>
                  </div> */}
            <div className="modal-body">
              <div className="customer-form-group">
                <label className="form-label" htmlFor="enduser-transfer-customers">Customer</label>
                <KendoDropdown
                  id="enduser-transfer-customers"
                  className="enduser-transfer-customer-ddl"
                  setValue={(e) => dispatch(setSelectedCustomerForEnduserTransfer(e))}
                  value={selectedCustomerForEnduserTransfer}
                  datalist={customerEnduserList}
                  textField={"label"}
                  dataItemKey={"value"}
                  fillMode={"outline"}
                  size={"small"}
                  isFilterable={true}
                  filterChangeCallback={handleCustomerSearch}
                  isLoading={loading}
                />
              </div>
              <div>
                {selectedCustomerForEnduserTransfer && selectedCustomerForEnduserTransfer.value &&
                  <div className="selected-transfer-customer-container">
                    <label>Transfer to:</label>
                    <div className="customer-info">
                      <div className="customer-info-row">
                        <span className="lbl-title">Name:</span>
                        <span className="lbl-value">{selectedCustomerForEnduserTransfer?.label}</span>
                      </div>
                      <div className="customer-info-row">
                        <span className="lbl-title">Code:</span>
                        <span className="lbl-value">{selectedCustomerForEnduserTransfer?.value}</span>
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <div className="modal-footer">
              <button disabled={isTransfer} id="customer-enduser-success-button" className={isTransfer ? 'success-button-disabled' : 'success-button'} onClick={saveEnduserTransferClick}>
                {isTransfer ? 'Transferring...' : 'Transfer'}
              </button>
              {isError && <span className="spn error">Please select a customer</span>}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}