import { zodResolver } from '@hookform/resolvers/zod';
import { RootState, messageTypeEnum, pageModeEnum, setIsAddLeadModalOpen, setSelectedLeedOrCustomer, showMessage, updateDetails } from '@peerless-cms/store';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';
import SectionMainBase from '../../../lib/section-main-base';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { Alert, Button } from 'react-bootstrap';
import { ReadOnlyProvider } from '@peerless/providers';
import { ButtonWidget, FormInput, ToastManager } from '@peerless/controls';
import { useEffect, useRef, useState } from 'react';
import { Args, LeadEntryParameters } from '@peerless/models';
import { saveLead, useContactsByOrigin, useLookupData } from '@peerless/queries';
import { useMutation } from '@tanstack/react-query';
import MessageBox from 'apps/peerless-cms/src/app/features-common-components/src/message-box/message-box';
import './lead-customer-details.css';
import ToastMessages from 'libs/controls/src/toasts-message/messages';
import { contactTypeEnum, contactTypeName } from '@peerless/utils';
import { format } from 'date-fns';
import { toast } from 'sonner';


export interface LeedsCustomersDetailProps {
  refetchList?: any;
  messageMgr?: any;
  hideHeader?: boolean,
}

const error: boolean = false;
const leadCustomerDetailSchema = z.object({
  name: z.string().min(1, { message: 'name is required' }),
  company: z.string(), //.min(1, { message: 'City is required' }),
  city: z.string()
    .min(1, { message: 'City is required' })
    .min(3, { message: 'City must be at least 3 characters' }), //.max(3, { message: 'The state should not exceed 3 digits' }),
  state: z.string().min(1, { message: 'State is required' })
    .min(3, { message: 'State must be at least 3 characters' }), //.max(3, { message: 'The postcode should not exceed 3 digits' }),
  market: z.string(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The phone should include 10 digits' }),
  source: z.string(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The mobile should include 10 digits' }),
  subMarket: z.string(), //.min(1, { message: 'Fax is required' }),
  noOfEmployees: z.string(), //.min(1, { message: 'Website is required' }),
  annualRevenue: z.string(), //.min(1, { message: 'Email is required' }),
  leadType: z.string(), //.min(1, { message: 'Preffered Method is required' }),
  businessPotential: z.string(),
  referredBy: z.string(),
  assignedTo: z.string(),
  potentialOpportunity: z.string(),
  potentialLiters: z.string(),
  description: z.string()
});

export function LeedsCustomersDetails(props: LeedsCustomersDetailProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const [isSaving, setIsSaving] = useState(false);

  const mutation = useMutation<any, Error, LeadEntryParameters>({
    mutationFn: saveLead
  });

  const { selectedLeedOrCustomer, readonly, originator, loggedUser, leadDetailPageMode, contactType } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    readonly: state.leedsAndCustomers.readonly,
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    leadDetailPageMode: state.leedsAndCustomers.leadDetailPageMode,
    contactType: state.leedsAndCustomers.selectedContactType,
  }));

  let isNewLead = false;
  if (leadDetailPageMode == pageModeEnum.New) {
    isNewLead = true;
  }

  type FormFields = z.infer<typeof leadCustomerDetailSchema>;

  let defaultDepartmentId: string = originator.defaultDepartmentId;
  let sTableID: string = 'MRKT';
  let payload = { sTableID, defaultDepartmentId };
  const { data: marketData, error: marketError, isLoading: isMarketLoading } = useLookupData(payload);

  //let potentialOpportunity = [{label: 'Weekly', value: 'W'}, {label: 'Monthly', value: 'M'}, {label: 'Yearly', value: 'Y'}]
  let marketComboData: any = []
  let subMarketComboData: any = [];
  let sourceComboData: any = [];
  let leadTypeComboData: any = [];
  let assignedToComboData: any = [];
  let potentialOpportunityComboData: any = [];

  if (isMarketLoading)
    marketComboData = [{ label: 'Loading...', value: '' }];

  let defaultMarket: any = '';
  if (marketData) {
    defaultMarket = marketData.find((item: any) => item.defaultValue === 'Y').tableCode;
    marketComboData = marketData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  defaultDepartmentId = originator.defaultDepartmentId;
  sTableID = 'CHAN';
  payload = { sTableID, defaultDepartmentId };
  const { data: subMarketData, error: subMarketError, isLoading: isSubMarketLoading } = useLookupData(payload);

  if (isSubMarketLoading)
    subMarketComboData = [{ label: 'Loading...', value: '' }];

  let defaultSubMarket: any = '';
  if (subMarketData) {
    defaultSubMarket = subMarketData.find((item: any) => item.defaultValue === 'Y').tableCode;
    subMarketComboData = subMarketData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  defaultDepartmentId = originator.defaultDepartmentId;
  sTableID = 'SRCE';
  payload = { sTableID, defaultDepartmentId };
  const { data: sourceData, error: sourceError, isLoading: isSourceLoading } = useLookupData(payload);

  if (isSourceLoading)
    sourceComboData = [{ label: 'Loading...', value: '' }];

  let defaultSource: any = '';
  if (sourceData) {
    defaultSource = sourceData.find((item: any) => item.defaultValue === 'Y').tableCode;
    sourceComboData = sourceData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  defaultDepartmentId = originator.defaultDepartmentId;
  sTableID = 'LTYP';
  payload = { sTableID, defaultDepartmentId };
  const { data: leadTypeData, error: leadTypeError, isLoading: isLeadTypeLoading } = useLookupData(payload);

  if (isLeadTypeLoading)
    leadTypeComboData = [{ label: 'Loading...', value: '' }];

  let defaultLeadType: any = '';
  if (leadTypeData) {
    defaultLeadType = leadTypeData.find((item: any) => item.defaultValue === 'Y').tableCode;
    leadTypeComboData = leadTypeData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  if (isNewLead) {
    assignedToComboData = [{ label: loggedUser.userName, value: loggedUser.userName }];
  }
  else {
    assignedToComboData = [{ label: selectedLeedOrCustomer.originator, value: selectedLeedOrCustomer.originator }];
  }

  potentialOpportunityComboData = [{ label: 'Weekly', value: 'W' }, { label: 'Monthly', value: 'M' }, { label: 'Yearly', value: 'Y' }];

  const methods = useForm<FormFields>({
    defaultValues: {
      name: isNewLead ? '' : selectedLeedOrCustomer.name ?? '',
      company: isNewLead ? '' : selectedLeedOrCustomer.company ?? '',
      city: isNewLead ? '' : selectedLeedOrCustomer.city ?? '',
      state: isNewLead ? '' : selectedLeedOrCustomer.state ?? '',
      market: isNewLead ? '' : selectedLeedOrCustomer.industry ?? 'FSER',
      source: isNewLead ? '' : selectedLeedOrCustomer.leadSource ?? 'NONE',
      subMarket: isNewLead ? '' : selectedLeedOrCustomer.business ?? 'FOOD',
      noOfEmployees: isNewLead ? '' : (!selectedLeedOrCustomer.noOfEmployees ? '' : selectedLeedOrCustomer.noOfEmployees.toString()),
      annualRevenue: isNewLead ? '' : (!selectedLeedOrCustomer.annualRevenue ? '' : selectedLeedOrCustomer.annualRevenue.toString()),
      leadType: isNewLead ? '' : selectedLeedOrCustomer.leadType ?? defaultLeadType,
      businessPotential: isNewLead ? '' : selectedLeedOrCustomer.businessPotential ?? '',
      referredBy: isNewLead ? '' : selectedLeedOrCustomer.referredBy ?? '',
      assignedTo: isNewLead ? '' : selectedLeedOrCustomer.originator ?? '',
      potentialOpportunity: isNewLead ? 'W' : selectedLeedOrCustomer.litersBy ?? 'W',
      potentialLiters: isNewLead ? '' : selectedLeedOrCustomer.potentialLiters ?? '',
      description: isNewLead ? '' : selectedLeedOrCustomer.description ?? '',
    },
    resolver: zodResolver(leadCustomerDetailSchema),
  });

  useEffect(() => {
    if (leadTypeData != null && marketData != null && subMarketData != null && sourceData != null && loggedUser != null) {
      methods.reset({
        name: isNewLead ? '' : selectedLeedOrCustomer.name ?? '',
        company: isNewLead ? '' : selectedLeedOrCustomer.company ?? '',
        city: isNewLead ? '' : selectedLeedOrCustomer.city ?? '',
        state: isNewLead ? '' : selectedLeedOrCustomer.state ?? '',
        market: isNewLead ? defaultMarket : selectedLeedOrCustomer.industry ?? defaultMarket,
        source: isNewLead ? defaultSource : selectedLeedOrCustomer.leadSource ?? defaultSource,
        subMarket: isNewLead ? defaultSubMarket : selectedLeedOrCustomer.business ?? defaultSubMarket,
        noOfEmployees: isNewLead ? '' : (!selectedLeedOrCustomer.noOfEmployees ? '' : selectedLeedOrCustomer.noOfEmployees.toString()),
        annualRevenue: isNewLead ? '' : (!selectedLeedOrCustomer.annualRevenue ? '' : selectedLeedOrCustomer.annualRevenue.toString()),
        leadType: isNewLead ? defaultLeadType : selectedLeedOrCustomer.leadType ?? '',
        businessPotential: isNewLead ? '' : selectedLeedOrCustomer.businessPotential ?? '',
        referredBy: isNewLead ? '' : selectedLeedOrCustomer.referredBy ?? '',
        assignedTo: isNewLead ? loggedUser.userName : selectedLeedOrCustomer.originator ?? loggedUser.userName,
        potentialOpportunity: isNewLead ? 'W' : selectedLeedOrCustomer.litersBy ?? 'W',
        potentialLiters: isNewLead ? '' : selectedLeedOrCustomer.potentialLiters ?? '',
        description: isNewLead ? '' : selectedLeedOrCustomer.description ?? '',
      });
    }
  }, [methods, leadTypeData, marketData, subMarketData, sourceData, loggedUser]);

  const onSubmit = (data: FormFields) => {
    const argObj: Args = { childOriginators: '' };
    const payload: LeadEntryParameters = {
      LeadID: isNewLead ? 0 : selectedLeedOrCustomer.sourceId,
      LeadName: data.name,
      Originator: data.assignedTo,
      LeadSource: data.source,
      Company: (!data.company || data.company.length == 0) ? data.name : data.company,
      Business: data.subMarket,
      Rating: isNewLead ? 0 : selectedLeedOrCustomer.rating,
      Website: isNewLead ? '' : selectedLeedOrCustomer.website ?? '',
      Industry: data.market,
      NoOfEmployees: Number(data.noOfEmployees),
      AnnualRevenue: Number(data.annualRevenue),
      LeadStatus: isNewLead ? '' : selectedLeedOrCustomer.leadStatus,
      Telephone: isNewLead ? '' : selectedLeedOrCustomer.phone ?? '',
      Fax: isNewLead ? '' : selectedLeedOrCustomer.fax ?? '',
      Mobile: isNewLead ? '' : selectedLeedOrCustomer.mobile,
      EmailAddress: isNewLead ? '' : selectedLeedOrCustomer.email,
      Address: isNewLead ? '' : selectedLeedOrCustomer.address,
      City: data.city,
      State: data.state,
      PostCode: isNewLead ? '' : selectedLeedOrCustomer.postcode ?? '',
      ReferredBy: data.referredBy,
      Probability: isNewLead ? 0 : selectedLeedOrCustomer.probability ?? 0,
      Description: data.description,
      PreferredContact: isNewLead ? '' : selectedLeedOrCustomer.prefferedMethod ?? '',
      BusinessPotential: data.businessPotential,
      Country: isNewLead ? '' : selectedLeedOrCustomer.country,
      LastModifiedBy: loggedUser.userName,
      LastModifiedDate: new Date(),
      LeadStageID: isNewLead ? 1 : selectedLeedOrCustomer.leadStageId ?? 1,
      CustCode: isNewLead ? '' : selectedLeedOrCustomer.customerCode,
      LitersBy: data.potentialOpportunity ?? '',
      PotentialLiters: Number(data.potentialLiters),
      RepGroupID: isNewLead ? 0 : selectedLeedOrCustomer.repGroupId ?? 0,
      LeadType: data.leadType ?? '',
      OrgId: isNewLead ? 0 : selectedLeedOrCustomer.orgId,
      CreatedBy: isNewLead ? loggedUser.userName : selectedLeedOrCustomer.createdBy ?? '',
      CreatedDate: isNewLead ? new Date() : selectedLeedOrCustomer.createdDate,
      DelFalg: isNewLead ? '' : selectedLeedOrCustomer.delFalg ?? '',
      LastCalledDate: isNewLead ? null : selectedLeedOrCustomer.lastCalledDate ?? new Date().toISOString(),
      RepGroupName: isNewLead ? '' : selectedLeedOrCustomer.repGroupName ?? '',
      Args: argObj,
    };

    setIsSaving(true);
    mutation.mutate(payload, {
      onSuccess: (response) => {
        setIsSaving(false);
        if (response.isSuccess) {
          if (isNewLead) {
            dispatch(setIsAddLeadModalOpen(false));
            props.refetchList();
            toast.success('Lead saved successfully');
          }
          else {
            dispatch(updateDetails(true));

            let updatedLead = {
              ...selectedLeedOrCustomer,
              name: data.name,
              company: data.company,
              city: data.city,
              state: data.state,
              industry: data.market,
              leadSource: data.source,
              business: data.subMarket,
              noOfEmployees: data.noOfEmployees,
              annualRevenue: data.annualRevenue,
              leadType: data.leadType,
              businessPotential: data.businessPotential,
              referredBy: data.referredBy,
              originator: data.assignedTo,
              litersBy: data.potentialOpportunity,
              potentialLiters: data.potentialLiters,
              description: data.description
            }
            dispatch(setSelectedLeedOrCustomer(updatedLead));
            toast.success('Lead successfully updated');
          }

        }
        else {
          if (isNewLead) {
            toast.error('Error occurred while saving lead');
          }
          else {
            toast.error('Error occurred while updating lead');
          }
        }
      },
      onError: (error) => {
        setIsSaving(false);
        console.error(error.message);
        toast.error(error.message || 'An error occurred while processing your request');
      }
    });
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const header = (
    <div className="lead-customer-detail-section-header-container margin-bottom-20">
      <span className="center-align section-title">
        {contactTypeName[contactType]}
        <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
        <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa.faInfoCircle} size='1x' />Lead Details</span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">{`(${leadDetailPageMode == pageModeEnum.Edit ? selectedLeedOrCustomer.name : 'New'})`}</span>
      </span>
      {(contactType == contactTypeEnum.lead && selectedLeedOrCustomer != null && selectedLeedOrCustomer.leadStage == 'Customer') ? '' : readonly ? (
        <button className="header-btn-update" onClick={() => dispatch(updateDetails(false))}><FontAwesomeIcon className="btn-icon" icon={fa.faPenAlt} size='1x' />Update Details</button>
      ) : (
        <Button className='header-btn-cancel' onClick={() => dispatch(updateDetails(true))} variant='outline-dark'>
          Cancel
        </Button>
      )}
    </div>
  );

  const main = (
    <div className='content'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={readonly} section='contactDetailForm'>
        <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          <FormProvider {...methods}>
            <div className='form-group-container'>
              <div className='form-group'>
                <span>Company</span>
                <FormInput label='Name' name='name' />
                <FormInput label='Company' name='company' />
                <FormInput label='City' name='city' />
                <FormInput label='State' name='state' />
                <FormInput label='Market' name='market' type='select' comboBoxOptions={marketComboData} />
                <FormInput label='Source' name='source' type='select' comboBoxOptions={sourceComboData} />
                <FormInput label='Sub Market' name='subMarket' type='select' comboBoxOptions={subMarketComboData} />
                <FormInput label='No. of Employees' name='noOfEmployees' type='number' />
                <FormInput label='Annual Revenue $' name='annualRevenue' type='number' />
              </div>
              <div className='form-group'>
                <span>Opportunity</span>
                <FormInput label='Lead Type' name='leadType' type='select' comboBoxOptions={leadTypeComboData} />
                <FormInput label='Business Potential' name='businessPotential' />
                <FormInput label='Reffered by' name='referredBy' />
                <FormInput label='Assigned to' name='assignedTo' type='select' comboBoxOptions={assignedToComboData} />
                <FormInput label='Potential Opportunity by' name='potentialOpportunity' type='select' comboBoxOptions={potentialOpportunityComboData} />
                <FormInput label='Potential Liters' name='potentialLiters' />
              </div>
              <div className='form-group'>
                <span>Other</span>
                <FormInput label='Description' name='description' type='textarea' />
                <div className="form-section-bottom">
                  <label>{leadDetailPageMode == pageModeEnum.Edit && selectedLeedOrCustomer.lastModifiedDate != null ? 'Last Modified By: ' + selectedLeedOrCustomer.lastModifiedBy + ', ' + format(new Date(selectedLeedOrCustomer.lastModifiedDate), 'yyyy-MM-dd HH:mm') : ''}</label>
                  <label>{leadDetailPageMode == pageModeEnum.Edit && selectedLeedOrCustomer.createdDate != null ? 'Created By: ' + selectedLeedOrCustomer.createdBy + ', ' + format(selectedLeedOrCustomer.createdDate, 'yyyy-MM-dd HH:mm') : ''}</label>
                </div>
              </div>
            </div>

          </FormProvider>
        </form>
      </ReadOnlyProvider>
      {/* <MessageBox /> */}
    </div>
  );

  const footer = (
    !readonly && (
      <div className='form-button-container footer-content'>
        <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
        <ButtonWidget
          id='lead-details-update-button'
          classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
          Function={() => handleExternalSubmit()}
          name={isNewLead ? (isSaving ? 'Saving...' : 'Save Details') : (isSaving ? 'Updating...' : 'Update Details')}
        />
      </div>
    )
  );

  return <SectionMainBase header={props.hideHeader != null && props.hideHeader == true ? <></> : header} main={main} footer={footer}></SectionMainBase>;

}