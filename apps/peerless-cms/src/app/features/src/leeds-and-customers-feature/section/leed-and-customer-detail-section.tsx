import { RootState, setSelectedLeedOrCustomer, updateDetails } from "@peerless-cms/store";
import { useDispatch, useSelector } from "react-redux";
import SectionMainBase from "../../lib/section-main-base";
import { FeaturesBase } from "@peerless-cms/features";
import { CustomerEnduserListFilters, CustomerSalesHistoryFilters, EnduserPriceFilters, EnduserSalesFilters, LeedsAndCustomersAreas } from "../components";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './leed-and-customer-detail-section.css'
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import { CustomerPriceFilters } from "../components/customer-price/customer-price-filters";
import { useMutation } from "@tanstack/react-query";
import { convertLeadToCustomer, toggleUserActiveStatus } from "@peerless/queries";
import { Dialog } from "primereact/dialog";
import { ToastManager } from "@peerless/controls";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { contactId, contactName, contactTypeEnum } from "@peerless/utils";
import { Tooltip } from "primereact/tooltip";
import { Checkbox } from "primereact/checkbox";
import { LeedCustomerAddressListFilters } from "../components/leed-customer-address-list/leed-customer-address-list-filters";

/* eslint-disable-next-line */
export interface LeedAndCustomerDetailSectionProps {}

export function LeedAndCustomerDetailSection(props: LeedAndCustomerDetailSectionProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const [isDeActivated, setIsDeActivated] = useState(false);
  const [isActiveStatusOpen, setIsActiveStatusOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isShowError, setIsShowError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConvertToCustomerOpen, setIsConvertToCustomer] = useState(false);
  const [leadConvertionChecklist, setLeadConversionChecklist] = useState({
    user: false,
    opportunity: false,
    product: false,
    volume: false,
    value: false,
  });

  const { selectedLeedOrCustomer, articleAddress, contactType, loggedUser, originator, filter } = useSelector((state: RootState) => ({    
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,    
    articleAddress: state.leedsAndCustomers.articleAddress,
    contactType: state.leedsAndCustomers.selectedContactType,
    loggedUser: state.header.loggedUser,
    originator: state.header.selectedOriginator,
    filter: state.leedsAndCustomers.filter.status,
  }));

  useEffect(() => {
    if(filter == '0'){
      setIsDeActivated(false);
    }
    else{
      setIsDeActivated(true);
    }
  }, [filter]);
  
  const mutationToggleActivation = useMutation<any, Error, any>({
    mutationFn: toggleUserActiveStatus
  });

  const mutationConvertLeadToCustomer = useMutation<any, Error, any>({
    mutationFn: convertLeadToCustomer
  });
  
  const parts = articleAddress.split(',');

  const onClickBackToList = () => {
    navigate(`/leeds-and-customers/`);
  }

  const handleActivateDeactivate = (isDeActivated: boolean) => {
    setIsDeActivated(isDeActivated);
    setIsActiveStatusOpen(true);    
  }

  const closeActiveStatusModal = () => {
    setIsShowError(false);
    setIsActiveStatusOpen(false);
    setReason('');
  }

  const toggleActivation = () => {
    if(contactType == contactTypeEnum.customer && (reason == null || reason.length == 0)){
      setIsShowError(true);
      return;
    }
    else{
      setIsShowError(false);
    }

    if(contactType == contactTypeEnum.customer){
      //customer activate/deactivate
      const payload = {
        args:{
          CustCode: selectedLeedOrCustomer.customerCode,
          IsHide: !isDeActivated,
          Description: reason,
          Rep: loggedUser.userName,
        },
        contactType: contactType        
      }
      setIsProcessing(true);
      mutationToggleActivation.mutate(payload, {
        onSuccess: (response: any) => {    
          setIsProcessing(false);
          closeActiveStatusModal(); 
          if(response){       
            const updatedCustomer = {
              ...selectedLeedOrCustomer,
              displayInCrm: !isDeActivated,
              hideReason: reason,
            }
            dispatch(setSelectedLeedOrCustomer(updatedCustomer));   
            setIsDeActivated(!isDeActivated);
            messageMgr.showMessage('success', 'Success: ', `${isDeActivated ? 'Deactivated' : 'Activated'}`);
          }
          else{
            messageMgr.showMessage('error', 'Error: ', 'Error occured while updating');
          }        
        },
        onError: (error: any) => {       
          setIsProcessing(false);
          closeActiveStatusModal(); 
          messageMgr.showMessage('error', 'Error: ', 'Error occured while updating');
          console.error('Failed to update');
        }
      });
    }
    else if(contactType == contactTypeEnum.lead){
      //lead activate/deactivate
      const payload = {
        args:{
          LeadId: selectedLeedOrCustomer.sourceId,
          Activate: !isDeActivated,
          UserName: loggedUser.userName,
        },
        contactType: contactType        
      }
      setIsProcessing(true);
      mutationToggleActivation.mutate(payload, {
        onSuccess: (response: any) => {    
          setIsProcessing(false);
          closeActiveStatusModal(); 
          if(response){       
            const updatedCustomer = {
              ...selectedLeedOrCustomer,
              isDeleted: !isDeActivated ? 'N' : 'Y',
            }
            dispatch(setSelectedLeedOrCustomer(updatedCustomer));   
            setIsDeActivated(!isDeActivated);
            messageMgr.showMessage('success', 'Success: ', `${isDeActivated ? 'Deactivated' : 'Activated'}`);
          }
          else{
            messageMgr.showMessage('error', 'Error: ', 'Error occured while updating');
          }        
        },
        onError: (error: any) => {       
          setIsProcessing(false);
          closeActiveStatusModal(); 
          messageMgr.showMessage('error', 'Error: ', 'Error occured while updating');
          console.error('Failed to update');
        }
      });
    }    
    else{
      //enduser activate/deactivate      
      const payload = {
        args: {
          EnduserCode: selectedLeedOrCustomer.endUserCode,
          Status: !isDeActivated,
        },
        contactType: contactType        
      }
      setIsProcessing(true);
      mutationToggleActivation.mutate(payload, {
        onSuccess: (response: any) => {       
          setIsProcessing(false); 
          closeActiveStatusModal();
          if(response){      
            const updatedCustomer = {
              ...selectedLeedOrCustomer,
              isActive: !isDeActivated,
            }
            dispatch(setSelectedLeedOrCustomer(updatedCustomer));  
            setIsDeActivated(!isDeActivated);
            messageMgr.showMessage('success', 'Success: ', `${isDeActivated ? 'Deactivated' : 'Activated'}`);
          }
          else{
            messageMgr.showMessage('error', 'Error: ', 'Error occured while updating');
          }        
        },
        onError: (error: any) => {       
          setIsProcessing(false);
          closeActiveStatusModal();
          messageMgr.showMessage('error', 'Error: ', 'Error occured while updating');
          console.error('Failed to update');
        }
      });
    }
  }

  const handleReasonChange = (e: any) => {
    setReason(e.target.value);
  };

  const openConvertToCustomer = () => {
    setIsConvertToCustomer(true);    
  }

  const closeConvertToCustomer = () => {    
    setIsConvertToCustomer(false);
    setLeadConversionChecklist({
      user: false,
      opportunity: false,
      product: false,
      volume: false,
      value: false,
    });
  }

  const toggleCheckListItem = (key: any) => {
    setLeadConversionChecklist((prev: any) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(leadConvertionChecklist).every((checked) => checked);

  const handleLeadConversion = () => {
    const payload = {
      LeadID: selectedLeedOrCustomer.sourceId,
      DefaultDepartmentId: originator.defaultDepartmentId,
      Originator: originator.userName,
      LeadName: selectedLeedOrCustomer.name,   
    }
    setIsProcessing(true);
    mutationConvertLeadToCustomer.mutate(payload, {
      onSuccess: (response: any) => {       
        setIsProcessing(false); 
        closeConvertToCustomer();
        if(response){      
          const updatedCustomer = {
            ...selectedLeedOrCustomer,
            leadStage: 'Customer',
          }
          dispatch(setSelectedLeedOrCustomer(updatedCustomer));  
            messageMgr.showMessage('success', 'Success: ', 'Request sent');
          }
          else{
            messageMgr.showMessage('error', 'Error: ', 'Error occured while converting');
          }        
      },
      onError: (error: any) => {       
        setIsProcessing(false);
        closeConvertToCustomer();
        messageMgr.showMessage('error', 'Error: ', 'Error occured while converting');
        console.error('Failed to update');
      }
    });
  }
  
  const showSalesHistoryFilters = location.pathname === '/leeds-and-customers/customer/'+ selectedLeedOrCustomer.customerCode +'/sales-history';
  const showCustomerEnduserFilters = location.pathname === '/leeds-and-customers/customer/'+ selectedLeedOrCustomer.customerCode +'/endusers';
  const showCustomerPriceFilters = location.pathname === '/leeds-and-customers/customer/'+ selectedLeedOrCustomer.customerCode +'/customer-price';
  const showEnduserSalesFilters = location.pathname === '/leeds-and-customers/enduser/'+ selectedLeedOrCustomer.endUserCode +'/sales';
  const showEnduserPriceFilters = location.pathname === '/leeds-and-customers/enduser/'+ selectedLeedOrCustomer.endUserCode +'/enduser-price';
  const showCustomerAddressFilters = location.pathname === '/leeds-and-customers/customer/'+ selectedLeedOrCustomer.customerCode +'/addresses';

  const getFiltersContent = () => {
    const filters = [
      showSalesHistoryFilters && <CustomerSalesHistoryFilters />,
      showCustomerEnduserFilters && <CustomerEnduserListFilters />,
      showCustomerPriceFilters && <CustomerPriceFilters />,
      showEnduserSalesFilters && <EnduserSalesFilters />,
      showEnduserPriceFilters && <EnduserPriceFilters />,
      showCustomerAddressFilters && <LeedCustomerAddressListFilters />,
    ].filter(Boolean);
  
    return filters.length > 0 ? <>{filters}</> : null;
  };

  const aside = (
    <div className="lead-list-aside-container">
      <ToastMessages ref={messagesRef} />
      <div className="company-info">
        <div className="company-header">
          <FontAwesomeIcon icon={fa.faSuitcase} size='1x' />
          <span className="company-name">{ selectedLeedOrCustomer?.[contactName[contactType]] }</span>
        </div>
        <div className="company-address">
          {/* {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < parts.length - 1 ? ',' : ''}
              <br />
            </React.Fragment>
          ))} */}
          { selectedLeedOrCustomer?.[contactId[contactType]] }
        </div>
        <div className="company-status">
          <span className={isDeActivated? "status-badge-success" : "status-badge-danger"}>{isDeActivated ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      <div className="options-button-container">
        <button type="button" className="back-button" onClick={onClickBackToList}>
          <FontAwesomeIcon icon={fa.faArrowLeft} size='1x' /> Back to List
        </button>
      </div>      
      {
        ((contactType == contactTypeEnum.lead && selectedLeedOrCustomer != null && selectedLeedOrCustomer.leadStage == 'Customer') ? <span className="highlighted-red"><FontAwesomeIcon icon={fa.faCheck} size='1x' /> Request Sent</span> :          
        ((contactType == contactTypeEnum.customer && selectedLeedOrCustomer.displayInCrm == true) || 
        (contactType == contactTypeEnum.lead && selectedLeedOrCustomer.displayInCrm == true && selectedLeedOrCustomer.isDeleted != 'Y') || 
        (contactType == contactTypeEnum.enduser && selectedLeedOrCustomer.isActive == true)) ? 
        <div className="options-button-container border-top">
          <button type="button" className="deactivate-button" onClick={(e) => handleActivateDeactivate(true)}>
            <FontAwesomeIcon icon={fa.faBan} size='1x' /> Deactivate
          </button>
        </div>
      :
        <div className="options-button-container border-top">
          <button type="button" className="activate-button" onClick={(e) => handleActivateDeactivate(false)}>
            <FontAwesomeIcon icon={fa.faPowerOff} size='1x' /> Activate
          </button>
        </div>)
      }

      {(contactType == contactTypeEnum.lead && selectedLeedOrCustomer.leadStage == 'EndUser') ? <span className="highlighted-red"><FontAwesomeIcon icon={fa.faCheckCircle } size='1x' /> Enduser</span> : ''}

      {
        selectedLeedOrCustomer.hideReason != null && selectedLeedOrCustomer.hideReason.length > 0 &&
        <div className="text-center">
            <i
            className="pi pi-info-circle info-icon"
            data-pr-tooltip={selectedLeedOrCustomer.hideReason}
            data-pr-position="right"
            >
              <span className="tool-tip-text">{ selectedLeedOrCustomer.displayInCrm == true ? 'Activate Reason' : 'Deactivate Reason'}</span>
            </i>
            
            <Tooltip className="tool-tip-content" target=".info-icon" />
        </ div>        
      }

      {
        (contactType == contactTypeEnum.lead && selectedLeedOrCustomer.leadStage != 'Customer' && selectedLeedOrCustomer.leadStage != 'EndUser') ?
        <button type="button" className="convert-to-customer-button" onClick={(e) => openConvertToCustomer()}>
          <FontAwesomeIcon icon={fa.faExchangeAlt} size='1x' /> Convert To Customer
        </button>
        : ''
      }
      
      <LeedsAndCustomersAreas cssClasses=" border-bottom" />
      {/* {showSalesHistoryFilters && <CustomerSalesHistoryFilters />}
      {showCustomerEnduserFilters && <CustomerEnduserListFilters />}
      {showCustomerPriceFilters && <CustomerPriceFilters />}
      {showEnduserSalesFilters && <EnduserSalesFilters />}
      {showEnduserPriceFilters && <EnduserPriceFilters />}       */}

      <Dialog visible={isActiveStatusOpen} onHide={closeActiveStatusModal} header='Confirm' className="custom-confirm-dialog">
        {(
        <div className="confirmation-box no-padding">
            <div className="confirm-body">
            {isShowError && <span className="error margin-10 block">Please enter the reason</ span>}
              { contactType == contactTypeEnum.customer ?
                <div className="inline-form">
                  <label>Reason</ label> 
                  <input type="text" className="txt-form-control form-control" value={reason} onChange={handleReasonChange} />  
                </div>
              :
                <div>Are you sure you want to {isDeActivated ? 'deactivate' : 'activate'} ?</div>
              }             
            </div>
            <div className="button-container margin-top-10 padding-right-30 float-right">                
                <button disabled={isProcessing} className="button-green" onClick={toggleActivation}>
                    {isDeActivated ? (isProcessing? 'Deactivating...' : 'Deactivate') : (isProcessing? 'Activating...' : 'Activate')}
                </button>
                <button disabled={isProcessing} className="button-red" onClick={closeActiveStatusModal}>
                    Cancel
                </button>                
            </div>           
        </div>
        )}
      </Dialog>

      <Dialog visible={isConvertToCustomerOpen} onHide={closeConvertToCustomer} header='Checklist' className="custom-confirm-dialog">
        {(
        <div className="confirmation-box no-padding">
            <div className="confirm-body">
              {allChecked ? (
                  <div className="success-message-dialog">
                      <i className="pi pi-check-circle success-icon"></i>Please proceed to convert. 
                  </div>
              ) : (
                  <div className="error-message-dialog">
                      Please complete the checklist before proceeding.
                  </div>
              )}
              <div className="checklist-container">
                  <div className="p-field-checkbox">
                      <Checkbox
                          inputId="user"
                          checked={leadConvertionChecklist.user}
                          onChange={() => toggleCheckListItem("user")}
                      />
                      <label htmlFor="user">Identify User</label>
                  </div>
                  <div className="p-field-checkbox">
                      <Checkbox
                          inputId="opportunity"
                          checked={leadConvertionChecklist.opportunity}
                          onChange={() => toggleCheckListItem("opportunity")}
                      />
                      <label htmlFor="opportunity">Identify Opportunity</label>
                  </div>
                  <div className="p-field-checkbox">
                      <Checkbox
                          inputId="product"
                          checked={leadConvertionChecklist.product}
                          onChange={() => toggleCheckListItem("product")}
                      />
                      <label htmlFor="product">Identify Product</label>
                  </div>
                  <div className="p-field-checkbox">
                      <Checkbox
                          inputId="volume"
                          checked={leadConvertionChecklist.volume}
                          onChange={() => toggleCheckListItem("volume")}
                      />
                      <label htmlFor="volume">Identify Volume</label>
                  </div>
                  <div className="p-field-checkbox">
                      <Checkbox
                          inputId="value"
                          checked={leadConvertionChecklist.value}
                          onChange={() => toggleCheckListItem("value")}
                      />
                      <label htmlFor="value">Identify Value</label>
                  </div>
              </div>
            </div>
            <div className="button-container margin-top-10 padding-right-30 float-right">                
                <button disabled={isProcessing || !allChecked} className={isProcessing || !allChecked ? 'button-green-disabled' : 'button-green'} onClick={handleLeadConversion}>
                    {(isProcessing? 'Converting...' : 'Convert')}
                </button>
                <button disabled={isProcessing} className="button-red" onClick={closeConvertToCustomer}>
                    Cancel
                </button>                
            </div>           
        </div>
        )}
      </Dialog>

    </div>
  );
 
  const main = <SectionMainBase main={<Outlet />}></SectionMainBase>;

  return <FeaturesBase aside={aside} main={main} filters={getFiltersContent()} cssClass='min-width-auto' isDefaultCollapsed={false} />;
}

