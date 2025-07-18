import { pageModeEnum, RootState, setIsOpportunityDeletePopupOpen, setOpportunityPageMode, setSelectedOpportunity } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteLeadOpportunity, getLeadCustomerOpportunityList } from "@peerless/queries";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import './leed-customer-opportunity-list.css';
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import { DataGrid, ToastManager } from "@peerless/controls";
import { OpportunityGrid } from "@peerless/common";
import { Dialog } from "primereact/dialog";
import { RenderStatusContentTable } from "@peerless/models";

export interface LeedCustomerOpportunityListProps {}

export function LeedCustomerOpportunityList(props: LeedCustomerOpportunityListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { ref, inView } = useInView({ triggerOnce: false });
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);

    const { selectedLeedOrCustomer, selectedOpportunity, originator, isOpportunityDeletePopupOpen, contactType } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        selectedOpportunity: state.leedsAndCustomers.selectedOpportunity,
        originator: state.header.selectedOriginator,       
        isOpportunityDeletePopupOpen: state.modal.isOpportunityDeletePopupOpen,
        contactType: state.leedsAndCustomers.selectedContactType,  
    }));

    const mutationDeleteOpportunity = useMutation<any, Error, any>({
      mutationFn: deleteLeadOpportunity
    });

    useEffect(() => {
      if(dispatch){
        dispatch(setOpportunityPageMode(pageModeEnum.List)); // set default to list
      }
    }, [dispatch])
        
    const closeDeleteModal = () => {
      dispatch(setIsOpportunityDeletePopupOpen(false));
    }

    const deleteSelectedOpportunity = async () => {
      try{
        let opportunityId = selectedOpportunity.opportunityID
        const response = await mutationDeleteOpportunity.mutateAsync(opportunityId);
        if(response){        
          refetch();
          messageMgr.showMessage('success', 'Success: ', 'Opportunity deleted');
        }
      }
      catch(error){
        messageMgr.showMessage('error', 'Error: ', 'Error occured');
        console.error('An error occurred while deleting the opportunity');
      }
      finally{
        dispatch(setIsOpportunityDeletePopupOpen(false));
      }     
      
    }

    const handleRowPopupClick = (type: string, rowData: any) => {  
      dispatch(setSelectedOpportunity(rowData));  
      if(type == 'edit'){        
        dispatch(setOpportunityPageMode(pageModeEnum.Edit));
        navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/opportunity/update`);  
      }
      else if(type == 'delete'){
        openDeleteConfirmModal();
      }     
  };
    
    const openDeleteConfirmModal = () => {
      dispatch(setIsOpportunityDeletePopupOpen(true));
    };

    let args = {
        LeadId: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer?.[contactId[contactType]] : 0,
        CustomerCode: contactType != contactTypeEnum.lead ? selectedLeedOrCustomer.customerCode : '',
        EnduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
        ChildOriginators: ` (originator = '${originator.userName}')`, 
        OrderBy: "opportunity_id asc",
        StartIndex: 1,
        RowCount: 50
    }

    const contactID: any = selectedLeedOrCustomer?.[contactId[contactType]];    
    const payload = { args, contactID };
    const { leadCustomerOpportunityData, error, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = getLeadCustomerOpportunityList(payload, contactType);
    
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

    let opportunityGrid = new OpportunityGrid(handleRowPopupClick);
    return (
        <div>
            <DataGrid dataTable={opportunityGrid} data={leadCustomerOpportunityData} renderStatusContent={renderStatusContent} />
            <div ref={ref} style={{ height: '1px' }} />            
            <Dialog visible={isOpportunityDeletePopupOpen} onHide={closeDeleteModal} header='Warning!' className="custom-confirm-dialog">
              {(
              <div className="confirmation-box">
                  <p className="confirmation-text">
                      Are you sure you want to delete this opportunity?
                  </p>
                  <div className="button-container">
                      <button className="yes-button" onClick={deleteSelectedOpportunity}>
                          Yes
                      </button>
                      <button className="no-button" onClick={closeDeleteModal}>
                          No
                      </button>
                  </div>
              </div>
              )}
            </Dialog>
        </div>
    )
}