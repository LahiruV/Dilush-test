import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { ClearFilterBox, FilterForm, FilterFormGroup, KendoDropdown } from "@peerless-cms/features-common-components";
import { RootState, setCusCatalogueType, setCusCurrentOrCompleted, setCusSalesOrderType, setIsSalesHistoryFetch, setOutstandingOrderType, setSalesHistoryBy, setTriggerCustomerSalesHistoryFiltersFormSubmit } from "@peerless-cms/store";
import './customer-sales-history-filters.css';
import { ButtonWidget, DropDown, FilterNonButton } from "@peerless/controls";
import { useFilterForm } from '@peerless-cms/features'

export interface CustomerSalesHistoryFiltersProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
    setTotalOfClaims?: (total: string) => void;
}

export function CustomerSalesHistoryFilters(props: CustomerSalesHistoryFiltersProps) {
    const dispatch = useDispatch();

    const salesByList: any = [{ text: 'Dollar', value: 'd' }, { text: 'Tonnes', value: 't' }, { text: 'Units', value: 'u' }];
    const outstandingOrderTypes: any = [{ text: 'All', value: 0 }, { text: 'Bakery', value: 1 }, { text: 'Food Service', value: 2 }];
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
    const productTypeOptions = [
        { id: 1, text: 'F - Refinery Products', value: 'F' },
        { id: 2, text: 'P - Purchase Contract Product', value: 'P' },
        { id: 3, text: 'R - Rendering Products', value: 'R' },
        { id: 4, text: 'X - Sundry Expenses', value: 'X' },
    ];

    const { salesHistoryBy, outstandingOrderType, isSalesHistoryFetch, cusCurrentOrCompleted, cusSalesOrderType, cusCatalogueType, isCustomerSalesHistoryFiltersFormSubmit } = useSelector((state: RootState) => (state.customerPageFilters));

    const defaultSalesBy = salesByList[0];
    const defaultOutstandingOrderType = outstandingOrderTypes[0];
    const orderTypeDefault = orderTypeOptions[0];
    const currentOrCompletedDefault = currentOrCompletedOptions[0];
    const catalogueTypeDefault = productTypeOptions[0];

    const onFilterClick = () => {
        dispatch(setIsSalesHistoryFetch(true));
    }

    const clearFilters = () => {
        dispatch(setSalesHistoryBy(salesByList[0]));
        dispatch(setOutstandingOrderType(outstandingOrderTypes[0]));
        dispatch(setCusSalesOrderType(orderTypeOptions[0]));
        dispatch(setCusCurrentOrCompleted(currentOrCompletedOptions[0]));
        dispatch(setCusCatalogueType(productTypeOptions[0]));
    }

    const popUpSettings = {
        width: '208px'
    }

    useEffect(() => {
        clearFilters();
    }, [])

    const { formComponentRef } = useFilterForm({
        isFormSubmit: isCustomerSalesHistoryFiltersFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerCustomerSalesHistoryFiltersFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        noSubmit: true,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [salesHistoryBy, outstandingOrderType, cusSalesOrderType, cusCurrentOrCompleted, cusCatalogueType]
    })

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="sales-history-filter-container filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label="Sales By">
                                <DropDown id={"sales-by-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setSalesHistoryBy(e))} defaultValue={defaultSalesBy} value={salesHistoryBy} datalist={salesByList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>

                            <FilterFormGroup label="Market">
                                <DropDown id={"outstanding-orders-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setOutstandingOrderType(e))} defaultValue={defaultOutstandingOrderType} value={outstandingOrderType} datalist={outstandingOrderTypes} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label="Current Or Completed">
                                <DropDown id={"current-or-completed"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setCusCurrentOrCompleted(e))} value={cusCurrentOrCompleted} defaultValue={currentOrCompletedDefault} datalist={currentOrCompletedOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>

                            <FilterFormGroup label="Order Type">
                                <DropDown id={"orders-order-type"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setCusSalesOrderType(e))} value={cusSalesOrderType} defaultValue={orderTypeDefault} datalist={orderTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label="Product Type">
                                <DropDown id={"product-type"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setCusCatalogueType(e))} value={cusCatalogueType} defaultValue={catalogueTypeDefault} datalist={productTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <FilterNonButton type="submit" />
                    </FilterForm>
                </ div>
            </Collapse>
        </>
    );
}