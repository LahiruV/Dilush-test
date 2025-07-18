import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCustomerPriceListAsAtDate, setCustomerPriceListCustomerCode, setCustomerPriceListEffectiveDate, setCustomerPriceListMainDrop, setCustomerPriceListRepGroup, setIsFetchingCustomerPriceList } from '@peerless-cms/store';
import { GetAllRepsForLookup, GetCustomerEffectiveDates, GetCustomerLookup, GetReps } from '@peerless/queries';
import { ButtonWidget, DatePickerWidget, DropDown, MultiColumnComboBoxWidget, ValidationModal } from '@peerless/controls';
import { dropDownDataConverter } from '@peerless/common';
import { useEffect, useState } from 'react';
import { DropDownData, GetAllRepsForLookupParameters, GetCustomerEffectiveDatesParameters, GetCustomerLookupParameters } from '@peerless/models';
import { ClearFilterBox } from '@peerless-cms/features-common-components';

export interface SalesEnquiryCustomerPriceListFilterProps { }

const repDropData = [
    { id: 1, text: 'Rep', value: '1' },
    { id: 2, text: 'Parent', value: '2' },
    { id: 3, text: 'Price Group', value: '3' },
    { id: 4, text: 'Sub Parent', value: '4' },
]

export function SalesEnquiryCustomerPriceListFilter(props: SalesEnquiryCustomerPriceListFilterProps) {
    const dispatch = useDispatch();
    const { isFetchingCustomerPriceList } = useSelector((state: RootState) => state.salesEnquiryCustomerPriceList);
    const { originatorInList, selectedOriginator, childOriginators, loggedUser } = useSelector((state: RootState) => state.header);
    const [mainDrop, setMainDrop] = useState(repDropData[0] as DropDownData);
    const [repGroup, setRepGroup] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [customerCode, setCustomerCode] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [effectiveDate, setEffectiveDate] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [asAtDate, setAsAtDate] = useState(new Date().toISOString());
    const [endDate, setEndDate] = useState('')
    const [visible, setVisible] = useState(false);

    const payloadCustomerLookup: GetCustomerLookupParameters = {
        additionalParams: " c.rep_code='SH' OR bakery_rep_code='SH'",
        childOriginators: `(created_by = '${selectedOriginator.userName}')`,
        defaultDepartmentId: selectedOriginator.defaultDepartmentId,
        leadStage: 'C',
        orderBy: 'name ASC',
        originator: selectedOriginator.userName,
        startIndex: 1,
        rowCount: 1000
    }
    const payloadCustomerEffectiveDates: GetCustomerEffectiveDatesParameters = {
        customerCode: customerCode?.value || '',
    }

    const { data: allRepsForLookup } = GetReps(true);
    const { data: customerLookup } = GetCustomerLookup(payloadCustomerLookup, true);
    const { data: customerEffectiveDates } = GetCustomerEffectiveDates(payloadCustomerEffectiveDates, true);
    const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'name', 'repCode');
    const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
    const customerEffectiveDatesData = dropDownDataConverter.dropDownDataConverter(customerEffectiveDates?.customerEffectiveDates || [], 'effectiveDate', 'effectiveDate', undefined, undefined, ['endDate', 'customerCode']);

    const selectedcustomerEffectiveDatesData = {
        id: 0,
        text: customerEffectiveDates?.selectedDate?.effectiveDate ?? '',
        value: customerEffectiveDates?.selectedDate?.effectiveDate ?? '',
        endDate: customerEffectiveDates?.selectedDate?.endDate ?? '',
        customerCode: customerEffectiveDates?.selectedDate?.customerCode ?? ''
    }

    useEffect(() => {
        // Only update if customerCode has actually changed and data is available
        if (!customerCode?.value) {
            setEffectiveDate({ id: 0, text: '', value: '' });
            setEndDate('');
            return;
        }

        if (customerEffectiveDates?.selectedDate) {
            if (!customerEffectiveDates.isAllEffectiveDate) {
                setEffectiveDate(selectedcustomerEffectiveDatesData);
                setEndDate(customerEffectiveDates.selectedDate.endDate ?? '');
            } else {
                setEffectiveDate({ id: 0, text: '', value: '' });
                setEndDate('');
            }
        }
    }, [customerCode, customerEffectiveDates]); // Add customerEffectiveDates to dependencies

    useEffect(() => {
        if (allRepsForLookupData) {
            setRepGroup(filterRepCode || allRepsForLookupData[0]);
        }
    }, [allRepsForLookup, customerLookup, dispatch]);

    const popUpSettings = {
        width: '150px'
    }

    const filterRepCode = () => {
        const repsFilter = allRepsForLookupData.filter((rep: any) => rep.value === loggedUser.repCode);
        return repsFilter[0];
    }
    const onFilterClick = () => {
        if (!customerCode || customerCode.value === '') {
            setVisible(true);
            return;
        }
        dispatch(setCustomerPriceListMainDrop(mainDrop));
        dispatch(setCustomerPriceListRepGroup(repGroup));
        dispatch(setCustomerPriceListCustomerCode(customerCode));
        dispatch(setCustomerPriceListEffectiveDate(effectiveDate));
        dispatch(setCustomerPriceListAsAtDate(asAtDate));
        dispatch(setIsFetchingCustomerPriceList(true));
    }

    const clearFilters = () => {
        setMainDrop(repDropData[0]);
        setRepGroup(filterRepCode || allRepsForLookupData[0]);
        setCustomerCode(customerLookupData[0]);
        setEffectiveDate(customerEffectiveDatesData[0]);
        setAsAtDate(new Date().toISOString());
    }

    const mainDefault = repDropData[0];
    const repDefault = filterRepCode || allRepsForLookupData[0];
    // const customerDefault = customerLookupData[0];
    // const effectiveDefault = customerEffectiveDatesData[0];


    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div>
                    <DropDown id={"sales-enquiry-customer-main-drop"}
                        defaultValue={mainDefault}
                        className={"administrator-filter"}
                        setValue={(e) => (setMainDrop(e))}
                        value={mainDrop}
                        datalist={repDropData}
                        textField={"text"}
                        dataItemKey={"value"}
                        fillMode={"outline"}
                        size={"small"}
                        popupSettings={popUpSettings} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Rep Group </div>
                    <MultiColumnComboBoxWidget
                        id={"sales-enquiry-customer-rep-group"}
                        className={"administrator-filter"}
                        setValue={(e) => setRepGroup(e)}
                        defaultValue={repDefault}
                        value={repGroup}
                        datalist={allRepsForLookupData}
                        isFilterable={true}
                        textField={"value"}
                        valueField={"text"}
                        columns={[{ field: 'value', header: 'Rep Code', width: '90px' }, { field: 'text', header: 'Name', width: '300px' }]}
                    />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Customer Code </div>
                    <MultiColumnComboBoxWidget
                        id={"sales-enquiry-customer-customer-code"}
                        className={"administrator-filter"}
                        setValue={(e) => setCustomerCode(e)}
                        value={customerCode}
                        datalist={customerLookupData}
                        isFilterable={true}
                        textField={"value"}
                        valueField={"text"}
                        columns={[{ field: 'value', header: 'Rep Code', width: '90px' }, { field: 'text', header: 'Name', width: '300px' }]}
                    />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> Effective Date </div>
                    <MultiColumnComboBoxWidget
                        id={"sales-enquiry-customer-effective-date"}
                        className={"administrator-filter"}
                        setValue={(e) => (setEffectiveDate(e))}
                        value={effectiveDate}
                        datalist={customerEffectiveDatesData}
                        isFilterable={true}
                        textField={"value"}
                        valueField={"text"}
                        columns={[{ field: 'value', header: 'Effective Date', width: '200px' }, { field: 'customerCode', header: 'Customer Code', width: '200px' }]}
                    />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> As at Date </div>
                    <DatePickerWidget
                        id={"sales-enquiry-customer-as-at-date"}
                        className={"dashboard-filter"}
                        format={"dd/MM/yyyy"}
                        setValue={(e) => (setAsAtDate(e))}
                        value={asAtDate} />
                </div>
                <div className="paddingTop-12">
                    <div className='dashboard-filter-header'> End Date </div>
                    <DatePickerWidget
                        id={"sales-enquiry-customer-as-at-date"}
                        className={"dashboard-filter"}
                        format={"dd/MM/yyyy"}
                        setValue={(e) => (setEndDate(e))}
                        value={endDate}
                        isDisabled />
                </div>

                <ButtonWidget id='sales-enquiry-customer-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isFetchingCustomerPriceList} isFetching={true} />
                {/* <ButtonWidget id='sales-enquiry-customer-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={() => { }} isDisabled={false} isExporting={true} /> */}
            </form>
            <div>
                {visible && (
                    <ValidationModal title={'Please Confirm'} message={'Customer Code Required'} setState={setVisible} />
                )}
            </div>
        </>
    );
}

export default SalesEnquiryCustomerPriceListFilter;
