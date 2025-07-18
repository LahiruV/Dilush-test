import { pageModeEnum, RootState, setIsAddCallCycleActivityModalOpen, setIsCallCycleActivityReadOnly } from "@peerless-cms/store";
import { CustomToastMessage, DataGrid, DropDown, FormInput, MultiColumnComboBoxWidget, PageLoader, ToastManager } from "@peerless/controls";
import { GetAllEndusers, GetCallCycleContacts, getCustomerLookupData, getEnduserCustomerData, getMainLeadList, getMainOrganisationList, SaveCallCycle } from "@peerless/queries";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import Button from "react-bootstrap/esm/Button";
// import ToastMessages from "libs/controls/src/toasts-message/messages";
import { ReadOnlyProvider } from "@peerless/providers";
import SectionMainBase from "../../../../lib/section-main-base";
import { CallCycleDistributor, dropDownDataConverter } from "@peerless/common";
import { ConfirmDialog } from "primereact/confirmdialog";
import './call-cylcle-details.css'
import { CallCycleSaveParameters, GetCallCycleContactsParameters } from "@peerless/models";

const stages = [
    { id: 1, label: 'Lead', value: 1 },
    { id: 2, label: 'Customer', value: 2 },
    { id: 3, label: 'End User', value: 3 },
    { id: 4, label: 'Organisation', value: 4 },
]

export interface CallCycleDetailsProps {
    refetchList?: any;
    messageMgr?: any;
    isShow?: boolean;
    setMessageStatus?: any;
    setLabelText?: any;
    isNew?: boolean;
    setTriggerKey?: any;
}

export const callCycleDistributorFunction = (callCycleData: any, name: string, status: string) => {
    if (status !== 'success') return [];
    const stageMapping: { [key: string]: string } = {
        Lead: 'leadId',
        Customer: 'customerCode',
        'End User': 'endUserCode',
        Organisation: 'orgId'
    };
    return callCycleData.map((item: any) => {
        const stageKey = stageMapping[item.leadStage];
        return stageKey ? {
            code: item[stageKey],
            name: item[name],
            stage: item.leadStage,
            customerCode: item.customerCode || '',
            endUserCode: item.endUserCode || '',
            leadId: item.leadId || 0,
            orgId: item.orgId || 0,
            leadStage: item.leadStage
        } : item;
    });
};


export const CallCycleDetails = ({ refetchList, setTriggerKey, isShow, setMessageStatus, setLabelText, isNew = false }: CallCycleDetailsProps) => {

    const formRef = useRef<HTMLFormElement | null>(null);
    const dispatch = useDispatch();
    // const messagesRef = useRef<any>(null);
    // const messageMgrs = new ToastManager(messagesRef);
    const [isSaving, setIsSaving] = useState(false);
    const [isUpdating, setIsUpdating] = useState(true);
    const [stage, setStage] = useState<any>(stages[0]);
    const [localCallCycleDetailsEdit, setLocalCallCycleDetailsEdit] = useState<any>(null);
    const [selectedStage, setSelectedStage] = useState<{ id: number, text: string, value: string, stage: string, customerCode?: string } | null>(null);
    const [isConfirmBoxVisible, setIsConfirmBoxVisible] = useState(false);
    const [deletingCust, setDeleteingCust] = useState<any | null>(null);
    const [selectedRow, setSelectedRow] = useState<any>(null);

    const { readonly, originator, loggedUser, orgDetailPageMode, childOriginators, enduserDetailPageMode } = useSelector((state: RootState) => ({
        selectedOrganisation: state.organisations.selectedOrganisation,
        readonly: state.callCycleActivity.isCallCycleActivityReadOnly,
        originator: state.header.selectedOriginator,
        loggedUser: state.header.loggedUser,
        orgDetailPageMode: state.organisations.orgDetailPageMode,
        contactType: state.leedsAndCustomers.selectedContactType,
        childOriginators: state.header.childOriginators,
        enduserDetailPageMode: state.leedsAndCustomers.enduserDetailPageMode,
    }))

    const { selectedCallCycleActivity, isCallCycleActivityDetail } = useSelector((state: RootState) => state.callCycleActivity);

    let custLookupPayload = {
        ChildOriginators: childOriginators,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        Originator: originator.userName,
        AdditionalParams: "( " + originator.childReps + ")",
        OrderBy: 'name ASC',
        StartIndex: 1,
        RowCount: 1000
    }

    const endUserPayload = {
        Originator: originator.userName,
        ChildOriginator: childOriginators,
        ChildOriginators: childOriginators,
        DefaultDepId: loggedUser.defaultDepartmentId,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        OrderBy: "Name ASC",
        AddParams: ` name like '%%'`,
        LeadStageId: 0,
        RetreiveActive: true,
        IsReqSentVisible: false,
        LeadStage: "enduser",
        DisplayInCRM: true,
        additionalParams: '',
        repType: 'F',
        isNew: true,
        IsShowLeastActive: false,
        ActiveInactiveChecked: true,
        ChildReps: originator.childReps,
        "startIndex": 1,
        "rowCount": 20000
    }

    const payloadLeedsAndCustomersData = {
        Originator: originator.userName,
        ChildOriginator: childOriginators,
        ChildOriginators: childOriginators,
        DefaultDepId: loggedUser.defaultDepartmentId,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        OrderBy: "Name ASC",
        AddParams: ` name like '%%'`,
        LeadStageId: 0,
        RetreiveActive: true,
        IsReqSentVisible: false,
        LeadStage: "lead",
        DisplayInCRM: true,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
        AdditionalParams: ` name like '%%'`,
        repType: "A",
        isNew: true,
        IsShowLeastActive: false,
        ActiveInactiveChecked: true,
        ChildReps: originator.childReps
    };

    const payloadOrganisationsData = {
        IsLeadOrganisation: false,
        IsEnduserOrganisation: false,
        IsCustomerOrganisation: false,
        IsOrganisation: true,
        IsNonAccCustomerOrganisation: false,
        OrgName: "",
        OrderBy: 'org_name',
        AddParams: '',
        ChildReps: originator.childReps != null ? originator.childReps.replace(/^[^(]*\(/, ' (') : '',
        Originator: originator.userName,
        ColumnFilter: '',
        startIndex: 1,
        rowCount: 50,
        queryEnabled: true,
    };

    const callCycleContactsPayload: GetCallCycleContactsParameters = {
        additionalParams: '',
        childOriginators: childOriginators,
        startIndex: 1,
        rowCount: 50,
        originator: loggedUser.userName,
        callCycleID: selectedCallCycleActivity.callCycleID,
        callCycleName: '',
        orderBy: 'description ASC',
    }

    const { saveCallCycleMutate } = SaveCallCycle();
    const { organisationsData } = getMainOrganisationList(payloadOrganisationsData, 20000, stage.value === 4);
    const { leedsAndCustomersData } = getMainLeadList(payloadLeedsAndCustomersData, 20000, stage.value === 1);
    const { data: euCustomerData } = getCustomerLookupData(custLookupPayload, stage.value === 2);
    const { data: endUsersData } = GetAllEndusers(endUserPayload, stage.value === 3);
    const { data: callCycleData, status } = GetCallCycleContacts(callCycleContactsPayload, true);

    const euCustomerListData = dropDownDataConverter.dropDownDataConverter(euCustomerData || [], 'name', 'custCode');
    const endUsersListData = dropDownDataConverter.dropDownDataConverter(endUsersData || [], 'name', 'endUserCode', undefined, undefined, ['customerCode']);
    const leedsAndCustomersListData = dropDownDataConverter.dropDownDataConverter(leedsAndCustomersData || [], 'name', 'sourceId');
    const orgListData = dropDownDataConverter.dropDownDataConverter(organisationsData || [], 'organisationName', 'orgnaisationID');
    const callCycleDataList = callCycleDistributorFunction(callCycleData, 'name', status);

    let isNewOrg = false;
    if (orgDetailPageMode == pageModeEnum.New) {
        isNewOrg = true;
    }

    type FormFields = z.infer<typeof callCycleDetailSchema>;
    const callCycleDetailSchema = z.object({
        shedule: z.string().min(1, { message: 'Shedule is required' }),
        description: z.string().min(1, { message: 'Description is required' }),
    });

    const methods = useForm<FormFields>({});
    const [opens, setOpens] = useState(false);
    const [messageStatuss, setMessageStatuss] = useState('');
    const [labelTexts, setLabelTexts] = useState('');
    const [triggerKeys, setTriggerKeys] = useState(0);

    const onSubmit = (data: FormFields) => {
        const localCallCycleData = isCallCycleActivityDetail ? localCallCycleDetailsEdit : localCallCycle;

        if (localCallCycleData.length === 0) {
            setFormErrorMessage('Please add at least one stage');
            return;
        }

        const payload: CallCycleSaveParameters = {
            description: data.shedule,
            dueOn: new Date(),
            comments: data.description,
            callCycleID: isCallCycleActivityDetail ? selectedCallCycleActivity.callCycleID : 0,
            createdBy: loggedUser.userName,
            createdDate: new Date(),
            delFlag: 'N',
            ccType: loggedUser.repType,
            originator: loggedUser.userName,
            contact: localCallCycleData,
        };

        saveCallCycleMutate(payload, {
            onSuccess: () => {
                const successMessage = isCallCycleActivityDetail ? 'Update Successfully' : 'Save Successfully';
                const successStatus = 'success-notification-color';
                if (isCallCycleActivityDetail) {
                    setMessageStatuss(successStatus);
                    setLabelTexts(successMessage);
                    setTriggerKeys(prevKey => prevKey + 1);
                } else {
                    refetchList();
                    dispatch(setIsAddCallCycleActivityModalOpen(false));
                    setMessageStatus(successStatus);
                    setLabelText(successMessage);
                    setTriggerKey((prevKey: number) => prevKey + 1);
                }
            },
            onError: (error) => {
                console.error('An error occurred:', error);
                const errorMessage = isCallCycleActivityDetail ? 'Update Failed' : 'Save Failed';
                const errorStatus = 'error-notification-color';
                if (isCallCycleActivityDetail) {
                    setMessageStatuss(errorStatus);
                    setLabelTexts(errorMessage);
                    setTriggerKeys(prevKey => prevKey + 1);
                } else {
                    setMessageStatus(errorStatus);
                    setLabelText(errorMessage);
                    setTriggerKey((prevKey: number) => prevKey + 1);
                }
            },
        });
    };

    const handleExternalSubmit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const [localCallCycle, setLocalCallCycle] = useState<any>([]);

    const handleOnChange = (e: any) => {
        setSelectedStage(e);
        setFormErrorMessage(null);
    }

    const onClickAddList = (e: any) => {
        e.preventDefault();
        const targetList = isCallCycleActivityDetail ? localCallCycleDetailsEdit : localCallCycle;
        const setTargetList = isCallCycleActivityDetail ? setLocalCallCycleDetailsEdit : setLocalCallCycle;

        if (selectedStage) {
            const isExists = targetList?.some((row: any) => row.code === selectedStage.value);
            if (!isExists) {
                const newObj = {
                    name: selectedStage.text,
                    code: selectedStage.value,
                    stage: stage.label,
                    callCycleID: 0,
                    customerCode: stage.value === 2 ? selectedStage.value : stage.value === 3 ? selectedStage.customerCode : '',
                    endUserCode: stage.value === 3 ? selectedStage.value : '',
                    orgId: stage.value === 4 ? selectedStage.value : 0,
                    leadId: stage.value === 1 ? selectedStage.value : 0,
                    leadStage: stage.label
                };
                setTargetList((prevData: any[]) => prevData ? [...prevData, newObj] : [newObj]);
                setSelectedStage(null);
                setFormErrorMessage(null);
            } else {
                setFormErrorMessage('Stage already exists.');
            }
        }
    };

    const handleGridOptionClick = (optionType: any, row: any) => {
        if (optionType === 'delete') {
            setIsConfirmBoxVisible(true);
            setDeleteingCust(row);
        }
    };

    let callCycleDistributor = new CallCycleDistributor(handleGridOptionClick, readonly && !isNew);

    const handleCustomerDelete = () => {
        const updateData = (data: any[], code: string) => data.filter((item: any) => item.code !== code);
        if (isCallCycleActivityDetail) {
            setLocalCallCycleDetailsEdit(updateData(localCallCycleDetailsEdit, deletingCust?.code));
        } else {
            setLocalCallCycle(updateData(localCallCycle, deletingCust?.code));
        }
    }

    const handleSelectionChange = (val: any) => {

        setSelectedRow(val);

    };

    const orgTypeData = {}
    const allRepsForLookup = {}

    useEffect(() => {
        if (orgTypeData != null && allRepsForLookup != null) {
            methods.reset({
                shedule: isNew ? '' : selectedCallCycleActivity.description ?? '',
                description: isNew ? '' : selectedCallCycleActivity.comments ?? '',
            });
            setIsUpdating(false);
        }
    }, []);

    useEffect(() => {
        if (callCycleDataList) {
            setLocalCallCycleDetailsEdit(callCycleDataList);
        }
    }, [callCycleData]);




    const header = (
        <div className="lead-customer-detail-section-header-container margin-bottom-20">
            <span className="center-align section-title">
                Call Cycle
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa2.faPhone} size='1x' />Call Cycle Details</span>
            </span>
            {isShow !== false && (
                <>
                    {readonly ? (
                        <button disabled={isUpdating} className="header-btn-update" onClick={() => dispatch(setIsCallCycleActivityReadOnly(false))}>
                            <FontAwesomeIcon className="btn-icon" icon={fa.faPenAlt} size='1x' />Edit
                        </button>
                    ) : (
                        <Button className='header-btn-cancel' onClick={() => dispatch(setIsCallCycleActivityReadOnly(true))} variant='outline-secondary'>
                            <div className="common-cancel-btn"> Cancel </div>
                        </Button>
                    )}
                </>
            )}

        </div>
    );

    const main = (
        isUpdating ? <PageLoader /> :
            <div className='content'>
                {/* <ToastMessages ref={messagesRef} /> */}
                <ReadOnlyProvider readOnly={readonly && !isNew} section='contactDetailForm'>
                    <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
                        <FormProvider {...methods}>
                            <div className='form-group-container'>
                                <div className='form-group'>
                                    <FormInput label='Shedule' name='shedule' required={true} />
                                </div>
                                <div className='form-group'>
                                    <FormInput label='Description' name='description' required={true} />
                                </div>
                            </div>
                        </FormProvider>
                    </form>
                </ReadOnlyProvider>
                <div className="eu-customer-container">
                    <div className="form-single-section table-single-form no-ff-margin-bottom call-cycle-stage">
                        <DropDown
                            id="call-cycle-lead-stage-drop"
                            className="call-cycle-lead-stage-drop"
                            setValue={(e: any) => (setStage(e))}
                            value={stage}
                            datalist={stages}
                            textField={"label"}
                            dataItemKey={"value"}
                            fillMode={"solid"}
                            size={"small"}
                            isFilterable={true}
                            isLoading={false}
                            isDisabled={readonly && !isNew}
                            popupSettings={{
                                width: '150px',
                            }}
                            labelDrop={{
                                name: 'Stage',
                            }}
                            defaultValue={stages[0]}
                        />
                    </div>
                    <div className="form-single-section table-single-form no-ff-margin-bottom">
                        <MultiColumnComboBoxWidget
                            id="call-cycle-details-drops"
                            className="call-cycle-details-drops"
                            setValue={(e: any) => (handleOnChange(e))}
                            value={selectedStage}
                            datalist={
                                stage.value == 1 ? leedsAndCustomersListData :
                                    stage.value == 2 ? euCustomerListData :
                                        stage.value == 3 ? endUsersListData :
                                            stage.value == 4 ? orgListData : []
                            }
                            textField={"text"}
                            valueField={"value"}
                            columns={[{ field: 'value', header: 'Code', width: '90px' }, { field: 'text', header: 'Name', width: '308px' }]}
                            popupSettings={{
                                width: '418px',
                                fontSize: '12px'
                            }}
                            isFilterable={true}
                            isDisabled={readonly && !isNew}
                        />
                        <button id="add-btn" className="btn-default" onClick={onClickAddList} disabled={readonly && !isNew}>Add</button>
                        {formErrorMessage && (
                            <span className="error-message-no-margin-top margin-left-10">{formErrorMessage}</span>
                        )}
                    </div>
                    <DataGrid
                        dataTable={callCycleDistributor}
                        data={isCallCycleActivityDetail ? localCallCycleDetailsEdit : localCallCycle}
                        selectionMode='single'
                        selectedRow={selectedRow}
                        setSelectedRow={handleSelectionChange}
                    // selectionColHeader='Primary'
                    />
                </div>

                <ConfirmDialog
                    visible={isConfirmBoxVisible}
                    onHide={() => setIsConfirmBoxVisible(false)}
                    message="Are you sure you want to delete?"
                    header="Confirmation"
                    icon="pi pi-exclamation-triangle"
                    accept={handleCustomerDelete}
                    reject={() => console.log('Rejected')}
                />
                <CustomToastMessage status={messageStatuss || ''} labelText={labelTexts} state={opens} setState={setOpens} triggerKey={triggerKeys} />
            </div >
    );

    const footer = (

        <div className='form-button-container'>
            <span>Make sure you have verified all your changes before update</span>
            <Button disabled={isSaving} type='button' variant='outline-green' className='btn-submit' onClick={handleExternalSubmit}>
                {isNew ? (isSaving ? 'Saving...' : 'Save Details') : (isSaving ? 'Updating...' : 'Update Details')}
            </Button>
        </div>

    );

    return <SectionMainBase header={header} main={main} footer={footer}></SectionMainBase>;

};