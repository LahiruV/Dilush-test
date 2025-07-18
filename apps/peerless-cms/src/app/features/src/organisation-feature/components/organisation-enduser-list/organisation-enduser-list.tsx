import { RootState, setSelectedOrgEnduser } from "@peerless-cms/store";
import { DataGrid, MultiColumnComboBoxWidget, ToastManager } from "@peerless/controls";
import { addOrganisationLink, deleteLink, getEnduserList, getMainLeadList, getOrganisationEndusersList, getEnduserListInfinite } from "@peerless/queries";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import './organisation-enduser-list.css';
import { OrganisationEnduserGrid } from "@peerless/common";
import { contactId, sectionPathMap } from "@peerless/utils";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Button } from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { ConfirmDialog } from "primereact/confirmdialog";
import { RenderStatusContentTable } from "@peerless/models";

export interface OrganisationEnduserListProps { }

const startIndex = 1;
const rowCount = 20;

export function OrganisationEnduserList(props: OrganisationEnduserListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const [selectedEnduser, setSelectedEnduser] = useState<{ name: string, endUserCode: string, state: string, city: string, organisationID: number } | null>(null);
    const [enduserList, setEnduserList] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<any>('');
    const { ref, inView } = useInView({ triggerOnce: false });
    const [isAddEnduserModalOpen, setIsAddEnduserModalOpen] = useState(false);
    const [comment, setComment] = useState<any>('');
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    const [isSaving, setIsSaving] = useState<any>(false);
    const [isDeleting, setIsDeleting] = useState<any>(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<any>(false);

    const { ref: endUserRef, inView: endUserInView } = useInView({ triggerOnce: true });

    const { originator, childOriginator, selectedContactType, loggedUser, selectedOrganisation, selectedOrgEnduser } = useSelector((state: RootState) => ({
        originator: state.header.selectedOriginator,
        childOriginator: state.header.childOriginators,
        selectedContactType: state.leedsAndCustomers.selectedContactType,
        loggedUser: state.header.loggedUser,
        selectedOrganisation: state.organisations.selectedOrganisation,
        selectedOrgEnduser: state.organisations.selectedOrgEnduser,
    }));

    const mutation = useMutation<any, Error, any>({
        mutationFn: addOrganisationLink
    });

    const mutationDelete = useMutation<any, Error, any>({
        mutationFn: deleteLink
    });

    const handleEnduserOnChange = (e: any) => {
        setSelectedEnduser(e);
        setFormErrorMessage(null);
    }

    const onClickAddEnduser = (e: any) => {
        if (selectedEnduser == null) {
            setFormErrorMessage('Please select an enduser');
            return;
        }
        setIsAddEnduserModalOpen(true);
    }

    let payload: any = {
        OrderBy: "Name ASC",
        LeadStageId: 0,
        LeadStage: selectedContactType,
        DisplayInCRM: true,
        AdditionalParams: searchText ? (` enduser_code like '%${searchText}%'`) : '',
        repType: 'F',
        ChildReps: originator.childReps,
        IsShowLeastActive: false,
        ActiveInactiveChecked: true,
        ReqSentIsChecked: false,
        AddParams: searchText ? (` enduser_code like '%${searchText}%'`) : '',
        Originator: originator.userName,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        CRMAuthLevel: (!loggedUser.userName) ? 0 : loggedUser.crmAuthLevel,
        StartIndex: startIndex,
        RowCount: rowCount,
    };

    useEffect(() => {
        payload = {
            OrderBy: "Name ASC",
            LeadStageId: 0,
            LeadStage: selectedContactType,
            DisplayInCRM: true,
            AdditionalParams: searchText ? (` enduser_code like '%${searchText}%'`) : '',
            repType: 'F',
            ChildReps: originator.childReps,
            IsShowLeastActive: false,
            ActiveInactiveChecked: true,
            ReqSentIsChecked: false,
            AddParams: searchText ? (` enduser_code like '%${searchText}%'`) : '',
            Originator: originator.userName,
            DefaultDepartmentId: loggedUser.defaultDepartmentId,
            CRMAuthLevel: (!loggedUser.userName) ? 0 : loggedUser.crmAuthLevel,
            StartIndex: startIndex,
            RowCount: rowCount,
        };
    }, [searchText]);

    // const { data: enduserData, error: filterEuError, status: filterEuStatus, isLoading: isFilterEuLoading, refetch: filterEuFetch } = getEnduserList(payload);
    const { data: enduserData, error: filterEuError, status: filterEuStatus, isLoading: isFilterEuLoading, refetch: filterEuFetch, fetchNextPage, isFetchingNextPage, hasNextPage } = getEnduserListInfinite(payload, rowCount, startIndex);

    useEffect(() => {
        if (enduserData) {
            let euList = enduserData.pages.flatMap((item: any) => item.data.map((user: any) => ({
                name: user.name,
                endUserCode: user.endUserCode,
                state: user.state,
                city: user.city,
                organisationID: user.organisationID
            })));

            setEnduserList(euList);
        }

        if (filterEuStatus == 'pending') {
            setEnduserList([{ name: 'Loading... ', endUserCode: searchText, state: '', city: '' }]);
        }

    }, [enduserData, filterEuStatus]);

    useEffect(() => {
        if (endUserInView && hasNextPage) {
            fetchNextPage();
        }
    }, [endUserInView])

    const orgEuPayload = {
        OrgID: selectedOrganisation.orgnaisationID,
        Status: 'Active',
        OrderBy: "name asc",
        StartIndex: 1,
        RowCount: 50
    };

    const { orgEndusersData, error: orgEuError, status: orgEuStatus, isLoading: orgEuLoading,
        fetchNextPage: orgEuFetchNext, isFetchingNextPage: orgEuIsFetchNext, hasNextPage: orgEuHasNextPage, refetch: orgEuRefetch } = getOrganisationEndusersList(orgEuPayload, 50);

    useEffect(() => {
        if (inView && orgEuHasNextPage && !orgEuIsFetchNext) {
            orgEuFetchNext().then(result => {
            }).catch(error => {
                console.error("Error fetching next page");
            });
        }
    }, [orgEuFetchNext, inView]);

    const handleRowPopupClick = (type: any, rowData: any) => {
        dispatch(setSelectedOrgEnduser(rowData));
        if (type == 'edit') {
            navigate(`${sectionPathMap[selectedContactType]}${selectedOrganisation?.[contactId[selectedContactType]]}/endusers/update`);
        }
        else if (type == 'delete') {
            setIsDeletePopupOpen(true);
        }
    }

    const closeAddEnduserModal = () => {
        setIsAddEnduserModalOpen(false);
        setComment('');
    }

    const handleAddEnduserSave = () => {
        const addEuPayload = {
            Orgnaisation1ID: Number(selectedOrganisation.orgnaisationID),
            Orgnaisation2ID: selectedEnduser?.organisationID,
            Comment: comment,
            Originator: originator.userName,
            LinkType: 'enduser',
        }
        setIsSaving(true);
        mutation.mutate(addEuPayload, {
            onSuccess: (response) => {
                setIsSaving(false);
                setIsAddEnduserModalOpen(false);
                setComment('');
                if (response) {
                    orgEuRefetch();
                    setSelectedEnduser(null);
                    messageMgr.showMessage('success', 'Success: ', 'Organisation saved');
                }
                else {
                    messageMgr.showMessage('error', 'Error: ', 'Error occured while saving Organisation');
                }
            },
            onError: (error) => {
                setIsSaving(false);
                setIsAddEnduserModalOpen(false);
                setComment('');
                messageMgr.showMessage('error', 'Error: ', 'Error occured while saving Organisation');
            }
        });
    }

    const handleDeleteEnduser = () => {
        const deletePayload = {
            LinkID: Number(selectedOrgEnduser.linkId)
        }
        setIsDeleting(true);
        mutationDelete.mutate(deletePayload, {
            onSuccess: (response) => {
                setIsDeleting(false);
                setIsDeletePopupOpen(false);
                if (response) {
                    orgEuRefetch();
                    dispatch(setSelectedOrgEnduser(null));
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

    const handleCancelDeleteEnduser = () => {
        setIsDeletePopupOpen(false);
    }

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: orgEuStatus,
        isFetch: orgEuLoading,
        error: orgEuError,
        isStatusOutput: true
    } as RenderStatusContentTable;

    const orgEnduserGrid = new OrganisationEnduserGrid(handleRowPopupClick);

    return (
        <div>
            <ToastMessages ref={messagesRef} />
            <div className="org-eu-container">
                <div className="form-single-section table-single-form no-ff-margin-bottom width-auto">
                    <MultiColumnComboBoxWidget
                        id={"customer-eu-price-list-products"}
                        className={"ddl-default width-large"}
                        ref={endUserRef}
                        setValue={(e: any) => (handleEnduserOnChange(e))}
                        value={selectedEnduser}
                        datalist={enduserList}
                        isFilterable={true}
                        textField={"endUserCode"}
                        placeholder="Search by end user code..."
                        isClearFilter={selectedEnduser == null}
                        columns={[
                            { field: 'endUserCode', header: 'Code', width: '140px' },
                            { field: 'name', header: 'Name', width: '200px' },
                            { field: 'state', header: 'State', width: '80px' },
                            { field: 'city', header: 'Suburb', width: '140px' }]}
                        searchTextCallback={setSearchText} />
                    <button className="btn-default btn-large" onClick={onClickAddEnduser}>Add Enduser</button>
                    {formErrorMessage && (
                        <span className="error-message-no-margin-top margin-left-10">{formErrorMessage}</span>
                    )}
                </div>
            </div>
            <div className="org-enduser-grid-container">
                <DataGrid dataTable={orgEnduserGrid} data={orgEndusersData} renderStatusContent={renderStatusContent} />
                <div ref={ref} style={{ height: '1px' }} />
            </div>
            <Dialog visible={isAddEnduserModalOpen} onHide={closeAddEnduserModal} header='Enter a Comment'>
                {(
                    <div>
                        <textarea className="org-eu-comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        <div className="org-eu-popup-button-container">
                            <Button disabled={isSaving} type="button" className="btn-success margin-top-10" onClick={handleAddEnduserSave}>{isSaving ? 'Saving...' : 'Save'}</Button>
                        </div>

                    </div>
                )}
            </Dialog>
            <ConfirmDialog
                visible={isDeletePopupOpen}
                onHide={handleCancelDeleteEnduser}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={handleDeleteEnduser}  // Function to call on accept
                reject={handleCancelDeleteEnduser}  // Function to call on reject
                acceptLabel={isDeleting ? 'Deleting...' : 'Delete'}
            />
        </div>

    );
}