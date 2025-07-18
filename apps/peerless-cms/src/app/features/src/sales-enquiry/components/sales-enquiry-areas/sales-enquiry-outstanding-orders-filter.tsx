import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import {
    RootState, setIsFetchingOutstandingOrdersList, setOutstandingOrdersBackOrderOnly, setOutstandingOrdersCatalogueType, setOutstandingOrdersCurrentOrCompleted, setOutstandingOrdersCustomer,
    setOutstandingOrdersCustomerGroup, setOutstandingOrdersExDc, setOutstandingOrdersFromDate, setOutstandingOrdersMarket, setOutstandingOrdersOrderType, setOutstandingOrdersParent, setOutstandingOrdersPriceGroup,
    setOutstandingOrdersRadio, setOutstandingOrdersRep, setOutstandingOrdersStates, setOutstandingOrdersSubGroup, setOutstandingOrdersToDate
} from '@peerless-cms/store';
import { ButtonWidget, ButtonWidgetCollapse, CheckBox, DatePickerWidget, DropDown, RadioButtonWidget } from '@peerless/controls';
import { GetAllMarketForLookup, GetAllParentCustomersLookup, GetAllRepsForLookup, GetAllWareHouses, GetCustomerLookup, GetGeneralLookupEntries } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { GetAllMarketForLookupParameters, GetAllParentCustomersLookupParameters, GetAllRepsForLookupParameters, GetAllWareHousesParameters, GetCustomerLookupParameters, GetGeneralLookupEntriesParameters } from '@peerless/models';
import { ClearFilterBox } from '@peerless-cms/features-common-components';

export interface SalesEnquiryOutstandingOrdersFilterProps { }

const stateOptions = [
    { id: 0, text: 'All', value: '' },
    { id: 1, text: 'ACT', value: 'ACT' },
    { id: 2, text: 'NSW', value: 'NSW' },
    { id: 3, text: 'NT', value: 'NT' },
    { id: 4, text: 'QLD', value: 'QLD' },
    { id: 5, text: 'SA', value: 'SA' },
    { id: 6, text: 'TAS', value: 'TAS' },
    { id: 7, text: 'VIC', value: 'VIC' },
    { id: 8, text: 'WA', value: 'WA' },
];

const productTypeOptions = [
    { id: 1, text: 'Refinery Products', value: 'F' },
    { id: 2, text: 'Purchase Contract Product', value: 'P' },
    { id: 3, text: 'Rendering Products', value: 'R' },
    { id: 4, text: 'Sundry Expenses', value: 'X' },
];

const orderTypeOptions = [
    { id: 0, text: 'Standard', value: 'standard' },
    { id: 1, text: 'Consignment', value: 'consignment' },
    { id: 2, text: 'Promotion', value: 'promotion' },
    { id: 3, text: 'Export', value: 'export' },
    { id: 4, text: 'Cust to Cust', value: 'cust_to_cust' },
    { id: 5, text: 'Customer Orders', value: 'customer_orders' },
];

const currentOrCompletedOptions = [
    { id: 0, text: 'Current', value: 'current' },
    { id: 1, text: 'Completed', value: 'completed' },
];

export function SalesEnquiryOutstandingOrdersFilter(props: SalesEnquiryOutstandingOrdersFilterProps) {
    const dispatch = useDispatch();
    const [customer, setCustomer] = useState();
    const [customerGroup, setCustomerGroup] = useState();
    const [subGroup, setSubGroup] = useState();
    const [priceGroup, setPriceGroup] = useState();
    const [parent, setParent] = useState();
    const [market, setMarket] = useState();
    const [rep, setRep] = useState();
    const [exDc, setExDc] = useState();
    const [catalogueType, setCatalogueType] = useState(productTypeOptions[1]);
    const [orderType, setOrderType] = useState(orderTypeOptions[5]);
    const [states, setStates] = useState(stateOptions[0]);
    const [fromDate, setFromDate] = useState(new Date().toISOString());
    const [toDate, setToDate] = useState(new Date().toISOString());
    const [radio, setRadio] = useState("date_required");
    const [currentOrCompleted, setCurrentOrCompleted] = useState(currentOrCompletedOptions[0]);
    const [backOrderOnly, setBackOrderOnly] = useState(false);
    const [openPM, setOpenPM] = useState(false);
    const [openSR, setOpenSR] = useState(false);
    const [openCT, setOpenCT] = useState(false);

    const { loggedUser, childOriginators, originatorInList, selectedOriginator } = useSelector((state: RootState) => state.header);
    const { isFetchingOutstandingOrdersList } = useSelector((state: RootState) => state.salesEnquiryOutstandingOrders);

    const payloadParentCustomer: GetAllParentCustomersLookupParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        orderBy: 'parent_customer ASC',
    }

    const payloadSubGroupLookup: GetGeneralLookupEntriesParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        sTableID: 'CUSG'
    }

    const payloadAllMarketForLookup: GetAllMarketForLookupParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        additionalParams: "group_type = 'MA'",
        orderBy: 'cat_grouping ASC',
        startIndex: 1,
        rowCount: 1000,
    }

    const payloadPriceGroupLookup: GetGeneralLookupEntriesParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        sTableID: 'CUPG'
    }

    const payloadCustomerGroupLookup: GetGeneralLookupEntriesParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        sTableID: 'CUGP'
    }

    const payloadAllRepsForLookup: GetAllRepsForLookupParameters = {
        orderby: 'rep_code asc',
        startIndex: 1,
        rowCount: 1000,
        additionalParams: originatorInList
    }

    const payloadCustomerLookup: GetCustomerLookupParameters = {
        additionalParams: childOriginators,
        childOriginators: childOriginators,
        defaultDepartmentId: selectedOriginator.defaultDepartmentId,
        leadStage: 'C',
        orderBy: 'name ASC',
        originator: selectedOriginator.userName,
        startIndex: 1,
        rowCount: 1000
    }

    const payloadAllWareHouses: GetAllWareHousesParameters = {
        startIndex: 1,
        rowCount: 1000,
        childOriginators: childOriginators,
    }


    const { data: customerLookup } = GetCustomerLookup(payloadCustomerLookup, true);
    const { data: parentCustomer } = GetAllParentCustomersLookup(payloadParentCustomer, true)
    const { data: subGroupLookup } = GetGeneralLookupEntries(payloadSubGroupLookup, true)
    const { data: allMarketForLookup } = GetAllMarketForLookup(payloadAllMarketForLookup, true);
    const { data: customerGroupLookup } = GetGeneralLookupEntries(payloadCustomerGroupLookup, true)
    const { data: priceGroupLookup } = GetGeneralLookupEntries(payloadPriceGroupLookup, true)
    const { data: allRepsForLookup } = GetAllRepsForLookup(payloadAllRepsForLookup, true);
    const { data: allWareHouses } = GetAllWareHouses(payloadAllWareHouses, true);

    const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'tableDescription', 'tableCode');
    const subGroupLookupData = dropDownDataConverter.dropDownDataConverter(subGroupLookup || [], 'tableDescription', 'tableCode');
    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');
    const priceGroupLookupData = dropDownDataConverter.dropDownDataConverter(priceGroupLookup || [], 'tableDescription', 'tableCode');
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'tableDescription', 'tableCode');
    const customerGroupLookupData = dropDownDataConverter.dropDownDataConverter(customerGroupLookup || [], 'tableDescription', 'tableCode');
    const allWareHousesData = dropDownDataConverter.dropDownDataConverter(allWareHouses || [], 'tableDescription', 'tableCode');

    const modifiedCustomerLookupData = [{ id: 0, text: 'All', value: '' }, ...customerLookupData];
    const modifiedParentCustomerData = [{ id: 0, text: 'All', value: '' }, ...parentCustomerData];
    const modifiedSubGroupLookupData = [{ id: 0, text: 'All', value: '' }, ...subGroupLookupData];
    const modifiedAllMarketForLookupData = [{ id: 0, text: 'All', value: '' }, ...allMarketForLookupData];
    const modifiedPriceGroupLookupData = [{ id: 0, text: 'All', value: '' }, ...priceGroupLookupData];
    const modifiedAllRepsForLookupData = [{ id: 0, text: 'All', value: '' }, ...allRepsForLookupData];
    const modifiedCustomerGroupLookupData = [{ id: 0, text: 'All', value: '' }, ...customerGroupLookupData];
    const modifiedAllWareHousesData = [{ id: 0, text: 'All', value: '' }, ...allWareHousesData];

    const filterRepCode = () => {
        if (!loggedUser || !loggedUser.repCode) return modifiedAllRepsForLookupData[0];
        const repsFilter = modifiedAllRepsForLookupData.filter((rep) => rep.value === loggedUser.repCode);
        return repsFilter.length > 0 ? repsFilter[0] : modifiedAllRepsForLookupData[0];
    }

    const onFilterClick = () => {
        dispatch(setOutstandingOrdersCustomer(customer));
        dispatch(setOutstandingOrdersCustomerGroup(customerGroup));
        dispatch(setOutstandingOrdersSubGroup(subGroup));
        dispatch(setOutstandingOrdersPriceGroup(priceGroup));
        dispatch(setOutstandingOrdersParent(parent));
        dispatch(setOutstandingOrdersMarket(market));
        dispatch(setOutstandingOrdersRep(rep));
        dispatch(setOutstandingOrdersExDc(exDc));
        dispatch(setOutstandingOrdersCatalogueType(catalogueType));
        dispatch(setOutstandingOrdersOrderType(orderType));
        dispatch(setOutstandingOrdersStates(states));
        dispatch(setOutstandingOrdersFromDate(fromDate));
        dispatch(setOutstandingOrdersToDate(toDate));
        dispatch(setOutstandingOrdersRadio(radio));
        dispatch(setOutstandingOrdersCurrentOrCompleted(currentOrCompleted));
        dispatch(setOutstandingOrdersBackOrderOnly(backOrderOnly));
        dispatch(setIsFetchingOutstandingOrdersList(true));
    }

    const clearFilters = () => {
        setCustomer(modifiedCustomerLookupData[0]);
        setParent(modifiedParentCustomerData[0]);
        setSubGroup(modifiedSubGroupLookupData[0]);
        setMarket(modifiedAllMarketForLookupData[0]);
        setPriceGroup(modifiedPriceGroupLookupData[0]);
        setRep(filterRepCode || modifiedAllRepsForLookupData[0]);
        setExDc(modifiedAllWareHousesData[0]);
        setCustomerGroup(modifiedCustomerGroupLookupData[0]);
        setFromDate(new Date().toISOString());
        setToDate(new Date().toISOString());
        setCatalogueType(productTypeOptions[1]);
        setOrderType(orderTypeOptions[5]);
        setStates(stateOptions[0]);
        setCurrentOrCompleted(currentOrCompletedOptions[0]);
        setBackOrderOnly(false);
        setRadio("date_required");
    }

    const customerDefault = modifiedCustomerLookupData[0];
    const parentDefault = modifiedParentCustomerData[0];
    const subGroupDefault = modifiedSubGroupLookupData[0];
    const marketDefault = modifiedAllMarketForLookupData[0];
    const priceGroupDefault = modifiedPriceGroupLookupData[0];
    const repDefault = filterRepCode();
    const exDcDefault = modifiedAllWareHousesData[0];
    const customerGroupDefault = modifiedCustomerGroupLookupData
    const catalogueTypeDefault = productTypeOptions[1];
    const orderTypeDefault = orderTypeOptions[5];
    const statesDefault = stateOptions[0];
    const currentOrCompletedDefault = currentOrCompletedOptions[0];


    useEffect(() => {
        if (customerLookup) {
            setCustomer(modifiedCustomerLookupData[0]);
        }
        if (parentCustomer) {
            setParent(modifiedParentCustomerData[0]);
        }
        if (subGroupLookup) {
            setSubGroup(modifiedSubGroupLookupData[0]);
        }
        if (allMarketForLookup) {
            setMarket(modifiedAllMarketForLookupData[0]);
        }
        if (priceGroupLookup) {
            setPriceGroup(modifiedPriceGroupLookupData[0]);
        }
        if (modifiedAllRepsForLookupData) {
            setRep(filterRepCode);
        }
        if (allWareHouses) {
            setExDc(modifiedAllWareHousesData[0]);
        }
        if (customerGroupLookup) {
            setCustomerGroup(modifiedCustomerGroupLookupData[0]);
        }
    }, [customerLookup, parentCustomer, subGroupLookup, allMarketForLookup, priceGroupLookup, allRepsForLookup, allWareHouses, customerGroupLookup]);

    const popUpSettings = {
        width: '150px'
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <div>
                <div>
                    <ButtonWidgetCollapse id={"sales-enquiry-outstanding-orders-customer-information-collapse"} name={"Customer Information"} classNames={"dash-collapse-button"} numSpaces={0} state={openPM} setState={setOpenPM} />
                </div>
                <Collapse in={openPM}>
                    <div>
                        <div>
                            <div className='dashboard-filter-header'> Customer </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-customer"} className={"administrator-filter"} setValue={(e) => setCustomer(e)} value={customer} defaultValue={customerDefault} datalist={modifiedCustomerLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Parent </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-parent"} className={"administrator-filter"} setValue={(e) => setParent(e)} value={parent} defaultValue={parentDefault} datalist={modifiedParentCustomerData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Sub Group </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-sub-group"} className={"administrator-filter"} setValue={(e) => setSubGroup(e)} value={subGroup} defaultValue={subGroupDefault} datalist={modifiedSubGroupLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Cust Group </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-customer-group"} className={"administrator-filter"} setValue={(e) => setCustomerGroup(e)} value={customerGroup} defaultValue={customerGroupDefault} datalist={modifiedCustomerGroupLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Price Group </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-price-group"} className={"administrator-filter"} setValue={(e) => setPriceGroup(e)} value={priceGroup} defaultValue={priceGroupDefault} datalist={modifiedPriceGroupLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Rep </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-rep"} className={"administrator-filter"} setValue={(e) => setRep(e)} value={rep} defaultValue={repDefault} datalist={modifiedAllRepsForLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <hr />
                    </div>
                </Collapse>
                <div>
                    <ButtonWidgetCollapse id={"sales-enquiry-outstanding-orders-product-order-collapse"} name={"Product & Order"} classNames={"dash-collapse-button"} numSpaces={9} state={openSR} setState={setOpenSR} />
                </div>
                <Collapse in={openSR}>
                    <div>
                        <div>
                            <div className='dashboard-filter-header'> Market </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-market"} className={"administrator-filter"} setValue={(e) => setMarket(e)} value={market} defaultValue={marketDefault} datalist={modifiedAllMarketForLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Product Type </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-catalogue-type"} className={"administrator-filter"} setValue={(e) => setCatalogueType(e)} value={catalogueType} defaultValue={catalogueTypeDefault} datalist={productTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> EX DC </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-ex-dc"} className={"administrator-filter"} setValue={(e) => setExDc(e)} value={exDc} defaultValue={exDcDefault} datalist={modifiedAllWareHousesData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Order Type </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-order-type"} className={"administrator-filter"} setValue={(e) => setOrderType(e)} value={orderType} defaultValue={orderTypeDefault} datalist={orderTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Current Or Completed </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-current-or-completed"} className={"administrator-filter"} setValue={(e) => setCurrentOrCompleted(e)} value={currentOrCompleted} defaultValue={currentOrCompletedDefault} datalist={currentOrCompletedOptions} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CheckBox id={"sales-enquiry-outstanding-orders-back-order-only"} className={"sales-enquiry-outstanding-checkbox"} setValue={(e) => setBackOrderOnly(e)} value={backOrderOnly} label={""} />
                                <div className='sales-enquiry-outstanding-checkbox-header'>Back Order Only</div>

                            </div>
                        </div>
                        <hr />
                    </div>
                </Collapse>
                <div>
                    <ButtonWidgetCollapse id={"sales-enquiry-outstanding-date-status-transaction-collapse"} name={"Date & Status"} classNames={"dash-collapse-button"} numSpaces={13} state={openCT} setState={setOpenCT} />
                </div>
                <Collapse in={openCT}>
                    <div className='sales-enquiry-cus-tra'>
                        <div >
                            <div className='dashboard-filter-header'> Duration </div>
                            <DatePickerWidget id={"sales-enquiry-outstanding-orders-from-date"} className={"dashboard-filter"} setValue={(e) => setFromDate(e)} value={fromDate} />
                            <DatePickerWidget id={"sales-enquiry-outstanding-orders-to-date"} className={"dashboard-filter"} setValue={(e) => setToDate(e)} value={toDate} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> States </div>
                            <DropDown id={"sales-enquiry-outstanding-orders-states"} className={"administrator-filter"} setValue={(e) => setStates(e)} value={states} defaultValue={statesDefault} datalist={stateOptions} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Date Selection </div>
                            <RadioButtonWidget
                                id="sales-enquiry-outstanding-orders-date-required"
                                className="sales-enquiry-radio-check"
                                name="chartType2"
                                value="date_required"
                                checked={radio === "date_required"}
                                label={"Date Required"}
                                setValue={(e) => setRadio(e)}
                            />
                            <RadioButtonWidget
                                id="sales-enquiry-outstanding-orders-previous-date-required"
                                className="sales-enquiry-radio-check"
                                name="chartType2"
                                value="previous_date_required"
                                checked={radio === "previous_date_required"}
                                label={"Previous Date Required"}
                                setValue={(e) => setRadio(e)}
                            />
                            <RadioButtonWidget
                                id="sales-enquiry-outstanding-orders-order-date"
                                className="sales-enquiry-radio-check"
                                name="chartType2"
                                value="order_date"
                                checked={radio === "order_date"}
                                label={"Order Date"}
                                setValue={(e) => setRadio(e)}
                            />
                        </div>
                        <hr />
                    </div>
                </Collapse>
                <ButtonWidget id='sales-enquiry-customer-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' Function={onFilterClick} isDisabled={isFetchingOutstandingOrdersList} isFetching={true} />
            </div>
        </>
    );
}

export default SalesEnquiryOutstandingOrdersFilter;
