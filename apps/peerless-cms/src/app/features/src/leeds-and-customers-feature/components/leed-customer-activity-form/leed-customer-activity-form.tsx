import { messageTypeEnum, pageModeEnum, RootState, setActivityPageMode, setSelectedActivity, showMessage } from "@peerless-cms/store";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReadOnlyProvider } from "@peerless/providers";
import { ButtonWidget, FormInput, ToastManager } from "@peerless/controls";
import { Button } from "react-bootstrap";
import { getEnduserCustomerData, InsertAppointment, saveLeadActivity, useLookupData } from "@peerless/queries";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getDateTime } from "@peerless/common";
import { contactId, contactTypeEnum, sectionPathMap } from "@peerless/utils";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import './leed-customer-activity-form.css';
import { format } from "date-fns";

export interface LeedCustomerActivityFormProps { }

export function LeedCustomerActivityForm(props: LeedCustomerActivityFormProps) {
  const [toggleShowFields, setToggleShowFields] = useState(false);
  const [toggleShowFeedback, setToggleShowFeedback] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  type FormFields = z.infer<typeof leedCustomerActivityFormSchema>;
  const navigate = useNavigate();
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const [toggleSampleFields, setToggleSampleFields] = useState(false);

  const { selectedLeedOrCustomer, readonly, originator, loggedUser, activityMode, selectedActivity, contactType, selectedOrganisation, childOriginators } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    readonly: state.leedsAndCustomers.readonly,
    originator: state.header.selectedOriginator,
    loggedUser: state.header.loggedUser,
    activityMode: state.leedsAndCustomers.activityPageMode,
    selectedActivity: state.leedsAndCustomers.selectedActivity,
    contactType: state.leedsAndCustomers.selectedContactType,
    selectedOrganisation: state.organisations.selectedOrganisation,
    childOriginators: state.header.childOriginators,
  }));

  useEffect(() => {
    setToggleShowFeedback(selectedActivity?.activityType == 'SAMF');
    setToggleShowFields(selectedActivity.turnInOrder == 'Y');
  }, [selectedActivity]);

  const mutation = useMutation<any, Error, any>({
    mutationFn: saveLeadActivity
  });

  const mutationAppointment = useMutation<any, Error, any>({
    mutationFn: InsertAppointment
  });

  let quantityComboData: any = [];
  let distributorComboData: any = [];
  let activityTypeComboData: any = [];
  let priorityComboData: any = [];
  let statusComboData: any = [];
  let feedbackData: any = [];

  let defaultDepartmentId: string = originator.defaultDepartmentId;
  let sTableID: string = 'TINO';
  let payload = { sTableID, defaultDepartmentId };
  const { data: quantityData, error: quantityError, isLoading: isQuantityLoading } = useLookupData(payload);

  if (isQuantityLoading)
    quantityComboData = [{ label: 'Loading...', value: '' }];

  if (quantityData) {
    quantityComboData = quantityData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  sTableID = 'ACTP';
  payload = { sTableID, defaultDepartmentId };
  const { data: activityTypeData, error: activityTypeError, isLoading: isActivityTypeLoading } = useLookupData(payload);

  if (isActivityTypeLoading)
    activityTypeComboData = [{ label: 'Loading...', value: '' }];

  const defaultItem = { label: '', value: '' };
  if (activityTypeData) {
    activityTypeComboData = [defaultItem, ...activityTypeData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }))];
  }

  let defaultActivityTypeValue = '';
  if (activityTypeData)
    defaultActivityTypeValue = activityTypeData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';

  sTableID = 'ACPR';
  payload = { sTableID, defaultDepartmentId };
  const { data: priorityData, error: priorityError, isLoading: isPriorityLoading } = useLookupData(payload);

  if (isPriorityLoading)
    priorityComboData = [{ label: 'Loading...', value: '' }];

  if (priorityData) {
    priorityComboData = priorityData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  let defaultPriorityValue = '';
  if (priorityData)
    defaultPriorityValue = priorityData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';

  sTableID = 'ACST';
  payload = { sTableID, defaultDepartmentId };
  const { data: statusData, error: statusError, isLoading: isStatusLoading } = useLookupData(payload);

  if (isStatusLoading)
    statusComboData = [{ label: 'Loading...', value: '' }];

  if (statusData) {
    statusComboData = statusData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  let defaultStatusValue = '';
  if (statusData)
    defaultStatusValue = statusData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';

  sTableID = 'FEED';
  payload = { sTableID, defaultDepartmentId };
  const { data: activityFeedbackData, error: activityFeedbackError, isLoading: isActivityFeedbackLoading } = useLookupData(payload);

  if (isActivityFeedbackLoading)
    feedbackData = [{ label: 'Loading...', value: '' }];

  if (activityFeedbackData) {
    feedbackData = activityFeedbackData.map((item: { tableDescription: any; tableCode: any; }) => ({
      label: item.tableDescription,
      value: item.tableCode,
    }));
  }

  let defaultFeedbackValue = '';
  if (activityFeedbackData)
    defaultFeedbackValue = activityFeedbackData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';

  let euCustPayload = {
    args: {
      ChildOriginators: childOriginators,
      DefaultDepartmentId: originator.defaultDepartmentId,
      Originator: originator.userName,
      CustomerCode: selectedLeedOrCustomer.customerCode,
      EnduserCode: selectedLeedOrCustomer.endUserCode,
      StartIndex: 1,
      RowCount: 1000
    },
    enabled: (childOriginators != null && originator != null && selectedLeedOrCustomer != null)
  }
  const { data: enduserCustomerData, error, isLoading: isLoadingDist } = getEnduserCustomerData(euCustPayload);

  if (isLoadingDist)
    distributorComboData = [{ label: 'Loading...', value: '' }];

  if (enduserCustomerData) {
    distributorComboData = enduserCustomerData.map((item: any) => ({
      label: item.name,
      value: item.customerCode,
    }));
  }

  const leedCustomerActivityFormSchema = z.object({
    subject: z.string().min(1, { message: 'Subject is required' }),
    isSampleIssued: z.boolean(), //.min(1, { message: 'City is required' }),
    isTurnInOrder: z.boolean(),
    quantity: z.string().optional(), //visible only if isTIO checked
    enduserCustDistributor: z.string().optional(), //visible only if isTIO checked. and required
    activityType: z.string().min(1, { message: 'Activity Type is required' }),
    startDate: z.string(),//.max(3, { message: 'The postcode should not exceed 3 digits' }),
    endDate: z.string(),
    assignedTo: z.string().optional(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The phone should include 10 digits' }),
    lead: z.string().optional(), //.refine((val) => val.length === 0 || val.length === 10, { message: 'The mobile should include 10 digits' }),
    customer: z.string().optional(), //.min(1, { message: 'Fax is required' }),
    enduser: z.string().optional(), //.min(1, { message: 'Website is required' }),
    organisation: z.string().optional(), //.min(1, { message: 'Email is required' }),
    priority: z.string(), //.min(1, { message: 'Preffered Method is required' }),
    status: z.string(),
    comments: z.string(),
    isSentNotificationMail: z.boolean(),
    isSendReminder: z.boolean(),
    reminder: z.string(),
    isSendToCalendar: z.boolean(),
    feedback: z.string().optional().nullable(),
    requestSamples: z.boolean().optional(),
    requestSampleDescription: z.string().optional().nullable(),

  }).refine(data => {
    // Perform conditional validation
    if (data.isSampleIssued && ((!data.isSendReminder) || (!data.reminder || data.reminder.trim() === ''))) {
      return false;
    }
    return true;
  }, {
    message: 'Reminder is required when Sample Issued is checked',
    path: ['isSendReminder'], // Specify the path to show the error
  }).refine(data => {
    if (data.isTurnInOrder && (!data.enduserCustDistributor)) {
      return false;
    }
    return true;
  }, {
    message: 'Distributor is required when Turn In Order is checked',
    path: ['enduserCustDistributor'], // Specify the path to show the error
  }).refine(data => {
    if (data.requestSamples && (!data.requestSampleDescription)) {
      return false;
    }
    return true;
  }, {
    message: 'Sample description is required when Request Samples is checked',
    path: ['requestSampleDescription'], // Specify the path to show the error
  });

  const getTransformedDate = (date: string) => {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    return getDateTime(new Date(Date.UTC(year, month, day, hours, minutes, 0)));
  }

  const methods = useForm<FormFields>({
    defaultValues: {
      subject: activityMode === pageModeEnum.New ? '' : selectedActivity?.subject,
      isSampleIssued: (activityMode === pageModeEnum.New ? false : (selectedActivity?.sampleIssued ? selectedActivity?.sampleIssued == 'Y' ? true : false : false)),  //need to modify
      isTurnInOrder: (activityMode === pageModeEnum.New ? false : (selectedActivity?.turnInOrder ? selectedActivity?.turnInOrder == 'Y' ? true : false : false)), //need to modify
      quantity: (activityMode === pageModeEnum.New ? 'ZERO' : (selectedActivity?.quantity ? selectedActivity?.quantity : 'ZERO')),
      enduserCustDistributor: (activityMode === pageModeEnum.New ? '' : (selectedActivity?.enduserCustDistributor ? selectedActivity?.enduserCustDistributor : '')),
      activityType: (activityMode === pageModeEnum.New ? defaultActivityTypeValue : (selectedActivity?.activityType != null ? selectedActivity?.activityType : defaultActivityTypeValue)),
      // startDate: (activityMode === pageModeEnum.New ? getDateTime() : (selectedActivity?.startDate ? getDateTime(selectedActivity?.startDate) : getDateTime())),
      startDate: (activityMode === pageModeEnum.New ? getDateTime() : (selectedActivity?.startDate ? getTransformedDate(selectedActivity?.startDate) : getDateTime())),
      // endDate: (activityMode === pageModeEnum.New ? getDateTime(undefined, 30) : (selectedActivity?.endDate ? getDateTime(selectedActivity?.endDate) : getDateTime(undefined, 30))),
      endDate: (activityMode === pageModeEnum.New ? getDateTime(undefined, 30) : (selectedActivity?.endDate ? getTransformedDate(selectedActivity?.endDate) : getDateTime(undefined, 30))),
      assignedTo: (activityMode === pageModeEnum.New ? loggedUser.userName : (selectedActivity?.assignedTo ? selectedActivity?.assignedTo : loggedUser.userName)),
      lead: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer.name : '',
      customer: contactType == contactTypeEnum.customer ? selectedLeedOrCustomer.name : '',
      enduser: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.name : '',
      organisation: contactType == contactTypeEnum.organisation ? selectedOrganisation.organisationName : '',
      priority: (activityMode === pageModeEnum.New ? defaultPriorityValue : (selectedActivity?.priority ? selectedActivity?.priority : '')),
      status: (activityMode === pageModeEnum.New ? defaultStatusValue : (selectedActivity?.status ? selectedActivity?.status : '')),
      comments: (activityMode === pageModeEnum.New ? '' : (selectedActivity?.comments ? selectedActivity?.comments : '')),
      isSentNotificationMail: (activityMode === pageModeEnum.New ? false : (selectedActivity?.sentMail ? selectedActivity?.sentMail == 'Y' ? true : false : false)),
      isSendReminder: (activityMode === pageModeEnum.New ? false : (selectedActivity?.sendReminder ? selectedActivity?.sendReminder == 'Y' ? true : false : false)),
      // reminder: (activityMode === pageModeEnum.New ? getDateTime() : (selectedActivity?.reminderDate ? getDateTime(selectedActivity?.reminderDate) : '')),
      reminder: (activityMode === pageModeEnum.New ? getDateTime() : (selectedActivity?.reminderDate ? getTransformedDate(selectedActivity?.reminderDate) : '')),
      isSendToCalendar: false,
      feedback: activityMode === pageModeEnum.New ? defaultFeedbackValue ?? '' : selectedActivity?.sampleFeedback,
      requestSamples: activityMode === pageModeEnum.New ? false : selectedActivity.RequestSamples === 'Y',
      requestSampleDescription: activityMode === pageModeEnum.New ? '' : selectedActivity.RequestSampleDescription,
    },
    resolver: zodResolver(leedCustomerActivityFormSchema),
  });

  useEffect(() => {
    if ((activityTypeData && !isActivityTypeLoading)) {
      methods.reset({
        subject: activityMode === pageModeEnum.New ? '' : selectedActivity?.subject,
        isSampleIssued: activityMode === pageModeEnum.New ? false : selectedActivity?.sampleIssued === 'Y',
        isTurnInOrder: activityMode === pageModeEnum.New ? false : selectedActivity?.turnInOrder === 'Y',
        quantity: activityMode === pageModeEnum.New ? 'ZERO' : selectedActivity?.quantity || 'ZERO',
        enduserCustDistributor: activityMode === pageModeEnum.New ? '' : selectedActivity?.enduserCustDistributor || '',
        activityType: activityMode === pageModeEnum.New ? defaultActivityTypeValue : selectedActivity?.activityType ?? defaultActivityTypeValue,
        // startDate: activityMode === pageModeEnum.New ? getDateTime() : getDateTime(selectedActivity?.startDate),
        startDate: activityMode === pageModeEnum.New ? getDateTime() : getTransformedDate(selectedActivity?.startDate),
        // endDate: activityMode === pageModeEnum.New ? getDateTime(undefined, 30) : getDateTime(selectedActivity?.endDate),
        endDate: activityMode === pageModeEnum.New ? getDateTime(undefined, 30) : getTransformedDate(selectedActivity?.endDate),
        assignedTo: activityMode === pageModeEnum.New ? loggedUser.userName : selectedActivity?.assignedTo || loggedUser.userName,
        lead: contactType === contactTypeEnum.lead ? selectedLeedOrCustomer.name : '',
        customer: contactType === contactTypeEnum.customer ? selectedLeedOrCustomer.name : contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.customerName : '',
        enduser: contactType === contactTypeEnum.enduser ? selectedLeedOrCustomer.name : '',
        organisation: contactType == contactTypeEnum.organisation ? selectedOrganisation.organisationName : '',
        priority: activityMode === pageModeEnum.New ? defaultPriorityValue : selectedActivity?.priority || '',
        status: activityMode === pageModeEnum.New ? defaultStatusValue : selectedActivity?.status || '',
        comments: activityMode === pageModeEnum.New ? '' : selectedActivity?.comments || '',
        isSentNotificationMail: activityMode === pageModeEnum.New ? false : selectedActivity?.sentMail === 'Y',
        isSendReminder: activityMode === pageModeEnum.New ? false : selectedActivity?.sendReminder === 'Y',
        // reminder: activityMode === pageModeEnum.New ? getDateTime() : getDateTime(selectedActivity?.reminderDate),
        reminder: activityMode === pageModeEnum.New ? getDateTime() : getTransformedDate(selectedActivity?.reminderDate),
        isSendToCalendar: false,
        feedback: activityMode === pageModeEnum.New ? defaultFeedbackValue ?? '' : selectedActivity?.sampleFeedback,
        requestSamples: activityMode === pageModeEnum.New ? false : selectedActivity.requestSamples === 'Y',
        requestSampleDescription: activityMode === pageModeEnum.New ? '' : selectedActivity.requestSampleDescription,
      });

      setToggleSampleFields(selectedActivity.requestSamples === 'Y');
    }
  }, [activityTypeData, isActivityTypeLoading, enduserCustomerData, methods]);

  const onSubmit = (data: FormFields) => {
    const payload = {
      StartDate: data.startDate,
      EndDate: data.endDate,
      AdditionalParams: '',
      StartIndex: 0,
      RowCount: 0,
      RepType: activityMode === pageModeEnum.New ? '' : selectedActivity.repType ?? '',
      IsNew: activityMode === pageModeEnum.New ? true : selectedActivity.isNew,
      HasChecklist: activityMode === pageModeEnum.New ? true : selectedActivity.hasChecklist,
      IsServiceCall: activityMode === pageModeEnum.New ? true : selectedActivity.isServiceCall,
      ReminderCreated: activityMode === pageModeEnum.New ? data.isSendReminder : selectedActivity.reminderCreated,
      CreatedDate: new Date().toISOString(),
      LastModifiedDate: new Date().toISOString(),
      ReminderDate: data.reminder == '' ? null : data.reminder,
      ActivityCount: activityMode === pageModeEnum.New ? 0 : selectedActivity.activityCount,
      ActivityID: activityMode === pageModeEnum.New ? 0 : selectedActivity.activityID,
      AppointmentID: activityMode === pageModeEnum.New ? 0 : selectedActivity.appointmentID,
      ChecklistID: activityMode === pageModeEnum.New ? 0 : selectedActivity.checklistID,
      LeadID: contactType == contactTypeEnum.lead ? selectedLeedOrCustomer.sourceId : 0,
      LeadStageID: activityMode === pageModeEnum.New ? 0 : selectedActivity.leadStageID,
      ParentActivityID: activityMode === pageModeEnum.New ? 0 : selectedActivity.parentActivityID,
      RepGroupID: activityMode === pageModeEnum.New ? 0 : selectedActivity.repGroupID,
      ActivityType: data.activityType,
      ActivityTypeDescription: activityMode === pageModeEnum.New ? '' : selectedActivity.activityTypeDescription ?? '',
      AssignedTo: data.assignedTo,
      Comments: data.comments,
      CreatedBy: loggedUser.userName,
      CustomerCode: contactType == contactTypeEnum.customer || contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.customerCode : '',
      LastModifiedBy: loggedUser.userName,
      Priority: data.priority,
      PriorityDescription: activityMode === pageModeEnum.New ? '' : selectedActivity.priorityDescription ?? '',
      ModifiedBy: loggedUser.userName,
      RepGroupName: activityMode === pageModeEnum.New ? '' : selectedActivity.repGroupName ?? '',
      SendReminder: data.isSendReminder ? 'Y' : 'N',
      SentMail: data.isSentNotificationMail ? 'Y' : 'N',
      Status: data.status,
      StatusDescription: activityMode === pageModeEnum.New ? '' : selectedActivity.statusDescription ?? '',
      Subject: data.subject,
      EndUserCode: contactType == contactTypeEnum.enduser ? selectedLeedOrCustomer.endUserCode : '',
      Code: activityMode === pageModeEnum.New ? '' : selectedActivity.code ?? '',
      Description: activityMode === pageModeEnum.New ? "" : selectedActivity.description ?? '',
      EmailAddresses: activityMode === pageModeEnum.New ? "" : selectedActivity.emailAddresses ?? '',
      EmailTemplate: activityMode === pageModeEnum.New ? "" : selectedActivity.emailTemplate ?? '',
      ActivityTypeColour: activityMode === pageModeEnum.New ? '' : selectedActivity.activityTypeColour ?? '',
      SetAsDefault: activityMode === pageModeEnum.New ? "" : selectedActivity.setAsDefault ?? '',
      ColdCallActivity: activityMode === pageModeEnum.New ? "" : selectedActivity.coldCallActivity ?? '',
      ShowInPlanner: activityMode === pageModeEnum.New ? "" : selectedActivity.showInPlanner ?? '',
      ShowInPlannerChecked: activityMode === pageModeEnum.New ? false : selectedActivity.showInPlannerChecked ?? false,
      SampleIssued: data.isSampleIssued ? 'Y' : 'N',
      SampleFeedBack: data.activityType == 'SAMF' ? data.feedback : 'FENTA',
      TurnInOrder: data.isTurnInOrder ? 'Y' : 'N',
      Quantity: data.isTurnInOrder ? data.quantity : 'ZERO',
      EnduserCustDistributor: data.enduserCustDistributor ?? '',
      RequestSamples: data.requestSamples ? 'Y' : 'N',
      RequestSampleDescription: data.requestSampleDescription ?? '',
      RepName: activityMode === pageModeEnum.New ? "" : selectedActivity.repName ?? '',
      DistributorName: activityMode === pageModeEnum.New ? "" : selectedActivity.distributorName ?? '',
      EndUserName: activityMode === pageModeEnum.New ? "" : selectedActivity.endUserName ?? '',
      OrgID: contactType == contactTypeEnum.organisation ? selectedOrganisation.orgnaisationID : 0,
      Originator: originator.userName,
      ChildOriginators: '',
      DefaultDepartmentId: loggedUser.defaultDepartmentId
    }

    setIsSave(true);
    mutation.mutate(payload, {
      onSuccess: (response) => {
        if (response) {
          if (activityMode === pageModeEnum.Edit) {
            let updatedActivity = {
              ...selectedActivity,
              subject: data.subject,
              isSampleIssued: data.isSampleIssued,
              isTurnInOrder: data.isTurnInOrder,
              quantity: data.quantity,
              enduserCustDistributor: data.enduserCustDistributor,
              activityType: data.activityType,
              startDate: data.startDate,
              endDate: data.endDate,
              assignedTo: data.assignedTo,
              lead: data.lead,
              customer: data.customer,
              enduser: data.enduser,
              organisation: data.organisation,
              priority: data.priority,
              status: data.status,
              comments: data.comments,
              sentMail: data.isSentNotificationMail ? 'Y' : 'N',
              sendReminder: data.isSendReminder ? 'Y' : 'N',
            }
            dispatch(setSelectedActivity(updatedActivity));
          }

          //send to calendar if checked
          if (data.isSendToCalendar) {
            let appointmentRequest = {
              Appointment: {
                Subject: data.subject,
                Body: data.comments,
                StartTime: data.startDate,
                EndTime: data.endDate,
                Category: data.activityType,
                CreatedBy: loggedUser.userName
              },
              IsUpdateActivity: true,
              ActivityId: selectedActivity.activityID
            }

            mutationAppointment.mutate(appointmentRequest, {
              onSuccess: (response) => {
                setIsSave(false);
                redirectToList();
              },
              onError: (error) => {
                setIsSave(false);
                console.error('Failed to insert appointment');
              }
            });
          }
          else {
            setIsSave(false);
            redirectToList();
          }
        }
      },
      onError: (error) => {
        setIsSave(false);
        console.error('Failed to update activity');
        messageMgr.showMessage("error", 'Error: ', 'Error occured');
      }
    });
  }

  const redirectToList = () => {
    dispatch(setActivityPageMode(pageModeEnum.List));
    navigate(`${sectionPathMap[contactType]}${contactType == contactTypeEnum.organisation ? selectedOrganisation?.[contactId[contactType]] : selectedLeedOrCustomer?.[contactId[contactType]]}/activity`);
  }

  const handleExternalSubmit = () => {
    if (formRef.current) {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }

    methods.handleSubmit( //to check form validation report
      (data) => {
        console.log("Validation passed! Form data:", data);
      },
      (errors) => {
        console.log("Validation failed! Errors:", errors);
      }
    )();

  };

  const toggleTurnInOrderControls = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setToggleShowFields(checked);
  }

  const toggleSampleControls = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setToggleSampleFields(checked);
  }

  const toggleFeedbackControls = (event: any) => {
    setToggleShowFeedback(event.target.value == 'SAMF');
  }

  const onChangeStartDate = (e: any) => {
    methods.setValue("endDate", getDateTime(e.target.value, 30), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }

  let isReminderCreated = selectedActivity?.reminderCreated;

  return (
    <div className='content margin-top-20'>
      <ToastMessages ref={messagesRef} />
      <ReadOnlyProvider readOnly={false} section='contactDetailForm'>
        <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          <FormProvider {...methods}>
            <div className='form-group-container'>
              <div className='form-group'>
                <span>Schedular</span>
                <FormInput label='Subject' name='subject' required={true} />
                <div className="form-vertical-group">
                  <FormInput label='Sample Issued' name='isSampleIssued' type="checkBox" />
                  <FormInput label='Turn In Order' name='isTurnInOrder' type="checkBox" onChangeCallBack={toggleTurnInOrderControls} />
                  {contactType == contactTypeEnum.enduser && <FormInput label='Request Samples' name='requestSamples' type="checkBox" onChangeCallBack={toggleSampleControls} />}
                </div>
                {toggleShowFields && (
                  <>
                    <FormInput label='Quantity' name='quantity' type="select" comboBoxOptions={quantityComboData} />
                    <FormInput label='Distributor' name='enduserCustDistributor' type="select" comboBoxOptions={distributorComboData} required={true} />
                  </>
                )}
                {toggleSampleFields && (
                  <FormInput label='Samples' name='requestSampleDescription' required={true} />
                )}
                <FormInput label='Activity Type' name='activityType' type="select" comboBoxOptions={activityTypeComboData} onChangeCallBack={toggleFeedbackControls} />
                {toggleShowFeedback && (
                  <div className="form-field">
                    <label>Feedback</label>
                    {feedbackData.map((item: any, index: any) => (
                      <FormInput key={index} label={item.label} value={item.value} name='feedback' type="radio" />
                    ))}
                  </ div>
                )}
                <FormInput label='Start Date' name='startDate' type="datetime-local" onChangeCallBack={onChangeStartDate} />
                <FormInput label='End Date' name='endDate' type="datetime-local" />
                <FormInput label='Assigned To' name='assignedTo' isDisabled={true} />
              </div>
              <div className='form-group'>
                <span>Lead Details</span>
                <FormInput label='Lead' name='lead' isDisabled={true} />
                <FormInput label='Customer' name='customer' isDisabled={true} />
                <FormInput label='Enduser' name='enduser' isDisabled={true} />
                <FormInput label='Organisation' name='organisation' isDisabled={true} />
                <FormInput label='Priority' name='priority' type="select" comboBoxOptions={priorityComboData} />
                <FormInput label='Status' name='status' type="select" comboBoxOptions={statusComboData} />
              </div>
              <div className='form-group'>
                <span>Notification</span>
                <FormInput label='Comments' name='comments' type="textarea" />
                <div className="form-vertical-group">
                  <FormInput label='Send Notification Mail' name='isSentNotificationMail' type="checkBox" />
                  <FormInput label='Send Reminder' name='isSendReminder' type="checkBox" isDisabled={isReminderCreated} />
                </div>
                <FormInput label='Reminder Date' name='reminder' type="datetime-local" isDisabled={isReminderCreated} />
                <FormInput label='Send To Calendar' name='isSendToCalendar' type="checkBox" />
                <div className="form-section-bottom">
                  <label>{activityMode == pageModeEnum.Edit && selectedActivity.lastModifiedDate != null ? 'Last Modified By: ' + selectedActivity.lastModifiedBy + ', ' + format(new Date(selectedActivity.lastModifiedDate), 'yyyy-MM-dd HH:mm') : ''}</label>
                  <label>{activityMode == pageModeEnum.Edit && selectedActivity.createdDate != null ? 'Created By: ' + selectedActivity.createdBy + ', ' + format(selectedActivity.createdDate, 'yyyy-MM-dd HH:mm') : ''}</label>
                </div>

              </div>
            </div>

          </FormProvider>
        </form>
      </ReadOnlyProvider>

      <footer>
        <div className='form-button-container footer-content'>
          <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
          {activityMode === pageModeEnum.New ? (
            <ButtonWidget
              id='customer-activity-save-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
              Function={() => handleExternalSubmit()}
              name={isSave ? 'Saving...' : 'Save Details'}
            />
          ) :
            (<ButtonWidget
              id='customer-activity-update-button'
              classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
              Function={() => handleExternalSubmit()}
              name={isSave ? 'Updating...' : 'Update Details'}
            />)}
        </div>
      </footer>


    </div>
  )
}