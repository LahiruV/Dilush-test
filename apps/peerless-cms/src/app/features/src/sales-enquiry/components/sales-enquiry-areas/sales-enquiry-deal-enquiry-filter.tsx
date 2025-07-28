import { useDispatch, useSelector } from 'react-redux';
import { RootState, setShowForwardDeals, setDealEnquiryAsAtDate, setDealEnquiryMarketDrop, setDealEnquiryParentDrop, setDealEnquiryPriceGroupDrop, setDealEnquiryRepDrop, setDealEnquiryStatesDrop, setDealEnquirySubGroupDrop, setIsFetchingDealEnquiryList, setDealEnquirySubParentDrop } from '@peerless-cms/store';
import { ButtonWidget, ButtonWidgetCollapse, CheckBox, DatePickerWidget, DropDown, MultiColumnComboBoxWidget } from '@peerless/controls';
import { useEffect, useState } from 'react';
import { GetAllRepsForLookup, GetGeneralLookupEntries, GetAllParentCustomersLookup, GetAllMarketForLookup, GetReps, GetLookup } from '@peerless/queries';
import { dropDownDataConverter } from '@peerless/common';
import { DropDownData, GetAllMarketForLookupParameters, GetAllParentCustomersLookupParameters, GetAllRepsForLookupParameters, GetGeneralLookupEntriesParameters } from '@peerless/models';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

export interface SalesEnquiryDealEnquiryFilterProps { }

const stateDropData = [
    { id: 1, text: 'ACT', value: 'ACT' },
    { id: 2, text: 'NSW', value: 'NSW' },
    { id: 3, text: 'NT', value: 'NT' },
    { id: 4, text: 'QLD', value: 'QLD' },
    { id: 5, text: 'SA', value: 'SA' },
    { id: 6, text: 'TAS', value: 'TAS' },
    { id: 7, text: 'VIC', value: 'VIC' },
    { id: 8, text: 'WA', value: 'WA' },
];

export function SalesEnquiryDealEnquiryFilter(props: SalesEnquiryDealEnquiryFilterProps) {
    const dispatch = useDispatch();
    const { isFetchingDealEnquiryList } = useSelector((state: RootState) => state.salesEnquiryDealEnquiry);
    const { loggedUser, childOriginators, originatorInList } = useSelector((state: RootState) => state.header);
    const [parentDrop, setParentDrop] = useState<DropDownData>();
    const [subParentDrop, setSubParentDrop] = useState<DropDownData>();
    const [subGroupDrop, setSubGroupDrop] = useState<DropDownData>();
    const [priceGroupDrop, setPriceGroupDrop] = useState<DropDownData>();
    const [marketDrop, setMarketDrop] = useState<DropDownData>();
    const [repDrop, setRepDrop] = useState<DropDownData>();
    const [statesDrop, setStatesDrop] = useState<DropDownData>({ id: 0, text: '', value: '' });
    const [asAtDate, setAsAtDate] = useState(new Date().toISOString());
    const [showForwardDeal, setShowForwardDeal] = useState(true);
    const [openSubGroup, setSubGroup] = useState(false);

    const payloadParentCustomer: GetAllParentCustomersLookupParameters = {
        originator: loggedUser.userName,
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        startIndex: 1,
        rowCount: 1000,
        orderBy: 'parent_customer ASC',
    }

    // const payloadSubGroupLookup: GetGeneralLookupEntriesParameters = {
    //     originator: loggedUser.userName,
    //     childOriginators: childOriginators,
    //     defaultDepartmentId: loggedUser.defaultDepartmentId,
    //     startIndex: 1,
    //     rowCount: 1000,
    //     sTableID: 'CUSG'
    // }

    // const payloadPriceGroupLookup: GetGeneralLookupEntriesParameters = {
    //     originator: loggedUser.userName,
    //     childOriginators: childOriginators,
    //     defaultDepartmentId: loggedUser.defaultDepartmentId,
    //     startIndex: 1,
    //     rowCount: 1000,
    //     sTableID: 'CUPG'
    // }

    // const payloadAllRepsForLookup: GetAllRepsForLookupParameters = {
    //     orderby: 'rep_code asc',
    //     startIndex: 1,
    //     rowCount: 1000,
    //     additionalParams: originatorInList,
    // }

    const payloadAllMarketForLookup: GetAllMarketForLookupParameters = {
        originator: loggedUser.userName,
        catalogType: "",
        childOriginators: childOriginators,
        defaultDepartmentId: loggedUser.defaultDepartmentId,
        additionalParams: "group_type = 'MA'",
        orderBy: 'cat_grouping ASC',
        startIndex: 1,
        rowCount: 1000,
    }

    const { data: parentCustomer } = GetAllParentCustomersLookup(payloadParentCustomer, true)
    // const { data: subGroupLookup } = GetGeneralLookupEntries(payloadSubGroupLookup, true)
    // const { data: priceGroupLookup } = GetGeneralLookupEntries(payloadPriceGroupLookup, true)
    const { data: allRepsForLookup } = GetReps(true);
    const { data: allMarketForLookup } = GetAllMarketForLookup(payloadAllMarketForLookup, true);
    const { data: priceGroupLookup } = GetLookup('CUPG', true);
    const { data: subparent } = GetLookup('subparent', true);
    const { data: subGroupLookup } = GetLookup('CSPG', true);

    const parentCustomerData = dropDownDataConverter.dropDownDataConverter(parentCustomer || [], 'tableDescription', 'tableCode');
    const subParentLookupData = dropDownDataConverter.dropDownDataConverter(subparent || [], 'tableCode', 'tableCode');
    const subGroupLookupData = dropDownDataConverter.dropDownDataConverter(subGroupLookup || [], 'description', 'tableCode');
    const priceGroupLookupData = dropDownDataConverter.dropDownDataConverter(priceGroupLookup || [], 'description', 'tableCode');
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'name', 'repCode');
    const allMarketForLookupData = dropDownDataConverter.dropDownDataConverter(allMarketForLookup || [], 'tableDescription', 'tableCode');
    const popUpSettings = {
        width: '150px'
    }

    const onFilterClick = () => {
        dispatch(setDealEnquiryParentDrop(parentDrop));
        dispatch(setDealEnquirySubParentDrop(subParentDrop));
        dispatch(setDealEnquirySubGroupDrop(subGroupDrop));
        dispatch(setDealEnquiryPriceGroupDrop(priceGroupDrop));
        dispatch(setDealEnquiryMarketDrop(marketDrop));
        dispatch(setDealEnquiryRepDrop(repDrop));
        dispatch(setDealEnquiryStatesDrop(statesDrop));
        dispatch(setDealEnquiryAsAtDate(asAtDate));
        dispatch(setShowForwardDeals(showForwardDeal));
        dispatch(setIsFetchingDealEnquiryList(true));
    }

    const clearFilters = () => {
        setParentDrop({ id: 0, text: '', value: '' });
        setSubGroupDrop({ id: 0, text: '', value: '' });
        setPriceGroupDrop({ id: 0, text: '', value: '' });
        setMarketDrop({ id: 0, text: '', value: '' });
        setRepDrop({ id: 0, text: '', value: '' });
        setStatesDrop({ id: 0, text: '', value: '' });
        setAsAtDate(new Date().toISOString());
        setShowForwardDeal(false);
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div className=''>
                    <ButtonWidgetCollapse id={"dash-collapse-sub-parent"} name={"Sub Parent"} classNames={"dash-collapse-button"} numSpaces={20} state={openSubGroup} setState={setSubGroup} />
                </div>
                <Collapse in={openSubGroup}>
                    <div>
                        <div className="">
                            <div className='dashboard-filter-header'> Sub Parent </div>
                            <MultiColumnComboBoxWidget id={"sales-enquiry-deal-sub-parent-drop"} className={"administrator-filter"} setValue={(e) => setSubParentDrop(e)} value={subParentDrop} datalist={subParentLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                        </div>
                        <div className="paddingTop-12 paddingBottom-12">
                            <div className='dashboard-filter-header'> Sub Parent Group </div>
                            <MultiColumnComboBoxWidget id={"sales-enquiry-deal-sub-group-drop"} className={"administrator-filter"} setValue={(e) => setSubGroupDrop(e)} value={subGroupDrop} datalist={subGroupLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                        </div>
                    </div>
                </Collapse>
                <div>
                    <div className='dashboard-filter-header'> Parent </div>
                    {/* <DropDown id={"sales-enquiry-deal-parent-drop"} defaultValue={parentDefault} className={"administrator-filter"} setValue={(e) => setParentDrop(e)} value={parentDrop} datalist={modifiedParentCustomerData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} /> */}
                    <MultiColumnComboBoxWidget id={"sales-enquiry-deal-parent-drop"} className={"administrator-filter"} setValue={(e) => setParentDrop(e)} value={parentDrop} datalist={parentCustomerData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Price Group </div>
                    <MultiColumnComboBoxWidget id={"sales-enquiry-deal-price-group-drop"} className={"administrator-filter"} setValue={(e) => setPriceGroupDrop(e)} value={priceGroupDrop} datalist={priceGroupLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Market </div>
                    <MultiColumnComboBoxWidget id={"sales-enquiry-deal-price-group-drop"} className={"administrator-filter"} setValue={(e) => setMarketDrop(e)} value={marketDrop} datalist={allMarketForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '150px' }, { field: 'text', header: 'Description', width: '300px' }]} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Rep </div>
                    <MultiColumnComboBoxWidget id={"sales-enquiry-deal-rep-drop"} className={"administrator-filter"} setValue={(e) => setRepDrop(e)} value={repDrop} datalist={allRepsForLookupData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> States </div>
                    <DropDown id={"sales-enquiry-deal-states-drop"} className={"administrator-filter"} setValue={(e) => setStatesDrop(e)} value={statesDrop} datalist={stateDropData} textField={"text"} dataItemKey={"value"} size={"small"} popupSettings={popUpSettings} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> As at Date </div>
                    <DatePickerWidget id={"sales-enquiry-deal-as-at-date"} className={"dashboard-filter"} format={"dd/MM/yyyy"} setValue={(e) => setAsAtDate(e)} value={asAtDate} />
                </div>
                <div className="paddingTop-12">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <CheckBox id={"show-forward-deals"} className={"sales-enquiry-deal-check"} setValue={(e) => setShowForwardDeal(e)} value={showForwardDeal} label='' />
                        <div className='sales-enquiry-deal-check-header'>Show Forward Deals</div>
                    </div>
                </div>

                <ButtonWidget id='call-cycle-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isFetchingDealEnquiryList} isFetching={true} />
                {/* <ButtonWidget id='call-cycle-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={() => { }} isDisabled={false} isExporting={true} /> */}
            </form>
        </>
    );
}

export default SalesEnquiryDealEnquiryFilter;
