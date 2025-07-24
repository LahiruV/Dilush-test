import { Button } from "react-bootstrap";
import SectionMainBase from "../../../lib/section-main-base";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setSelectedCustomer, updateDetails } from "@peerless-cms/store";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { ReadOnlyProvider } from "@peerless/providers";
import { FormProvider, useForm } from "react-hook-form";
import { ButtonWidget, FormInput, PageLoader, ToastManager } from "@peerless/controls";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { findTableCodeByDescription, getMarketName } from "@peerless/common";
import { getCustomer, updateCustomer, useLookupData } from "@peerless/queries";
import { useEffect } from 'react';
import { useMutation } from "@tanstack/react-query";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { contactId, contactTypeName, sectionPathMap } from "@peerless/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";


export interface CustomersDetailProps {
    hideHeader?: boolean,
    isFromOrganisation?: boolean,
}

export function CustomersDetails(props: CustomersDetailProps) {
    const formRef = useRef<HTMLFormElement | null>(null);
    type FormFields = z.infer<typeof customerDetailSchema>;
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    const dispatch = useDispatch();
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const { selectedLeedOrCustomer, readonly, originator, loggedUser, selectedCustomer, contactType, organisationCustomer, selectedOrganisation } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        readonly: state.leedsAndCustomers.readonly,
        originator: state.header.selectedOriginator,
        loggedUser: state.header.loggedUser,
        selectedCustomer: state.leedsAndCustomers.selectedCustomer,
        contactType: state.leedsAndCustomers.selectedContactType,
        organisationCustomer: state.organisations.selectedOrgDistributor,
        selectedOrganisation: state.organisations.selectedOrganisation,
    }));

    const mutation = useMutation<any, Error, any>({
        mutationFn: updateCustomer
    });

    let subMarkets = [];
    let grades: any = [];
    let potentialOpportunities = [{ label: 'Weekly', value: 'W' }, { label: 'Monthly', value: 'M' }, { label: 'Yearly', value: 'Y' }];
    let sourceList = [];

    let sTableID: string = 'CHAN';
    let defaultDepartmentId: string = originator.defaultDepartmentId;
    let payloadSubMarkets = { sTableID, defaultDepartmentId };
    const { data: subMarketData, error: subMarketError, isLoading: isSubMarketLoading } = useLookupData(payloadSubMarkets);

    // if(isSubMarketLoading)
    //     subMarkets = [{label: 'Loading...', value: ''}];

    let defaultSubMarket = '';
    if (subMarketData) {
        subMarkets = subMarketData.map((item: { tableDescription: any; tableCode: any; }) => ({
            label: item.tableDescription,
            value: item.tableCode,
        }));
        defaultSubMarket = subMarketData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';
    }

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

    sTableID = 'SRCE';
    let payloadSource = { sTableID, defaultDepartmentId };
    const { data: sourceData, error: sourceError, isLoading: isSourceLoading } = useLookupData(payloadSource);

    if (isSourceLoading)
        sourceList = [{ label: 'Loading...', value: '' }];

    let defaultSource = '';
    if (sourceData) {
        sourceList = sourceData.map((item: { tableDescription: any; tableCode: any; }) => ({
            label: item.tableDescription,
            value: item.tableCode,
        }));
        defaultSource = sourceData.find((item: { defaultValue: any }) => item.defaultValue === 'Y')?.tableCode || '';
    }

    let custCode: string = props.isFromOrganisation ? organisationCustomer.customerCode : selectedLeedOrCustomer.customerCode;
    let payload = { customerCode: custCode };
    const { data: customerData, error: getCustomerError, isLoading: isCustomerLoading } = getCustomer(payload);

    useEffect(() => {
        if (customerData) {
            dispatch(setSelectedCustomer(customerData));
        }
    }, [customerData]);


    const customerDetailSchema = z.object({
        customerCode: z.string(),
        shortName: z.string(),
        name: z.string(),
        company: z.string(),
        market: z.string(),
        subMarket: z.string(),
        potentialOpportunityBy: z.string(),
        potentialOpportunity: z.number(),
        foodServiceRep: z.string(),
        bakeryRebatePerc: z.number(),
        grade: z.string(),
        businessPotential: z.string(),
        referredBy: z.string(),
        source: z.string(),
        description: z.string(),
        annualRevenue: z.number(),
        noOfEmployees: z.number(),
        bakeryRep: z.string(),
        tioAcceptance: z.string(),
        tioEmail: z.string().min(1, 'TIO email is required'),
    });

    const methods = useForm<FormFields>({
        resolver: zodResolver(customerDetailSchema),
    });

    useEffect(() => {
        if (selectedCustomer) {
            methods.reset({
                customerCode: selectedCustomer.customerCode ?? '',
                shortName: selectedCustomer.shortName ?? '',
                company: selectedCustomer.company ?? '',
                name: selectedCustomer.name ?? '',
                market: getMarketName(selectedCustomer.custMarket),
                subMarket: (selectedCustomer.business != null && selectedCustomer.business.trim() != '') ? selectedCustomer.business : defaultSubMarket,
                potentialOpportunityBy: (selectedCustomer.litersBy != null && selectedCustomer.litersBy.trim() != '') ? selectedCustomer.litersBy : 'W',
                potentialOpportunity: selectedCustomer.potentialLiters ?? 0,
                foodServiceRep: selectedCustomer.primaryRepName ?? '',
                bakeryRebatePerc: selectedCustomer.bakRebPerc ?? 0,
                grade: (selectedCustomer.grade != null && selectedCustomer.grade.trim() != '') ? findTableCodeByDescription(grades, selectedCustomer.grade) : defaultGrade,
                businessPotential: selectedCustomer.businessPotential ?? '',
                referredBy: selectedCustomer.referredBy ?? '',
                source: (selectedCustomer.leadSource != null && selectedCustomer.leadSource.trim() != '') ? selectedCustomer.leadSource : defaultSource,
                description: selectedCustomer.description ?? '',
                annualRevenue: selectedCustomer.annualRevenue ?? 0,
                noOfEmployees: selectedCustomer.noOfEmployees ?? 0,
                bakeryRep: selectedCustomer.secondaryRepName ?? '',
                tioAcceptance: (selectedCustomer.tioAcceptance != null && selectedCustomer.tioAcceptance == 1) ? 'Yes' : 'No',
                tioEmail: selectedCustomer.tiO_Email ?? '',
            });
        }
    }, [selectedCustomer, organisationCustomer, methods, subMarketData, gradesData, sourceData]);

    const handleExternalSubmit = () => {
        if (formRef.current) {
            formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
    };

    const onSubmit = (data: FormFields) => {
        const payload = {
            CustCode: selectedCustomer.customerCode,
            Emails: data.tioEmail,
            Grade: data.grade,
            Originator: loggedUser.userName
        }
        setIsProcessing(true);
        mutation.mutate(payload, {
            onSuccess: (response) => {
                setIsProcessing(false);
                if (response) {
                    if (props.isFromOrganisation) {
                        navigate(`${sectionPathMap[contactType]}${selectedOrganisation?.[contactId[contactType]]}/distributor`);
                    }
                    else {
                        dispatch(updateDetails(true))
                        toast.success('Customer Updated Successfully');
                    }
                }
            },
            onError: (error) => {
                setIsProcessing(false);
                dispatch(updateDetails(true))
                toast.error('Customer Update Failed');
                console.error(error.message);
            }
        });
    };

    const header = (
        <div className="lead-customer-detail-section-header-container margin-bottom-20">
            <span className="center-align section-title">
                {contactTypeName[contactType]}
                <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
                <FontAwesomeIcon className="header-icon" icon={fa.faInfoCircle} size="1x" />
                Customer Details
                <span className="font-light">&nbsp; | &nbsp;</span>
                <span className="center-align section-title font-light">{`(${selectedCustomer?.name})`}</span>
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

    const main = (
        isCustomerLoading ? <PageLoader /> :
            <div className='content'>
                <ToastMessages ref={messagesRef} />
                <ReadOnlyProvider readOnly={readonly} section='contactDetailForm'>
                    <form className='lead-customer-contact-detail-form' onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
                        <FormProvider {...methods}>
                            <div className='form-group-container'>
                                <div className='form-group'>
                                    <span>Company</span>
                                    <FormInput label='Code' name='customerCode' isDisabled={true} />
                                    <FormInput label='Short Name' name='shortName' isDisabled={true} />
                                    <FormInput label='Name' name='name' isDisabled={true} />
                                    <FormInput label='Company' name='company' isDisabled={true} />
                                    <FormInput label='Market' name='market' isDisabled={true} />
                                    <FormInput label='Sub Market' name='subMarket' type='select' comboBoxOptions={subMarkets} isDisabled={true} />
                                    <FormInput label='Food Service Rep' name='foodServiceRep' isDisabled={true} />
                                    <FormInput label='Bakery Rebate Perc' name='bakeryRebatePerc' isDisabled={true} />
                                    <FormInput label='Grade' name='grade' type="select" comboBoxOptions={grades} />
                                </div>
                                <div className='form-group'>
                                    <span>Opportunity & Revenue</span>
                                    <FormInput label='Potential Opportunity By' name='potentialOpportunityBy' type="select" comboBoxOptions={potentialOpportunities} isDisabled={true} />
                                    <FormInput label='Potential Opportunity' name='potentialOpportunity' isDisabled={true} />
                                    <FormInput label='Business Potential' name='businessPotential' isDisabled={true} />
                                    <FormInput label='Referred By' name='referredBy' isDisabled={true} />
                                    <FormInput label='Source' name='source' type="select" comboBoxOptions={sourceList} isDisabled={true} />
                                    <FormInput label='Annual Revenue' name='annualRevenue' isDisabled={true} />
                                    <FormInput label='No of Employees' name='noOfEmployees' isDisabled={true} />
                                    <FormInput label='Bakery Rep' name='bakeryRep' isDisabled={true} />
                                </div>
                                <div className='form-group'>
                                    <span>Other</span>
                                    <FormInput label='Description' name='description' isDisabled={true} />
                                    <FormInput label='TIO Acceptance' name='tioAcceptance' isDisabled={true} />
                                    <FormInput label='TIO Email (Use semicolon to separate emails)' name='tioEmail' required={true} />
                                </div>
                            </div>

                        </FormProvider>
                    </form>
                </ReadOnlyProvider>
            </div>

    );

    const footer = (
        <div className='form-button-container footer-content'>
            {!readonly &&
                <>
                    <span className='footer-span-content'>Make sure you have verified all your changes before update</span>
                    <ButtonWidget
                        id='customer-details-update-button'
                        classNames='k-button-md k-rounded-md k-button-solid k-button-solid-primary footer-save-button'
                        Function={() => handleExternalSubmit()}
                        name={isProcessing ? 'Updating...' : 'Update Details'}
                    />
                </>
            }
        </div>
    );

    return <SectionMainBase header={props.hideHeader != null && props.hideHeader == true ? <></> : header} main={main} footer={footer}></SectionMainBase>;
}