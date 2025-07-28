import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { FilterForm, FilterFormGroup } from "@peerless-cms/features-common-components";
import { RootState, setAsAtDate, setCusPriceEffectiveDate, setLoadData, setIsFetchingLeadCustomerPriceList, setCusPriceRepGroup, setTriggerCustomerPriceFiltersFormSubmit } from "@peerless-cms/store";
import { dropDownDataConverter, getDate, getDateTime } from "@peerless/common";
import { DropDown, FilterNonButton, FormInput, MultiColumnComboBoxWidget } from "@peerless/controls";
import { DropDownData, GetCustomerEffectiveDatesParameters, } from "@peerless/models";
import { GetCustomerEffectiveDates, GetReps, } from "@peerless/queries";
import { useFilterForm } from '@peerless-cms/features'

export interface CustomerPriceFiltersProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function CustomerPriceFilters(props: CustomerPriceFiltersProps) {
    const [selectedAsAtDate, setSelectedAsAtDate] = useState(getDate());
    const [repGroup, setRepGroup] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [effectiveDate, setEffectiveDate] = useState({ id: 0, text: '', value: '' } as DropDownData);

    const dispatch = useDispatch();

    const { selectedLeedOrCustomer, loggedUser, isCustomerPriceFiltersFormSubmit } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        loggedUser: state.header.loggedUser,
        isCustomerPriceFiltersFormSubmit: state.customerPageFilters.isCustomerPriceFiltersFormSubmit,
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
    const effectiveDateDefault = customerEffectiveDatesData[0] || { id: 0, text: '', value: '' };

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

    const popUpSettings = {
        width: '208px'
    }

    const clearFilters = () => {
        setSelectedAsAtDate(getDate());
        setRepGroup(repDefault);
        setEffectiveDate(effectiveDateDefault);
    }

    const onFilterClick = () => {
        dispatch(setIsFetchingLeadCustomerPriceList(true));
        dispatch(setLoadData(true));
        dispatch(setAsAtDate(new Date(selectedAsAtDate).toISOString()));
        dispatch(setCusPriceRepGroup(repGroup));
        dispatch(setCusPriceEffectiveDate(effectiveDate));
    }

    const { formComponentRef } = useFilterForm({
        isFormSubmit: isCustomerPriceFiltersFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerCustomerPriceFiltersFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters
    })

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id="filter-form" onSubmit={onFilterClick} ref={formComponentRef} >
                        <div>
                            <FilterFormGroup label="As at Date">
                                <input type="date" className="input-controller filter-form-filter" value={selectedAsAtDate} onChange={handleDateChange} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label="Rep Group">
                                <MultiColumnComboBoxWidget
                                    id={"sales-enquiry-customer-rep-group"}
                                    className={"administrator-filter filter-form-filter"}
                                    setValue={(e) => setRepGroup(e)}
                                    defaultValue={repDefault}
                                    value={repGroup}
                                    datalist={allRepsForLookupData}
                                    isFilterable={true}
                                    textField={"value"}
                                    valueField={"text"}
                                    columns={[{ field: 'value', header: 'Rep Code', width: '90px' }, { field: 'text', header: 'Name', width: '200px' }]}
                                    popupSettings={popUpSettings}
                                />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label="Effective Date">
                                <DropDown
                                    id={"sales-enquiry-customer-effective-date"}
                                    className={"administrator-filter filter-form-filter"}
                                    setValue={(e) => (setEffectiveDate(e))}
                                    value={effectiveDate}
                                    datalist={customerEffectiveDatesData}
                                    isFilterable={true}
                                    textField={"value"}
                                    popupSettings={popUpSettings}
                                />
                            </FilterFormGroup>
                        </div>

                        <FilterNonButton type="submit" />
                    </FilterForm>
                </ div >
            </Collapse >
        </>
    );
}