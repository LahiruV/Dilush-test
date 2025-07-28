import { RootState, setAsAtDate, setCusPriceEffectiveDate, setLoadData, setIsFetchingLeadCustomerPriceList, setCusPriceRepGroup } from "@peerless-cms/store";
import { dropDownDataConverter, getDate, getDateTime } from "@peerless/common";
import { FormInput, MultiColumnComboBoxWidget } from "@peerless/controls";
import { DropDownData, GetCustomerEffectiveDatesParameters, } from "@peerless/models";
import { GetCustomerEffectiveDates, GetReps, } from "@peerless/queries";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface CustomerPriceFiltersProps { }

export function CustomerPriceFiltersOld(props: CustomerPriceFiltersProps) {
    const [selectedAsAtDate, setSelectedAsAtDate] = useState(getDate());
    const [repGroup, setRepGroup] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [effectiveDate, setEffectiveDate] = useState({ id: 0, text: '', value: '' } as DropDownData);

    const dispatch = useDispatch();

    const { selectedLeedOrCustomer, loggedUser } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        loggedUser: state.header.loggedUser,
    }));
    const handleDateChange = (event: any) => {
        setSelectedAsAtDate(event.target.value);
    };

    const payloadCustomerEffectiveDates: GetCustomerEffectiveDatesParameters = {
        customerCode: selectedLeedOrCustomer.customerCode || '',
    }

    const { data: allRepsForLookup } = GetReps(true);
    const { data: customerEffectiveDates } = GetCustomerEffectiveDates(payloadCustomerEffectiveDates, true);
    const allRepsForLookupData: DropDownData[] = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'name', 'repCode')
    const customerEffectiveDatesData: DropDownData[] = dropDownDataConverter.dropDownDataConverter(customerEffectiveDates?.customerEffectiveDates || [], 'effectiveDate', 'effectiveDate', undefined, undefined, ['endDate', 'customerCode']);

    const filterRepCode = () => {
        const repsFilter = allRepsForLookupData.filter((rep: any) => rep.value === loggedUser.repCode);
        return repsFilter[0];
    }

    const repDefault = filterRepCode() || allRepsForLookupData[0];

    useEffect(() => {
        if (allRepsForLookup) {
            setRepGroup(repDefault)
        }

        if (customerEffectiveDates?.selectedDate) {
            if (!customerEffectiveDates.isAllEffectiveDate) {
                setEffectiveDate(prev => ({
                    ...prev,
                    text: customerEffectiveDates?.selectedDate?.effectiveDate ?? '',
                    value: customerEffectiveDates?.selectedDate?.effectiveDate ?? '',
                    endDate: customerEffectiveDates?.selectedDate?.endDate ?? '',
                    customerCode: customerEffectiveDates?.selectedDate?.customerCode ?? ''
                }));
            } else {
                setEffectiveDate({ id: 0, text: '', value: '' });
            }
        }
    }, [allRepsForLookup, customerEffectiveDates]);

    const initialRender = useRef(true);

    useEffect(() => {
        if (initialRender.current) {
            if (allRepsForLookup && customerEffectiveDates?.selectedDate && effectiveDate.value) {
                onFilterClick();

                initialRender.current = false;
            }
        }

    }, [allRepsForLookup, customerEffectiveDates, effectiveDate]);

    const onFilterClick = () => {
        dispatch(setIsFetchingLeadCustomerPriceList(true));
        dispatch(setLoadData(true));
        dispatch(setAsAtDate(new Date(selectedAsAtDate).toISOString()));
        dispatch(setCusPriceRepGroup(repGroup));
        dispatch(setCusPriceEffectiveDate(effectiveDate));
    }

    return (
        <div className="common-filter-container">
            <span className="filter-title">Filters</span>
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div>
                    <div className='common-filter-header'> As at Date </div>
                    <input type="date" className="input-controller" value={selectedAsAtDate} onChange={handleDateChange} />
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
                        columns={[{ field: 'value', header: 'Rep Code', width: '90px' }, { field: 'text', header: 'Name', width: '200px' }]}
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
                        columns={[{ field: 'value', header: 'Effective Date', width: '200px' }, { field: 'customerCode', header: 'Customer Code', width: '100px' }]}
                    />
                </div>

                <button
                    id="activity-filter-button"
                    className="k-button-md k-rounded-md k-button-solid k-button-solid-tertiary dash-filter-button dash-filter-btn"
                    type="submit"
                >
                    Filter
                </button>

                {/* <a href='javascript:void(0)' className='clear-filters-link' onClick={clearFilters}>Clear all filters</a> */}
            </ form >
        </ div >
    );


}