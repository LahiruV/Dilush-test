import { messageTypeEnum, pageModeEnum, RootState, setContactPersonPageMode, setIsAddContactModalOpen, setSelectedContactPerson, setSelectedContactPersonImage, showMessage } from "@peerless-cms/store";
import { ButtonWidget, ComboBoxProps, CustomToastMessage, FormInput, ToastManager } from "@peerless/controls";
import { ReadOnlyProvider } from "@peerless/providers";
import MessageBox from "apps/peerless-cms/src/app/features-common-components/src/message-box/message-box";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { late, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { setLabels } from "react-chartjs-2/dist/utils";
import ImageUploader from 'react-image-upload';
import 'react-image-upload/dist/index.css';
import './leed-customer-contact-person-form.css';
import { useMutation } from "@tanstack/react-query";
import { saveLeadCustomerContactPerson, saveLeadContactPersonImage, useStatesData } from "@peerless/queries";
import { useNavigate } from "react-router-dom";
import { documentService } from '@peerless/services';
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import ToastMessages from "libs/controls/src/toasts-message/messages";


export interface LeedCustomerContactPersonFormProps {
  isPopup?: boolean;
  messageMgr?: ToastManager;

}

export function LeedCustomerContactPersonForm(props: LeedCustomerContactPersonFormProps) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  type FormFields = z.infer<typeof leedCustomerContactPersonFormSchema>;
  const navigate = useNavigate();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const [isSaving, setIsSave] = useState(false);
  const [status, setStatus] = useState<string>('');
  const [labelText, setLabelText] = useState<string>('');
  const [triggerKey, setTriggerKey] = useState(0);
  const [open, setOpen] = useState(false);

  const { selectedLeedOrCustomer, readonly, originator, loggedUser, contactPersonPageMode,
    selectedContactPerson, selectedContactPersonImage, contactType, selectedOrganisation } = useSelector((state: RootState) => ({
      selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
      readonly: state.leedsAndCustomers.readonly,
      originator: state.header.selectedOriginator,
      loggedUser: state.header.loggedUser,
      contactPersonPageMode: state.leedsAndCustomers.contactPersonPageMode,
      selectedContactPerson: state.leedsAndCustomers.selectedContactPerson,
      selectedContactPersonImage: state.leedsAndCustomers.selectedContactPersonImage,
      contactType: state.leedsAndCustomers.selectedContactType,
      selectedOrganisation: state.organisations.selectedOrganisation,
    }));

  const mutation = useMutation<any, Error, any>({
    mutationFn: saveLeadCustomerContactPerson
  });

  const mutationSaveImage = useMutation<any, Error, any>({
    mutationFn: saveLeadContactPersonImage
  });

  let allStatesComboData: any = [];
  const { data: statesData, error: statesError, isLoading: isStatesLoading } = useStatesData();

  if (isStatesLoading)
    allStatesComboData = [{ label: 'Loading...', value: '' }];

  if (statesData) {
    allStatesComboData = statesData.map((item: any) => ({
      label: item.stateName,
      value: item.stateName,
    }));
  }

  const leedCustomerContactPersonFormSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string(), //.min(1, { message: 'City is required' }),
    title: z.string(), //.max(3, { message: 'The state should not exceed 3 digits' }),
    telephone: z.string(),//.max(3, { message: 'The postcode should not exceed 3 digits' }),
    mobile: z.string(),
    fax: z.string(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The phone should include 10 digits' }),     
    email: z.string(),
    organisation: z.string(), //.min(1, { message: 'Email is required' }),
    custCode: z.string(), //.min(1, { message: 'Preffered Method is required' }),
    enduser: z.string(),
    position: z.string(),
    mailingAddress: z.string(),
    mailingState: z.string(),
    mailingPostcode: z.string().max(4, 'Max 4 characters'),
    mailingCity: z.string(),
    otherAddress: z.string(),
    otherState: z.string(),
    otherPostCode: z.string().max(4, 'Max 4 characters'),
    otherCity: z.string(),
    imagePath: z.string(),
    description: z.string(),
    specialInterests: z.string().max(500, 'Max 500 characters'),
    keyContact: z.boolean(),
  });

  const methods = useForm<FormFields>({
    defaultValues: {
      firstName: contactPersonPageMode === pageModeEnum.New ? '' : selectedContactPerson.firstName,
      lastName: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.lastName ? selectedContactPerson.lastName : '')),
      title: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.title ? selectedContactPerson.title : '')),
      telephone: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.telephone ? selectedContactPerson.telephone : '')),
      mobile: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.mobile ? selectedContactPerson.mobile : '')),
      fax: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.fax ? selectedContactPerson.fax : '')),
      email: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.emailAddress ? selectedContactPerson.emailAddress : '')),
      organisation: (contactType == contactTypeEnum.lead ? (selectedContactPerson.leadName ? selectedContactPerson.leadName : selectedLeedOrCustomer.name) : (contactType == contactTypeEnum.organisation ? selectedOrganisation.organisationName : '')),
      custCode: (contactType == contactTypeEnum.customer ? selectedContactPerson.leadName ? selectedContactPerson.leadName : (selectedLeedOrCustomer?.name) : (contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.customerName : '')),
      enduser: (contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.name : ''),
      position: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.position ? selectedContactPerson.position : '')),
      mailingAddress: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.mailingAddress ? selectedContactPerson.mailingAddress : '')),
      mailingState: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.mailingState ? selectedContactPerson.mailingState : '')),
      mailingPostcode: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.mailingPostcode ? selectedContactPerson.mailingPostcode : '')),
      mailingCity: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.mailingCity ? selectedContactPerson.mailingCity : '')),
      otherAddress: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.otherAddress ? selectedContactPerson.otherAddress : '')),
      otherState: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.otherState ? selectedContactPerson.otherState : '')),
      otherPostCode: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.otherPostCode ? selectedContactPerson.otherPostCode : '')),
      otherCity: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.otherCity ? selectedContactPerson.otherCity : '')),
      imagePath: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.imagePath ? selectedContactPerson.imagePath : '')),
      description: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.description ? selectedContactPerson.description : '')),
      specialInterests: (contactPersonPageMode === pageModeEnum.New ? '' : (selectedContactPerson.specialInterests ? selectedContactPerson.specialInterests : '')),
      keyContact: (contactPersonPageMode === pageModeEnum.New ? false : (selectedContactPerson.keyContact == 'Y' ? true : false)),
    },
    resolver: zodResolver(leedCustomerContactPersonFormSchema),
  });

  const onSubmit = (data: FormFields) => {
    const payload = {
      StartDate: new Date().toISOString(),
      EndDate: new Date().toISOString(),
      AdditionalParams: '',
      StartIndex: 0,
      RowCount: 0,
      RepType: originator.repType,
      IsNew: true,
      IsOwner: true,
      KeyContactChecked: data.keyContact,
      CreatedDate: new Date().toISOString(),
      LastModifiedDate: new Date().toISOString(),
      ContactPersonID: contactPersonPageMode === pageModeEnum.New ? 0 : selectedContactPerson.contactPersonID,
      LeadID: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer.sourceId : 0,
      CompanyAddress: '',
      CompanyName: '',
      CompanyTelephone: '',
      Contact: '',
      CreatedBy: loggedUser.userName,
      CustCode: contactType == contactTypeEnum.lead ? '' : contactType == contactTypeEnum.customer ? selectedLeedOrCustomer?.[contactId[contactType]] : '',
      Description: data.description ?? '',
      DisLikes: selectedContactPerson.disLikes ?? '',
      EmailAddress: data.email,
      Fax: data.fax ?? '',
      FirstName: data.firstName ?? '',
      ImagePath: selectedContactPerson.imagePath ?? '',
      KeyContact: data.keyContact ? 'Y' : 'N',
      LastModifiedBy: loggedUser.userName,
      LastName: data.lastName ?? '',
      LeadName: data.organisation ?? '',
      Likes: selectedContactPerson.likes ?? '',
      MailingAddress: data.mailingAddress ?? '',
      MailingCity: data.mailingCity ?? '',
      MailingCountry: selectedContactPerson.mailingCountry ?? '',
      MailingPostcode: data.mailingPostcode ?? '',
      MailingState: data.mailingState ?? '',
      Mobile: data.mobile ?? '',
      Note: selectedContactPerson.note ?? '',
      Origin: loggedUser.userName,
      Originator: selectedContactPerson.origin ?? '',
      OtherAddress: data.otherAddress ?? '',
      OtherCity: data.otherCity ?? '',
      OtherCountry: selectedContactPerson.otherCountry ?? '',
      OtherPostCode: data.otherPostCode ?? '',
      OtherState: data.otherState ?? '',
      Position: data.position ?? '',
      ReportsTo: selectedContactPerson.reportsTo ?? '',
      SpecialInterests: data.specialInterests ?? '',
      Status: selectedContactPerson.status ?? '',
      Telephone: data.telephone ?? '',
      Title: data.title ?? 'None',
      EndUserName: selectedContactPerson.endUserName ?? '',
      EndUserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
      ContactType: selectedContactPerson.contactType ?? 'P',
      TypeDescription: selectedContactPerson.typeDescription ?? '',
      OrganisationID: contactType == contactTypeEnum.organisation ? Number(selectedOrganisation.orgnaisationID) : 0,
      ChildOriginators: ` (originator = '${originator.userName}')`,
      DefaultDepartmentId: 'PS',
    }
    setIsSave(true);
    mutation.mutate({ payload, contactType }, {
      onSuccess: (response) => {
        if ((contactType == contactTypeEnum.enduser && response > 0) || response.isSuccess) {
          if (contactPersonPageMode == pageModeEnum.Edit) {
            let updatedContactPerson = {
              ...selectedContactPerson,
              firstName: data.firstName,
              lastName: data.firstName,
              title: data.title,
              telephone: data.telephone,
              mobile: data.mobile,
              fax: data.fax,
              emailAddress: data.email,
              organisation: data.organisation,
              custCode: data.custCode,
              enduser: data.enduser,
              position: data.position,
              mailingAddress: data.mailingAddress,
              mailingState: data.mailingState,
              mailingPostcode: data.mailingPostcode,
              mailingCity: data.mailingCity,
              otherAddress: data.otherAddress,
              otherState: data.otherState,
              otherPostCode: data.otherPostCode,
              otherCity: data.otherCity,
              description: data.description,
              specialInterests: data.specialInterests,
            }
            dispatch(setSelectedContactPerson(updatedContactPerson));
          }
          //----------- image removed -------------------

          // const contactPersonId = contactType == contactTypeEnum.enduser ? response : response.contactPersonId;
          // const filename = contactPersonId.toString() + getCurrentDateTimeString() + '.png';
          // const mimeType = 'image/png';
          // const blob = documentService.base64ToBlob(selectedContactPersonImage, mimeType);

          // const imagePayload = {
          //   ContactNo: contactType == contactTypeEnum.customer ? response.contactPersonId : 0,
          //   FileName: filename,
          //   FilePath: '',
          //   FileContent: selectedContactPersonImage,
          //   LeadID: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer?.[contactId[contactType]] : 0,
          //   ContactPersonId: contactType == contactTypeEnum.lead ? response.contactPersonId : 0,
          //   ContactPersonImageId: 0,
          //   CustomerCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.customerCode : contactType == contactTypeEnum.customer ? selectedLeedOrCustomer?.[contactId[contactType]] : '',
          //   endUserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer?.[contactId[contactType]] : '',
          // }
          // mutationSaveImage.mutate(imagePayload, {
          //   onSuccess: (responseSaveImage) => {
          //     setIsSave(false);
          //     dispatch(setSelectedContactPersonImage(null));
          //   },
          //   onError: (error) => {
          //     setIsSave(false);
          //   }
          // });

          //------------- image end -------------------

          if (props.isPopup != null && props.isPopup) {
            dispatch(setIsAddContactModalOpen(false));
            setStatus('success-notification-color');
            setLabelText(
              (contactPersonPageMode == pageModeEnum.New ? 'Contact Person Saved Successfully' : 'Contact Person Updated Successfully')
            );
            setTriggerKey((prevKey) => prevKey + 1);
          }
          else {
            dispatch(setContactPersonPageMode(pageModeEnum.List));
            setStatus('success-notification-color');
            setLabelText(
              (contactPersonPageMode == pageModeEnum.New ? 'Contact Person Saved Successfully' : 'Contact Person Updated Successfully')
            );
            setTriggerKey((prevKey) => prevKey + 1);
            setTimeout(() => {
              navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/contact-person`);
            }, 800);
          }


        }
        else {
          if (props.isPopup != null && props.isPopup) {
            setStatus('error-notification-color');
            setLabelText(
              (contactPersonPageMode === pageModeEnum.New ? 'Error occured while saving' : 'Error occured while updating')
            );
            setTriggerKey((prevKey) => prevKey + 1);
          }
          else {
            setStatus('error-notification-color');
            setLabelText(
              (contactPersonPageMode === pageModeEnum.New ? 'Error occured while saving' : 'Error occured while updating')
            );
            setTriggerKey((prevKey) => prevKey + 1);
          }
        }
      },
      onError: (error) => {
        setIsSave(false);
        console.error('Failed to update');
        if (props.isPopup != null && props.isPopup) {
          setStatus('error-notification-color');
          setLabelText(
            (contactPersonPageMode === pageModeEnum.New ? 'Contact Person Save Failed' : 'Contact Person Update Failed')
          );
          setTriggerKey((prevKey) => prevKey + 1);
          // props.messageMgr?.showMessage('error', 'Error: ', (contactPersonPageMode == pageModeEnum.New ? 'Error occured while saving.' : 'Error occured while updating.'));
        }
        else {
          setStatus('error-notification-color');
          setLabelText(
            (contactPersonPageMode === pageModeEnum.New ? 'Contact Person Save Failed' : 'Contact Person Update Failed')
          );
          setTriggerKey((prevKey) => prevKey + 1);
          // messageMgr.showMessage('error', 'Error: ', (contactPersonPageMode == pageModeEnum.New ? 'Error occured while saving.' : 'Error occured while updating.'));
        }
      }
    });
  };

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const getCurrentDateTimeString = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}_${month}_${day}_${hours}_${minutes}_${seconds}`;
  };

  const getImageFileObject = async (imageFile: any) => {
    const { file } = imageFile;

    try {
      const base64String = await documentService.fileToBase64(file);
      dispatch(setSelectedContactPersonImage(base64String));
    } catch (error) {
      console.error('Error converting file to base64');
    }
  }

  const titleList = [{ label: 'None', value: '' }, { label: 'Mr', value: 'Mr' }, { label: 'Ms', value: 'Ms' }, { label: 'Mrs', value: 'Mrs' }, { label: 'Dr', value: 'Dr' }, { label: 'Prof', value: 'Prof' }];

  return (
    <div className='content margin-top-20'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={false} section='contactDetailForm'>
        <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          <FormProvider {...methods}>
            <div className='form-group-container'>
              <div className='form-group'>
                <span>Personal</span>
                <FormInput label='Title' name='title' type="select" comboBoxOptions={titleList} />
                <FormInput label='First Name' name='firstName' required={true} />
                <FormInput label='Last Name' name='lastName' />
                <FormInput label='Phone' name='telephone' />
                <FormInput label='Mobile' name='mobile' />
                <FormInput label='Fax' name='fax' />
                <FormInput label='Email' name='email' />
                <FormInput label='Organisation' name='organisation' isDisabled={true} />
                <FormInput label='Customer' name='custCode' isDisabled={true} />
                <FormInput label='End User' name='enduser' isDisabled={true} />
                <FormInput label='Position' name='position' />
              </div>
              <div className='form-group'>
                <span>Address</span>
                <span className="sub-title">Mailing Address</span>
                <FormInput label='Mailing Address' name='mailingAddress' />
                <FormInput label='State' name='mailingState' type="select" comboBoxOptions={allStatesComboData} />
                <FormInput label='Postal Code' name='mailingPostcode' />
                <FormInput label='City' name='mailingCity' />
                <span className="sub-title">Other Address</span>
                <FormInput label='Other Address' name='otherAddress' />
                <FormInput label='State' name='otherState' type="select" comboBoxOptions={allStatesComboData} />
                <FormInput label='Postal Code' name='otherPostCode' />
                <FormInput label='City' name='otherCity' />
              </div>
              <div className='form-group'>
                <span>Other</span>
                {/* <div className="center-content contact-person-img-uploader">
                        <ImageUploader onFileAdded={(img) => getImageFileObject(img)} style={{marginBottom: '20px', width: '100%', height: 150 }} />                            
                      </div> */}
                <FormInput label='Comments' name='description' type="textarea" />
                <FormInput label='Special Interests' name='specialInterests' type="textarea" />
                <FormInput label="Key Contact" name="keyContact" type="checkBox" />
              </div>
            </div>

          </FormProvider>
        </form>
      </ReadOnlyProvider>
      <MessageBox />

      <footer>
        <div className='form-button-container footer-content'>
          <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
          {contactPersonPageMode === pageModeEnum.New ? (
            <ButtonWidget
              id='customer-contact-save-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
              Function={() => handleExternalSubmit()}
              name={isSaving ? 'Saving...' : 'Save Details'}
            />
          ) :
            (<ButtonWidget
              id='customer-contact-update-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
              Function={() => handleExternalSubmit()}
              name={isSaving ? 'Updating...' : 'Update Details'}
            />)}
        </div>
        <CustomToastMessage status={status || ''} labelText={labelText} state={open} setState={setOpen} triggerKey={triggerKey} />
      </footer>


    </div>
  )

}