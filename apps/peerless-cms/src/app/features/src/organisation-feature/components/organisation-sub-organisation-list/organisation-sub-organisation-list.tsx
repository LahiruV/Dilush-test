import { RootState, setSelectedSubOrg } from "@peerless-cms/store";
import { OrganisationSubOrganisationGrid } from "@peerless/common";
import { DataGrid, MultiColumnComboBoxWidget, ToastManager } from "@peerless/controls";
import { addOrganisationLink, deleteLink, getOrganisationSubOrgGrid, getOrganisationSubOrgList, getOrganisationSubOrgListInfinite } from "@peerless/queries";
import { contactId, sectionPathMap } from "@peerless/utils";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './organisation-sub-organisation-list.css';
import { useMutation } from "@tanstack/react-query";
import { RenderStatusContentTable } from "@peerless/models";

export interface OrganisationSubOrganisationListProps { }

const startIndex = 1;
const rowCount = 50;

export function OrganisationSubOrganisationList(props: OrganisationSubOrganisationListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    const { ref, inView } = useInView({ triggerOnce: false });
    const [isSaving, setIsSaving] = useState<any>(false);
    const [isDeleting, setIsDeleting] = useState<any>(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<any>(false);
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const [searchText, setSearchText] = useState<any>('');
    const [isAddSubOrgModalOpen, setIsSubOrgModalOpen] = useState(false);
    const [comment, setComment] = useState<any>('');
    const [subOrgList, setSubOrgList] = useState<any>([]);
    const [selectedSubOrgLocal, setSelectedSubOrgLocal] = useState<{ orgnaisationName: string, city: string, contact: string, orgnaisationID: number } | null>(null);

    const { ref: subOrgRef, inView: subOrgInView } = useInView({ triggerOnce: true });

    const { originator, childOriginator, selectedContactType, loggedUser, selectedOrganisation, selectedSubOrg } = useSelector((state: RootState) => ({
        originator: state.header.selectedOriginator,
        childOriginator: state.header.childOriginators,
        selectedContactType: state.leedsAndCustomers.selectedContactType,
        loggedUser: state.header.loggedUser,
        selectedOrganisation: state.organisations.selectedOrganisation,
        selectedSubOrg: state.organisations.selectedSubOrg,
    }));

    const mutation = useMutation<any, Error, any>({
        mutationFn: addOrganisationLink
    });

    const mutationDelete = useMutation<any, Error, any>({
        mutationFn: deleteLink
    });

    let payload: any = {
        OrderBy: "org_name ASC",
        LeadStageId: 0,
        LeadStage: selectedContactType,
        DisplayInCRM: true,
        AdditionalParams: searchText ? (` org_name like lower('%${searchText}%')`) : '',
        repType: 'F',
        ChildReps: originator.childReps,
        IsShowLeastActive: false,
        ActiveInactiveChecked: true,
        ReqSentIsChecked: false,
        AddParams: searchText ? (` org_name like lower('%${searchText}%')`) : '',
        Originator: originator.userName,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        CRMAuthLevel: (!loggedUser.userName) ? 0 : loggedUser.crmAuthLevel,
        ChildOriginators: childOriginator,
        StartIndex: startIndex,
        RowCount: rowCount,
        OrgName: '',
        ColumnFilter: ''
    };

    useEffect(() => {
        payload = {
            OrderBy: "org_name ASC",
            LeadStageId: 0,
            LeadStage: selectedContactType,
            DisplayInCRM: true,
            AdditionalParams: searchText ? (` org_name like lower('%${searchText}%')`) : '',
            repType: 'F',
            ChildReps: originator.childReps,
            IsShowLeastActive: false,
            ActiveInactiveChecked: true,
            ReqSentIsChecked: false,
            AddParams: searchText ? (` enduser_code like '%${searchText}%'`) : '',
            Originator: originator.userName,
            DefaultDepartmentId: loggedUser.defaultDepartmentId,
            CRMAuthLevel: (!loggedUser.userName) ? 0 : loggedUser.crmAuthLevel,
            ChildOriginators: childOriginator,
            StartIndex: startIndex,
            RowCount: rowCount,
        };
    }, [searchText]);

    // const { data: orgSubOrgData, error: filterSubOrgError, status: filterSubOrgStatus, isLoading: isFilterSubOrgLoading, refetch: filterSubOrgFetch } = getOrganisationSubOrgList(payload);
    const { data: orgSubOrgData, error: filterSubOrgError, status: filterSubOrgStatus, isLoading: isFilterSubOrgLoading,
        fetchNextPage, isFetchingNextPage, hasNextPage, refetch: filterSubOrgFetch } = getOrganisationSubOrgListInfinite(payload, rowCount);

    useEffect(() => {
        if (orgSubOrgData) {
            let euList = orgSubOrgData.pages.flatMap((item: any) => item.data.map((group: any) => ({
                orgnaisationName: group.organisationName ?? '',
                contact: group.contact ?? '',
                city: group.city ?? '',
                orgnaisationID: group.orgnaisationID
            })));

            setSubOrgList(euList);
        }

        if (filterSubOrgStatus == 'pending') {
            setSubOrgList([{ orgnaisationName: searchText, contact: 'Loading... ', city: '' }]);
        }

    }, [orgSubOrgData, filterSubOrgStatus]);

    useEffect(() => {
        if (subOrgInView && hasNextPage) {
            fetchNextPage();
        }
    }, [subOrgInView])

    const orgSubPayload = {
        OrganisationId: selectedOrganisation.orgnaisationID,
        Status: 'Active',
        OrderBy: "org_id desc",
        StartIndex: 1,
        OrgName: '', //remove later
        AddParams: '', //remove later
        ChildReps: '', //remove later
        Originator: '', //remove later
        ColumnFilter: '', //remove later
        RowCount: 50
    };

    const { orgSubOrgListData, error: orgSubError, status: orgSubStatus, isLoading: orgSubLoading,
        fetchNextPage: orgSubFetchNext, isFetchingNextPage: orgSubIsFetchNext, hasNextPage: orgSubHasNextPage, refetch: orgSubRefetch } = getOrganisationSubOrgGrid(orgSubPayload, 50);

    useEffect(() => {
        if (inView && orgSubHasNextPage && !orgSubIsFetchNext) {
            orgSubFetchNext().then(result => {
            }).catch(error => {
                console.error("Error fetching next page");
            });
        }
    }, [orgSubFetchNext, inView]);

    const handleRowPopupClick = (type: any, rowData: any) => {
        dispatch(setSelectedSubOrg(rowData));
        if (type == 'edit') {
            navigate(`${sectionPathMap[selectedContactType]}${selectedOrganisation?.[contactId[selectedContactType]]}/sub-organisation/update`);
        }
        else if (type == 'delete') {
            setIsDeletePopupOpen(true);
        }
    }

    const handleSubOrgOnChange = (e: any) => {
        setSelectedSubOrgLocal(e);
        setFormErrorMessage(null);
    }

    const onClickAddSubOrg = (e: any) => {
        if (selectedSubOrgLocal == null) {
            setFormErrorMessage('Please select an organisation');
            return;
        }
        setIsSubOrgModalOpen(true);
    }

    const closeAddSubOrgModal = () => {
        setIsSubOrgModalOpen(false);
        setComment('');
    }

    const handleAddSubOrgSave = () => {
        const addEuPayload = {
            Orgnaisation1ID: Number(selectedOrganisation.orgnaisationID),
            Orgnaisation2ID: selectedSubOrgLocal?.orgnaisationID,
            Comment: comment,
            Originator: originator.userName,
            LinkType: 'organisation',
        }
        setIsSaving(true);
        mutation.mutate(addEuPayload, {
            onSuccess: (response) => {
                setIsSaving(false);
                setIsSubOrgModalOpen(false);
                setComment('');
                if (response) {
                    orgSubRefetch();
                    setSelectedSubOrgLocal(null);
                    messageMgr.showMessage('success', 'Success: ', 'Organisation saved');
                }
                else {
                    messageMgr.showMessage('error', 'Error: ', 'Error occured while saving Organisation');
                }
            },
            onError: (error) => {
                setIsSaving(false);
                setIsSubOrgModalOpen(false);
                setComment('');
                messageMgr.showMessage('error', 'Error: ', 'Error occured while saving Organisation');
            }
        });
    }

    const handleCancelDeleteSubOrg = () => {
        setIsDeletePopupOpen(false);
    }

    const handleDeleteSubOrg = () => {
        const deletePayload = {
            LinkID: Number(selectedSubOrg.linkId)
        }
        setIsDeleting(true);
        mutationDelete.mutate(deletePayload, {
            onSuccess: (response) => {
                setIsDeleting(false);
                setIsDeletePopupOpen(false);
                if (response) {
                    orgSubRefetch();
                    dispatch(setSelectedSubOrg(null));
                    messageMgr.showMessage('success', 'Success: ', 'Organisation deleted');
                }
                else {
                    messageMgr.showMessage('error', 'Error: ', 'Error occured while deleting Organisation');
                }
            },
            onError: (error) => {
                setIsDeleting(false);
                setIsDeletePopupOpen(false);
                messageMgr.showMessage('error', 'Error: ', 'Error occured while deleting Organisation');
            }
        });
    }

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: orgSubStatus,
        isFetch: orgSubLoading,
        error: orgSubError,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const subOrgGrid = new OrganisationSubOrganisationGrid(handleRowPopupClick);

    return (
        <div>
            <ToastMessages ref={messagesRef} />
            <div className="org-eu-container">
                <div className="form-single-section table-single-form no-ff-margin-bottom width-auto">
                    <MultiColumnComboBoxWidget
                        id={"customer-eu-price-list-products"}
                        className={"ddl-default width-large"}
                        ref={subOrgRef}
                        setValue={(e: any) => (handleSubOrgOnChange(e))}
                        value={selectedSubOrgLocal}
                        datalist={subOrgList}
                        isFilterable={true}
                        textField={"orgnaisationName"}
                        placeholder="Search by orgnaisation name..."
                        isClearFilter={selectedSubOrgLocal == null}
                        columns={[
                            { field: 'orgnaisationName', header: 'Orgnaisation Name', width: '240px' },
                            { field: 'contact', header: 'Contact', width: '100px' },
                            { field: 'city', header: 'Suburb', width: '80px' },]}
                        searchTextCallback={setSearchText} />
                    <button className="btn-default btn-large" onClick={onClickAddSubOrg}>Add Organisation</button>
                    {formErrorMessage && (
                        <span className="error-message-no-margin-top margin-left-10">{formErrorMessage}</span>
                    )}
                </div>
            </div>
            <div className="org-enduser-grid-container">
                <DataGrid dataTable={subOrgGrid} data={orgSubOrgListData} renderStatusContent={renderStatusContent} />
                <div ref={ref} style={{ height: '1px' }} />
            </div>
            <Dialog visible={isAddSubOrgModalOpen} onHide={closeAddSubOrgModal} header='Enter a Comment'>
                {(
                    <div>
                        <textarea className="org-eu-comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        <div className="org-eu-popup-button-container">
                            <Button disabled={isSaving} type="button" className="btn-success margin-top-10" onClick={handleAddSubOrgSave}>{isSaving ? 'Saving...' : 'Save'}</Button>
                        </div>
                    </div>
                )}
            </Dialog>
            <ConfirmDialog
                visible={isDeletePopupOpen}
                onHide={handleCancelDeleteSubOrg}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={handleDeleteSubOrg}
                reject={handleCancelDeleteSubOrg}
                acceptLabel={isDeleting ? 'Deleting...' : 'Delete'}
            />
        </div>

    );

}