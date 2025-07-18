import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as fa from '@fortawesome/free-solid-svg-icons';
import SectionMainBase from "../../../lib/section-main-base";
import { useInView } from "react-intersection-observer";
import { RootState, setIsDealPopupOpen, setLoadData, setIsFetchingLeadCustomerPriceList } from "@peerless-cms/store";
import { getCustomerDeals, getCustomerPriceList } from "@peerless/queries";
import { CustomerPriceGrid, DealGrid } from "@peerless/common";
import './customer-price.css';
import { DataGrid } from "@peerless/controls";
import { Dialog } from "primereact/dialog";
import { contactTypeName } from "@peerless/utils";
import { RenderStatusContentTable } from "@peerless/models";

export interface CustomerPriceProps { }

export function CustomerPrice(props: CustomerPriceProps) {
  const [pageState, setPageState] = useState({ first: 0, rows: 25 });
  const [tableFilters, setTableFilters] = useState<any>();
  const [multiSortMeta, setMultiSortMeta] = useState([]);
  const [orderBy, setOrderBy] = useState("catlog_code asc");


  const { ref, inView } = useInView({ triggerOnce: false });
  const dispatch = useDispatch();

  const { selectedLeedOrCustomer, loadData, childOriginators, loggedUser, state, effectiveDate, asAtDate, isDealPopupOpen, selectedCustomerPriceListItem, contactType, isFetchingLeadCustomerPriceList, cusPriceEffectiveDate, cusPriceRepGroup } = useSelector((state: RootState) => ({
    selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
    loadData: state.customerPageFilters.loadData,
    childOriginators: state.header.childOriginators,
    loggedUser: state.header.loggedUser,
    state: state.customerPageFilters.state,
    effectiveDate: state.customerPageFilters.cusPriceEffectiveDate,
    asAtDate: state.customerPageFilters.asAtDate,
    modalPosition: state.modal.modalPosition,
    isCustomerPriceTblPopupOpen: state.modal.isCustomerPriceTblPopupOpen,
    isDealPopupOpen: state.modal.isDealPopupOpen,
    selectedCustomerPriceListItem: state.leedsAndCustomers.selectedCustomerPriceListItem,
    contactType: state.leedsAndCustomers.selectedContactType,
    isFetchingLeadCustomerPriceList: state.customerPageFilters.isFetchingLeadCustomerPriceList,
    cusPriceRepGroup: state.customerPageFilters.cusPriceRepGroup,
    cusPriceEffectiveDate: state.customerPageFilters.cusPriceEffectiveDate,
  }));

  const closeDealModal = () => {
    dispatch(setIsDealPopupOpen(false));
  };

  // const handleRowPopupClick = (type: string, rowData: any) => {
  //   dispatch(setSelectedCustomerPriceListItem(rowData));
  //   dispatch(setIsDealPopupOpen(true));
  //   setSelectedCatlog(selectedCustomerPriceListItem.catlogCode);
  //   setIsDealQueryEnabled(true);
  // };

  useEffect(() => {
    return () => {
      dispatch(setLoadData(false));
    };
  }, [dispatch]);

  let args = {
    ChildOriginators: childOriginators,
    DefaultDepartmentId: loggedUser.defaultDepartmentId,
    Originator: loggedUser.userName,
    RepCode: loggedUser.repCode,
    OrderBy: orderBy,
    AdditionalParams: '',
    CustCode: selectedLeedOrCustomer.customerCode,
    StartIndex: 1,
    RowCount: 50
  }

  const payload = {
    repCode: cusPriceRepGroup?.value || '',
    custCode: selectedLeedOrCustomer.customerCode,
    effectiveDate: cusPriceEffectiveDate?.value || '',
    asAtDate: asAtDate,
    additionalParams: '',
    orderBy: 'catlog_code asc',
    ignorePagination: false,
    startIndex: 1,
    rowCount: 50,
    filterPara: tableFilters,
  };

  const { data: customerPriceListData, error, status, isLoading } = getCustomerPriceList(payload, isFetchingLeadCustomerPriceList);

  const [isDealQueryEnabled, setIsDealQueryEnabled] = useState<boolean>(false);
  const [selectedCatlog, setSelectedCatlog] = useState<any | null>(null);
  const dealsPayload = { args: args };
  const { data: customerDealData, error: dealDataError, isLoading: isDealDataLoading } = getCustomerDeals(dealsPayload.args, selectedLeedOrCustomer.customerCode,
    selectedCatlog, selectedCustomerPriceListItem?.minQty, asAtDate, isDealQueryEnabled);

  let customerDealsTable;

  if (isDealDataLoading) {
    customerDealsTable = <div>Loading...</div>;
  }

  if (dealDataError) {
    customerDealsTable = <div>Error occured</div>;
  }

  let dealGrid = new DealGrid();
  if (customerDealData) {
    customerDealsTable = <DataGrid dataTable={dealGrid} data={customerDealData} />
  }

  useEffect(() => {
    setIsDealQueryEnabled(false);
  }, [dispatch, customerDealData]);

  const renderStatusContent = {
    isRenderStatusContentTable: true,
    status: status,
    isFetch: isFetchingLeadCustomerPriceList,
    error: error,
    setStateFunction: setIsFetchingLeadCustomerPriceList,
    isStatusOutput: true
  } as RenderStatusContentTable;


  const onSort = (e: any) => {
    dispatch(setIsFetchingLeadCustomerPriceList(true));
    setMultiSortMeta(e.multiSortMeta);
    const updatedSortMeta = e.multiSortMeta.map((sort: any) => {
      const field = sort.field
      return { ...sort, field };
    });
    const orderByString = updatedSortMeta
      .map((sort: any) => `${sort.field} ${sort.order === 1 ? "asc" : "desc"}`)
      .join(", ");
    setOrderBy(orderByString);
  };

  const custPriceGrid = new CustomerPriceGrid(multiSortMeta, onSort);

  const onPage = (event: any) => {
    dispatch(setIsFetchingLeadCustomerPriceList(true));
    const { first, rows } = event;
    setPageState({ first, rows });
  };

  const onFilterStock = (e: any, isClear: boolean) => {
    setPageState({ first: 0, rows: pageState.rows });
    setTableFilters(e ? {
      catlogCode: e.filters.catlogCode,
      description: e.filters.description,
      minQty: e.filters.minQty,
      discPercentage: e.filters.discPercentage,
      listPrice: e.filters.listPrice,
      dealFrom: e.filters.dealFrom,
      dealTo: e.filters.dealTo,
      price: e.filters.price,
      dealPrice: e.filters.dealPrice,
      dealDiscPercentage: e.filters.dealDiscPercentage,
      netPrice: e.filters.netPrice,
    } : null);
  }

  const header = (
    <div className="lead-customer-detail-section-header-container">
      <span className="center-align section-title">
        {contactTypeName[contactType]}
        <FontAwesomeIcon icon={fa.faChevronRight} className="breadcrumb-separator" />
        <span className="center-align section-title"><FontAwesomeIcon className="header-icon" icon={fa.faTag} size='1x' />Customer Price</span>
        <span className="font-light">&nbsp; | &nbsp;</span>
        <span className="center-align section-title font-light">{`(${selectedLeedOrCustomer.name})`}</span>
      </span>
    </div>
  );

  const main = (
    <div>
      <DataGrid
        dataTable={custPriceGrid}
        data={customerPriceListData || []}
        renderStatusContent={renderStatusContent}
        emptyMessage={loadData ? 'No records found' : 'Please click on filter to view data'}
        onPage={onPage}
        onFilterCallback={onFilterStock}
        sortMode="multiple"
        isScrollable={true}
        isAutoScrollHeight={true}
        cssClasses={'sticky-header'} />

      <div ref={ref} style={{ height: '1px' }} />

      <Dialog visible={isDealPopupOpen} onHide={closeDealModal} header='Deals'>
        {(
          <div className="common-popup-container">
            {/* <div className="common-popup-title">
                      <span>Deals</span>
                    </div> */}
            <div className="common-popup-body">
              <div className="product-details">
                <div className="detail-section">
                  <span className="detail-header">Product: </span>
                  <span>{selectedCustomerPriceListItem?.catlogCode}</span>
                </div>
                <div className="detail-section">
                  <span className="detail-header">Description: </span>
                  <span>{selectedCustomerPriceListItem?.description}</span>
                </div>
              </div>
              <div className="deal-table-container">
                {customerDealsTable}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );

  return <SectionMainBase header={header} main={main}></SectionMainBase>;
}