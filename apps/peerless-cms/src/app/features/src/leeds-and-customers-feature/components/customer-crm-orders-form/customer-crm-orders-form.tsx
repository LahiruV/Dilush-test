import { zodResolver } from "@hookform/resolvers/zod";
import { messageTypeEnum, pageModeEnum, RootState, setCrmOrdersPageMode, setSelectedCRMOrder, showMessage } from "@peerless-cms/store";
import { DataGrid, FormInput, ToastManager } from "@peerless/controls";
import { ReadOnlyProvider } from "@peerless/providers";
import MessageBox from "apps/peerless-cms/src/app/features-common-components/src/message-box/message-box";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { date, z } from "zod";
import { ListBox } from 'primereact/listbox';
import './customer-crm-orders-form.css';
import { CrmOrderCustomerPrice, getDate } from "@peerless/common";
import { completeCustomerOrder, getEmailAddresses, getResponseTime, getTIOEndUserPrice, getTIOEndUserPriceForReAssign, isTIOAcceptCustomer, reAssignTIOrder, reSendMail, saveCustomerOrder, saveTIOrder, useCustomerEnduserPriceData, useQueryBasedLookupData } from "@peerless/queries";
import { contactId, contactTypeEnum, mainListAPIPath, sectionPathMap } from "@peerless/utils";
import { useMutation } from "@tanstack/react-query";
import EditableDropdown from "libs/controls/src/editable-dropdown/editable-dropdown";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { RenderStatusContentTable } from "@peerless/models";

export interface CustomerCRMOrdersFormProps {}

export function CustomerCRMOrdersForm(props: CustomerCRMOrdersFormProps) {
    const formRef = useRef<HTMLFormElement | null>(null); 
    const dispatch = useDispatch();
    type FormFields = z.infer<typeof customerCRMOrderFormSchema>;
    const navigate = useNavigate();
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    
    const [selectedEmails, setSelectedEmails] = useState<any>(null);
    const [selectedResponseTime, setSelectedResponseTime] = useState<any>(null);
    const [pricingData, setPricingData] = useState<any>(null);
    const [isEnableEnduserQuery, setIsEnableEnduserQuery] = useState<any>(false);
    const [isCustListQueryEnabled, setIsCustListQueryEnabled] = useState(false);
    const [customerParams, setCustomerParams] = useState<any>(null);
    const [selectedCustomerCode, setSelectedCustomerCode] = useState<any>(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState<any>(false);
    const [isEnableReAssignEnduserQuery, setIsEnableReAssignEnduserQuery] = useState<any>(false);
    const [isSendingMail, setIsSendingMail] = useState(false);
    let submitType = 'save';
    let responseTimeList: any = [{label: '4', value: '4'}, {label: '8', value: '8'}, {label: '12', value: '12'}, {label: '24', value: '24'}, {label: '48', value: '48'}];

    const { selectedLeedOrCustomer, readonly, originator, loggedUser, crmOrdersPageMode, selectedCRMOrder, contactType, childOriginators } = useSelector((state: RootState) => ({    
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,
        originator: state.header.selectedOriginator,
        loggedUser: state.header.loggedUser,
        crmOrdersPageMode: state.leedsAndCustomers.crmOrdersPageMode,
        selectedCRMOrder: state.leedsAndCustomers.selectedCRMOrder,
        contactType: state.leedsAndCustomers.selectedContactType,
        childOriginators: state.header.childOriginators,
    }));

    const mutationSaveOrder = useMutation<any, Error, any>({
      mutationFn: (contactType == contactTypeEnum.customer ? saveCustomerOrder : saveTIOrder)
    });

    const mutationCompleteOrder = useMutation<any, Error, any>({
      mutationFn: completeCustomerOrder
    });

    const mutationReAssignOrder = useMutation<any, Error, any>({
      mutationFn: reAssignTIOrder
    });

    const mutationReSendEmail = useMutation<any, Error, any>({
      mutationFn: reSendMail
    });
    
    let custList: any = [];
    let defaultCustomer: any = {};
   
    let custListPayload = customerParams;  
    const { data: custListData, error: custListError, isLoading: isCustListLoading } = useQueryBasedLookupData(custListPayload, isCustListQueryEnabled); 

    if(isCustListLoading)      
      custList = [{label: 'Loading...', value: ''}];
      defaultCustomer = { label: selectedLeedOrCustomer?.customerName, value: selectedLeedOrCustomer?.customerCode };
    if(custListData){
          custList = custListData.map((item: { description: any; code: any; }) => ({
            label: item.description,
            value: item.code,
        }));         
        custList.push(defaultCustomer);
    }    

    useEffect(() => {
      if(crmOrdersPageMode != null && childOriginators != null && originator != null && crmOrdersPageMode == pageModeEnum.Edit){
        let lookupSqlKey = 'CustomerLookupByOrder';  
        let whereCls = " AND " + childOriginators + " Order By " + " name desc"; 
        let parameters = null;
        let hasArgs = true;
        let customerArgs = {
            ChildOriginators: childOriginators,
            DefaultDepartmentId: originator.defaultDepartmentId,
            Originator: originator.userName,
            OrderBy: ' name desc',
            StartIndex: 1,
            RowCount: 1000,
        }
        setCustomerParams({lookupSqlKey: lookupSqlKey, whereCls: whereCls, parameters: parameters, args: customerArgs, hasArgs: hasArgs });
        setIsCustListQueryEnabled(true);
      }
    }, [crmOrdersPageMode, childOriginators, originator]);

    useEffect(() => {
      if(crmOrdersPageMode == pageModeEnum.New){
        setSelectedCustomerCode(selectedLeedOrCustomer.customerCode);  
      }
      else{
        setSelectedCustomerCode(selectedCRMOrder.custCode); 
      }               
    }, [selectedCRMOrder, selectedLeedOrCustomer, crmOrdersPageMode])

    let args = {
      oderNumber: crmOrdersPageMode == pageModeEnum.Edit ? (contactType == contactTypeEnum.enduser ? selectedCRMOrder.tiOrderNumber : selectedCRMOrder.webId) : 0,
      custCode: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer.customerCode : crmOrdersPageMode == pageModeEnum.New ? selectedLeedOrCustomer.customerCode : selectedCRMOrder.custCode,
      endUserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
    }
    
    const { data: addressListData, error: addressListError, isLoading: isAddressesLoading } = getEmailAddresses(args, contactType); 

    let innerArgs: any = {
          custCode: selectedLeedOrCustomer.customerCode, 
          repCode: originator.repCode, 
          oderNumber: 0
    };

    let isCustomerQueryEnabled = contactType == contactTypeEnum.customer;
    const { data: priceData, status: customerStatus, error: custPriceDataError, isLoading: isPriceDataLoading } = useCustomerEnduserPriceData(innerArgs, isCustomerQueryEnabled); //for customer only

    const { data: isTIOAcceptCustomerResult, error: isTIOAcceptCustomerError, isLoading: isTIOAcceptCustomerLoading } = isTIOAcceptCustomer(selectedCustomerCode, (!isCustomerQueryEnabled));

    useEffect(() => {
      if(isTIOAcceptCustomerLoading == false && isTIOAcceptCustomerResult != null){
        if(isTIOAcceptCustomerResult == true){
          setIsEnableEnduserQuery(true);
          setIsButtonDisabled(false);
        }
        else{
          //setIsEnableEnduserQuery(false);
          setIsButtonDisabled(true);
          messageMgr.showMessage('error', 'Warning: ', 'Selected customer does not accept TIOs');
        }
      }
    }, [isTIOAcceptCustomerResult]);
    
    const enduserPriceArgs = {
      OderNumber: crmOrdersPageMode == pageModeEnum.New ? 0 : (contactType == contactTypeEnum.enduser ? selectedCRMOrder.tiOrderNumber : 0),
      CustCode: crmOrdersPageMode == pageModeEnum.New ? selectedLeedOrCustomer.customerCode : selectedCRMOrder.custCode, 
      EndUserCode: selectedLeedOrCustomer.endUserCode
    }    
    const { data: enduserPriceData, status: enduserStatus, error: enduserPriceDataError, isLoading: isEnduserPriceDataLoading } = getTIOEndUserPrice(enduserPriceArgs, isEnableEnduserQuery); //for enduser only
    
    //default response time
    const tioNo: any =  contactType == contactTypeEnum.enduser && crmOrdersPageMode == pageModeEnum.Edit ?  selectedCRMOrder.tiOrderNumber : 0;
    const { data: responseTimeData, error: responseTimeError, isLoading: isResponseTimeLoading } = getResponseTime(crmOrdersPageMode, tioNo); 

    useEffect(() => {
      setSelectedResponseTime(responseTimeData);
    }, [responseTimeData]);

    const reAssignEnduserPriceArgs = {
      OderNumber: crmOrdersPageMode == pageModeEnum.New ? 0 : (contactType == contactTypeEnum.enduser ? selectedCRMOrder.tiOrderNumber : 0),
      CustCode: selectedCustomerCode, 
      EndUserCode: selectedLeedOrCustomer.endUserCode
    }
    const { data: reAssignEnduserPriceData, status: reAssignStatus, error: reAssignEnduserPriceDataError, isLoading: isReAssignEnduserPriceDataLoading } = getTIOEndUserPriceForReAssign(reAssignEnduserPriceArgs, isEnableReAssignEnduserQuery); //for re-assign enduser only

    useEffect(() => {      
      if (contactType == contactTypeEnum.customer && priceData) {
        setPricingData(priceData);
      }
      else if (contactType == contactTypeEnum.enduser && enduserPriceData){
        setPricingData(enduserPriceData);
      }
      else if(contactType == contactTypeEnum.enduser && reAssignEnduserPriceData){
        setPricingData(reAssignEnduserPriceData);
      }
    }, [priceData, enduserPriceData, reAssignEnduserPriceData]);

    const customerCRMOrderFormSchema = z.object({
        orderNumber: z.string(), //.min(1, { message: 'Preffered Method is required' }), 
        dateRequired: z.string(),
        custCode: z.string(),
        enduserCode: z.string().optional(),
        specialInstructions: z.string().optional(),
        status: z.string(),
    });

    const methods = useForm<FormFields>({
        defaultValues: {
            orderNumber: crmOrdersPageMode === pageModeEnum.New ? '' : contactType == contactTypeEnum.customer ? selectedCRMOrder.webId.toString() : selectedCRMOrder.tiOrderNumber.toString(),
            dateRequired: (crmOrdersPageMode === pageModeEnum.New ? getDate() : getDate(selectedCRMOrder.orderDate)),
            custCode: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer?.name : crmOrdersPageMode == pageModeEnum.New ? selectedLeedOrCustomer?.customerName : selectedCRMOrder?.custCode,
            enduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer?.name : '',
            specialInstructions: (crmOrdersPageMode === pageModeEnum.New ? '' : selectedCRMOrder.orderNote),
            status: (crmOrdersPageMode === pageModeEnum.New ? 'New' : 'Edit'),
        },
        resolver: zodResolver(customerCRMOrderFormSchema),
    });

    useEffect(() => {
      if (crmOrdersPageMode != null && selectedLeedOrCustomer && custListData) {          
          methods.reset({           
            orderNumber: crmOrdersPageMode === pageModeEnum.New ? '' : contactType == contactTypeEnum.customer ? selectedCRMOrder.webId.toString() : selectedCRMOrder.tiOrderNumber.toString(),
            dateRequired: (crmOrdersPageMode === pageModeEnum.New ? getDate() : getDate(selectedCRMOrder.orderDate)),
            custCode: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer?.name : crmOrdersPageMode == pageModeEnum.New ? selectedCRMOrder?.customerName : selectedCRMOrder?.custCode,
            enduserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer?.name : '',
            specialInstructions: (crmOrdersPageMode === pageModeEnum.New ? '' : selectedCRMOrder.orderNote),
            status: (crmOrdersPageMode === pageModeEnum.New ? 'New' : 'Edit'),            
          });
      }
  }, [crmOrdersPageMode, selectedLeedOrCustomer, methods, custListData]);
    
    const convertToCustomerDetailEntities = (transferList: any) => {
      return transferList.map((transfer: any) => ({
        WebId: transfer.WebId ?? 0,
        CatlogCode: transfer.catlog_code,
        OrderQty: transfer.order_qty,
        UnitPrice: transfer.price,
        amount: transfer.amount,
        catlog_description: transfer.catlog_description,        
        BackOrderQty: 0,             
        UnitCost: 0,                 
        UnitDiscountPerc: 0,         
        SOrderNo: 0,
        Tax: 0,                      
        FreeQty: 0,                  
        ProductNote: '',             
        Version: 0,                  
        LastUpdate: new Date()       
      }));
    };

    const convertToEnduserDetailEntities = (transferList: any) => {
      return transferList.map((transfer: any) => ({
        TIOrderNumber: transfer.tiOrderNumber ?? 0,
        item_no: transfer.item_no ?? 0,
        catlog_code: transfer.catlog_code ?? '',
        source_code: transfer.source_code ?? 0,
        source_no: transfer.source_no ?? 0,
        order_qty: transfer.order_qty ?? 0,
        no_charge_qty: transfer.no_charge_qty ?? 0,
        desp_qty: transfer.desp_qty ?? 0,
        pallet_qty: transfer.pallet_qty ?? 0,
        bo_qty: transfer.bo_qty ?? 0,
        price: transfer.price ?? 0.0,
        amount: transfer.amount ?? 0.0,
        fc_price: 0,
        fc_amount: 0,
        disc_type: 0,
        disc_percent: 0,
        agg_disc_perc: 0,
        net_amount: 0,
        date_required: 0,
        rep_code: 0,
        date_despatched: 0,
        plist_no: 0,
        ivce_no: 0,
        analysis_code: 0,
        deal_no: 0,
        status: 0,
        res_status: 0,
        reserved_qty: 0,
        pick_dc: 0,
        cust_con_no_key_acc: 0,
        catlog_desc: transfer.catlog_description ?? '',
        used_flag: transfer.used_flag ?? '',
        id: transfer.deatilId ?? 0,
        TemplateId: 0 
      }));
    };

    const getSelectedAddresses = () => {
      if(selectedEmails != null){
        return selectedEmails.map((email: any) => ({
          CustCode: selectedLeedOrCustomer.customerCode,
          Email: email
        }));
      }
      return [];
    }
    
    const onSubmit = (data: FormFields) => {
      if(submitType == 'save'){
        saveOrder(data);
      }
      else{
        completeOrder(data);
      }
    }

    const getCustomerParameters = (data: FormFields) => {
      let custPayload = {
        WebId: crmOrdersPageMode === pageModeEnum.New ? 0 : selectedCRMOrder.webId,
        CustCode: selectedLeedOrCustomer?.[contactId[contactType]],        
        OrderDate: new Date(data.dateRequired),           
        OrderNote: data.specialInstructions,
        CustomerOrderDetails: convertToCustomerDetailEntities(pricingData),
        DateRequired: new Date(data.dateRequired),     
        Comments: '',
        PurchaseCode: '',
        Status: '',
        AssigneeNo: 0,
        Freight: 0,
        IsSaved: '',
        Version: 0,
        LastUpdate: new Date(),
        CustName: data.custCode,
        Mail: '',
        OrderBy: '',
        RepCode: loggedUser.repCode
      }

      return custPayload;
    }

    const getEnduserParameters = (data: FormFields) => {      
      let enduserPayload = {             
        Header: {
          OrderedBy: originator.userName,
          OrderDate: new Date(data.dateRequired),   
          RepCode: originator.repCode,
          TIOrderNumber: crmOrdersPageMode === pageModeEnum.New ? 0 : selectedCRMOrder.tiOrderNumber,
          EndUserCode: selectedLeedOrCustomer.endUserCode,    
          CustCode: crmOrdersPageMode == pageModeEnum.New ? selectedLeedOrCustomer.customerCode : data.custCode,
          MailResponseTime: selectedResponseTime,
        },
        Detail: convertToEnduserDetailEntities(pricingData),
        Email: selectedEmails != null && selectedEmails.length > 0 ? selectedEmails.join(',') : '',
      }
      return enduserPayload;
    }

    const [isSaving, setIsSaving] = useState(false);
    const saveOrder = (data: FormFields) => {
      let successSubUrl = contactType == contactTypeEnum.customer ? 'crm-orders' : 'tio-list';
      let payload: any = {};
      if(contactType == contactTypeEnum.customer){
        payload = getCustomerParameters(data);
      }
      else{
        payload = getEnduserParameters(data);
      }      
      setIsSaving(true);

      //re-assign if needed
      if(crmOrdersPageMode == pageModeEnum.Edit && data.custCode != selectedCRMOrder.custCode){
        let reAssignPayload = {OderNumber: selectedCRMOrder.tiOrderNumber, CustCode: selectedCRMOrder.custCode, EndUserCode: selectedCRMOrder.endUserCode, Status: 'R'}; //CustCode, and EndUserCode is not required here, just passing
        mutationReAssignOrder.mutate(reAssignPayload, {
          onSuccess: (response) => {
            if(response == true){
              messageMgr.showMessage('success', 'Success: ', 'Order Re-Assigned');
            }            
          },
          onError: (error) => {
            messageMgr.showMessage('error', 'Error: ', 'Error occured while updating the status');
          }
        });
      }

      mutationSaveOrder.mutate(payload, {
        onSuccess: (response) => {
          setIsSaving(false);
          if(contactType == contactTypeEnum.customer){
            if(response > 0){     
              if(crmOrdersPageMode == pageModeEnum.New){
                navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/${successSubUrl}`);   
              }       
              else{
                messageMgr.showMessage("success", 'Success', 'Order saved');
              }
            }
            else{
              messageMgr.showMessage("error", 'Error', 'Order did not save');
            }
          }
          else{ //enduser
            if(response.saveStatus > 0){      
              let updatedOrder = {
                ...selectedCRMOrder,
                tiOrderNumber: response.saveStatus,
                custCode: crmOrdersPageMode == pageModeEnum.New ? selectedLeedOrCustomer.customerCode : data.custCode,
              }            
              dispatch(setSelectedCRMOrder(updatedOrder));
              if(crmOrdersPageMode == pageModeEnum.New){                
                dispatch(setCrmOrdersPageMode(pageModeEnum.Edit));
              }
              messageMgr.showMessage("success", 'Success', 'Order saved');
              if(response.mailStatus == false){
                messageMgr.showMessage("error", 'Warning', 'Your TIO has not been emailed to the Distributor. Please try again using the Re-send button');
              }
            }
            else{
              messageMgr.showMessage("error", 'Error', 'Order did not save');
            }
          }          
        },
        onError: (error) => {
          setIsSaving(false);          
          console.error('Failed to update');
        }
      });
    }

    const [isCompleting, setIsCompleting] = useState(false);
    const completeOrder = (data: FormFields) => {
      const payload = {
        Header: {
          WebId: crmOrdersPageMode === pageModeEnum.New ? 0 : selectedCRMOrder.webId,
          CustCode: selectedLeedOrCustomer?.[contactId[contactType]],        
          OrderDate: new Date(data.dateRequired),           
          OrderNote: data.specialInstructions,
          CustomerOrderDetails: convertToCustomerDetailEntities(pricingData),
          DateRequired: new Date(data.dateRequired),     
          Comments: '',
          PurchaseCode: '',
          Status: '',
          AssigneeNo: 0,
          Freight: 0,
          IsSaved: '',
          Version: 0,
          LastUpdate: new Date(),
          CustName: data.custCode,
          Mail: '',
          OrderBy: '',
          RepCode: loggedUser.repCode
        },
        Addresses: getSelectedAddresses()
      }
      setIsCompleting(true);
      mutationCompleteOrder.mutate(payload, {
        onSuccess: (response) => {
          setIsCompleting(false);
          if(response > 0){ 
            if(crmOrdersPageMode == pageModeEnum.New){
              navigate(`${sectionPathMap[contactType]}${selectedLeedOrCustomer?.[contactId[contactType]]}/crm-orders`);   
            }       
            else{
              messageMgr.showMessage("success", 'Success: ', 'Order completed');
            }            
          }
          else{
            messageMgr.showMessage("error", 'Error: ', 'Order did not save');
          }
        },
        onError: (error) => {
          setIsCompleting(false);          
          console.error('Failed to update');
        }
      });
    }

    const handleExternalSubmit = (submitTypeName: string) =>{
      submitType = submitTypeName;
      if (formRef.current) {
        formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }

      // methods.handleSubmit( //to check form validation report
      //   (data) => {
      //     console.log("Validation passed! Form data:", data);
      //   },
      //   (errors) => {
      //     console.log("Validation failed! Errors:", errors);
      //   }
      // )();
    }

    const rowClassName = (rowData: any) => {
      return {
          'prev-ordered': rowData.isHighlighted === true
      };
    };

    let emailList: any;
    if(isAddressesLoading){
      emailList = 'Loading...'
    }

    useEffect(() => {
      if(addressListData){
        let emailProp = contactType == contactTypeEnum.customer ? 'email' : 'emailId';
        let selectedEmailList: any = [];
        addressListData.map((item: any) => {
          if (item?.isSelected) {
            selectedEmailList.push(item?.[emailProp]);
          }
        });
        setSelectedEmails(selectedEmailList);
      }
    },[addressListData]);

    if(addressListData){
      let emailProp = contactType == contactTypeEnum.customer ? 'email' : 'emailId';
      emailList = (<ListBox
        className="multi-select-list-box"
        listStyle={{ maxHeight: '150px', overflowY: 'auto' }}
        multiple
        options={
          addressListData == null
            ? []
            : addressListData.map((item: any, index: number) => ({
                label: item?.[emailProp],
                value: item?.[emailProp],
                key: `${item?.[emailProp]}-${index}`
              }))
        }
        value={selectedEmails}
        onChange={(e) => setSelectedEmails(e.value)}
      />);      
    }

    const onCellEditComplete = (e: any) => {
      let { rowData, newValue, field, originalEvent: event } = e;
      
      switch (field) {
        case 'order_qty':
          if (newValue >= 0) 
            rowData[field] = Number(newValue);
          else 
            event.preventDefault();
          break;
        case 'price':
          if (newValue >= 0) 
            rowData[field] = Number(newValue);
          else 
            event.preventDefault();
          break;
        default:
          if (newValue.trim().length > 0) 
            rowData[field] = newValue;
          else 
            event.preventDefault();
          break;
      }
      
      setPricingData((prevData: any) =>
        prevData.map((item: any) =>
          item.catlog_code === rowData.catlog_code ? { ...item, ...rowData } : item
        )
      );
    };
            
    const handleValueChange = (value: string) => {
      setSelectedResponseTime(value);
    }

    const handleCustomerChange = (event: any) => {
      setSelectedCustomerCode(event.target.value);
      setIsEnableReAssignEnduserQuery(true);
    }

    
    const handleResendEmail = () => {
      let reSendMailPayload = {
        OderNumber: selectedCRMOrder.tiOrderNumber, 
        Mail: (selectedEmails != null && selectedEmails.length > 0 ? selectedEmails.join(',') : ''),
        CustCode: '',
        EndUserCode: ''
      }
      setIsSendingMail(true);
      mutationReSendEmail.mutate(reSendMailPayload, {
        onSuccess: (response) => {
          setIsSendingMail(false);  
          if(response == true){
            messageMgr.showMessage('success', 'Success: ', 'Email sent');
          }   
                 
        },
        onError: (error) => {
          setIsSendingMail(false);  
          messageMgr.showMessage('error', 'Error: ', 'Email did not send. Please try again later');
        }
      });
    }

    const renderStatusContent = {
      isRenderStatusContentTable: true,
      status: (contactType == contactTypeEnum.customer ? customerStatus : (isEnableEnduserQuery ? enduserStatus : reAssignStatus)),
      isFetch: (isPriceDataLoading || isEnduserPriceDataLoading || isReAssignEnduserPriceDataLoading),
      error: (contactType == contactTypeEnum.customer ? custListError : (isEnableEnduserQuery ? enduserPriceDataError : reAssignEnduserPriceDataError)),
      isStatusOutput: true
    } as RenderStatusContentTable;

    const crmOrderCustomerPriceTable = new CrmOrderCustomerPrice(contactType, onCellEditComplete);

    return (
        <div className='content margin-top-20'>    
            <ToastMessages ref={messagesRef} />        
            <ReadOnlyProvider readOnly={false} section='crmOrdersForm'>
              <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
                <FormProvider {...methods}>
                  <div className='form-group-container'>
                    <div className='form-group'>
                      <span>Order Details</span>
                      <FormInput label='Order Number' name='orderNumber' isDisabled={true} />
                      <FormInput label='Date Required' name='dateRequired' type="date" />
                      {contactType == contactTypeEnum.customer && <FormInput label='Special Instruction' name='specialInstructions' />}
                      <FormInput label='Status' name='status' isDisabled={true} />
                      {contactType == contactTypeEnum.enduser && <EditableDropdown label="Response Time (Hrs)" options={responseTimeList} selectedValue={responseTimeData} onChange={handleValueChange} />}
                    </div>
                    <div className='form-group'>
                      <span>Customer Details</span>                      
                      <FormInput label='Customer' name='custCode' isDisabled={crmOrdersPageMode == pageModeEnum.New} type={crmOrdersPageMode == pageModeEnum.Edit ? 'select' : 'text'} comboBoxOptions={custList} onChangeCallBack={handleCustomerChange}  /> 
                      {contactType == contactTypeEnum.enduser && <FormInput label='Enduser' name='enduserCode' isDisabled={true} />}
                      <div className="control-label">Customer Email Addresses</div>
                      {emailList}
                    </div>                    
                  </div>    
                </FormProvider>
              </form>
            </ReadOnlyProvider>
            
            <div className='prev-ordered-products'>
              <div className="indicator-container">
                <span className="prev-order-indicator-color"></span>
                <span className="common-indicator-text">Previously ordered</span>
              </div>    
              <DataGrid dataTable={crmOrderCustomerPriceTable} data={pricingData} scrollHeight={'240px'} editMode={'cell'} rowClassName={rowClassName} renderStatusContent={renderStatusContent} />
            </div>

            <footer>
                <div className='form-button-container'>   
                    <span>Make sure you have verified all your changes before update</span> 
                    {crmOrdersPageMode === pageModeEnum.New ? (<Button disabled={isSaving || isCompleting || isButtonDisabled} type='button' variant='outline-dark' className='btn-submit'
                     onClick={() => handleExternalSubmit('save')}>
                        {isSaving ? 'Saving...' : 'Save Order'}
                    </Button>) : 
                    (<>
                      <Button disabled={isSaving || isCompleting || isButtonDisabled} type='button' variant='outline-dark' className='btn-submit' onClick={() => handleExternalSubmit('save')}>
                          {isSaving ? 'Updating...' : 'Update Order'}
                      </Button>

                      {contactType == contactTypeEnum.enduser && <Button disabled={isCompleting || isSaving || isSendingMail} type='button' variant='outline-dark' className='btn-submit' onClick={() => handleResendEmail()}>
                      {isSendingMail ? 'Sending...' : 'Re-Send Email'}
                      </Button>}
                    </>)
                    
                    }
                    {contactType == contactTypeEnum.customer && <Button disabled={isCompleting || isSaving} type='button' variant='outline-dark' className='btn-submit' onClick={() => handleExternalSubmit('complete')}>
                        {isCompleting ? 'Completing...' : 'Complete Order'}
                    </Button> }                    
                </div>
            </footer>
            
            <MessageBox />
        </div>        
    )
}