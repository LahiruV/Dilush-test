import { ReadOnlyProvider } from '@peerless/providers';
import './leeds-and-customers-contact-detail.css';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Alert, Button } from 'react-bootstrap';
import { FormInput, ToastManager } from '@peerless/controls';
import { RootState, messageTypeEnum, setSelectedLeedOrCustomer, showMessage, updateDetails } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from '../../../lib/section-main-base';
import { useMutation } from '@tanstack/react-query';
import { saveLead, useLookupData } from '@peerless/queries';
import { Args, LeadEntryParameters } from '@peerless/models';
import { useEffect, useRef } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import MessageBox from 'apps/peerless-cms/src/app/features-common-components/src/message-box/message-box';
import { contactTypeName } from '@peerless/utils';
import ToastMessages from 'libs/controls/src/toasts-message/messages';

export interface LeedsAndCustomersContactDetailProps { }

const error: boolean = false;
const contactDetailSchema = z.object({
  address: z.string(),//.min(6, { message: 'Address is required' }),
  city: z.string(), //.min(1, { message: 'City is required' }),
  state: z.string(), //.max(3, { message: 'The state should not exceed 3 digits' }),
  postcode: z.string(),//.max(3, { message: 'The postcode should not exceed 3 digits' }),
  phone: z.string().refine((val) => val.length === 0 || val.length === 10, { message: 'The phone should include 10 digits' }),
  mobile: z.string().refine((val) => val.length === 0 || val.length === 10, { message: 'The mobile should include 10 digits' }),
  fax: z.string(), //.min(1, { message: 'Fax is required' }),
  website: z.string(), //.min(1, { message: 'Website is required' }),
  email: z.string(), //.min(1, { message: 'Email is required' }),
  prefferedMethod: z.string(), //.min(1, { message: 'Preffered Method is required' }),  
});

export function LeedsAndCustomersContactDetail(props: LeedsAndCustomersContactDetailProps) {
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const formRef = useRef<HTMLFormElement | null>(null);
  const mutation = useMutation<any, Error, LeadEntryParameters>({
    mutationFn: saveLead
  });
  const { selectedLeedOrCustomer, readonly, loggedUser, originator, selectedCustomer, selectedContactType } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    readonly: state.leedsAndCustomers.readonly,
    loggedUser: state.header.loggedUser,
    originator: state.header.selectedOriginator,
    selectedCustomer: state.leedsAndCustomers.selectedCustomer,
    selectedContactType: state.leedsAndCustomers.selectedContactType,
  }));

  let preferredList: any = [];
  let sTableID = 'CONT';
  let defaultDepartmentId: string = originator.defaultDepartmentId;
  let payload = { sTableID, defaultDepartmentId };
  const { data: prefListData, error: prefListError, isLoading: isPrefListLoading } = useLookupData(payload);

  if (isPrefListLoading)
    preferredList = [{ label: 'Loading...', value: '' }];

  let defaultPref = '';
  if (prefListData) {
    preferredList = prefListData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
    defaultPref = prefListData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';
  }

  const defaultFormState = {
    address: selectedLeedOrCustomer.address ?? '',
    city: selectedLeedOrCustomer.city ?? '',
    state: selectedLeedOrCustomer.state ?? '',
    postcode: selectedLeedOrCustomer.postalCode ?? '',
    phone: selectedLeedOrCustomer.telephone ?? '',
    mobile: selectedLeedOrCustomer.mobile ?? '',
    fax: selectedLeedOrCustomer.fax ?? '',
    website: selectedLeedOrCustomer.webiste ?? '',
    email: selectedLeedOrCustomer.email ?? '',
    prefferedMethod:
      selectedLeedOrCustomer.preferredContact && selectedLeedOrCustomer.preferredContact.trim() !== ''
        ? selectedLeedOrCustomer.preferredContact.toUpperCase()
        : 'NONE',
  }

  type FormFields = z.infer<typeof contactDetailSchema>;
  const methods = useForm<FormFields>({
    /*  defaultValues: {
       address: selectedLeedOrCustomer.address ?? '',
       city: selectedLeedOrCustomer.city ?? '',
       state: selectedLeedOrCustomer.state ?? '',
       postcode: selectedLeedOrCustomer.postalCode ?? '',
       phone: selectedLeedOrCustomer.telephone ?? '',
       mobile: selectedLeedOrCustomer.mobile ?? '',
       fax: selectedLeedOrCustomer.fax ?? '',
       website: selectedLeedOrCustomer.webiste ?? '',
       email: selectedLeedOrCustomer.email ?? '',
       prefferedMethod:
         selectedLeedOrCustomer.preferredContact && selectedLeedOrCustomer.preferredContact.trim() !== ''
           ? selectedLeedOrCustomer.preferredContact.toUpperCase()
           : 'NONE',
       // prefferedMethod: selectedLeedOrCustomer.preferredContact?.toUpperCase() || 'NONE',
     }, */
    defaultValues: {
      address: '',
      city: '',
      state: '',
      postcode: '',
      phone: '',
      mobile: '',
      fax: '',
      website: '',
      email: '',
      prefferedMethod: ''
    },
    resolver: zodResolver(contactDetailSchema),
  });

  const { reset } = methods

  useEffect(() => {
    reset(defaultFormState)
  }, [prefListData, selectedLeedOrCustomer])

  const dispatch = useDispatch();

  const onSubmit = (data: FormFields) => {

    const argObj: Args = { childOriginators: '' };
    const payload: LeadEntryParameters = {
      LeadID: selectedLeedOrCustomer.sourceId,
      LeadName: selectedLeedOrCustomer.name,
      Originator: selectedLeedOrCustomer.originator,
      LeadSource: selectedLeedOrCustomer.leadSource,
      Company: selectedLeedOrCustomer.company,
      Business: selectedLeedOrCustomer.business,
      Rating: selectedLeedOrCustomer.rating,
      Website: data.website,
      Industry: selectedLeedOrCustomer.industry,
      NoOfEmployees: (selectedLeedOrCustomer.noOfEmployees != null && selectedLeedOrCustomer.noOfEmployees != '') ? Number(selectedLeedOrCustomer.noOfEmployees) : 0,
      AnnualRevenue: selectedLeedOrCustomer.annualRevenue,
      LeadStatus: selectedLeedOrCustomer.leadStatus,
      Telephone: data.phone,
      Fax: data.fax,
      Mobile: data.mobile,
      EmailAddress: data.email,
      Address: data.address,
      City: data.city,
      State: data.state,
      PostCode: data.postcode,
      ReferredBy: selectedLeedOrCustomer.referredBy,
      Probability: selectedLeedOrCustomer.probability ?? 0,
      Description: selectedLeedOrCustomer.description,
      PreferredContact: data.prefferedMethod ?? '',
      BusinessPotential: selectedLeedOrCustomer.businessPotential,
      Country: selectedLeedOrCustomer.country,
      LastModifiedBy: loggedUser.userName,
      LastModifiedDate: new Date(),
      LeadStageID: selectedLeedOrCustomer.leadStageId ?? 1, //need to find
      CustCode: selectedLeedOrCustomer.customerCode,
      LitersBy: selectedLeedOrCustomer.litersBy ?? '',
      PotentialLiters: selectedLeedOrCustomer.potentialLiters ?? 0,
      RepGroupID: selectedLeedOrCustomer.repGroupId ?? 0,
      LeadType: selectedLeedOrCustomer.leadType ?? '',
      OrgId: selectedLeedOrCustomer.orgId,
      CreatedBy: selectedLeedOrCustomer.createdBy ?? '',
      CreatedDate: selectedLeedOrCustomer.createdDate,
      DelFalg: selectedLeedOrCustomer.delFalg ?? '',
      LastCalledDate: selectedLeedOrCustomer.lastCalledDate ?? new Date().toISOString(),
      RepGroupName: selectedLeedOrCustomer.repGroupName ?? '',
      Args: argObj,
    };
    mutation.mutate(payload, {
      onSuccess: (response) => {
        if (response.isSuccess) {
          dispatch(updateDetails(true));

          let updatedLead = {
            ...selectedLeedOrCustomer,
            address: data.address,
            city: data.city,
            state: data.state,
            postalCode: data.postcode,
            telephone: data.phone,
            mobile: data.mobile,
            fax: data.fax,
            webiste: data.website,
            email: data.email,
            preferredContactDescription: data.prefferedMethod,
          }

          dispatch(setSelectedLeedOrCustomer(updatedLead));
          messageMgr.showMessage("success", 'Success: ', 'Successfully saved');
        }
        else {
          messageMgr.showMessage("error", 'Error: ', response.message);
        }
      },
      onError: (error) => {
        console.error('Failed to update lead');
      }
    });
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const main = (
    <div className='content'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={true} section='contactDetailForm'>
        <FormProvider {...methods}>
          <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
            <div className='form-group-container'>
              <div className='form-group'>
                <span>Address</span>
                {error && <Alert variant='danger'>Incorrect inputs</Alert>}
                <FormInput label='Address' name='address' />
                <FormInput label='City' name='city' />
                <FormInput label='State' name='state' />
                <FormInput label='Postcode' name='postcode' />
              </div>
              <div className='form-group'>
                <span>Personal</span>
                <FormInput label='Phone' name='phone' />
                <FormInput label='Mobile' name='mobile' />
                <FormInput label='Fax' name='fax' />
                <FormInput label='Website' name='website' />
                <FormInput label='Email' name='email' />
              </div>
              <div className='form-group'>
                <span>Other</span>
                <FormInput label='Preffered Method' name='prefferedMethod' type='select' comboBoxOptions={preferredList} />
              </div>
            </div>

          </form>
        </FormProvider>
      </ReadOnlyProvider>
    </div>
  );

  const footer = (
    !readonly && (
      <div className='form-button-container'>
        <span>Make sure you have verified all your changes before update</span>
        <Button type='button' variant='outline-dark' className='btn-submit' onClick={handleExternalSubmit}>
          Update Details
        </Button>
      </div>
    )
  );

  const header = (
    <div className="lead-customer-detail-section-header-container margin-bottom-20">
      <span className="center-align section-title">
        {contactTypeName[selectedContactType]}
        <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
        <span className="center-align"><FontAwesomeIcon className="header-icon" icon={fa.faIdBadge} size='1x' />
          Contact Details
        </span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
      </span>
      {selectedContactType === 'lead' && (readonly ? (
        <button className="header-btn-update" onClick={() => dispatch(updateDetails(false))}><FontAwesomeIcon className="btn-icon" icon={fa.faPenAlt} size='1x' />Update Details</button>
      ) : (
        <Button className='header-btn-cancel' onClick={() => dispatch(updateDetails(true))} variant='outline-dark'>
          Cancel
        </Button>
      ))}
    </div>
  );

  return <SectionMainBase header={header} main={main} footer={footer}></SectionMainBase>;

}
