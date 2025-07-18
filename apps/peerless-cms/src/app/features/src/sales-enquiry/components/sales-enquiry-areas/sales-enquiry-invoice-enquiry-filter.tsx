import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { RootState, setInvoiceBrand, setInvoiceCatalogueType, setInvoiceCustomer, setInvoiceCustomerGroup, setInvoiceFromDate, setInvoiceInvoiceNumber, setInvoiceMarket, setInvoiceParent, setInvoicePriceGroup, setInvoiceProductGroup, setInvoiceRadio, setInvoiceRadio2, setInvoiceRep, setInvoiceState, setInvoiceSubGroup, setInvoiceToDate, setIsFetchingInvoiceEnquiryList } from '@peerless-cms/store';
import { ButtonWidget, ButtonWidgetCollapse, DatePickerWidget, DropDown, InputWidget, MultiColumnComboBoxWidget, RadioButtonWidget } from '@peerless/controls';
import { GetAllMarketForLookup, GetAllParentCustomersLookup, GetAllRepsForLookup, GetCustomerLookup, GetGeneralLookupEntries, GetLookup, GetProductGroupLookup } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { DropDownData, GetAllMarketForLookupParameters, GetAllParentCustomersLookupParameters, GetAllRepsForLookupParameters, GetCustomerLookupParameters, GetGeneralLookupEntriesParameters, GetProductGroupLookupParameters } from '@peerless/models';
import { ClearFilterBox } from '@peerless-cms/features-common-components';

export interface SalesEnquiryInvoiceEnquiryFilterProps { }

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
    { id: 0, text: 'All', value: '' },
    { id: 1, text: 'F - Refinery Products', value: 'F' },
    { id: 1, text: 'P - Purchase Contract Product', value: 'P' },
    { id: 1, text: 'R - Rendering Product', value: 'R' },
    { id: 2, text: 'X - Sundry Expenses', value: 'X' },
];

export function SalesEnquiryInvoiceEnquiryFilter(props: SalesEnquiryInvoiceEnquiryFilterProps) {
    const dispatch = useDispatch();
    const [customerGroup, setCustomerGroup] = useState<DropDownData>();
    const [subGroup, setSubGroup] = useState<DropDownData>();
    const [priceGroup, setPriceGroup] = useState<DropDownData>();
    const [productGroup, setProductGroup] = useState<DropDownData>();
    const [parent, setParent] = useState<DropDownData>();
    const [market, setMarket] = useState<DropDownData>();
    const [rep, setRep] = useState<DropDownData>();
    const [catalogueType, setCatalogueType] = useState(productTypeOptions[1]);
    const [states, setStates] = useState(stateOptions[0]);
    const [brand, setBrand] = useState<DropDownData>();
    const [customer, setCustomer] = useState<DropDownData>();
    const [fromDate, setFromDate] = useState(new Date().toISOString());
    const [toDate, setToDate] = useState(new Date().toISOString());
    const [invoiceNumber, setInvoiceNumber] = useState('0');
    const [radio, setRadio] = useState("2");
    const [radioOption2, setRadioOption2] = useState("1");
    const [openPM, setOpenPM] = useState(false);
    const [openSR, setOpenSR] = useState(false);
    const [openCT, setOpenCT] = useState(false);

    const { loggedUser, childOriginators, originatorInList, selectedOriginator } = useSelector((state: RootState) => state.header);
    const { isFetchingInvoiceEnquiryList } = useSelector((state: RootState) => state.salesEnquiryInvoiceEnquiry);

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
    const { data: priceGroupLookup } = GetGeneralLookupEntries(payloadPriceGroupLookup, true)
    const { data: allRepsForLookup } = GetAllRepsForLookup(payloadAllRepsForLookup, true);
    const { data: brandLookup } = GetGeneralLookupEntries(payloadBrandLookup, true)
    const { data: customerLookup } = GetCustomerLookup(payloadCustomerLookup, true);
    const { data: warehouseGroupLookup } = GetLookup('warehouse', true);

    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'description', 'tableCode');
    const subGroupLookupData = dropDownDataConverter.dropDownDataConverter(subGroupLookup || [], 'tableDescription', 'tableCode');
    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');
    const priceGroupLookupData = dropDownDataConverter.dropDownDataConverter(priceGroupLookup || [], 'tableDescription', 'tableCode');
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'tableDescription', 'tableCode');
    const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
    const customerGroupLookupData = dropDownDataConverter.dropDownDataConverter(customerGroupLookup || [], 'tableDescription', 'tableCode');
    const brandLookupData = dropDownDataConverter.dropDownDataConverter(brandLookup || [], 'tableDescription', 'tableCode');
    const productGroupLookupData = dropDownDataConverter.dropDownDataConverter(productGroupLookup || [], 'tableDescription', 'tableCode');
    const warehouseGroupLookupData = dropDownDataConverter.dropDownDataConverter(warehouseGroupLookup || [], 'description', 'tableCode');

    const onFilterClick = () => {
        dispatch(setInvoiceCustomerGroup(customerGroup));
        dispatch(setInvoiceSubGroup(subGroup));
        dispatch(setInvoicePriceGroup(priceGroup));
        dispatch(setInvoiceProductGroup(productGroup));
        dispatch(setInvoiceParent(parent));
        dispatch(setInvoiceMarket(market));
        dispatch(setInvoiceRep(rep));
        dispatch(setInvoiceCatalogueType(catalogueType));
        dispatch(setInvoiceState(states));
        dispatch(setInvoiceBrand(brand));
        dispatch(setInvoiceCustomer(customer));
        dispatch(setInvoiceFromDate(fromDate));
        dispatch(setInvoiceToDate(toDate));
        dispatch(setInvoiceInvoiceNumber(invoiceNumber));
        dispatch(setInvoiceRadio(radio));
        dispatch(setInvoiceRadio2(radioOption2));
        dispatch(setIsFetchingInvoiceEnquiryList(true));
    }

    const filterRepCode = () => {
        if (!loggedUser || !loggedUser.repCode) return allRepsForLookupData[0];
        const repsFilter = allRepsForLookupData.filter((rep: any) => rep.value === loggedUser.repCode);
        return repsFilter.length > 0 ? repsFilter[0] : allRepsForLookupData[0];
    }

    const clearFilters = () => {
        setCustomerGroup(customerGroupDefault);
        setSubGroup(subGroupDefault);
        setPriceGroup(priceGroupDefault);
        setProductGroup(productGroupDefault);
        setParent(parentDefault);
        setMarket(marketDefault);
        setRep(repDefault);
        setCatalogueType(catelogueTypeDefault);
        setStates(stateDefault);
        setBrand(brandDefault);
        setCustomer(customerDefault);
        setFromDate(new Date().toISOString());
        setToDate(new Date().toISOString());
        setInvoiceNumber('0');
        setRadio("2");
        setRadioOption2("1");
    }

    const parentDefault = { id: 0, text: '', value: '' };
    const subGroupDefault = { id: 0, text: '', value: '' };
    const marketDefault = { id: 0, text: '', value: '' };
    const priceGroupDefault = { id: 0, text: '', value: '' };
    const repDefault = { id: 0, text: '', value: '' };
    const customerDefault = { id: 0, text: '', value: '' };
    const customerGroupDefault = { id: 0, text: '', value: '' };
    const brandDefault = { id: 0, text: '', value: '' };
    const productGroupDefault = { id: 0, text: '', value: '' };
    const catelogueTypeDefault = productTypeOptions[1];
    const stateDefault = stateOptions[0];

    useEffect(() => {
        if (parentCustomer) {
            setParent(parentDefault);
        }
        if (subGroupLookup) {
            setSubGroup(subGroupDefault);
        }
        if (allMarketForLookup) {
            setMarket(marketDefault);
        }
        if (priceGroupLookup) {
            setPriceGroup(priceGroupDefault);
        }
        if (allRepsForLookupData) {
            setRep(repDefault);
        }
        if (customerLookup) {
            setCustomer(customerDefault);
        }
        if (customerGroupLookup) {
            setCustomerGroup(customerGroupDefault);
        }
        if (brandLookup) {
            setBrand(brandDefault);
        }
        if (productGroupLookup) {
            setProductGroup(productGroupDefault);
        }
    }, [parentCustomer, subGroupLookup, allMarketForLookup, priceGroupLookup, allRepsForLookup, customerLookup, customerGroupLookup, brandLookup, productGroupLookup]);

    const popUpSettings = {
        width: '150px'
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div>
                    <div>
                        <ButtonWidgetCollapse id={"sales-enquiry-invoice-enquiry-product-market-collapse"} name={"Product & Market"} classNames={"dash-collapse-button"} numSpaces={10} state={openPM} setState={setOpenPM} />
                    </div>
                    <Collapse in={openPM}>
                        <div>
                            <div>
                                <div className='dashboard-filter-header'> Parent </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-parent"} className={"dashboard-filter"} setValue={(e) => setParent(e)} value={parent} datalist={parentCustomerData} defaultValue={parentDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Sub Group </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-sub-group"} className={"dashboard-filter"} setValue={(e) => setSubGroup(e)} value={subGroup} datalist={subGroupLookupData} defaultValue={subGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Market </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-market"} className={"dashboard-filter"} setValue={(e) => setMarket(e)} value={market} datalist={allMarketForLookupData} defaultValue={marketDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Catalogue Type </div>
                                <DropDown id={"sales-enquiry-invoice-enquiry-catalogue-type"} className={"administrator-filter"} setValue={(e) => setCatalogueType(e)} value={catalogueType} defaultValue={catelogueTypeDefault} datalist={productTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                            </div>

                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> EX DC </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-product-group"} className={"dashboard-filter"} setValue={(e) => setProductGroup(e)} value={productGroup} datalist={warehouseGroupLookupData} defaultValue={productGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Duration </div>
                                <DatePickerWidget id={"sales-enquiry-invoice-enquiry-from-date"} className={"dashboard-filter"} setValue={(e) => setFromDate(e)} value={fromDate} format='dd/MM/yyyy' />
                                <DatePickerWidget id={"sales-enquiry-invoice-enquiry-to-date"} className={"dashboard-filter"} setValue={(e) => setToDate(e)} value={toDate} format='dd/MM/yyyy' />
                            </div>
                            <hr />
                        </div>
                    </Collapse>
                    <div>
                        <ButtonWidgetCollapse id={"sales-enquiry-invoice-enquiry-sales-representation-collapse"} name={"Sales & Representation"} classNames={"dash-collapse-button"} numSpaces={1} state={openSR} setState={setOpenSR} />
                    </div>
                    <Collapse in={openSR}>
                        <div>
                            <div>
                                <div className='dashboard-filter-header'> Customer Group </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-customer-group"} className={"dashboard-filter"} setValue={(e) => setCustomerGroup(e)} value={customerGroup} datalist={customerGroupLookupData} defaultValue={customerGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>

                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Price Group </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-price-group"} className={"dashboard-filter"} setValue={(e) => setPriceGroup(e)} value={priceGroup} datalist={priceGroupLookupData} defaultValue={priceGroupDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Rep </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-rep"} className={"dashboard-filter"} setValue={(e) => setRep(e)} value={rep} datalist={allRepsForLookupData} defaultValue={repDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> States </div>
                                <DropDown id={"sales-enquiry-invoice-enquiry-states"} className={"administrator-filter"} setValue={(e) => setStates(e)} value={states} defaultValue={stateDefault} datalist={stateOptions} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Brand </div>
                                <DropDown id={"sales-enquiry-invoice-enquiry-brand"} className={"administrator-filter"} setValue={(e) => setBrand(e)} value={brand} defaultValue={brandDefault} datalist={brandLookupData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                            </div>
                            <hr />
                        </div>
                    </Collapse>
                    <div>
                        <ButtonWidgetCollapse id={"sales-enquiry-invoice-enquiry-customer-transaction-collapse"} name={"Customer & Transaction"} classNames={"dash-collapse-button"} state={openCT} setState={setOpenCT} />
                    </div>
                    <Collapse in={openCT}>
                        <div className='sales-enquiry-cus-tra'>
                            <div>
                                <div className='dashboard-filter-header'> Customer </div>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-invoice-enquiry-custome"} className={"dashboard-filter"} setValue={(e) => setCustomer(e)} value={customer} datalist={customerLookupData} defaultValue={customerDefault} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Invoice Number </div>
                                <InputWidget id={"sales-enquiry-invoice-enquiry-invoice-number"} className={"administrator-filter"} setValue={(e) => { setInvoiceNumber(e) }} value={invoiceNumber} type='string' required />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Invoices & Credit Notes </div>
                                <RadioButtonWidget id='"sales-enquiry-invoice-enquiry-invoices' className="sales-enquiry-radio-check" name="chartType2" value="1" checked={radio === "1"} label={"Invoices"} setValue={(e) => setRadio(e)} />
                                <RadioButtonWidget id='"sales-enquiry-invoice-enquiry-invoices-credit-notes' className="sales-enquiry-radio-check" name="chartType2" value="2" checked={radio === "2"} label={"Inv. & Crd Notes"} setValue={(e) => setRadio(e)} />
                            </div>
                            <div className="paddingTop-12">
                                <div className='dashboard-filter-header'> Rep Types </div>
                                <RadioButtonWidget id='"sales-enquiry-customer-rep' className="sales-enquiry-radio-check" name="chartType2" value="1" checked={radioOption2 === "1"} label={"Customer Rep"} setValue={(e) => setRadioOption2(e)} />
                                <RadioButtonWidget id='"sales-enquiry-invoiced-rep' className="sales-enquiry-radio-check" name="chartType2" value="2" checked={radioOption2 === "2"} label={"Invoiced Rep"} setValue={(e) => setRadioOption2(e)} />
                            </div>
                            <hr />
                        </div>
                    </Collapse>
                    <ButtonWidget id='sales-enquiry-customer-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isFetchingInvoiceEnquiryList} isFetching={true} />
                </div>
            </form>
        </>
    );
}

export default SalesEnquiryInvoiceEnquiryFilter;
