import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { RootState, setInvoiceBrand, setInvoiceCatalogueType, setInvoiceCustomer, setInvoiceCustomerGroup, setInvoiceFromDate, setInvoiceBatchNumber, setInvoiceInvoiceNumber, setInvoiceMarket, setInvoiceParent, setInvoicePriceGroup, setInvoiceProductGroup, setInvoiceRadio, setInvoiceRadio2, setInvoiceRep, setInvoiceState, setInvoiceSubGroup, setInvoiceToDate, setIsFetchingInvoiceEnquiryList, setSelectedInvoiceEnquiry, setTriggerInvoiceEnquiryFiltersFormSubmit } from '@peerless-cms/store';
import { ButtonWidget, DatePickerWidget, DropDown, FilterNonButton, InputWidget, MultiColumnComboBoxWidget, RadioButtonWidget } from '@peerless/controls';
import { GetAllMarketForLookup, GetAllParentCustomersLookup, GetAllRepsForLookup, GetCustomerLookup, GetGeneralLookupEntries, GetLookup, GetProductGroupLookup, GetReps } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { DropDownData, GetAllMarketForLookupParameters, GetAllParentCustomersLookupParameters, GetAllRepsForLookupParameters, GetCustomerLookupParameters, GetGeneralLookupEntriesParameters, GetProductGroupLookupParameters } from '@peerless/models';
import { FilterFormGroup, FilterForm } from '@peerless-cms/features-common-components';
import { useFilterForm } from '@peerless-cms/features';

export interface SalesEnquiryInvoiceEnquiryFilterProps {
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
    { id: 0, text: 'A - All Products', value: '' },
    { id: 1, text: 'F - Refinery Products', value: 'F' },
    { id: 2, text: 'P - Purchase Contract Product', value: 'P' },
    { id: 3, text: 'R - Rendering Product', value: 'R' },
    { id: 4, text: 'X - Sundry Expenses', value: 'X' },
];

export function SalesEnquiryInvoiceEnquiryFilter(props: SalesEnquiryInvoiceEnquiryFilterProps) {
    const dispatch = useDispatch();
    const { loggedUser, childOriginators, originatorInList, selectedOriginator } = useSelector((state: RootState) => state.header);
    const { isFormSubmit, invoiceSubGroup, invoicePriceGroup, invoiceProductGroup, invoiceParent, invoiceMarket, invoiceRep, invoiceCatalogueType, invoiceState, invoiceBrand, invoiceCustomer, invoiceFromDate, invoiceToDate, invoiceBatchNumber, invoiceInvoiceNumber, invoiceRadio, invoiceRadio2 } = useSelector((state: RootState) => state.salesEnquiryInvoiceEnquiry);
    const date = new Date();
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth() - 1);
    const isoFromDate = fromDate.toISOString();

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

    const payloadBrandLookup: GetGeneralLookupEntriesParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        sTableID: 'PRBR'
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

    const payloadProductGroupLookup: GetProductGroupLookupParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        additionalParams: "",
        orderBy: 'cat_group',
        startIndex: 1,
        rowCount: 1000,
    }


    const { data: parentCustomer } = GetAllParentCustomersLookup(payloadParentCustomer, true)
    const { data: subGroupLookup } = GetGeneralLookupEntries(payloadSubGroupLookup, true)
    const { data: allMarketForLookup } = GetAllMarketForLookup(payloadAllMarketForLookup, true);
    const { data: productGroupLookup } = GetProductGroupLookup(payloadProductGroupLookup, true)
    const { data: customerGroupLookup } = GetGeneralLookupEntries(payloadCustomerGroupLookup, true)
    // const { data: priceGroupLookup } = GetGeneralLookupEntries(payloadPriceGroupLookup, true)
    // const { data: allRepsForLookup } = GetAllRepsForLookup(payloadAllRepsForLookup, true);
    const { data: brandLookup } = GetGeneralLookupEntries(payloadBrandLookup, true)
    const { data: customerLookup } = GetCustomerLookup(payloadCustomerLookup, true);
    const { data: warehouseGroupLookup } = GetLookup('warehouse', true);
    const { data: subparent } = GetLookup('subparentgroup', true);
    const { data: allRepsForLookup } = GetReps(true);

    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'description', 'tableCode');
    const subGroupLookupData = dropDownDataConverter.dropDownDataConverter(subGroupLookup || [], 'tableDescription', 'tableCode');
    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');
    // const priceGroupLookupData = dropDownDataConverter.dropDownDataConverter(priceGroupLookup || [], 'tableDescription', 'tableCode');
    // const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'tableDescription', 'tableCode');
    const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
    const warehouseGroupLookupData = dropDownDataConverter.dropDownDataConverter(warehouseGroupLookup || [], 'description', 'tableCode');
    const subParentLookupData = dropDownDataConverter.dropDownDataConverter(subparent || [], 'tableDescription', 'tableCode');
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'name', 'repCode');

    const repMatch = allRepsForLookupData?.find(
        (rep: DropDownData) => rep.value === loggedUser.repCode
    );
    const parentDefault = { id: 0, text: '', value: '' };
    const subGroupDefault = { id: 0, text: '', value: '' };
    const marketDefault = { id: 0, text: '', value: '' };
    const priceGroupDefault = { id: 0, text: '', value: '' };
    const repDefault = repMatch
        ? repMatch
        : { id: 0, text: '', value: '' };
    const customerDefault = { id: 0, text: '', value: '' };
    const customerGroupDefault = { id: 0, text: '', value: '' };
    const productGroupDefault = { id: 0, text: '', value: '' };
    const catalogueTypeDefault = productTypeOptions[1];
    const stateDefault = stateOptions[0];


    const onFilterClick = () => {
        dispatch(setIsFetchingInvoiceEnquiryList(true));
        dispatch(setSelectedInvoiceEnquiry(null));
    }

    const clearFilters = () => {
        dispatch(setInvoiceRep(repDefault));
        dispatch(setInvoiceCustomerGroup(customerGroupDefault));
        dispatch(setInvoiceSubGroup(subGroupDefault));
        dispatch(setInvoicePriceGroup(priceGroupDefault));
        dispatch(setInvoiceProductGroup(productGroupDefault));
        dispatch(setInvoiceParent(parentDefault));
        dispatch(setInvoiceMarket(marketDefault));
        dispatch(setInvoiceCatalogueType(catalogueTypeDefault));
        dispatch(setInvoiceState(stateDefault));
        dispatch(setInvoiceCustomer(customerDefault));
        dispatch(setInvoiceFromDate(new Date().toISOString()));
        dispatch(setInvoiceToDate(new Date().toISOString()));
        dispatch(setInvoiceInvoiceNumber('0'));
        dispatch(setInvoiceBatchNumber('0'));
        dispatch(setInvoiceRadio("2"));
        dispatch(setInvoiceRadio2("1"));
    }

    useEffect(() => {
        if (parentCustomer) {
            dispatch(setInvoiceParent(parentDefault));
        }
        if (subGroupLookup) {
            dispatch(setInvoiceSubGroup(subGroupDefault));
        }
        if (allMarketForLookup) {
            dispatch(setInvoiceMarket(marketDefault));
        }
        // if (priceGroupLookup) {
        //     dispatch(setInvoicePriceGroup(priceGroupDefault));
        // }
        if (allRepsForLookupData) {
            dispatch(setInvoiceRep(repDefault));
        }
        if (customerLookup) {
            dispatch(setInvoiceCustomer(customerDefault));
        }
        if (customerGroupLookup) {
            dispatch(setInvoiceCustomerGroup(customerGroupDefault));
        }
        if (productGroupLookup) {
            dispatch(setInvoiceProductGroup(productGroupDefault));
        }
        dispatch(setInvoiceCatalogueType(catalogueTypeDefault));
        dispatch(setInvoiceFromDate(isoFromDate));
        dispatch(setInvoiceToDate(new Date().toISOString()));
        dispatch(setInvoiceBatchNumber('0'));
        dispatch(setInvoiceInvoiceNumber('0'));
        dispatch(setInvoiceRadio("2"));
        dispatch(setInvoiceRadio2("1"));
    }, [parentCustomer, subGroupLookup, allMarketForLookup, allRepsForLookup, customerLookup, customerGroupLookup, brandLookup, productGroupLookup]);

    const popUpSettings = {
        width: '208px'
    }

    const submitHandler = () => {
        onFilterClick();
    }

    const { formComponentRef } = useFilterForm({
        isFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerInvoiceEnquiryFiltersFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [invoiceParent, invoiceSubGroup, invoiceProductGroup, invoicePriceGroup, invoiceMarket, invoiceRep, invoiceCatalogueType, invoiceState, invoiceCustomer, invoiceFromDate, invoiceToDate, invoiceBatchNumber, invoiceRadio, invoiceRadio2]
    });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={submitHandler} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Invoice Date' hasColumns>
                                <DatePickerWidget
                                    id={'sales-enquiry-invoice-enquiry-from-date'}
                                    className={'dashboard-filter datepicker-custom'}
                                    setValue={(e) => dispatch(setInvoiceFromDate(e))} value={invoiceFromDate} format='dd/MM/yyyy'
                                />
                                <DatePickerWidget
                                    id={'sales-enquiry-invoice-enquiry-to-date'}
                                    className={'dashboard-filter datepicker-custom datepicker-custom-nsp'}
                                    setValue={(e) => dispatch(setInvoiceToDate(e))} value={invoiceToDate} format='dd/MM/yyyy'
                                />
                            </FilterFormGroup>
                            <FilterFormGroup label='Customer'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-custome"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceCustomer(e))} value={invoiceCustomer} datalist={customerLookupData} defaultValue={customerDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Catalogue Type'>
                                <DropDown id={"sales-enquiry-invoice-enquiry-catalogue-type"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceCatalogueType(e))} value={invoiceCatalogueType} defaultValue={catalogueTypeDefault} datalist={productTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Invoice Number'>
                                <InputWidget id={"sales-enquiry-invoice-enquiry-invoice-number"} className={"administrator-filter filter-form-filter"} setValue={(e) => { dispatch(setInvoiceInvoiceNumber(e)) }} value={invoiceInvoiceNumber} type='string' />
                            </FilterFormGroup>
                            <FilterFormGroup label='Batch Number'>
                                <InputWidget id={"sales-enquiry-invoice-enquiry-batch-number"} className={"administrator-filter filter-form-filter"} setValue={(e) => { dispatch(setInvoiceBatchNumber(e)) }} value={invoiceBatchNumber} type='string' />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Rep'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-rep"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceRep(e))} value={invoiceRep} datalist={allRepsForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Parent'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-parent"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceParent(e))} value={invoiceParent} datalist={parentCustomerData} defaultValue={parentDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sub Parent'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-sub-group"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceSubGroup(e))} value={invoiceSubGroup} datalist={subGroupLookupData} defaultValue={subGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sub Parent Group'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-outstanding-orders-parent-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceBrand(e))} value={invoiceBrand} datalist={subParentLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            {/* <FilterFormGroup label='Price Group'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-price-group"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoicePriceGroup(e))} value={invoicePriceGroup} datalist={priceGroupLookupData} defaultValue={priceGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                                </FilterFormGroup> */}
                            <FilterFormGroup label='Market'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-market"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceMarket(e))} value={invoiceMarket} datalist={allMarketForLookupData} defaultValue={marketDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='EX DC'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-product-group"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setInvoiceProductGroup(e))} value={invoiceProductGroup} datalist={warehouseGroupLookupData} defaultValue={productGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Display' hasColumns>
                                <RadioButtonWidget id='"sales-enquiry-invoice-enquiry-invoices' className="sales-enquiry-radio-check" name="chartType2" value="1" checked={invoiceRadio === "1"} label={"Invoices"} setValue={(e) => dispatch(setInvoiceRadio(e))} />
                                <RadioButtonWidget id='"sales-enquiry-invoice-enquiry-invoices-credit-notes' className="sales-enquiry-radio-check" name="chartType2" value="2" checked={invoiceRadio === "2"} label={"Inv. & Crd Notes"} setValue={(e) => dispatch(setInvoiceRadio(e))} />
                            </FilterFormGroup>
                            <FilterFormGroup label='' hasColumns>
                                <div style={{ paddingLeft: '90px' }}></div>
                                <RadioButtonWidget id='"sales-enquiry-customer-rep' className="sales-enquiry-radio-check" name="chartType2" value="1" checked={invoiceRadio2 === "1"} label={"Customer Rep"} setValue={(e) => dispatch(setInvoiceRadio2(e))} />
                                <RadioButtonWidget id='"sales-enquiry-invoiced-rep' className="sales-enquiry-radio-check" name="chartType2" value="2" checked={invoiceRadio2 === "2"} label={"Invoiced Rep"} setValue={(e) => dispatch(setInvoiceRadio2(e))} />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>

        </>
    );
}

export default SalesEnquiryInvoiceEnquiryFilter;
