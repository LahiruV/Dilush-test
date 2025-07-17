import { useDispatch, useSelector } from 'react-redux';
import './organisation-distributor-list.css';
import { useNavigate } from 'react-router-dom';
import { RootState, setSelectedOrgDistributor } from '@peerless-cms/store';
import ToastMessages from 'libs/controls/src/toasts-message/messages';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { DataGrid, MultiColumnComboBoxWidget, ToastManager } from '@peerless/controls';
import { Dialog } from 'primereact/dialog';
import { Button } from 'react-bootstrap';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { OrganisationDistributorGrid } from '@peerless/common';
import { contactId, sectionPathMap } from '@peerless/utils';
import { addOrganisationLink, deleteLink, getOrganisationDistributorGrid, getOrganisationDistributorList, getOrganisationDistributorListInfinite } from '@peerless/queries';
import { useMutation } from '@tanstack/react-query';
import { RenderStatusContentTable } from '@peerless/models';

export interface OrganisationDistributorListProps { }

const startIndex = 1;
const rowCount = 20;

export function OrganisationDistributorList(props: OrganisationDistributorListProps) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
    const [selectedDistributor, setSelectedDistributor] = useState<{ name: string, customerCode: string, orgnaisationID: number } | null>(null);
    const [distributorList, setDistributorList] = useState<any>([]);
    const [searchText, setSearchText] = useState<any>('');
    const { ref, inView } = useInView({ triggerOnce: false });
    const [isAddDistributorModalOpen, setIsAddDistributorModalOpen] = useState(false);
    const [comment, setComment] = useState<any>('');
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    const [isSaving, setIsSaving] = useState<any>(false);
    const [isDeleting, setIsDeleting] = useState<any>(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState<any>(false);

    const { ref: orgDistRef, inView: orgDistInView } = useInView({ triggerOnce: true });

    const { originator, childOriginator, selectedContactType, loggedUser, selectedOrganisation, selectedOrgDistributor } = useSelector((state: RootState) => ({
        originator: state.header.selectedOriginator,
        childOriginator: state.header.childOriginators,
        selectedContactType: state.leedsAndCustomers.selectedContactType,
        loggedUser: state.header.loggedUser,
        selectedOrganisation: state.organisations.selectedOrganisation,
        selectedOrgDistributor: state.organisations.selectedOrgDistributor,
    }));

    const mutation = useMutation<any, Error, any>({
        mutationFn: addOrganisationLink
    });

    const mutationDelete = useMutation<any, Error, any>({
        mutationFn: deleteLink
    });

    let payload: any = {
        OrderBy: "name ASC",
        AdditionalParams: searchText ? (` ( lower(cust_code) like lower('%${searchText}%') AND ( rep_code IN ('${originator.repCode}')))`) : `( rep_code IN ('${originator.repCode}'))`,
        AddParams: searchText ? (` ( lower(cust_code) like lower('%${searchText}%') AND ( rep_code IN ('${originator.repCode}')))`) : `( rep_code IN ('${originator.repCode}'))`,
        Originator: originator.userName,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        ChildOriginators: childOriginator,
        StartIndex: startIndex,
        RowCount: rowCount,
        OrgName: '',
        ColumnFilter: ''
    };

    useEffect(() => {
        payload = {
            OrderBy: "name ASC",
            AdditionalParams: searchText ? (` ( lower(cust_code) like lower('%${searchText}%') AND ( rep_code IN ('${originator.repCode}')))`) : '',
            AddParams: searchText ? (` ( lower(cust_code) like lower('%${searchText}%') AND ( rep_code IN ('${originator.repCode}')))`) : '',
            Originator: originator.userName,
            DefaultDepartmentId: loggedUser.defaultDepartmentId,
            ChildOriginators: childOriginator,
            StartIndex: startIndex,
            RowCount: rowCount,
            OrgName: '',
            ColumnFilter: ''
        };
    }, [searchText]);

    // const { data: orgDistData, error: filterDistError, status: filterDistStatus, isLoading: isFilterDistLoading, refetch: filterDistFetch } = getOrganisationDistributorList(payload);
    const { data: orgDistData, error: filterDistError, status: filterDistStatus, isLoading: isFilterDistLoading, refetch: filterDistFetch, fetchNextPage, isFetchingNextPage, hasNextPage } = getOrganisationDistributorListInfinite(payload, rowCount, startIndex);

    useEffect(() => {
        if (orgDistData) {
            const euList = orgDistData.pages.flatMap((item: any) => item.data.map((org: any) => ({
                customerCode: org.custCode ?? '',
                name: org.name ?? '',
                orgnaisationID: org.orgnaisationID
            })));

            setDistributorList(euList);
        }

        if (filterDistStatus == 'pending') {
            setDistributorList([{ customerCode: searchText, name: 'Loading... ' }]);
        }

    }, [orgDistData, filterDistStatus]);

    useEffect(() => {
        if (orgDistInView && hasNextPage) {
            fetchNextPage();
        }
    }, [orgDistInView])

    const orgDistPayload = {
        OrganisationId: selectedOrganisation.orgnaisationID,
        Status: 'Active',
        OrderBy: "name asc",
        StartIndex: 1,
        RowCount: 50
    };

    const { orgDistributorListData, error: orgDistError, status: orgDistStatus, isLoading: orgDistLoading,
        fetchNextPage: orgDistFetchNext, isFetchingNextPage: orgDistIsFetchNext, hasNextPage: orgDistHasNextPage, refetch: orgDistRefetch } = getOrganisationDistributorGrid(orgDistPayload, 50);

    useEffect(() => {
        if (inView && orgDistHasNextPage && !orgDistIsFetchNext) {
            orgDistFetchNext().then(result => {
            }).catch(error => {
                console.error("Error fetching next page");
            });
        }
    }, [orgDistFetchNext, inView]);

    const handleDistributorOnChange = (e: any) => {
        setSelectedDistributor(e);
        setFormErrorMessage(null);
    }

    const onClickAddDistributor = (e: any) => {
        if (selectedDistributor == null) {
            setFormErrorMessage('Please select a distributor');
            return;
        }
        setIsAddDistributorModalOpen(true);
    }

    const handleRowPopupClick = (type: any, rowData: any) => {
        dispatch(setSelectedOrgDistributor(rowData));
        if (type == 'edit') {
            navigate(`${sectionPathMap[selectedContactType]}${selectedOrganisation?.[contactId[selectedContactType]]}/distributor/update`);
        }
        else if (type == 'delete') {
            setIsDeletePopupOpen(true);
        }
    }

    const closeAddDistributorModal = () => {
        setIsAddDistributorModalOpen(false);
        setComment('');
    }

    const handleAddDistributorSave = () => {
        const addDistPayload = {
            Orgnaisation1ID: Number(selectedOrganisation.orgnaisationID),
            Orgnaisation2ID: selectedDistributor?.orgnaisationID,
            CustCode: selectedDistributor?.customerCode,
            Comment: comment,
            Originator: originator.userName,
            LinkType: 'distributor',
        }
        setIsSaving(true);
        mutation.mutate(addDistPayload, {
            onSuccess: (response) => {
                setIsSaving(false);
                setIsAddDistributorModalOpen(false);
                setComment('');
                if (response) {
                    orgDistRefetch();
                    setSelectedDistributor(null);
                    messageMgr.showMessage('success', 'Success: ', 'Distributor saved');
                }
                else {
                    messageMgr.showMessage('error', 'Error: ', 'Error occured while saving distributor');
                }
            },
            onError: (error) => {
                setIsSaving(false);
                setIsAddDistributorModalOpen(false);
                setComment('');
                messageMgr.showMessage('error', 'Error: ', 'Error occured while saving distributor');
            }
        });
    }

    const handleCancelDeleteDistributor = () => {
        setIsDeletePopupOpen(false);
    }

    const handleDeleteDistributor = () => {
        const deletePayload = {
            LinkID: Number(selectedOrgDistributor.linkId)
        }
        setIsDeleting(true);
        mutationDelete.mutate(deletePayload, {
            onSuccess: (response) => {
                setIsDeleting(false);
                setIsDeletePopupOpen(false);
                if (response) {
                    orgDistRefetch();
                    dispatch(setSelectedOrgDistributor(null));
                    messageMgr.showMessage('success', 'Success: ', 'Distributor deleted');
                }
                else {
                    messageMgr.showMessage('error', 'Error: ', 'Error occured while deleting distributor');
                }
            },
            onError: (error) => {
                setIsDeleting(false);
                setIsDeletePopupOpen(false);
                messageMgr.showMessage('error', 'Error: ', 'Error occured while deleting distributor');
            }
        });
    }

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: orgDistStatus,
        isFetch: orgDistLoading,
        error: orgDistError,
        isStatusOutput: true
    } as RenderStatusContentTable;

    let orgDistGrid = new OrganisationDistributorGrid(handleRowPopupClick);

    return (
        <div>
            <ToastMessages ref={messagesRef} />
            <div className="org-eu-container">
                <div className="form-single-section table-single-form no-ff-margin-bottom width-auto">
                    <MultiColumnComboBoxWidget
                        id={"customer-eu-price-list-products"}
                        className={"ddl-default width-large"}
                        ref={orgDistRef}
                        setValue={(e: any) => (handleDistributorOnChange(e))}
                        value={selectedDistributor}
                        datalist={distributorList}
                        isFilterable={true}
                        textField={"customerCode"}
                        placeholder="Search by customer code..."
                        isClearFilter={selectedDistributor == null}
                        columns={[
                            { field: 'customerCode', header: 'Code', width: '140px' },
                            { field: 'name', header: 'Name', width: '250px' }]}
                        searchTextCallback={setSearchText} />
                    <button className="btn-default btn-large" onClick={onClickAddDistributor}>Add Enduser</button>
                    {formErrorMessage && (
                        <span className="error-message-no-margin-top margin-left-10">{formErrorMessage}</span>
                    )}
                </div>
            </div>

            <div className="org-enduser-grid-container">
                <DataGrid dataTable={orgDistGrid} data={orgDistributorListData} renderStatusContent={renderStatusContent} />
                <div ref={ref} style={{ height: '1px' }} />
            </div>

            <Dialog visible={isAddDistributorModalOpen} onHide={closeAddDistributorModal} header='Enter a Comment'>
                {(
                    <div>
                        <textarea className="org-eu-comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                        <div className="org-eu-popup-button-container">
                            <Button disabled={isSaving} type="button" className="btn-success margin-top-10" onClick={handleAddDistributorSave}>{isSaving ? 'Saving...' : 'Save'}</Button>
                        </div>

                    </div>
                )}
            </Dialog>

            <ConfirmDialog
                visible={isDeletePopupOpen}
                onHide={handleCancelDeleteDistributor}
                message="Are you sure you want to delete?"
                header="Confirmation"
                icon="pi pi-exclamation-triangle"
                accept={handleDeleteDistributor}  // Function to call on accept
                reject={handleCancelDeleteDistributor}  // Function to call on reject
                acceptLabel={isDeleting ? 'Deleting...' : 'Delete'}
            />
        </div>
    );
}