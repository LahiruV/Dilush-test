import { pageModeEnum, RootState, setIsAddOrganisationModalOpen, setSelectedOrganisation, updateDetails } from "@peerless-cms/store";
import { FormInput, MultiColumnComboBoxWidget, PageLoader, ToastManager } from "@peerless/controls";
import { GetAllRepsForLookup, saveOrganisation, updateOrganisation, useLookupData } from "@peerless/queries";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropDownData, GetAllRepsForLookupParameters } from '@peerless/models';
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/esm/Button";
import SectionMainBase from "../../../lib/section-main-base";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { ReadOnlyProvider } from "@peerless/providers";
import { useNavigate } from "react-router-dom";

export interface OrganisationDetailsProps {
  refetchList?: any;
  messageMgr?: any;
  hideHeader?: boolean,
  isSubOrganisation?: boolean,
  subOrganisation?: any,
}

export const OrganisationDetails = (props: OrganisationDetailsProps) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const defOrgType = 'BAKE';
  const defCorres = 'Y';
  const defPmethod = 'P';

  const { selectedOrganisation, readonly, originator, loggedUser, orgDetailPageMode, contactType, selectedSubOrg } = useSelector((state: RootState) => ({
    selectedOrganisation: state.organisations.selectedOrganisation,
    readonly: state.leedsAndCustomers.readonly,
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    orgDetailPageMode: state.organisations.orgDetailPageMode,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedSubOrg: state.organisations.selectedSubOrg,
  }));

  const mutationSave = useMutation<any, Error, any>({
    mutationFn: saveOrganisation
  });

  const mutationUpdate = useMutation<any, Error, any>({
    mutationFn: updateOrganisation
  });

  let isNewOrg = false;
  if (orgDetailPageMode == pageModeEnum.New) {
    isNewOrg = true;
  }

  let editingOrg = selectedOrganisation;
  if (props.isSubOrganisation) {
    editingOrg = selectedSubOrg;
  }

  let orgTypes: any = [];
  let reps: any = [];

  let defaultDepartmentId: string = originator.defaultDepartmentId;
  let sTableID: string = 'CUCA';
  let payload = { sTableID, defaultDepartmentId };
  const { data: orgTypeData, error: orgTypeError, isLoading: isOrgTypeLoading } = useLookupData(payload);

  if (isOrgTypeLoading)
    orgTypes = [{ label: 'Loading...', value: '' }];

  let defaultOrgType: any = '';
  if (orgTypeData) {
    defaultOrgType = isNewOrg ? orgTypeData.find((item: any) => item.defaultValue === 'Y') : orgTypeData.find((item: any) => item.tableCode === editingOrg.organisationType);
    defaultOrgType = defaultOrgType ? defaultOrgType.tableCode : defOrgType;
    orgTypes = orgTypeData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  let payloadReps: GetAllRepsForLookupParameters = {
    orderby: 'rep_code asc',
    startIndex: 1,
    rowCount: 1000,
  }
  const { data: allRepsForLookup } = GetAllRepsForLookup(payloadReps, true);
  let defaultRep: any = '';
  if (allRepsForLookup) {
    defaultRep = isNewOrg ? allRepsForLookup.find((item: any) => item.tableCode === originator.repCode) : allRepsForLookup.find((item: any) => item.tableCode === editingOrg.repCode.trim());
    defaultRep = defaultRep ? defaultRep.tableCode : '';
    reps = allRepsForLookup.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableCode + ' - ' + item.tableDescription,
      value: item.tableCode,
    }));
  }

  let correspondenceList = [{ label: 'Yes', value: 'Y' }, { label: 'No', value: 'N' }];

  let preferredMethodList = [
    { label: 'Telephone', value: 'T' },
    { label: 'Mobile', value: 'M' },
    { label: 'Email', value: 'E' },
    { label: 'Post', value: 'P' },
  ];

  type FormFields = z.infer<typeof organisationDetailSchema>;
  const organisationDetailSchema = z.object({
    name: z.string().min(1, { message: 'name is required' }),
    type: z.string(),
    altName: z.string(),
    shortName: z.string(),
    abn: z.string(),
    acn: z.string(),
    telephone: z.string(),
    description: z.string(),
    fax: z.string(),
    mobile: z.string(),
    website: z.string(),
    contact: z.string(),
    repCode: z.string(),
    annualRevenue: z.string(),
    noOfEmp: z.string(),
    correspondance: z.string(),
    preferredMethod: z.string(),
  });

  const methods = useForm<FormFields>({});

  useEffect(() => {
    if (orgTypeData != null && allRepsForLookup != null) {
      methods.reset({
        name: isNewOrg ? '' : editingOrg.organisationName ?? '',
        type: defaultOrgType,
        altName: isNewOrg ? '' : editingOrg.altName ?? '',
        shortName: isNewOrg ? '' : editingOrg.shortName ?? '',
        abn: isNewOrg ? '' : editingOrg.abn ?? '',
        acn: isNewOrg ? '' : editingOrg.acn ?? '',
        telephone: isNewOrg ? '' : editingOrg.telephone ?? '',
        description: isNewOrg ? '' : editingOrg.description ?? '',
        fax: isNewOrg ? '' : editingOrg.fax ?? '',
        mobile: isNewOrg ? '' : editingOrg.mobile ?? '',
        website: isNewOrg ? '' : editingOrg.website ?? '',
        contact: isNewOrg ? '' : editingOrg.contact ?? '',
        repCode: defaultRep,
        annualRevenue: isNewOrg ? '' : (!editingOrg.annualRevenue ? '' : editingOrg.annualRevenue.toString()),
        noOfEmp: isNewOrg ? '' : (!editingOrg.noOfEmployees ? '' : editingOrg.noOfEmployees.toString()),
        correspondance: isNewOrg ? defCorres : (editingOrg.correspondence != null ? editingOrg.correspondence : defCorres),
        preferredMethod: isNewOrg ? defPmethod : !editingOrg.preferredMethod ? defPmethod : editingOrg.preferredMethod,
      });
      setIsLoading(false);
    }
  }, [methods, orgTypeData, allRepsForLookup]);

  const onSubmit = (data: FormFields) => {
    const payload = {
      OrganisationEntity: {
        OrgnaisationID: isNewOrg ? 0 : Number(editingOrg.orgnaisationID),
        ShortName: data.shortName,
        CustCode: '',
        EndUserId: 0,
        DistributorId: 0,
        Lead: '0',
        OrganisationType: data.type,
        AltName: data.altName,
        OrganisationName: data.name,
        Abn: data.abn,
        Telephone: data.telephone,
        Fax: data.fax,
        Mobile: data.mobile,
        Website: data.website,
        Acn: data.acn,
        PrimaryAddress: '0',
        Description: data.description,
        RepCode: data.repCode,
        Correspondence: data.correspondance,
        PreferredMethod: data.preferredMethod,
        AnnualRevenue: Number(data.annualRevenue),
        NoOfEmployees: Number(data.noOfEmp),
        Contact: data.contact,
        Status: 'A',
        Originator: originator.userName
      },
      Address: { AddressName: '' },
      ContactPerson: {
        ContactType: '',
        Title: "Mr",
        FirstName: "F1",
        LastName: "F2",
        Position: "Ps",
        EmailAddress: "Emai",
        ReportsTo: "Report to",
        Description: "Desc",
        SpecialInterests: "special",
        KeyContact: "Y",
        Originator: originator.userName
      }
    }
    setIsSaving(true);
    const mutation = isNewOrg ? mutationSave : mutationUpdate;
    mutation.mutate(payload, {
      onSuccess: (response) => {
        setIsSaving(false);
        if (isNewOrg) {
          if (response.status) {
            dispatch(setIsAddOrganisationModalOpen(false));
            props.refetchList();
            props.messageMgr.showMessage('success', 'Success: ', 'Successfully saved');
          }
          else {
            messageMgr.showMessage('error', 'Error: ', 'Error occurred while saving the organisation');
          }
        }
        else {
          //update
          if (response) {
            if (props.isSubOrganisation) {
              navigate(`${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/sub-organisation`);
            }
            else {
              dispatch(updateDetails(true));
              messageMgr.showMessage('success', 'Success: ', 'Successfully saved');
            }

          }
          else {
            messageMgr.showMessage('error', 'Error: ', response.message);
          }
        }
      },
      onError: (error) => {
        setIsSaving(false);
        messageMgr.showMessage('error', 'Error: ', 'Error occurred while saving the organisation');
        console.error('Failed to update organisation');
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
        <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa.faInfoCircle} size='1x' />Organisation Details</span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">
          {selectedOrganisation && selectedOrganisation.organisationName ? `(${selectedOrganisation.organisationName})` : ''}
        </span>
      </span>
      {readonly ? (
        <button disabled={isLoading} className="header-btn-update" onClick={() => dispatch(updateDetails(false))}><FontAwesomeIcon className="btn-icon" icon={fa.faPenAlt} size='1x' />Update Details</button>
      ) : (
        <Button className='header-btn-cancel' onClick={() => dispatch(updateDetails(true))} variant='outline-dark'>
          Cancel
        </Button>
      )}
    </div>
  );

  const main = (
    isLoading ? <PageLoader /> :
      <div className='content'>
        <ToastMessages ref={messagesRef} />
        <ReadOnlyProvider readOnly={readonly} section='contactDetailForm'>
          <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
            <FormProvider {...methods}>
              <div className='form-group-container'>
                <div className='form-group'>
                  <span>Organisation</span>
                  <FormInput label='Name' name='name' required={true} />
                  <FormInput label='Type' name='type' type='select' comboBoxOptions={orgTypes} />
                  <FormInput label='Alt Name' name='altName' />
                  <FormInput label='Short Name' name='shortName' />
                  <FormInput label='ABN' name='abn' />
                  <FormInput label='ACN' name='acn' />
                  <FormInput label='No. of Employees' name='noOfEmp' type='number' />
                  <FormInput label='Annual Revenue' name='annualRevenue' type='number' />
                </div>
                <div className='form-group'>
                  <span>Contact</span>
                  <FormInput label='Telephone' name='telephone' />
                  <FormInput label='Fax' name='fax' />
                  <FormInput label='Mobile' name='mobile' />
                  <FormInput label='Contact' name='contact' />
                  <FormInput label='Preferred Method' name='preferredMethod' type='select' comboBoxOptions={preferredMethodList} />
                </div>
                <div className='form-group'>
                  <span>Other</span>
                  <FormInput label='Rep Code' name='repCode' type='select' comboBoxOptions={reps} />
                  <FormInput label='Website' name='website' />
                  <FormInput label='Correspondance' name='correspondance' type='select' comboBoxOptions={correspondenceList} />
                  <FormInput label='Description' name='description' type='textarea' />
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
      <div className='form-button-container'>
        <span>Make sure you have verified all your changes before update</span>
        <Button disabled={isSaving} type='button' variant='outline-dark' className='btn-submit' onClick={handleExternalSubmit}>
          {isNewOrg ? (isSaving ? 'Saving...' : 'Save Details') : (isSaving ? 'Updating...' : 'Update Details')}
        </Button>
      </div>
    )
  );

  return <SectionMainBase header={props.hideHeader != null && props.hideHeader == true ? <></> : header} main={main} footer={footer}></SectionMainBase>;

};