import { zodResolver } from "@hookform/resolvers/zod";
import { pageModeEnum, messageTypeEnum, RootState, setAddressPageMode, setSelectedAddress, showMessage } from "@peerless-cms/store";
import { ButtonWidget, CustomToastMessage, FormInput, PageLoader, ToastManager } from "@peerless/controls";
import { ReadOnlyProvider } from "@peerless/providers";
import { saveLeadCustomerAddress, useCountryData, useStatesData } from "@peerless/queries";
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import { useMutation } from "@tanstack/react-query";
import MessageBox from "apps/peerless-cms/src/app/features-common-components/src/message-box/message-box";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";



export interface LeedCustomerAddressFormProps { }

export function LeedCustomerAddressForm(props: LeedCustomerAddressFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  type FormFields = z.infer<typeof leedCustomerAddressFormSchema>;
  const navigate = useNavigate();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<string>('');
  const [labelText, setLabelText] = useState<string>('');
  const [triggerKey, setTriggerKey] = useState(0);
  const [open, setOpen] = useState(false);

  const { selectedLeedOrCustomer, readonly, originator, loggedUser, addressMode, selectedAddress, contactType, selectedOrganisation } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    readonly: state.leedsAndCustomers.readonly,
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    addressMode: state.leedsAndCustomers.addressPageMode,
    selectedAddress: state.leedsAndCustomers.selectedAddress,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
  }));

  const mutation = useMutation<any, Error, any>({
    mutationFn: saveLeadCustomerAddress
  });

  let allStatesComboData: any = [];
  let countryComboData: any = [];

  const { data: statesData, error: statesError, isLoading: isStatesLoading } = useStatesData();

  if (isStatesLoading)
    allStatesComboData = [{ label: 'Loading...', value: '' }];

  if (statesData) {
    allStatesComboData = statesData.map((item: any) => ({
      label: item.stateName,
      value: item.stateName,
    }));
  }

  const { data: countryData, error: countryError, isLoading: isCountryLoading } = useCountryData();

  if (isCountryLoading)
    countryComboData = [{ label: 'Loading...', value: '' }];

  if (countryData) {
    countryComboData = countryData.map((item: any) => ({
      label: item.countryName,
      value: item.countryName,
    }));
  }

  const leedCustomerAddressFormSchema = z.object({
    address1: z.string().min(1, { message: 'Address 1 is required' }).max(40, { message: 'Only 40 characters are allowed' }),
    address2: z.string(), //.min(1, { message: 'City is required' }),
    address3: z.string(),
    city: z.string().min(1, { message: 'City is required' }), //.max(3, { message: 'The state should not exceed 3 digits' }),
    state: z.string().min(1, { message: 'State is required' }),//.max(3, { message: 'The postcode should not exceed 3 digits' }),
    postcode: z.string().max(4, { message: 'Only 4 characters are allowed' }),
    country: z.string(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The phone should include 10 digits' }),
    name: z.string(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The mobile should include 10 digits' }),
    contact: z.string(), //.min(1, { message: 'Fax is required' }),
    phone: z.string(), //.min(1, { message: 'Website is required' }),
    mobile: z.string(), //.min(1, { message: 'Email is required' }),
    fax: z.string(), //.min(1, { message: 'Preffered Method is required' }),
    longitude: z.string(),
    latitude: z.string(),
    dpid: z.string(),
    isPrimary: z.boolean(),
    geoGoogle: z.string(),
  });

  const methods = useForm<FormFields>({
    resolver: zodResolver(leedCustomerAddressFormSchema),
    defaultValues: {
      address1: "",
      address2: "",
      address3: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      name: "",
      contact: "",
      phone: "",
      mobile: "",
      fax: "",
      longitude: "",
      latitude: "",
      dpid: "",
      isPrimary: false,
      geoGoogle: "",
    }
  });
  useEffect(() => {
    if (statesData != null && countryData != null) {
      methods.reset({
        address1: addressMode === pageModeEnum.New ? '' : selectedAddress.address1,
        address2: (addressMode === pageModeEnum.New ? '' : (selectedAddress.address2 ? selectedAddress.address2 : '')),
        address3: (addressMode === pageModeEnum.New ? '' : (selectedAddress.address3 ? selectedAddress.address3 : '')),
        city: (addressMode === pageModeEnum.New ? '' : (selectedAddress.city ? selectedAddress.city : '')),
        state: (addressMode === pageModeEnum.New ? '' : (selectedAddress.state ? selectedAddress.state : '')),
        postcode: (addressMode === pageModeEnum.New ? '' : contactType == contactTypeEnum.organisation ? (selectedAddress.postcode ? selectedAddress.postcode : '') : (selectedAddress.postCode ? selectedAddress.postCode.trim() : '')),
        country: (addressMode === pageModeEnum.New ? '' : (selectedAddress.country ? selectedAddress.country : '')),
        name: (addressMode === pageModeEnum.New ? '' : contactType == contactTypeEnum.organisation ? (selectedAddress.addressName ? selectedAddress.addressName : '') : (selectedAddress.name ? selectedAddress.name : '')),
        contact: (addressMode === pageModeEnum.New ? '' : (selectedAddress.contact ? selectedAddress.contact : '')),
        phone: (addressMode === pageModeEnum.New ? '' : (selectedAddress.telephone ? selectedAddress.telephone.trim() : '')),
        mobile: (addressMode === pageModeEnum.New ? '' : (selectedAddress.mobile ? selectedAddress.mobile : '')),
        fax: (addressMode === pageModeEnum.New ? '' : (selectedAddress.fax ? selectedAddress.fax.trim() : '')),
        longitude: (addressMode === pageModeEnum.New ? '' : contactType == contactTypeEnum.organisation ? (selectedAddress.geoLon ? selectedAddress.geoLon : '') : (selectedAddress.longitude ? selectedAddress.longitude : '')),
        latitude: (addressMode === pageModeEnum.New ? '' : contactType == contactTypeEnum.organisation ? (selectedAddress.geoLat ? selectedAddress.geoLat : '') : (selectedAddress.latitude ? selectedAddress.latitude : '')),
        dpid: (addressMode === pageModeEnum.New ? '' : (selectedAddress.dpid ? selectedAddress.dpid : '')),
        isPrimary: (addressMode === pageModeEnum.New ? false : (selectedAddress.isPrimaryAddress == 'Y' ? true : false)),
        geoGoogle: (addressMode === pageModeEnum.New ? '' : (selectedAddress.geoGoogle ? selectedAddress.geoGoogle : '')),
      });
      setIsLoading(false);
    }
  }, [methods, statesData, countryData]);

  const onSubmit = (data: FormFields) => {
    const payload = {
      LeadAddressID: addressMode === pageModeEnum.New ? 0 : (contactType == contactTypeEnum.lead ? selectedAddress.leadAddressID : 0),
      AddressId: addressMode === pageModeEnum.New ? 0 : (contactType == contactTypeEnum.organisation ? selectedAddress.addressId : 0),
      Address1: data.address1,
      Address2: data.address2,
      Address3: data.address3,
      City: data.city,
      State: data.state,
      PostCode: data.postcode,
      Country: data.country,
      LeadID: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer.sourceId : 0,
      CreatedBy: addressMode === pageModeEnum.New ? loggedUser.userName : selectedAddress.createdBy ?? '',
      CreatedDate: new Date().toISOString(),
      LastModifiedBy: loggedUser.userName,
      LastModifiedDate: new Date().toISOString(),
      AssignedTo: addressMode === pageModeEnum.New ? 'C' : selectedAddress.assignedTo ?? 'C',
      AssigneeNo: addressMode === pageModeEnum.New ? 0 : selectedAddress.assigneeNo ?? 0,
      AddressType: addressMode === pageModeEnum.New ? "D" : selectedAddress.addressType ?? "D",
      Name: data.name,
      AddressName: data.name,
      AreaCode: addressMode === pageModeEnum.New ? '' : selectedAddress.areaCode,
      Telephone: data.phone,
      Fax: data.fax,
      Contact: data.contact,
      CustCode: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer.customerCode : '',
      AssignTo: addressMode === pageModeEnum.New ? "" : selectedAddress.assignTo ?? '',
      AssigneeCode: addressMode === pageModeEnum.New ? "" : selectedAddress.assigneeCode ?? '',
      AddressCode: addressMode === pageModeEnum.New ? "" : selectedAddress.addressCode ?? '',
      DestArea: addressMode === pageModeEnum.New ? "" : selectedAddress.destArea ?? '',
      DefWarehouse: addressMode === pageModeEnum.New ? "" : selectedAddress.defWarehouse ?? '',
      Mobile: data.mobile,
      Email: addressMode === pageModeEnum.New ? "" : selectedAddress.email ?? '',
      Notes: addressMode === pageModeEnum.New ? "" : selectedAddress.notes ?? '',
      ModifiedDate: new Date().toISOString(),
      ModifiedBy: loggedUser.userName,
      Status: addressMode === pageModeEnum.New ? "" : selectedAddress.status ?? '',
      Version: addressMode === pageModeEnum.New ? 0 : selectedAddress.version ?? 0,
      DeliveryHrs: addressMode === pageModeEnum.New ? "" : selectedAddress.deliveryHrs ?? '',
      Dpid: data.dpid,
      IsPrimaryAddress: data.isPrimary ? 'Y' : '',
      GeoGoogle: data.geoGoogle,
      OrgnaisationID: contactType == contactTypeEnum.organisation ? selectedOrganisation.orgnaisationID : 0,
      GeoLon: !data.longitude ? 0 : data.longitude,
      GeoLat: !data.latitude ? 0 : data.latitude,
    }
    setIsProcessing(true);
    mutation.mutate({ payload, contactType }, {
      onSuccess: (response) => {
        setIsProcessing(false);
        if (response) {
          if (addressMode == pageModeEnum.Edit) {
            let updatedAddress = {
              ...selectedAddress,
              address1: data.address1,
              address2: data.address2,
              city: data.city,
              state: data.state,
              postcode: data.postcode,
              country: data.country,
              name: data.name,
              addressName: data.name,
              contact: data.contact,
              phone: data.phone,
              mobile: data.mobile,
              fax: data.fax,
              longitude: data.longitude,
              latitude: data.latitude,
              dpid: data.dpid,
              isPrimaryAddress: data.isPrimary ? 'Y' : '',
              primaryAddressDisplay: data.isPrimary ? 'Yes' : 'No',
              geoGoogle: data.geoGoogle,
            }
            dispatch(setSelectedAddress(updatedAddress));
          }
          dispatch(setAddressPageMode(pageModeEnum.List));
          setStatus('success-notification-color');
          setLabelText(
            (addressMode === pageModeEnum.New ? 'Address Saved Successfully' : 'Address Updated Successfully')
          );
          setTriggerKey((prevKey) => prevKey + 1);
          setTimeout(() => {
            navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/addresses`);
          }, 800);
        }
      },
      onError: (error) => {
        setIsProcessing(false);
        setStatus('error-notification-color');
        setLabelText(
          (addressMode === pageModeEnum.New ? 'Address Save Failed' : 'Address Update Failed')
        );
        setTriggerKey((prevKey) => prevKey + 1);
      }
    });
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  return (
    isLoading ? <PageLoader /> :
      <div className='content margin-top-20'>
        <ToastMessages ref={messagesRef} />
        <ReadOnlyProvider readOnly={false} section='contactDetailForm'>
          <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
            <FormProvider {...methods}>
              <div className='form-group-container'>
                <div className='form-group'>
                  <span>Address</span>
                  <FormInput label='Address 1' name='address1' required={true} />
                  <FormInput label='Address 2' name='address2' />
                  {contactType == contactTypeEnum.organisation && <FormInput label='Address 3' name='address3' />}
                  <FormInput label='City' name='city' required={true} />
                  <FormInput label='State' name='state' type="select" comboBoxOptions={allStatesComboData} required={true} />
                  <FormInput label='Postcode' name='postcode' />
                  <FormInput label='Country' name='country' type="select" comboBoxOptions={countryComboData} />
                </div>
                <div className='form-group'>
                  <span>Personal</span>
                  <FormInput label='Name' name='name' />
                  <FormInput label='Contact' name='contact' />
                  {contactType != contactTypeEnum.organisation && <FormInput label='Phone' name='phone' />}
                  {contactType != contactTypeEnum.organisation && <FormInput label='Mobile' name='mobile' />}
                  {contactType != contactTypeEnum.organisation && <FormInput label='Fax' name='fax' />}
                </div>
                <div className='form-group'>
                  <span>Map Info</span>
                  {contactType == contactTypeEnum.organisation && <FormInput label='Geo Google' name='geoGoogle' />}
                  <FormInput label='Longitude' name='longitude' />
                  <FormInput label='Latitude' name='latitude' />
                  {contactType == contactTypeEnum.organisation && <FormInput label='DPID' name='dpid' />}
                  {contactType == contactTypeEnum.organisation && <FormInput label='Is Primary' name='isPrimary' type="checkBox" />}
                </div>
              </div>

            </FormProvider>
          </form>
        </ReadOnlyProvider>

        <footer>
          <div className='form-button-container footer-content'>
            <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
            {addressMode === pageModeEnum.New ? (
              <ButtonWidget
                id='customer-address-save-button'
                classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
                Function={() => handleExternalSubmit()}
                name={isProcessing ? 'Saving...' : 'Save Details'}
              />
            ) :
              (<ButtonWidget
                id='customer-address-update-button'
                classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
                Function={() => handleExternalSubmit()}
                name={isProcessing ? 'Updating...' : 'Update Details'}
              />)}
          </div>
          <CustomToastMessage status={status || ''} labelText={labelText} state={open} setState={setOpen} triggerKey={triggerKey} />
        </footer>

      </div>
  )
}