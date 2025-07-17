import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse } from 'react-bootstrap';
import { RootState, setCustomerPriceListAsAtDate, setCustomerPriceListCustomerCode, setCustomerPriceListEffectiveDate, setCustomerPriceListEndDate, setCustomerPriceListMainDrop, setCustomerPriceListMainDropType, setIsFetchingCustomerPriceList, setTriggerCustomerPriceListFiltersFormSubmit } from '@peerless-cms/store';
import { GetCustomerEffectiveDates, GetCustomerLookup, GetReps, GetCustomerPricelistType, GetCustomerPricelistCustomers } from '@peerless/queries';
import { DatePickerWidget, DropDown, FilterNonButton, MultiColumnComboBoxWidget, ValidationModal } from '@peerless/controls';
import { dropDownDataConverter, getDate } from '@peerless/common';
import { GetCustomerEffectiveDatesParameters, GetCustomerLookupParameters } from '@peerless/models';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { useFilterForm } from '@peerless-cms/features'


export interface SalesEnquiryCustomerPriceListFilterProps {
  isFiltersOpen?: boolean;
  isClearFilters?: boolean;
  setIsActiveFilters?: (isActive: boolean) => void;
}

const repDropData = [
  { id: 1, text: 'Rep', value: 'Rep Code' },
  { id: 2, text: 'Parent', value: 'Parent' },
  { id: 3, text: 'Price Group', value: 'Price Group' },
  { id: 4, text: 'Sub Parent', value: 'Sub Parent' },
  { id: 5, text: 'Sub Parent Group', value: 'Sub Parent Group' },
]

export function SalesEnquiryCustomerPriceListFilter(props: SalesEnquiryCustomerPriceListFilterProps) {
  const dispatch = useDispatch();
  const { isFormSubmit, customerPriceListMainDrop, customerPriceListMainDropType, customerPriceListCustomerCode, customerPriceListEffectiveDate, customerPriceListAsAtDate, customerPriceListEndDate } = useSelector((state: RootState) => state.salesEnquiryCustomerPriceList);
  const { selectedOriginator, loggedUser } = useSelector((state: RootState) => state.header);
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
    customerCode: customerPriceListCustomerCode?.value || '',
  }

  // const { data: allRepsForLookup } = GetReps(true);
  // const { data: customerLookup } = GetCustomerLookup(payloadCustomerLookup, true);
  const { data: customerEffectiveDates } = GetCustomerEffectiveDates(payloadCustomerEffectiveDates);
  const { data: customerPricelistType } = GetCustomerPricelistType(customerPriceListMainDrop?.value);
  const { data: customerPricelistCustomers } = GetCustomerPricelistCustomers({ type: customerPriceListMainDrop?.value, code: customerPriceListMainDropType?.value });

  // const allRepsForLookupData = dropDownDataConverter.dropDownDataConverter(allRepsForLookup || [], 'name', 'repCode');
  const pricelistTypeData = dropDownDataConverter.dropDownDataConverter(customerPricelistType || [], 'description', 'tableCode');
  // const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerLookup || [], 'tableDescription', 'tableCode');
  const customerLookupData = dropDownDataConverter.dropDownDataConverter(customerPricelistCustomers || [], 'name', 'custCode');

  const customerEffectiveDatesMapped = customerEffectiveDates?.customerEffectiveDates.map((date: any) => ({ ...date, formattedDate: getDate(date.effectiveDate) })) || [];
  const customerEffectiveDatesData = dropDownDataConverter.dropDownDataConverter(customerEffectiveDatesMapped, 'formattedDate', 'effectiveDate', undefined, undefined, ['endDate', 'customerCode', 'formattedDate']);

  const selectedcustomerEffectiveDatesData = {
    id: 0,
    text: customerEffectiveDates?.selectedDate?.effectiveDate ?? '',
    value: customerEffectiveDates?.selectedDate?.effectiveDate ?? '',
    endDate: customerEffectiveDates?.selectedDate?.endDate ?? '',
    customerCode: customerEffectiveDates?.selectedDate?.customerCode ?? '',
    formattedDate: getDate(new Date(customerEffectiveDates?.selectedDate?.effectiveDate || '')) ?? ''
  }

  useEffect(() => {
    // Only update if customerCode has actually changed and data is available
    if (!customerPriceListCustomerCode?.value) {
      dispatch(setCustomerPriceListEffectiveDate({ id: 0, text: '', value: '' }));
      dispatch(setCustomerPriceListEndDate(''));
      return;
    }
    if (customerEffectiveDates?.selectedDate) {
      if (!customerEffectiveDates.isAllEffectiveDate) {
        dispatch(setCustomerPriceListEffectiveDate(selectedcustomerEffectiveDatesData));
        dispatch(setCustomerPriceListEndDate(customerEffectiveDates.selectedDate.endDate ?? ''));
      } else {
        dispatch(setCustomerPriceListEffectiveDate({ id: 0, text: '', value: '' }));
        dispatch(setCustomerPriceListEndDate(''));
      }
    }
    else {
      dispatch(setCustomerPriceListEffectiveDate({ id: 0, text: '', value: '' }));
      dispatch(setCustomerPriceListEndDate(''));
    }
  }, [customerPriceListCustomerCode, customerEffectiveDates]); // Add customerEffectiveDates to dependencies

  // useEffect(() => {
  //   // if (allRepsForLookupData) {
  //   //   dispatch(setCustomerPriceListRepGroup(allRepsForLookupData.filter((rep: any) => rep.value === loggedUser.repCode)[0] || allRepsForLookupData[0]));
  //   // }
  //   dispatch(setCustomerPriceListAsAtDate(new Date().toISOString()));
  // }, [customerLookup, dispatch]);

  const popUpSettings = {
    width: '208px'
  }

  const onFilterClick = () => {
    if (!customerPriceListCustomerCode || customerPriceListCustomerCode.value === '' || customerPriceListEffectiveDate.value === '') {
      setVisible(true);
      return;
    }
    dispatch(setIsFetchingCustomerPriceList(true));
  }

  const clearFilters = () => {
    dispatch(setCustomerPriceListMainDrop(repDropData[0]));
    // dispatch(setCustomerPriceListRepGroup(allRepsForLookupData.filter((rep: any) => rep.value === loggedUser.repCode)[0] || allRepsForLookupData[0]));
    dispatch(setCustomerPriceListMainDropType({ id: 0, text: '', value: '' }));
    dispatch(setCustomerPriceListCustomerCode({ id: 0, text: '', value: '' }));
    dispatch(setCustomerPriceListEffectiveDate(customerEffectiveDatesData[0]));
    dispatch(setCustomerPriceListAsAtDate(new Date().toISOString()));
  }

  // const mainDefault = repDropData[0];
  // const repDefault = allRepsForLookupData.filter((rep: any) => rep.value === loggedUser.repCode)[0] || allRepsForLookupData[0] || allRepsForLookupData[0];

  const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerCustomerPriceListFiltersFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

  useEffect(() => {
    dispatch(setCustomerPriceListMainDrop(repDropData[0]));
    dispatch(setCustomerPriceListAsAtDate(new Date().toISOString()));
  }, []);

  useEffect(() => {
    dispatch(setCustomerPriceListMainDropType({ id: 0, text: '', value: '' }))
    dispatch(setCustomerPriceListCustomerCode({ id: 0, text: '', value: '' }));
    dispatch(setCustomerPriceListEffectiveDate({ id: 0, text: '', value: '' }));
  }, [customerPricelistType])

  return (
    <>
      <Collapse in={props.isFiltersOpen}>
        <div className="sales-enquiry-cus-tra filters-container">
          <FilterForm onSubmit={onFilterClick} ref={formComponentRef}>
            <div>
              <FilterFormGroup label='Type'>
                <DropDown id={"sales-enquiry-customer-main-drop"}
                  // defaultValue={mainDefault}
                  className={"administrator-filter filter-form-filter"}
                  setValue={(e) => (dispatch(setCustomerPriceListMainDrop(e)))}
                  value={customerPriceListMainDrop}
                  datalist={repDropData}
                  isFilterable={true}
                  textField={"text"}
                  dataItemKey={"value"}
                  fillMode={"outline"}
                  size={"small"}
                  popupSettings={popUpSettings} />
              </FilterFormGroup>

              <FilterFormGroup label={customerPriceListMainDrop?.value || "Code"}>
                <MultiColumnComboBoxWidget
                  id={"sales-enquiry-customer-rep-group"}
                  className={"administrator-filter filter-form-filter"}
                  setValue={(e) => dispatch(setCustomerPriceListMainDropType(e))}
                  // defaultValue={repDefault}
                  value={customerPriceListMainDropType}
                  datalist={pricelistTypeData}
                  isFilterable={true}
                  textField={"value"}
                  valueField={"text"}
                  columns={[{ field: 'value', header: 'Code', width: '90px' }, { field: 'text', header: 'Description', width: '300px' }]}
                />
              </FilterFormGroup>
            </div>

            <div>
              <FilterFormGroup label='Customer Code' isRequired={true}>
                <MultiColumnComboBoxWidget
                  id={"sales-enquiry-customer-customer-code"}
                  className={"administrator-filter filter-form-filter"}
                  setValue={(e) => dispatch(setCustomerPriceListCustomerCode(e))}
                  value={customerPriceListCustomerCode}
                  datalist={customerLookupData}
                  isFilterable={true}
                  textField={"value"}
                  valueField={"text"}
                  columns={[{ field: 'value', header: 'Code', width: '90px' }, { field: 'text', header: 'Name', width: '300px' }]}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Effective Date'>
                <MultiColumnComboBoxWidget
                  id={"sales-enquiry-customer-effective-date"}
                  className={"administrator-filter filter-form-filter"}
                  setValue={(e) => (dispatch(setCustomerPriceListEffectiveDate(e)))}
                  value={customerPriceListEffectiveDate}
                  datalist={customerEffectiveDatesData}
                  isFilterable={true}
                  textField={"formattedDate"}
                  valueField={"text"}
                  columns={[{ field: 'formattedDate', header: 'Effective Date', width: '150px' }, { field: 'customerCode', header: 'Customer Code', width: '150px' }]}
                />
              </FilterFormGroup>
            </div>

            <div>
              <FilterFormGroup label='As at Date'>
                <DatePickerWidget
                  id={"sales-enquiry-customer-as-at-date"}
                  className={"dashboard-filter filter-form-filter"}
                  format={"dd/MM/yyyy"}
                  setValue={(e) => (dispatch(setCustomerPriceListAsAtDate(e)))}
                  value={customerPriceListAsAtDate} />
              </FilterFormGroup>
              <FilterFormGroup label='End Date'>
                <DatePickerWidget
                  id={"sales-enquiry-customer-as-at-date"}
                  className={"dashboard-filter filter-form-filter"}
                  format={"dd/MM/yyyy"}
                  setValue={(e) => (dispatch(setCustomerPriceListEndDate(e)))}
                  value={customerPriceListEndDate}
                  isDisabled />
              </FilterFormGroup>
            </div>
            <FilterNonButton type='submit' />
          </FilterForm>
        </div>
      </Collapse>

      <div>
        {visible && (
          <ValidationModal title={'Please Confirm'} message={'Customer Code & Effective Date Required'} setState={setVisible} />
        )}
      </div>
    </>
  );
}

export default SalesEnquiryCustomerPriceListFilter;
