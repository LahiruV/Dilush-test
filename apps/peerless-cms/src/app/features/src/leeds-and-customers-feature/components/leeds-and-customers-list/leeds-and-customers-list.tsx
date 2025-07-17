import { RootState, setSelectedLeedOrCustomer, setIsModalOpen, setIsAddContactModalOpen, pageModeEnum, setIsAddEnduserModalOpen, setEnduserDetailPageMode, updateDetails, setIsAddLeadModalOpen, setLeadDetailPageMode } from '@peerless-cms/store';
import { useDispatch, useSelector } from 'react-redux';
import { getMainLeadCustomerList, getMainLeadList } from '@peerless/queries';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import './leeds-and-customers-list.css';
import { EnduserDetails, LeedCustomerContactPersonForm, LeedsCustomersDetails } from '@peerless-cms/features';
import { contactId, contactTypeEnum, sectionPathMap } from '@peerless/utils';
import { Dialog } from 'primereact/dialog';
import { DataGrid, ToastManager } from '@peerless/controls';
import ToastMessages from 'libs/controls/src/toasts-message/messages';
import { MainLeadListGrid } from '@peerless/common';
import { RenderStatusContentTable } from '@peerless/models';

const LeedsAndCustomersList: React.FC = () => {
  const messagesRef = useRef<any>(null);
  const messageMgr = new ToastManager(messagesRef);
  const isFirstLoadRef = useRef(true);
  const { isManagerMode } = useSelector((state: RootState) => state.header);
  const [isFirstLoad, setIsFirstLoad] = useState(isFirstLoadRef.current);
  const [multiSortMeta, setMultiSortMeta] = useState([]);
  const [orderBy, setOrderBy] = useState("Name ASC");
  const [pageState, setPageState] = useState({ first: 1, rows: 20 });
  const [pageSize, setPageSize] = useState(20);

  const { searchBy, selectedLeedOrCustomer, originator,
    isAddContactModalOpen, childOriginator, selectedContactType, loggedUser, isAddEnduserModalOpen, isAddLeadModalOpen, filters } = useSelector((state: RootState) => ({
      searchBy: state.leedsAndCustomers.searchBy,
      isAddContactModalOpen: state.modal.isAddContactModalOpen,
      selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
      originator: state.header.selectedOriginator,
      childOriginator: state.header.childOriginators,
      selectedContactType: state.leedsAndCustomers.selectedContactType,
      loggedUser: state.header.loggedUser,
      isAddEnduserModalOpen: state.modal.isAddEnduserModalOpen,
      isAddLeadModalOpen: state.modal.isAddLeadModalOpen,
      filters: state.leedsAndCustomers.filter,
    }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payload = {
    Originator: originator.userName,
    ChildOriginator: childOriginator,
    ChildOriginators: childOriginator,
    DefaultDepId: loggedUser.defaultDepartmentId,
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    OrderBy: orderBy,
    AddParams: ` name like '%${searchBy}%'`,
    LeadStageId: 0,
    RetreiveActive: (filters.status == '1' || filters.status == '2') ? true : false,
    IsReqSentVisible: (filters.status == '2') ? true : false,
    LeadStage: selectedContactType,
    DisplayInCRM: (filters.status == '1' || filters.status == '2') ? true : false,
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    AdditionalParams: ` name like '%${searchBy}%'`,
    repType: filters.repType,
    isNew: true,
    IsShowLeastActive: filters.showLeastActive,
    ActiveInactiveChecked: (filters.status == '1' || filters.status == '2') ? true : false,
    ChildReps: originator.childReps,
    StartIndex: pageState.first == 1 ? 1 : ((pageState.first / pageState.rows) + 1),
    RowCount: pageState.rows,
    isManagerMode: isManagerMode,
  };

  //const { leedsAndCustomersData, error, status, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage, refetch } = getMainLeadList(payload, 20); //removed for paging
  const { data: leedsAndCustomersList, status, error, isLoading, refetch } = getMainLeadCustomerList(payload, (filters.repType != ""));

  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    setPageState({ first: 1, rows: 20 });
    setOrderBy("Name ASC");
    setPageSize(20);
  }, [filters, selectedContactType, searchBy, isManagerMode]);

  const handleRowClick = (row: any) => {
    if (selectedLeedOrCustomer?.[contactId[selectedContactType]] === row?.[contactId[selectedContactType]]) {
      //dispatch(setSelectedLeedOrCustomer(null)); //if it is a btn click then the row should be selected regardlessly     
    } else {
      dispatch(setSelectedLeedOrCustomer(row));
    }
  };

  const handleSelectionChange = (row: any) => {
    if (selectedLeedOrCustomer?.[contactId[selectedContactType]] === row?.[contactId[selectedContactType]]) {
      //dispatch(setSelectedLeedOrCustomer(null)); //if it is a btn click then the row should be selected regardlessly     
    } else {
      dispatch(setSelectedLeedOrCustomer(row));
    }
  };

  const handleRowPopupClick = (options: any, rowData: any) => {
    //reset modes
    dispatch(setEnduserDetailPageMode(pageModeEnum.Edit));
    dispatch(updateDetails(true));
    dispatch(setLeadDetailPageMode(pageModeEnum.Edit));

    if (!options.path || options.path == '') {
      navigate(sectionPathMap[selectedContactType] + `${rowData?.[contactId[selectedContactType]]}`);
    }
    else {
      navigate(sectionPathMap[selectedContactType] + `${rowData?.[contactId[selectedContactType]]}${options.path}`);
    }
    closeModal();
  };

  const closeModal = () => {
    dispatch(setIsModalOpen(false));
    dispatch(setIsAddContactModalOpen(false));
  };

  const closeAddContactModal = () => {
    dispatch(setIsAddContactModalOpen(false));
  };

  const closeAddEnduserModal = () => {
    dispatch(setIsAddEnduserModalOpen(false));
  };

  const closeAddLeadModal = () => {
    dispatch(setIsAddLeadModalOpen(false));
  }

  //removed for paging
  // useEffect(() => {
  //   if (inView && hasNextPage && !isFetchingNextPage) {      
  //     fetchNextPage().then(result => {     
  //     }).catch(error => {
  //       console.error("Error fetching next page");
  //     });
  //   }
  // }, [fetchNextPage, inView]);

  useEffect(() => {
    if (
      status === 'success' &&
      leedsAndCustomersList &&
      leedsAndCustomersList.length > 0
    ) {
      handleSelectionChange(leedsAndCustomersList[0]);
      isFirstLoadRef.current = false;
      setIsFirstLoad(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, selectedContactType, leedsAndCustomersList]);

  useEffect(() => {
    isFirstLoadRef.current = true;
    setIsFirstLoad(true);
  }, [selectedContactType]);

  const onSort = (e: any) => {
    setMultiSortMeta(e.multiSortMeta);
    const updatedSortMeta = e.multiSortMeta.map((sort: any) => {
      const field = sort.field === "customerName" ? "cust_name" :
        sort.field == 'endUserCode' ? 'enduser_code' :
          sort.field == 'customerCode' ? 'cust_code' :
            sort.field == 'sourceId' ? 'lead_id' :
              sort.field;
      return { ...sort, field };
    });
    const orderByString = updatedSortMeta
      .map((sort: any) => `${sort.field} ${sort.order === 1 ? "asc" : "desc"}`)
      .join(", ");
    setOrderBy(orderByString);
  };

  const onPage = (event: any) => {
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isLoading,
    error: error,
    isStatusOutput: true
  } as RenderStatusContentTable;

  let mainLeadsGrid = new MainLeadListGrid(handleRowPopupClick, selectedContactType, handleRowClick, multiSortMeta, onSort);

  return (
    <div className='table-container'>
      <ToastMessages ref={messagesRef} />
      <DataGrid
        uniqueId={selectedContactType == 'customer' ? 'customerCode' : selectedContactType == 'lead' ? 'sourceId' : 'endUserCode'}
        dataTable={mainLeadsGrid}
        data={leedsAndCustomersList}
        selectionMode={'single'}
        isSelectionColumnShow={false}
        selectedRow={selectedLeedOrCustomer}
        setSelectedRow={handleSelectionChange}
        sortMode='multiple'
        renderStatusContent={renderStatusContent}
        enablePagination={true}
        pageSize={pageSize}
        isServerSidePaging={true}
        firstIndex={pageState.first}
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'}
        totalRecords={
          (leedsAndCustomersList != null && leedsAndCustomersList.length > 0) ?
            (selectedContactType == contactTypeEnum.lead || selectedContactType == contactTypeEnum.customer) ? leedsAndCustomersList[0].rowCount : leedsAndCustomersList[0].totalCount : 0
        }
        onPage={onPage} />
      {/* <div ref={ref} style={{ height: '1px' }} /> removed for paging */}

      <Dialog visible={isAddContactModalOpen} onHide={closeAddContactModal} header='Add Contact'>
        {(
          <div>
            <LeedCustomerContactPersonForm isPopup={true} messageMgr={messageMgr} />
          </div>
        )}
      </Dialog>

      <Dialog visible={isAddEnduserModalOpen} onHide={closeAddEnduserModal} header='Add Enduser'>
        {(
          <div>
            <EnduserDetails refetchList={refetch} messageMgr={messageMgr} hideHeader={true} />
          </div>
        )}
      </Dialog>

      <Dialog visible={isAddLeadModalOpen} onHide={closeAddLeadModal} header='Add Lead'>
        {(
          <div>
            <LeedsCustomersDetails refetchList={refetch} messageMgr={messageMgr} hideHeader={true} />
          </div>
        )}
      </Dialog>

    </div>
  );
};

export default LeedsAndCustomersList;

