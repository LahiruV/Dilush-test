import { pageModeEnum, RootState, setCrmOrdersPageMode, setIsEnduserTIODeletePopupOpen, setModalPosition, setSelectedCRMOrder } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useEffect, useRef, useState } from "react";
import { CrmOrder } from "@peerless/common";
import './customer-crm-orders-list.css';
import { DataGrid, ToastManager } from "@peerless/controls";
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import { deleteTIOrder, getOrderList, useOrderDetails } from "@peerless/queries";
import { useInView } from "react-intersection-observer";
import Modal from "apps/peerless-cms/src/app/features-common-components/src/modal/modal";
import { useMutation } from "@tanstack/react-query";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { RenderStatusContentTable } from "@peerless/models";
//check here for row expantion example
export interface CustomerCRMOrdersListProps {}

export function CustomerCRMOrdersList(props: CustomerCRMOrdersListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ref, inView } = useInView({ triggerOnce: false });
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    
    const { selectedLeedOrCustomer, selectedCRMOrder, originator, loggedUser, isCrmOrderTblPopupOpen, modalPosition, contactType, isEnduserTIODeletePopupOpen } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        selectedCRMOrder: state.leedsAndCustomers.selectedCRMOrder,
        originator: state.header.selectedOriginator,
        loggedUser: state.header.loggedUser,        
        isCrmOrderTblPopupOpen: state.modal.isCrmOrderTblPopupOpen,
        modalPosition: state.modal.modalPosition,      
        contactType: state.leedsAndCustomers.selectedContactType,  
        isEnduserTIODeletePopupOpen: state.modal.isEnduserTIODeletePopupOpen,
    }));

    const mutationDeleteTIOrder = useMutation<any, Error, any>({
      mutationFn: deleteTIOrder
    });

    useEffect(() => {
      dispatch(setCrmOrdersPageMode(pageModeEnum.List));
    }, [dispatch])

    const args = {       
        CustomerCode: selectedLeedOrCustomer.customerCode,
        EnduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
        StartIndex: 1,
        RowCount: 50
    };
    const payload = { args };
    const { customerCrmOrderData, error, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = getOrderList(payload, 50, contactType);

    let innerArgs: any = {oderNumber: -1}; 
    const [expandedRows, setExpandedRows] = useState<any>([]);
    const [expandedData, setExpandedData] = useState<any>(null);    
    const [innerQueryParams, setInnerQueryParams] = useState<any>(innerArgs);
    const [selectedRow, setSelectedRow] = useState<any>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const { data: productData, error: producttDataError, isLoading: isProductDataLoading } = useOrderDetails(innerQueryParams, contactType);
    
    useEffect(() => {
      if (productData) {
        // setExpandedData(productData);
        const rowId = innerQueryParams.oderNumber;  
        setExpandedData((prevData: any) => ({
          ...prevData,
          [rowId]: productData, 
        }));
      }
    }, [productData]);

    const onRowTogglesCallback = async (e:any) => {     
      let keys: any = null;
      if(e != null){
        keys = Object.keys(e);       
        let currentRow = keys.find((row: any) => !expandedRows.includes(row));
        
        if(currentRow == undefined) //this means the row is being collapsed
          return;

        currentRow = currentRow.split('-')[0];

        innerArgs = {                 
          oderNumber: currentRow
        };         
      }
      else{
        innerArgs = {oderNumber: -1}; 
      }
      setExpandedRows(keys);
      setInnerQueryParams(innerArgs);
    }

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {      
          fetchNextPage().then(result => {                 
          }).catch(error => {
            console.error("Error fetching next page");
          });
        }
      }, [fetchNextPage, inView]);
          
    const handleGridOptionClick = (optionType: any, row: any) => {   
      setSelectedRow(row);
      if(optionType == 'edit'){
        let subPath = contactType == contactTypeEnum.customer? 'crm-orders' : 'tio-list';
        dispatch(setCrmOrdersPageMode(pageModeEnum.Edit));
        dispatch(setSelectedCRMOrder(row));
        navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/${subPath}/update`);     
      }    
      else if(optionType == 'delete'){
        openModal(row);
      }          
    };

    const modalHeight = 100;
    const modalWidth = 330;

    const openModal = (row: any) => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
  
      const modalPosition = {
          top: (viewportHeight - modalHeight) / 2, 
          left: (viewportWidth - modalWidth) / 2,  
      };
  
      dispatch(setModalPosition(modalPosition));
      dispatch(setIsEnduserTIODeletePopupOpen(true));
  };

    const closeModal = () => {
      dispatch(setIsEnduserTIODeletePopupOpen(false));
    };
    
    const handleDeleteClick = () => {
      setIsDeleting(true);
      mutationDeleteTIOrder.mutate(selectedRow.tiOrderNumber, {
        onSuccess: (response) => {
          setIsDeleting(false);
          if(response == true){
            refetch();
            messageMgr.showMessage('success', 'Success: ', 'Order deleted');
            closeModal();
          }                    
        },
        onError: (error) => {
          setIsDeleting(false);
          messageMgr.showMessage('error', 'Error: ', 'Error occured');
          closeModal();
        }
      });
    }

    const renderStatusContent = {
      isRenderStatusContentTable: true,
      status: status,
      isFetch: isLoading,
      error: error,
      isStatusOutput: true
    } as RenderStatusContentTable;
    
    const crmOrderTable = new CrmOrder(handleGridOptionClick, contactType);
    return (
        <>
            <ToastMessages ref={messagesRef} />  
            <DataGrid dataTable={crmOrderTable} data={contactType == contactTypeEnum.customer ? customerCrmOrderData : (customerCrmOrderData.length > 0 && customerCrmOrderData[0].header)} 
              onRowTogglesCallback={onRowTogglesCallback} expandedData={expandedData} renderStatusContent={renderStatusContent} />
            <div ref={ref} style={{ height: '1px' }} />
            <Modal isOpen={isEnduserTIODeletePopupOpen} onClose={closeModal} isOverlay={false} position={modalPosition} customCss="address-tbl-popup conf-box">
              {(
              <div className="confirmation-box">
                  <p>Are you sure you want to delete this order?</p>
                  <div className="button-container">
                      <input disabled={isDeleting} type="button" className={isDeleting ? "delete-yes-disabled" : "delete-yes"} value={isDeleting ? 'Deleting' : 'Yes'} onClick={handleDeleteClick} />
                      <input disabled={isDeleting} type="button" className={isDeleting ? "delete-no-disabled" : "delete-no"} value="No" onClick={closeModal} />
                  </div>
              </div>
              )}
            </Modal> 
        </>
        
    )
}