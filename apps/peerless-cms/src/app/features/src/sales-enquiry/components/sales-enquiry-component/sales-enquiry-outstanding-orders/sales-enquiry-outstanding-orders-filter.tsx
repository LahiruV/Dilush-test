import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import {
    RootState, setIsFetchingOutstandingOrdersList, setOutstandingOrdersBackOrderOnly, setOutstandingOrdersCatalogueType, setOutstandingOrdersCurrentOrCompleted, setOutstandingOrdersCustomer,
    setOutstandingOrdersCustomerGroup, setOutstandingOrdersExDc, setOutstandingOrdersFromDate, setOutstandingOrdersMarket, setOutstandingOrdersOrderType, setOutstandingOrdersParent, setOutstandingOrdersPriceGroup,
    setOutstandingOrdersRadio, setOutstandingOrdersRep, setOutstandingOrdersStates, setOutstandingOrdersSubGroup, setOutstandingOrdersSubParent, setOutstandingOrdersToDate,
    setTriggerOutstandingOrdersFiltersFormSubmit
} from '@peerless-cms/store';
import { DatePickerWidget, DropDown, FilterNonButton, MultiColumnComboBoxWidget, RadioButtonWidget } from '@peerless/controls';
import { GetAllMarketForLookup, GetAllParentCustomersLookup, GetAllWareHouses, GetCustomerLookup, GetGeneralLookupEntries, GetLookup } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { GetAllMarketForLookupParameters, GetAllParentCustomersLookupParameters, GetAllWareHousesParameters, GetCustomerLookupParameters, GetGeneralLookupEntriesParameters } from '@peerless/models';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { useFilterForm } from '@peerless-cms/features';

export interface SalesEnquiryOutstandingOrdersFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

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
    { id: 1, text: 'A - All Products', value: '' },
    { id: 2, text: 'F - Refinery Products', value: 'F' },
    { id: 3, text: 'P - Purchase Contract Product', value: 'P' },
    { id: 4, text: 'R - Rendering Products', value: 'R' },
    { id: 5, text: 'X - Sundry Expenses', value: 'X' },
];

const orderTypeOptions = [
    { id: 0, text: 'Standard', value: 'Standard' },
    { id: 1, text: 'Consignment', value: 'consignment' },
    { id: 2, text: 'Promotion', value: 'promotion' },
    { id: 3, text: 'Export', value: 'export' },
    // { id: 4, text: 'Cust to Cust', value: 'cust_to_cust' },
    { id: 5, text: 'Customer Orders', value: 'customer_orders' },
];

const currentOrCompletedOptions = [
    { id: 0, text: 'Current', value: '1' },
    { id: 1, text: 'Completed', value: '2' },
];

export function SalesEnquiryOutstandingOrdersFilter(props: SalesEnquiryOutstandingOrdersFilterProps) {
    const dispatch = useDispatch();

    const toDate = new Date();
    toDate.setMonth(toDate.getMonth() + 1);

    const { loggedUser, childOriginators, selectedOriginator } = useSelector((state: RootState) => state.header);
    const { isFormSubmit, outstandingOrdersCustomer, outstandingOrdersSubGroup, outstandingOrdersPriceGroup, outstandingOrdersParent,
        outstandingOrdersSubParent, outstandingOrdersMarket, outstandingOrdersExDc, outstandingOrdersCatalogueType,
        outstandingOrdersOrderType, outstandingOrdersFromDate, outstandingOrdersToDate, outstandingOrdersRadio,
        outstandingOrdersCurrentOrCompleted } = useSelector((state: RootState) => state.salesEnquiryOutstandingOrders);

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
    const { data: allWareHouses } = GetAllWareHouses(payloadAllWareHouses, true);
    const { data: subparent } = GetLookup('subparentgroup', true);

    const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'tableDescription', 'tableCode');
    const subGroupLookupData = dropDownDataConverter.dropDownDataConverter(subGroupLookup || [], 'tableDescription', 'tableCode');
    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');
    const priceGroupLookupData = dropDownDataConverter.dropDownDataConverter(priceGroupLookup || [], 'tableDescription', 'tableCode');
    const customerGroupLookupData = dropDownDataConverter.dropDownDataConverter(customerGroupLookup || [], 'tableDescription', 'tableCode');
    const allWareHousesData = dropDownDataConverter.dropDownDataConverter(allWareHouses || [], 'tableDescription', 'tableCode');
    const subParentLookupData = dropDownDataConverter.dropDownDataConverter(subparent || [], 'tableDescription', 'tableCode');

    const modifiedCustomerGroupLookupData = [{ id: 0, text: 'All', value: '' }, ...customerGroupLookupData];

    const onFilterClick = () => {
        dispatch(setIsFetchingOutstandingOrdersList(true));
    }

    const clearFilters = () => {
        dispatch(setOutstandingOrdersCustomer({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersParent({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersSubGroup({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersMarket({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersPriceGroup({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersRep({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersExDc({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersCustomerGroup({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersSubParent({ id: 0, text: '', value: '' }));
        dispatch(setOutstandingOrdersFromDate(new Date().toISOString()));
        dispatch(setOutstandingOrdersToDate(toDate.toISOString()));
        dispatch(setOutstandingOrdersCatalogueType(productTypeOptions[0]));
        dispatch(setOutstandingOrdersOrderType(orderTypeOptions[0]));
        dispatch(setOutstandingOrdersStates(stateOptions[0]));
        dispatch(setOutstandingOrdersCurrentOrCompleted(currentOrCompletedOptions[0]));
        dispatch(setOutstandingOrdersBackOrderOnly(false));
        dispatch(setOutstandingOrdersRadio("1"));
    }

    const catalogueTypeDefault = productTypeOptions[0];
    const orderTypeDefault = orderTypeOptions[0];
    const currentOrCompletedDefault = currentOrCompletedOptions[0];


    useEffect(() => {
        if (customerGroupLookup) {
            dispatch(setOutstandingOrdersCustomerGroup(modifiedCustomerGroupLookupData[0]));
        }
    }, [allWareHouses, customerGroupLookup]);

    useEffect(() => {
        dispatch(setOutstandingOrdersCatalogueType(productTypeOptions[0]));
        dispatch(setOutstandingOrdersOrderType(orderTypeOptions[0]));
        dispatch(setOutstandingOrdersFromDate(new Date().toISOString()));
        dispatch(setOutstandingOrdersToDate(toDate.toISOString()));
        dispatch(setOutstandingOrdersCurrentOrCompleted(currentOrCompletedOptions[0]));
        dispatch(setOutstandingOrdersBackOrderOnly(false));
        dispatch(setOutstandingOrdersRadio("1"));
    }, [dispatch])

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerOutstandingOrdersFiltersFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Duration' hasColumns>
                                <DatePickerWidget id={"sales-enquiry-outstanding-orders-from-date"} className={"dashboard-filter datepicker-custom"} setValue={(e) => dispatch(setOutstandingOrdersFromDate(e))} value={outstandingOrdersFromDate} />
                                <DatePickerWidget id={"sales-enquiry-outstanding-orders-to-date"} className={"dashboard-filter datepicker-custom datepicker-custom-nsp"} setValue={(e) => dispatch(setOutstandingOrdersToDate(e))} value={outstandingOrdersToDate} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Product Type'>
                                <DropDown id={"sales-enquiry-outstanding-orders-catalogue-type"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersCatalogueType(e))} value={outstandingOrdersCatalogueType} defaultValue={catalogueTypeDefault} datalist={productTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Current Or Completed'>
                                <DropDown id={"sales-enquiry-outstanding-orders-current-or-completed"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersCurrentOrCompleted(e))} value={outstandingOrdersCurrentOrCompleted} defaultValue={currentOrCompletedDefault} datalist={currentOrCompletedOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Customer'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-customer"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersCustomer(e))} value={outstandingOrdersCustomer} datalist={customerLookupData} isClearable={true} isClearFilter={true} isFilterable={true} textField={"text"} valueField={"value"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Price Group'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-price-group"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersPriceGroup(e))} value={outstandingOrdersPriceGroup} datalist={priceGroupLookupData} isClearable={true} isClearFilter={true} isFilterable={true} textField={"text"} valueField={"value"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Parent'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-parent"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersParent(e))} value={outstandingOrdersParent} datalist={parentCustomerData} isClearable={true} isClearFilter={true} isFilterable={true} textField={"value"} valueField={"value"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sub Parent'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-sub-group"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersSubGroup(e))} value={outstandingOrdersSubGroup} datalist={subGroupLookupData} isClearable={true} isClearFilter={true} isFilterable={true} textField={"text"} valueField={"value"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sub Parent Group'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-parent-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersSubParent(e))} value={outstandingOrdersSubParent} datalist={subParentLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Market'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-market"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersMarket(e))} value={outstandingOrdersMarket} datalist={allMarketForLookupData} isClearable={true} isClearFilter={true} isFilterable={true} textField={"text"} valueField={"value"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Order Type'>
                                <DropDown id={"sales-enquiry-outstanding-orders-order-type"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersOrderType(e))} value={outstandingOrdersOrderType} defaultValue={orderTypeDefault} datalist={orderTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Ex DC'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-ex-dc"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrdersExDc(e))} value={outstandingOrdersExDc} datalist={allWareHousesData} isFilterable={true} textField={"text"} valueField={"value"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>

                            <FilterFormGroup hasColumns columnWrapperStyle={{ flexWrap: 'wrap', gap: '5px 10px', paddingTop: '8px' }}>
                                <RadioButtonWidget
                                    id="sales-enquiry-outstanding-orders-date-required"
                                    className="sales-enquiry-radio-check filter-form-group-radio"
                                    name="chartType2"
                                    value="1"
                                    checked={outstandingOrdersRadio === "1"}
                                    label={"Date Required"}
                                    setValue={(e) => dispatch(setOutstandingOrdersRadio(e))}
                                />
                                <RadioButtonWidget
                                    id="sales-enquiry-outstanding-orders-previous-date-required"
                                    className="sales-enquiry-radio-check filter-form-group-radio"
                                    name="chartType2"
                                    value="2"
                                    checked={outstandingOrdersRadio === "2"}
                                    label={"Previous Date Required"}
                                    setValue={(e) => dispatch(setOutstandingOrdersRadio(e))}
                                />
                                <RadioButtonWidget
                                    id="sales-enquiry-outstanding-orders-order-date"
                                    className="sales-enquiry-radio-check filter-form-group-radio"
                                    name="chartType2"
                                    value="3"
                                    checked={outstandingOrdersRadio === "3"}
                                    label={"Order Date"}
                                    setValue={(e) => dispatch(setOutstandingOrdersRadio(e))}
                                />
                            </FilterFormGroup>
                        </div>

                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default SalesEnquiryOutstandingOrdersFilter;
