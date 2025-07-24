import {
  RootState,
  // setClaimFilters,
  setIsFetchingClaimsEnquiryList,
  setTriggerClaimsEnquiryFiltersFormSubmit,
  setClaimsEnquiryClaimStatus, setClaimsEnquiryClaimType, setClaimsEnquiryCustomer, setClaimsEnquiryFromDate, setClaimsEnquiryParent, setClaimsEnquiryPayMethod, setClaimsEnquiryProduct, setClaimsEnquiryPromo, setClaimsEnquiryReason, setClaimsEnquiryRep, setClaimsEnquirySubParent, setClaimsEnquirySubParentGroup, setClaimsEnquiryToDate
} from '@peerless-cms/store';
import {
  ButtonWidget,
  CheckBox,
  DatePickerWidget,
  DropDown,
  FilterNonButton,
  InputWidget,
  MultiColumnComboBoxWidget,
  RadioButtonWidget,
} from '@peerless/controls';
import { useEffect, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './claims-enquiry.css';
import {
  GetAllParentCustomersLookup,
  GetAllRepsForLookup,
  GetCustomerLookup,
  GetLookup,
  useProductsLookupData,
} from '@peerless/queries';
import {
  GetAllParentCustomersLookupParameters,
  GetAllRepsForLookupParameters,
  GetCustomerLookupParameters,
} from '@peerless/models';
import { dropDownDataConverter } from '@peerless/common';
import './claims-enquiry-filters.css';
import { FilterFormGroup, FilterForm } from '@peerless-cms/features-common-components';
import { useFilterForm } from '@peerless-cms/features'
export interface ClaimsEnquiryFilterProps {
  isFiltersOpen?: boolean;
  isClearFilters?: boolean;
  setIsActiveFilters?: (isActive: boolean) => void;
  setTotalOfClaims?: (total: string) => void;
}

export const ClaimsEnquiryFilters = (props: ClaimsEnquiryFilterProps) => {
  const dispatch = useDispatch();
  const currentDate = new Date().toISOString();
  const oneMonthBeforeDate = new Date();
  oneMonthBeforeDate.setMonth(oneMonthBeforeDate.getMonth() - 1);
  const oneMonthBefore = oneMonthBeforeDate.toISOString();

  const {
    childOriginators,
    selectedOriginator: originator,
    originatorInList,
  } = useSelector((state: RootState) => (state.header));

  const { isFormSubmit, isFetchingClaimsEnquiryList, fromDate, toDate, product, customer, reason, parent, subParent, subParentGroup, rep, promo, payMethod, claimType, claimStatus } = useSelector((state: RootState) => (state.claimsEnquiryFilters));

  useEffect(() => {
    dispatch(setClaimsEnquiryFromDate(oneMonthBefore));
  }, [])

  // product
  let productList: any = [];
  let args = {
    ChildOriginators: childOriginators,
    DefaultDepartmentId: originator.defaultDepartmentId,
    Originator: originator.userName,
    AdditionalParams: '',
    OrderBy: 'catlog_code ASC',
    DisplayInCRM: false,
    StartIndex: 1,
    RowCount: 1000,
  };
  const {
    data: productData,
    error: producttDataError,
    isLoading: isProductDataLoading,
  } = useProductsLookupData(args);

  if (isProductDataLoading) productList = [{ text: 'Loading...', value: '' }];

  if (productData) {
    productList = dropDownDataConverter.dropDownDataConverter(
      productData || [], 'description', 'catlogCode');
  }
  // end product

  // reason
  let reasonList: any = [];
  const { data: reasonData, isLoading: isReasonsLoading } = GetLookup(
    'ANALYSIS',
    true
  );

  if (isReasonsLoading) reasonList = [{ text: 'Loading...', value: '' }];

  if (reasonData) {
    reasonList = dropDownDataConverter.dropDownDataConverter(
      reasonData || [],
      'description',
      'tableCode'
    );
  }
  // end reason

  // parent
  let parentList: any = [];
  const payloadParentCustomer: GetAllParentCustomersLookupParameters = {
    originator: originator.userName,
    childOriginators: childOriginators,
    defaultDepartmentId: originator.defaultDepartmentId,
    startIndex: 1,
    rowCount: 1000,
    orderBy: 'parent_customer ASC',
  };
  const { data: parentCustomer, isLoading: isParentLoading } =
    GetAllParentCustomersLookup(payloadParentCustomer, true);

  if (isParentLoading) parentList = [{ text: 'Loading...', value: '' }];

  if (parentCustomer) {
    parentList = dropDownDataConverter.dropDownDataConverter(
      parentCustomer || [],
      'tableDescription',
      'tableCode'
    );
  }
  // end parent

  // sub parent
  let subParentList: any = [];
  const { data: subParentData, isLoading: isSubParentLoading } = GetLookup(
    'subparent',
    true
  );

  if (isSubParentLoading) subParentList = [{ text: 'Loading...', value: '' }];

  if (subParentData) {
    subParentList = dropDownDataConverter.dropDownDataConverter(
      subParentData || [],
      'description',
      'tableCode'
    );
  }
  // end sub parent

  // sub parent group
  let subParentGroupList: any = [];
  const { data: subParentGroupData, isLoading: isSubParentGroupLoading } =
    GetLookup('subparentgroup', true);

  if (isSubParentGroupLoading)
    subParentGroupList = [{ text: 'Loading...', value: '' }];

  if (subParentGroupData) {
    subParentGroupList = dropDownDataConverter.dropDownDataConverter(
      subParentGroupData || [],
      'description',
      'tableCode'
    );
  }
  // end sub parent group

  // rep
  let repList: any = [];
  const payloadAllRepsForLookup: GetAllRepsForLookupParameters = {
    orderby: 'rep_code asc',
    startIndex: 1,
    rowCount: 1000,
    additionalParams: originatorInList,
  };

  const { data: allRepsForLookup, isLoading: isRepsLoading } =
    GetAllRepsForLookup(payloadAllRepsForLookup, true);

  if (isRepsLoading) repList = [{ text: 'Loading...', value: '' }];

  if (allRepsForLookup) {
    repList = dropDownDataConverter.dropDownDataConverter(
      allRepsForLookup || [],
      'tableDescription',
      'tableCode'
    );
  }

  useEffect(() => {
    if (originator) {
      dispatch(setClaimsEnquiryRep({ text: originator.name, value: originator.repCode }));
    }
  }, [originator, allRepsForLookup]);

  // end rep

  // processing
  // let processingList: any = [];
  // const { data: processingData, isLoading: isProcessLoading } = GetLookup(
  //   'originator',
  //   true
  // );

  // if (isProcessLoading) processingList = [{ text: 'Loading...', value: '' }];

  // if (processingData) {
  //   processingList = dropDownDataConverter.dropDownDataConverter(
  //     processingData || [],
  //     'description',
  //     'tableCode'
  //   );
  // }
  // end processing

  // customer
  let customerList: any = [];
  const payloadCustomerLookup: GetCustomerLookupParameters = {
    additionalParams: childOriginators,
    childOriginators: childOriginators,
    defaultDepartmentId: originator.defaultDepartmentId,
    leadStage: 'C',
    orderBy: 'name ASC',
    originator: originator.userName,
    startIndex: 1,
    rowCount: 1000,
  };

  const { data: customerLookup, isLoading: isCustomerLoading } =
    GetCustomerLookup(payloadCustomerLookup, true);
  if (isCustomerLoading) customerList = [{ text: 'Loading...', value: '' }];

  if (customerLookup) {
    customerList = dropDownDataConverter.dropDownDataConverter(
      customerLookup || [],
      'tableDescription',
      'tableCode'
    );
  }
  // end customer

  // pay method
  const payMethodsList: any = [
    { text: 'All', value: '' },
    { text: 'Cr. Note', value: 'cr' },
    { text: 'Cheque', value: 'ch' },
  ];
  const defaultPayMethod: any = payMethodsList[1];
  // end pay method

  // claim type
  const claimTypesList: any = [
    { text: 'All', value: '' },
    { text: 'Dist', value: 'DIST' },
  ];
  const defaultClaimType: any = claimTypesList[0];

  // end claim type

  // claim status
  const claimStatusList: any = [
    { text: 'All Claims', value: '' },
    { text: 'Approved', value: 'a' },
    { text: 'Processing', value: 'p' },
    { text: 'Rejected', value: 'r' },
  ];
  const defaultClaimStatus: any = claimStatusList[0];
  // end claim status

  //set filter globally
  /*   const setGlobalFilters = () => {
      dispatch(
        setClaimFilters({
          fromDate: fromDate,
          toDate: toDate,
          product: product != null ? product.value : '',
          reason: reason != null ? reason.value : '',
          parent: parent != null ? parent.value : '',
          subParent: subParent != null ? subParent.value : '',
          subParentGroup: subParentGroup != null ? subParentGroup.value : '',
          rep: rep != null ? rep.value : '',
          promo: promo,
          customer: customer != null ? customer.value : '',
          payMethod: payMethod != null ? payMethod.value : '',
          claimType: claimType != null ? claimType.value : '',
          claimStatus: claimStatus != null ? claimStatus.value : '',
          // showQpr: showQpr,
          // forProcessing: processing != null ? processing.value : '',
          // processingStatus: statusRadio,
        })
      );
    }; */

  //set default states
  useEffect(() => {
    if (payMethodsList && claimTypesList && claimStatusList) {
      // setPayMethod(defaultPayMethod);
      // setClaimType(defaultClaimType);
      // setClaimStatus(defaultClaimStatus);
      clearFilters();
      // setGlobalFilters();
    }
  }, []);

  const setQueryFilters = () => {
    // setGlobalFilters();
    dispatch(setIsFetchingClaimsEnquiryList(true));
  };

  const clearFilters = () => {
    dispatch(setClaimsEnquiryFromDate(oneMonthBefore));
    dispatch(setClaimsEnquiryToDate(currentDate));
    dispatch(setClaimsEnquiryProduct(null));
    dispatch(setClaimsEnquiryReason(null));
    dispatch(setClaimsEnquiryParent(null));
    dispatch(setClaimsEnquirySubParent(null));
    dispatch(setClaimsEnquirySubParentGroup(null));
    dispatch(setClaimsEnquiryRep({ text: originator.name, value: originator.repCode }));
    dispatch(setClaimsEnquiryPromo(''));
    dispatch(setClaimsEnquiryCustomer(null));
    dispatch(setClaimsEnquiryPayMethod(defaultPayMethod))
    dispatch(setClaimsEnquiryClaimType(defaultClaimType));
    dispatch(setClaimsEnquiryClaimStatus(defaultClaimStatus));
    // setShowQpr(false);
    // setProcessing(null);
    // setStatusRadio('all');
  };

  const onFilterClick = () => {
    setQueryFilters();
  };

  const popUpSettings = {
    width: '208px',
  };

  useEffect(() => {
    if (props.setIsActiveFilters) {
      props.setTotalOfClaims?.('$0.00');
    }
  }, [props.isClearFilters]);

  const { formComponentRef } = useFilterForm({
    isFormSubmit,
    setTriggerSubmit: (value) => dispatch(setTriggerClaimsEnquiryFiltersFormSubmit(value)),
    isClearFilters: props.isClearFilters,
    clearFilters,
    setIsActiveFilters: props.setIsActiveFilters,
    filters: [fromDate, toDate, product, reason, parent, subParent, subParentGroup, rep, promo, customer, payMethod, claimType, claimStatus]
  });


  return (
    <>
      <Collapse in={props.isFiltersOpen}>
        <div className="sales-enquiry-cus-tra filters-container">
          <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
            <div>
              <FilterFormGroup label='Period' hasColumns>
                <DatePickerWidget
                  id={'claims-enquiry-from-date'}
                  className={'dashboard-filter datepicker-custom'}
                  setValue={(e) => dispatch(setClaimsEnquiryFromDate(e))}
                  value={fromDate}
                  format="dd/MM/yyyy"
                />
                <DatePickerWidget
                  id={'claims-enquiry-to-date'}
                  className={'dashboard-filter datepicker-custom datepicker-custom-nsp'}
                  setValue={(e) => dispatch(setClaimsEnquiryToDate(e))}
                  value={toDate}
                  format="dd/MM/yyyy"
                />
              </FilterFormGroup>

              <FilterFormGroup label='Customer'>
                <MultiColumnComboBoxWidget
                  id={'claims-enquiry-customer'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryCustomer(e))}
                  value={customer}
                  datalist={customerList}
                  isFilterable={true}
                  textField={'value'}
                  valueField={'text'}
                  isClearFilter={customerList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    {
                      field: 'text',
                      header: 'Name',
                      width: '250px',
                    },
                  ]}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Product'>
                <MultiColumnComboBoxWidget
                  id={'customer-eu-price-list-products'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryProduct(e))}
                  value={product}
                  datalist={productList}
                  isFilterable={true}
                  textField={'value'}
                  valueField={'text'}
                  isClearFilter={productList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    { field: 'text', header: 'Name', width: '250px' },
                  ]}
                />
              </FilterFormGroup>
            </div>

            <div>
              <FilterFormGroup label='Parent'>
                <MultiColumnComboBoxWidget
                  id={'claims-enquiry-parent'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryParent(e))}
                  value={parent}
                  datalist={parentList}
                  isFilterable={true}
                  textField={'text'}
                  valueField={'value'}
                  isClearFilter={parentList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    { field: 'text', header: 'Name', width: '250px' },
                  ]}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Sub Parent'>
                <MultiColumnComboBoxWidget
                  id={'claims-enquiry-sub-parent'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquirySubParent(e))}
                  value={subParent}
                  datalist={subParentList}
                  isFilterable={true}
                  textField={'text'}
                  valueField={'value'}
                  isClearFilter={subParentList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    { field: 'text', header: 'Name', width: '250px' },
                  ]}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Sub Parent Group'>
                <MultiColumnComboBoxWidget
                  id={'claims-enquiry-sub-parent-group'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquirySubParentGroup(e))}
                  value={subParentGroup}
                  datalist={subParentGroupList}
                  isFilterable={true}
                  textField={'text'}
                  valueField={'value'}
                  isClearFilter={subParentGroupList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    { field: 'text', header: 'Name', width: '250px' },
                  ]}
                />
              </FilterFormGroup>
            </div>

            <div>
              <FilterFormGroup label='Rep Code'>
                <MultiColumnComboBoxWidget
                  id={'claims-enquiry-rep'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryRep(e))}
                  value={rep}
                  datalist={repList}
                  isFilterable={true}
                  textField={'value'}
                  valueField={'text'}
                  isClearFilter={repList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    {
                      field: 'text',
                      header: 'Name',
                      width: '250px',
                    },
                  ]}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Reason'>
                <MultiColumnComboBoxWidget
                  id={'claims-enquiry-reason'}
                  className={'ddl-default administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryReason(e))}
                  value={reason}
                  datalist={reasonList}
                  isFilterable={true}
                  textField={'value'}
                  valueField={'text'}
                  isClearFilter={reasonList == null}
                  columns={[
                    { field: 'value', header: 'Code', width: '122px' },
                    {
                      field: 'text',
                      header: 'Description',
                      width: '250px',
                    },
                  ]}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Promo No'>
                <InputWidget
                  id={'claims-enquiry-promo-number'}
                  className={'administrator-filter filter-form-filter'}
                  setValue={(e) => {
                    dispatch(setClaimsEnquiryPromo(e));
                  }}
                  value={promo}
                  type="number"
                />
              </FilterFormGroup>
            </div>

            <div>
              <FilterFormGroup label='Pay Method'>
                <DropDown
                  id={'claims-enquiry-pay-method'}
                  className={'administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryPayMethod(e))}
                  value={payMethod}
                  defaultValue={defaultPayMethod}
                  datalist={payMethodsList}
                  textField={'text'}
                  dataItemKey={'value'}
                  fillMode={'solid'}
                  size={'small'}
                  popupSettings={popUpSettings}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Claim Type'>
                <DropDown
                  id={'claims-enquiry-claim-type'}
                  className={'administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryClaimType(e))}
                  value={claimType}
                  defaultValue={defaultClaimType}
                  datalist={claimTypesList}
                  textField={'text'}
                  dataItemKey={'value'}
                  fillMode={'solid'}
                  size={'small'}
                  popupSettings={popUpSettings}
                />
              </FilterFormGroup>

              <FilterFormGroup label='Claim Status'>
                <DropDown
                  id={'claims-enquiry-claim-status'}
                  className={'administrator-filter filter-form-filter'}
                  setValue={(e) => dispatch(setClaimsEnquiryClaimStatus(e))}
                  value={claimStatus}
                  defaultValue={defaultClaimStatus}
                  datalist={claimStatusList}
                  textField={'text'}
                  dataItemKey={'value'}
                  fillMode={'solid'}
                  size={'small'}
                  popupSettings={popUpSettings}
                />
              </FilterFormGroup>
            </div>

            {/* <div className="paddingTop-12">
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <CheckBox id={"claims-enquiry-qpr-checkbox"} className={"claims-enquiry-checkbox"} setValue={(e) => setShowQpr(e)} value={showQpr} label={""} />
                                <div className='sales-enquiry-outstanding-checkbox-header'>Show QPR</div>
                            </div>
                        </div>                  */}

            {/* <div>
                    <ButtonWidgetCollapse id={"claims-enquiry-process-collapse"} name={"Processing Details"} classNames={"dash-collapse-button"} numSpaces={11} state={openProcessingAndStatus} setState={setOpenProcessingAndStatus} />
                </div> */}
            {/* <Collapse in={openProcessingAndStatus}>
                    <div className='sales-enquiry-cus-tra'>
                        <div>
                            <div className='dashboard-filter-header'> For Processeing </div>
                            <MultiColumnComboBoxWidget
                                id={"claims-enquiry-processing"}
                                className={"ddl-default administrator-filter"}
                                setValue={(e) => setProcessing(e)}
                                value={processing}
                                datalist={processingList}
                                isFilterable={true}
                                textField={"value"}
                                valueField={"text"}
                                isClearFilter={processingList == null}
                                columns={[{ field: 'value', header: 'Code', width: '122px' }, { field: 'text', header: 'Description', width: '250px' }]} />
                        </div>
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Status </div>
                            <RadioButtonWidget id='"claims-enquiry-status-all' className="claims-enquiry-radio-check" name="chartType2" value="all" checked={statusRadio === "all"} label={"All"} setValue={(e) => setStatusRadio(e)} />
                            <RadioButtonWidget id='"claims-enquiry-status-new' className="claims-enquiry-radio-check" name="chartType2" value="new" checked={statusRadio === "new"} label={"New"} setValue={(e) => setStatusRadio(e)} />
                        </div>
                        <hr />
                    </div>
                </Collapse> */}

            {/* <div style={{ gridArea: 2 / 3 }}>
              <ButtonWidget
                id="claims-enquiry-filter-button"
                classNames=" k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn"
                type="submit"
                isDisabled={isFetchingClaimsEnquiryList}
                isFetching={true}
              />
            </div> */}
            <FilterNonButton type='submit' />
            {/* </form> */}

          </FilterForm>

          {/* <div>
            <ButtonWidget id='submit-button' form='filter-form' name='Filters' type='submit' classNames='filter-button' isDisabled={isFetchingClaimsEnquiryList} isFetching={true} />
            <ButtonWidget id='clear-button' name='Clear Filters' type='button' Function={clearFilters} classNames='filter-clear-button' />
          </div> */}
        </div>

      </Collapse>
    </>
  );
}
