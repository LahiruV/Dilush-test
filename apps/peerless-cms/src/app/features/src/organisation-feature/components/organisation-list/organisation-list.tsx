import { pageModeEnum, RootState, setIsAddOrganisationModalOpen, setOrgDetailPageMode, setOrgFilterEnabled, setSelectedOrganisation, updateDetails } from "@peerless-cms/store";
import { OrganisationMainGrid } from "@peerless/common";
import { DataGrid, ToastManager } from "@peerless/controls";
import { getMainOrganisationList, getOrganisationList } from "@peerless/queries";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OrganisationDetails } from "../organisation-details/organisation-details";
import ToastMessages from "libs/controls/src/toasts-message/messages";
import { useEffect, useRef, useState } from "react";
import { RenderStatusContentTable } from "@peerless/models";

export interface OrganisationListProps { }

export const OrganisationList = (props: OrganisationListProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const messagesRef = useRef<any>(null);
    const messageMgr = new ToastManager(messagesRef);
    const [pageState, setPageState] = useState({ first: 0, rows: 20 });
    const { searchText, organisationTypes, selectedOrganisation, queryEndabled, originator, contactType, isAddOrganisationModalOpen } = useSelector((state: RootState) => ({
        searchText: state.organisations.searchText,
        organisationTypes: state.organisations.organisationTypes,
        selectedOrganisation: state.organisations.selectedOrganisation,
        queryEndabled: state.organisations.filterEnabled,
        originator: state.header.selectedOriginator,
        contactType: state.leedsAndCustomers.selectedContactType,
        isAddOrganisationModalOpen: state.modal.isAddOrganisationModalOpen,
    }));

    const handleRowPopupClick = (options: any, rowData: any) => {
        if (!options.path || options.path == '') {
            dispatch(setOrgDetailPageMode(pageModeEnum.Edit));
            navigate(`${rowData.orgnaisationID}`);
        }
        else {
            navigate(`${rowData.orgnaisationID}${options.path}`);
        }
    };

    const handleSelectionChange = (row: any) => {
        dispatch(setSelectedOrganisation(row));
    };

    const closeAddOrganisationModal = () => {
        dispatch(setIsAddOrganisationModalOpen(false));
    }

    const onPage = (event: any) => {
        const { first, rows } = event;
        setPageState({ first, rows });
    };

    const payload = {
        IsLeadOrganisation: organisationTypes != null ? organisationTypes.includes('Lead') : false,
        IsEnduserOrganisation: organisationTypes != null ? organisationTypes.includes('EndUser') : false,
        IsCustomerOrganisation: organisationTypes != null ? organisationTypes.includes('Customer') : false,
        IsOrganisation: organisationTypes != null ? organisationTypes.includes('Org') : false,
        IsNonAccCustomerOrganisation: organisationTypes != null ? organisationTypes.includes('NAC') : false,
        OrgName: searchText,
        OrderBy: 'org_name',
        AddParams: '',
        ChildReps: originator.childReps != null ? originator.childReps.replace(/^[^(]*\(/, ' (') : '',
        Originator: originator.userName,
        ColumnFilter: '',
        startIndex: pageState.first == 1 ? 1 : ((pageState.first / pageState.rows) + 1),
        rowCount: pageState.rows,
        queryEnabled: queryEndabled,
    };

    const { data: organisationsData, error, status, isLoading, refetch } = getOrganisationList(payload, queryEndabled);

    useEffect(() => {
        setPageState({ first: 0, rows: 20 });
    }, [searchText, organisationTypes]);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isLoading,
        error: error,
        isStatusOutput: true,
    } as RenderStatusContentTable;

    let orgGrid = new OrganisationMainGrid(handleRowPopupClick, handleSelectionChange, contactType);

    return (
        <div>
            <ToastMessages ref={messagesRef} />
            <DataGrid dataTable={orgGrid} data={organisationsData} selectionMode={'single'} selectedRow={selectedOrganisation}
                setSelectedRow={handleSelectionChange} emptyMessage={queryEndabled ? 'No organisations found' : 'Please click on filter to view data'}
                renderStatusContent={renderStatusContent}
                enablePagination={true}
                pageSize={20}
                isServerSidePaging={true}
                firstIndex={pageState.first}
                totalRecords={
                    (organisationsData != null && organisationsData.length > 0) ? organisationsData[0].totalCount : 0
                }
                onPage={onPage}
                sortMode='multiple'
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                isSelectionColumnShow={false}
                isFullDetailPagination={true}
            />

            <Dialog visible={isAddOrganisationModalOpen} onHide={closeAddOrganisationModal} header='Add Organisation'>
                {(
                    <div>
                        <OrganisationDetails refetchList={refetch} messageMgr={messageMgr} hideHeader={true} />
                    </div>
                )}
            </Dialog>
        </div>
    )





};