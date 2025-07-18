import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setEnduserDetailPageMode, setIsAddEnduserModalOpen, setSelectedEnduser, setSelectedLeedOrCustomer, updateDetails } from "@peerless-cms/store";
import { Button } from "react-bootstrap";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReadOnlyProvider } from "@peerless/providers";
import { ButtonWidget, DataGrid, FormInput, MultiColumnComboBoxWidget, ToastManager } from "@peerless/controls";
import MessageBox from "apps/peerless-cms/src/app/features-common-components/src/message-box/message-box";
import { useEffect, useRef, useState } from "react";
import { getCustomerLookupData, getEnduserCustomerData, getIsEndUserCodeExist, saveEnduser, useCountryData, useLookupData } from "@peerless/queries";
import { EnduserDistributor, findTableCodeByDescription, isNullOrEmpty } from "@peerless/common";
import './enduser-detail.css';
import { KendoDropdown } from "@peerless-cms/features-common-components";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useMutation } from "@tanstack/react-query";
import { Messages } from 'primereact/messages';
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { useNavigate } from "react-router-dom";

export interface EnduserDetailProps {
  addSelectedCustomerAsDistributor?: boolean,
  hideHeader?: boolean,
  returnOnSuccess?: boolean,
  isCustomerEnduser?: boolean,
  refetchList?: any,
  messageMgr?: any,
  isOrganisationEnduser?: boolean,
}

export function EnduserDetails(props: EnduserDetailProps) {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement | null>(null);
  type FormFields = z.infer<typeof enduserDetailSchema>;
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [isConfirmBoxVisible, setIsConfirmBoxVisible] = useState(false);
  const messagesRef = useRef<any>(null);
  const navigate = useNavigate();
  const messageMgr = new ToastManager(messagesRef);

  const { selectedLeedOrCustomer, readonly, originator, loggedUser, childOriginators, selectedEnduser,
    enduserDetailPageMode, contactType, selectedCustomerEnduser, selectedOrganisationEnduser, selectedOrganisation } = useSelector((state: RootState) => ({
      selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
      readonly: state.leedsAndCustomers.readonly,
      originator: state.header.selectedOriginator,
      loggedUser: state.header.loggedUser,
      childOriginators: state.header.childOriginators,
      selectedEnduser: state.leedsAndCustomers.selectedEnduser,
      enduserDetailPageMode: state.leedsAndCustomers.enduserDetailPageMode,
      contactType: state.leedsAndCustomers.selectedContactType,
      selectedCustomerEnduser: state.leedsAndCustomers.selectedCustomerEnduser,
      selectedOrganisationEnduser: state.organisations.selectedOrgEnduser,
      selectedOrganisation: state.organisations.selectedOrganisation,
    }));

  const mutation = useMutation<any, Error, any>({
    mutationFn: saveEnduser
  });

  const enduserDetailSchema = z.object({
    endUserCode: z.string().min(1),
    name: z.string().min(1),
    contact: z.string(),
    telephone: z.string(),
    mobile: z.string(),
    emailAddress: z.string(),
    primaryRepName: z.string(),
    customerCategory: z.string(),
    address1: z.string(),
    address2: z.string(),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string(),
    postCode: z.string(),
    assignedTo: z.string(), //enduser.RepCode
    customerRefference: z.string(),
    grade: z.string(),
  });

  let categories: any = [];
  let grades: any = [];

  let sTableID = 'CUCA';
  let defaultDepartmentId: string = originator.defaultDepartmentId;
  let payloadCategory = { sTableID, defaultDepartmentId };
  const { data: categoryData, error: sourceError, isLoading: isSourceLoading } = useLookupData(payloadCategory);

  if (isSourceLoading)
    categories = [{ label: 'Loading...', value: '' }];

  let defaultCategory = 'UNKW';
  if (categoryData) {
    categories = categoryData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  const [catagories, setCategories] = useState<any>(null);
  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData);
    }
  }, [categoryData])

  sTableID = 'CRMG';
  let payloadGrades = { sTableID, defaultDepartmentId };
  const { data: gradesData, error: gradesError, isLoading: isGradesLoading } = useLookupData(payloadGrades);

  if (isGradesLoading)
    grades = [{ label: 'Loading...', value: '' }];

  let defaultGrade = '';
  if (gradesData) {
    grades = gradesData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
    defaultGrade = gradesData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';
  }

  let euCustPayload = {
    args: {
      ChildOriginators: childOriginators,
      DefaultDepartmentId: loggedUser.defaultDepartmentId,
      Originator: originator.userName,
      CustomerCode: (props.isCustomerEnduser != null && props.isCustomerEnduser == true) ? selectedCustomerEnduser.customerCode : (props.isOrganisationEnduser != null && props.isOrganisationEnduser == true) ? selectedOrganisationEnduser.customerCode : selectedLeedOrCustomer?.customerCode,
      EnduserCode: (props.isCustomerEnduser != null && props.isCustomerEnduser == true) ? selectedCustomerEnduser.endUserCode : (props.isOrganisationEnduser != null && props.isOrganisationEnduser == true) ? selectedOrganisationEnduser.endUserCode : selectedLeedOrCustomer?.endUserCode,
      StartIndex: 1,
      RowCount: 1000
    },
    enabled: (enduserDetailPageMode == pageModeEnum.Edit ? true : false)
  }
  const { data: enduserCustomerData, error, isLoading } = getEnduserCustomerData(euCustPayload);

  useEffect(() => {
    if (enduserCustomerData) {
      let primaryCust = enduserCustomerData.find((item: any) => item.primaryDist == 'Y');
      if (primaryCust) {
        const processedPrimaryCust = {
          ...primaryCust,
          uniqueId: `${primaryCust['customerCode']}-${enduserCustomerData.indexOf(primaryCust)}`,
        };
        setSelectedRow(processedPrimaryCust);
      }
      setEuCustomersLocalList(enduserCustomerData);
    }
  }, [enduserCustomerData]);

  let euCustomerList: any = [];

  let custLookupPayload = {
    ChildOriginators: childOriginators,
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    Originator: originator.userName,
    AdditionalParams: "( " + originator.childReps + ")",
    OrderBy: 'name ASC',
    StartIndex: 1,
    RowCount: 1000
  }

  const { data: euCustomerListData, error: errorLookup, isLoading: isLoadingLookup } = getCustomerLookupData(custLookupPayload);

  if (isLoadingLookup)
    euCustomerList = [{ label: 'Loading...', value: '' }];

  if (euCustomerListData) {
    euCustomerList = euCustomerListData.map((item: any) => ({
      label: item.name,
      value: item.custCode,
    }));
  }

  const { data: countryData, error: countryError, isLoading: isCountryLoading } = useCountryData();

  let countryComboData: any = [];
  if (isCountryLoading)
    countryComboData = [{ label: 'Loading...', value: '' }];

  if (countryData) {
    countryComboData = countryData.map((item: any) => ({
      label: item.countryName,
      value: item.countryName,
    }));
  }

  const methods = useForm<FormFields>({
    resolver: zodResolver(enduserDetailSchema),
  });

  useEffect(() => {
    if (selectedLeedOrCustomer || props.isOrganisationEnduser || props.isCustomerEnduser) {

      let grade = selectedLeedOrCustomer?.grade ?? '';
      if (grade != "N/A") {
        if (grade && !grade.toLowerCase().includes('grade')) { //append 'Grade' if not exist
          grade = `Grade ${grade}`;
        }
      }

      let editingEnduser: any = selectedLeedOrCustomer;
      if (enduserDetailPageMode == pageModeEnum.New) {
        editingEnduser = {
          endUserCode: '',
          name: '',
          contact: '',
          telephone: '',
          mobile: '',
          emailAddress: '',
          primaryRepName: originator.name,
          customerCategory: defaultCategory,
          address1: '',
          address2: '',
          city: '',
          state: '',
          country: '',
          postCode: '',
          assignedTo: originator.repCode,
          customerRefference: '',
          grade: defaultGrade
        }
      }
      else {
        if (props.isCustomerEnduser == true) {
          editingEnduser = selectedCustomerEnduser;
        }
        else if (props.isOrganisationEnduser == true) {
          editingEnduser = selectedOrganisationEnduser;
        }
      }

      methods.reset({
        endUserCode: editingEnduser.endUserCode ?? '',
        name: editingEnduser.name ?? '',
        contact: editingEnduser.contact ?? '',
        telephone: editingEnduser.telephone ?? '',
        mobile: editingEnduser.mobile ?? '',
        emailAddress: editingEnduser.emailAddress ?? '',
        primaryRepName: editingEnduser == null ? '' : editingEnduser.primaryRepName ?? '',
        customerCategory: editingEnduser != null && editingEnduser.customerCategory != null && editingEnduser.customerCategory.trim() != '' ? editingEnduser.customerCategory : defaultCategory,
        address1: editingEnduser.address1 ?? '',
        address2: editingEnduser.address2 ?? '',
        city: editingEnduser.city ?? '',
        state: editingEnduser.state ?? '',
        country: editingEnduser.country ?? '',
        postCode: editingEnduser.postCode ?? '',
        assignedTo: originator.repCode ?? '', //enduser.RepCode
        customerRefference: editingEnduser.customerRefference ?? '',
        // grade: editingEnduser.grade != null && editingEnduser.grade.trim() != '' ? findTableCodeByDescription(grades, grade) : defaultGrade,
        grade: defaultGrade,
      });
    }
    else {
      methods.reset({
        endUserCode: '',
        name: '',
        contact: '',
        telephone: '',
        mobile: '',
        emailAddress: '',
        primaryRepName: originator.name,
        customerCategory: defaultCategory,
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        postCode: '',
        assignedTo: originator.repCode,
        customerRefference: '',
        grade: defaultGrade,
      });
    }
  }, [selectedLeedOrCustomer, methods, categoryData, gradesData, enduserDetailPageMode, selectedCustomerEnduser, selectedOrganisationEnduser, countryData]);

  const [newEuCode, setNewEuCode] = useState<any>(null);
  const [checkEuIsExist, setCheckEuIsExist] = useState<any>(false);
  let isEnduserExistPayload = {
    args: {
      EnduserCode: newEuCode,
    },
    enabled: checkEuIsExist
  }
  const { data: isEnduserExist, error: errorEnduserExist, isLoading: isLoadingEnduserExist } = getIsEndUserCodeExist(isEnduserExistPayload);

  const [isEnduserCodeExist, setIsEnduserCodeExist] = useState(((enduserDetailPageMode === pageModeEnum.New) ? true : false)); //default set to true if new
  useEffect(() => {
    if (enduserDetailPageMode === pageModeEnum.New) {
      if (isNullOrEmpty(newEuCode)) {
        setIsEnduserCodeExist(true);
      }
      else if (isEnduserExist == true) {
        setIsEnduserCodeExist(true);
        messageMgr.showMessage('error', 'Error: ', 'The enduser code you entered is already exist. Please enter a different code');
      }
      else {
        if (isEnduserExist != null)
          setIsEnduserCodeExist(false);
      }
      setCheckEuIsExist(false);
    }
    else {
      setIsEnduserCodeExist(false);
    }
  }, [isEnduserExist, enduserDetailPageMode])

  const handleOnChangeEnduserCode = (e: any) => {
    setIsEnduserCodeExist(true); //disable just after user change the eu code
    let euCode = e.target.value;
    if (enduserDetailPageMode == pageModeEnum.New && !isNullOrEmpty(euCode)) {
      setNewEuCode(e.target.value);
      setCheckEuIsExist(true);
    }
  }

  const [isSaving, setIsSaving] = useState(false);
  const onSubmit = (data: FormFields) => {
    if (selectedRow == null) {
      messageMgr.showMessage('error', 'Error: ', (euCustomersLocalList == null || euCustomersLocalList.length == 0 ? 'Please add a primary distributor' : 'Please select a primary distributor'));
      return;
    }

    setIsSaving(true);

    const updatedCustLocalList = euCustomersLocalList.map((customer: any) => ({
      ...customer,
      primaryDist: (selectedRow?.customerCode == customer.customerCode ? 'Y' : 'N')
    }));

    let selectedCat = catagories.find((item: any) => item.tableCode === data.customerCategory);

    const payload = {
      CustomerList: updatedCustLocalList,
      EndUser: {
        Address1: data.address1,
        Address2: data.address2,
        Contact: data.contact,
        EmailAddress: data.emailAddress,
        EndUserCode: (enduserDetailPageMode == pageModeEnum.Edit && !props.isCustomerEnduser && !props.isOrganisationEnduser) ? selectedLeedOrCustomer.endUserCode : data.endUserCode,
        Name: data.name,
        City: data.city,
        PostCode: data.postCode,
        State: data.state,
        Country: data.country,
        Telephone: data.telephone,
        Mobile: data.mobile,
        RepCode: data.assignedTo,
        CustomerRefference: data.customerRefference,
        Originator: originator.userName,
        PrimaryDistributor: selectedLeedOrCustomer != null && (!isNullOrEmpty(selectedLeedOrCustomer.primaryDistributor)) ? selectedLeedOrCustomer.primaryDistributor : 'Y',
        Rating: 0,
        EndUserType: selectedLeedOrCustomer != null && (!isNullOrEmpty(selectedLeedOrCustomer.endUserType)) ? selectedLeedOrCustomer.endUserType : originator.repType,
        CustomerCategory: data.customerCategory,
        CustomerCategoryDescription: selectedCat == null ? '' : selectedCat.tableDescription,
        Grade: data.grade,
        CustomerCode: selectedRow?.customerCode
      },
      PrimaryCustomer: selectedRow?.customerCode,
      IsNew: enduserDetailPageMode == pageModeEnum.New
    }

    mutation.mutate(payload, {
      onSuccess: (response: any) => {
        if (response.status) {
          messageMgr.showMessage('success', 'Success: ', 'Successfully saved');
          //update the state with modified details

          if (props.returnOnSuccess != null && props.returnOnSuccess == true) {
            navigate(`${sectionPathMap[contactType]}${props.isOrganisationEnduser ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/endusers`);
          }
          else {
            if (enduserDetailPageMode == pageModeEnum.Edit) {
              let updatedLead = {
                ...selectedLeedOrCustomer,
                name: data.name,
                contact: data.contact,
                telephone: data.telephone,
                mobile: data.mobile,
                emailAddress: data.emailAddress,
                primaryRepName: data.primaryRepName,
                customerCategory: data.customerCategory,
                address1: data.address1,
                address2: data.address2,
                city: data.city,
                state: data.state,
                country: data.country,
                postCode: data.postCode,
                repCode: data.assignedTo,
                customerRefference: data.customerRefference,
                grade: data.grade,
              }
              dispatch(setSelectedLeedOrCustomer(updatedLead));
              if (enduserDetailPageMode == pageModeEnum.Edit) {
                dispatch(updateDetails(true));
              }
            }
            else {
              dispatch(setIsAddEnduserModalOpen(false));
              props.messageMgr.showMessage('success', 'Success: ', 'Enduser Saved');
              props.refetchList();
            }
          }
        }
        setIsSaving(false);
      },
      onError: (error: any) => {
        setIsSaving(false);
        console.error('Failed to update:', error);
        messageMgr.showMessage('error', 'Error: ', 'Error occured');
      }
    });

  }

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
        <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa.faInfoCircle} size='1x' />Enduser Details</span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">{`(${enduserDetailPageMode == pageModeEnum.Edit ? props.isOrganisationEnduser ? selectedOrganisationEnduser.name : props.isCustomerEnduser ?
          selectedCustomerEnduser.name : selectedLeedOrCustomer?.name : 'New'})`}</span>
      </span>
      {readonly ? (
        <button className="header-btn-update" onClick={() => dispatch(updateDetails(false))}><FontAwesomeIcon className="btn-icon" icon={fa.faPenAlt} size='1x' />Update Details</button>
      ) : (
        <Button className='header-btn-cancel' variant='outline-dark' onClick={() => dispatch(updateDetails(true))}>
          Cancel
        </Button>
      )}
    </div>
  );

  const [deletingCust, setDeleteingCust] = useState<any | null>(null);
  const handleGridOptionClick = (optionType: any, row: any) => {
    if (optionType === 'delete') {
      if (!readonly) {
        setIsConfirmBoxVisible(true);
        setDeleteingCust(row);
      }
    }
  };

  const handleSelectionChange = (val: any) => {
    if (!readonly) {
      setSelectedRow(val);
    }
  };

  const [selectedEUCustomer, setSelectedEUCustomer] = useState<{ label: string; value: string } | null>(null);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [euCustomersLocalList, setEuCustomersLocalList] = useState<any>(enduserCustomerData);

  const handleEUCustomerOnChange = (e: any) => {
    setSelectedEUCustomer(e);
    setFormErrorMessage(null);
  }

  const handleCustomerSearch = async (event: any) => {
    setLoading(true);
    try {
      setSearchText(event.filter.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enduserDetailPageMode == pageModeEnum.New) {
      if (props.addSelectedCustomerAsDistributor != null && props.addSelectedCustomerAsDistributor == true) {
        const newEuCustomer = {
          name: selectedLeedOrCustomer.name,
          customerCode: selectedLeedOrCustomer.customerCode,
          primaryDist: 'N',
        };
        setEuCustomersLocalList([newEuCustomer]);
      }
    }
  }, [props.addSelectedCustomerAsDistributor, enduserDetailPageMode])


  const onClickAddEUCustomer = (e: any) => {
    e.preventDefault();

    if (selectedEUCustomer) {
      // Check if the productCode already exists in productData
      const customerExists = euCustomersLocalList == null ? null : euCustomersLocalList.some((customer: any) => customer.customerCode === selectedEUCustomer.value);

      if (!customerExists) {
        // Create a new customer object
        const newEuCustomer = {
          name: selectedEUCustomer.label,
          customerCode: selectedEUCustomer.value,
          primaryDist: 'N',
        };

        // Update the productData state
        if (euCustomersLocalList == null || euCustomersLocalList.length == 0) {
          setEuCustomersLocalList([newEuCustomer]);
        }
        else {
          setEuCustomersLocalList((prevCustomerData: any) => [...prevCustomerData, newEuCustomer]);
        }
        setSelectedEUCustomer(null);
        setFormErrorMessage(null);
      } else {
        setFormErrorMessage('Customer already exists.');
      }
    }
  };

  const handleCustomerDelete = () => {
    const updatedData = euCustomersLocalList.filter((item: any) => item.customerCode !== deletingCust?.customerCode);
    setEuCustomersLocalList(updatedData);
  }

  let endUserDistributor = new EnduserDistributor(handleGridOptionClick, (!readonly));

  const main = (
    <div className='content'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={readonly} section='contactDetailForm'>
        <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          <FormProvider {...methods}>
            <div className='form-group-container'>
              <div className='form-group'>
                <span>Personal</span>
                <FormInput label='Code' name='endUserCode' onChangeCallBack={handleOnChangeEnduserCode} isDisabled={enduserDetailPageMode == pageModeEnum.Edit} required={true} />
                <FormInput label='Name' name='name' required={true} />
                <FormInput label='contact' name='contact' />
                <FormInput label='Phone' name='telephone' />
                {/* <FormInput label='Mobile' name='mobile' /> */}
                <FormInput label='Email' name='emailAddress' />
              </div>
              <div className='form-group'>
                <span>Address</span>
                <FormInput label='Address 1' name='address1' />
                <FormInput label='Address 2' name='address2' />
                <FormInput label='City' name='city' required={true} />
                <FormInput label='State' name='state' required={true} />
                <FormInput label='Postcode' name='postCode' />
                <FormInput label='Country' name='country' type="select" comboBoxOptions={countryComboData} />
              </div>
              <div className='form-group'>
                <span>Other</span>
                <FormInput label='Rep' name='primaryRepName' isDisabled={true} />
                <FormInput label='Assigned To' name='assignedTo' isDisabled={true} />
                <FormInput label='Cust. Ref' name='customerRefference' />
                <FormInput label='Category' name='customerCategory' type="select" comboBoxOptions={categories} />
                <FormInput label='Grade' name='grade' type="select" comboBoxOptions={grades} />
              </div>
            </div>
          </FormProvider>
        </form>
      </ReadOnlyProvider>

      <div className="eu-customer-container">
        <div className="form-single-section table-single-form no-ff-margin-bottom">
          <MultiColumnComboBoxWidget
            id={"enduser-distributor-ddl"}
            className={"ddl-default ddl-short"}
            setValue={(e: any) => (handleEUCustomerOnChange(e))}
            value={selectedEUCustomer}
            datalist={euCustomerList}
            isFilterable={true}
            textField={"value"}
            isClearFilter={selectedEUCustomer == null}
            columns={[{ field: 'value', header: 'Code', width: '122px' }, { field: 'label', header: 'Name', width: '300px' }]} />
          <button className="btn-default" onClick={onClickAddEUCustomer} disabled={readonly}>Add</button>
          {formErrorMessage && (
            <span className="error-message-no-margin-top margin-left-10">{formErrorMessage}</span>
          )}
        </div>
        <DataGrid dataTable={endUserDistributor} data={euCustomersLocalList} selectionMode={'single'} selectedRow={selectedRow} setSelectedRow={handleSelectionChange} />
      </div>
      {/* <MessageBox />          */}
      <ConfirmDialog
        visible={isConfirmBoxVisible}
        onHide={() => setIsConfirmBoxVisible(false)}
        message="Are you sure you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={handleCustomerDelete}  // Function to call on accept
        reject={() => console.log('Rejected')}  // Function to call on reject
      />
    </div>
  )

  const footer = (
    !readonly && (
      <div className='form-button-container footer-content'>
        <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
        <ButtonWidget
          id='customer-end-user-save-button'
          classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
          Function={() => handleExternalSubmit()}
          name={isSaving ? 'Saving...' : 'Save Details'}
        />
      </div>
    )
  );

  return <SectionMainBase header={props.hideHeader != null && props.hideHeader == true ? <></> : header} main={main} footer={footer}></SectionMainBase>;
}