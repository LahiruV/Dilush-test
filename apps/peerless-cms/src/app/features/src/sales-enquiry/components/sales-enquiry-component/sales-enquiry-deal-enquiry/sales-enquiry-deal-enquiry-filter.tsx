import { useDispatch, useSelector } from 'react-redux';
import { RootState, setShowForwardDeals, setDealEnquiryAsAtDate, setDealEnquiryMarketDrop, setDealEnquiryParentDrop, setDealEnquiryPriceGroupDrop, setDealEnquiryRepDrop, setDealEnquiryStatesDrop, setDealEnquirySubGroupDrop, setIsFetchingDealEnquiryList, setDealEnquirySubParentDrop, setDealCatalogueType, setTriggerDealEnquiryFiltersFormSubmit } from '@peerless-cms/store';
import { CheckBox, DatePickerWidget, DropDown, MultiColumnComboBoxWidget, FilterNonButton } from '@peerless/controls';
import { GetAllParentCustomersLookup, GetAllMarketForLookup, GetReps, GetLookup } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { GetAllMarketForLookupParameters, GetAllParentCustomersLookupParameters } from '@peerless/models';
import { FilterFormGroup, FilterForm } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features';
import { useEffect } from 'react';

export interface SalesEnquiryDealEnquiryFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

// const stateDropData = [
//     { id: 1, text: 'ACT', value: 'ACT' },
//     { id: 2, text: 'NSW', value: 'NSW' },
//     { id: 3, text: 'NT', value: 'NT' },
//     { id: 4, text: 'QLD', value: 'QLD' },
//     { id: 5, text: 'SA', value: 'SA' },
//     { id: 6, text: 'TAS', value: 'TAS' },
//     { id: 7, text: 'VIC', value: 'VIC' },
//     { id: 8, text: 'WA', value: 'WA' },
// ];

const catalogueTypeOptions = [
    { id: 0, text: 'All', value: '' },
    { id: 1, text: 'F - Refinery Products', value: 'F' },
    { id: 2, text: 'P - Purchase Contract Product', value: 'P' },
    { id: 3, text: 'R - Rendering Product', value: 'R' },
    { id: 4, text: 'X - Sundry Expenses', value: 'X' },
];

export function SalesEnquiryDealEnquiryFilter(props: SalesEnquiryDealEnquiryFilterProps) {
    const dispatch = useDispatch();
    const { isFormSubmit, dealEnquiryParentDrop, dealEnquirySubParentDrop, dealEnquirySubGroupDrop, dealEnquiryPriceGroupDrop, dealEnquiryMarketDrop, dealEnquiryRepDrop, dealEnquiryStatesDrop, dealCatalogueType, dealEnquiryAsAtDate, showForwardDeals } = useSelector((state: RootState) => state.salesEnquiryDealEnquiry);
    const { loggedUser, childOriginators } = useSelector((state: RootState) => state.header);

    const payloadParentCustomer: GetAllParentCustomersLookupParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        orderBy: 'parent_customer ASC',
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

    const { data: parentCustomer } = GetAllParentCustomersLookup(payloadParentCustomer, true)
    const { data: allRepsForLookup } = GetReps(true);
    const { data: allMarketForLookup } = GetAllMarketForLookup(payloadAllMarketForLookup, true);
    const { data: priceGroupLookup } = GetLookup('CUPG', true);
    const { data: subparent } = GetLookup('subparent', true);
    const { data: subGroupLookup } = GetLookup('subparentgroup', true);

    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'tableDescription', 'tableCode');
    const subParentLookupData = dropDownDataConverter.dropDownDataConverter(subparent || [], 'tableDescription', 'tableCode');
    const subGroupLookupData = dropDownDataConverter.dropDownDataConverter(subGroupLookup || [], 'description', 'tableCode');
    const priceGroupLookupData = dropDownDataConverter.dropDownDataConverter(priceGroupLookup || [], 'description', 'tableCode');
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'name', 'repCode');
    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');

    const catalogueTypeDefault = catalogueTypeOptions[1];

    const popUpSettings = {
        width: '208px'
    }

    const onFilterClick = () => {
        dispatch(setIsFetchingDealEnquiryList(true));
    }

    const clearFilters = () => {
        dispatch(setDealEnquiryParentDrop({ id: 0, text: '', value: '' }));
        dispatch(setDealEnquirySubParentDrop({ id: 0, text: '', value: '' }));
        dispatch(setDealEnquirySubGroupDrop({ id: 0, text: '', value: '' }));
        dispatch(setDealEnquiryPriceGroupDrop({ id: 0, text: '', value: '' }));
        dispatch(setDealEnquiryMarketDrop({ id: 0, text: '', value: '' }));
        dispatch(setDealEnquiryRepDrop({ id: 0, text: '', value: '' }));
        // dispatch(setDealEnquiryStatesDrop({ id: 0, text: '', value: '' }));
        dispatch(setDealCatalogueType(catalogueTypeDefault));
        dispatch(setDealEnquiryAsAtDate(new Date().toISOString()));
        dispatch(setShowForwardDeals(true));
    }

    useEffect(() => {
        clearFilters();
    }, [])

    useEffect(() => {
        dispatch(setDealEnquiryAsAtDate(new Date().toISOString()));
    }, [dispatch])

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerDealEnquiryFiltersFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Parent'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-deal-parent-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquiryParentDrop(e))} value={dealEnquiryParentDrop} datalist={parentCustomerData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sub Parent'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-deal-sub-parent-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquirySubParentDrop(e))} value={dealEnquirySubParentDrop} datalist={subParentLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Sub Parent Group'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-deal-sub-group-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquirySubGroupDrop(e))} value={dealEnquirySubGroupDrop} datalist={subGroupLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Market'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-deal-market-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquiryMarketDrop(e))} value={dealEnquiryMarketDrop} datalist={allMarketForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Price Group'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-deal-price-group-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquiryPriceGroupDrop(e))} value={dealEnquiryPriceGroupDrop} datalist={priceGroupLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='Catalogue Type'>
                                <DropDown id={"sales-enquiry-deal-catalogue-type"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealCatalogueType(e))} value={dealCatalogueType} defaultValue={catalogueTypeDefault} datalist={catalogueTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                            {/* <FilterFormGroup label='States'>
                                <DropDown id={"sales-enquiry-deal-states-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquiryStatesDrop(e))} value={dealEnquiryStatesDrop} datalist={stateDropData} textField={"text"} dataItemKey={"value"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup> */}
                        </div>

                        <div>
                            <FilterFormGroup label='Rep'>
                                <MultiColumnComboBoxWidget id={"sales-enquiry-deal-rep-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setDealEnquiryRepDrop(e))} value={dealEnquiryRepDrop} datalist={allRepsForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                            <FilterFormGroup label='As at Date'>
                                <DatePickerWidget id={"sales-enquiry-deal-as-at-date"} className={"dashboard-filter filter-form-filter"} format={"dd/MM/yyyy"} setValue={(e) => dispatch(setDealEnquiryAsAtDate(e))} value={dealEnquiryAsAtDate} />
                            </FilterFormGroup>
                            <FilterFormGroup>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <CheckBox id={"show-forward-deals"} className={"filter-form-group-check"} setValue={(e) => dispatch(setShowForwardDeals(e))} value={showForwardDeals} label='' />
                                    <div className='filter-header' style={{ marginLeft: '5.5px', width: 'max-content' }}>Show Forward Deals</div>
                                </div>
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default SalesEnquiryDealEnquiryFilter;
