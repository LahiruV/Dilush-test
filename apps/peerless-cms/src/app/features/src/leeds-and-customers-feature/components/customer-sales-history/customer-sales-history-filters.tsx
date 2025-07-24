import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClearFilterBox, KendoDropdown } from "@peerless-cms/features-common-components";
import { RootState, setCusCatalogueType, setCusCurrentOrCompleted, setCusSalesOrderType, setIsSalesHistoryFetch, setOutstandingOrderType, setSalesHistoryBy } from "@peerless-cms/store";
import './customer-sales-history-filters.css';
import { ButtonWidget, DropDown } from "@peerless/controls";

export interface CustomerSalesHistoryFiltersProps { }

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

    const { salesHistoryBy, outstandingOrderType, isSalesHistoryFetch, cusCurrentOrCompleted, cusSalesOrderType, cusCatalogueType } = useSelector((state: RootState) => (state.customerPageFilters));

    const defaultSalesBy = salesByList[0];
    const defaultOutstandingOrderType = outstandingOrderTypes[0];
    const orderTypeDefault = orderTypeOptions[0];
    const currentOrCompletedDefault = currentOrCompletedOptions[0];
    const catalogueTypeDefault = productTypeOptions[0];

    const onFilterClick = () => { //just to fire the event        
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
        width: '150px'
    }

    useEffect(() => {
        onFilterClick();
    }, [])

    return (
        <div className="sales-history-filter-container">
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div>
                    <div className='dashboard-filter-header'> Sales By </div>
                    <DropDown id={"sales-by-drop"} className={"administrator-filter"} setValue={(e) => dispatch(setSalesHistoryBy(e))} defaultValue={defaultSalesBy} value={salesHistoryBy} datalist={salesByList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                <hr />
                <div>
                    <div className='dashboard-filter-header'> Market </div>
                    <DropDown id={"outstanding-orders-drop"} className={"administrator-filter"} setValue={(e) => dispatch(setOutstandingOrderType(e))} defaultValue={defaultOutstandingOrderType} value={outstandingOrderType} datalist={outstandingOrderTypes} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                <div className='paddingTop-12'>
                    <div className='dashboard-filter-header'> Current Or Completed </div>
                    <DropDown id={"current-or-completed"} className={"administrator-filter"} setValue={(e) => dispatch(setCusCurrentOrCompleted(e))} value={cusCurrentOrCompleted} defaultValue={currentOrCompletedDefault} datalist={currentOrCompletedOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                </div>
                <div className='paddingTop-12'>
                    <div className='dashboard-filter-header'> Order Type </div>
                    <DropDown id={"orders-order-type"} className={"administrator-filter"} setValue={(e) => dispatch(setCusSalesOrderType(e))} value={cusSalesOrderType} defaultValue={orderTypeDefault} datalist={orderTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                </div>
                <div className='paddingTop-12'>
                    <div className='dashboard-filter-header'>Product Type </div>
                    <DropDown id={"product-type"} className={"administrator-filter"} setValue={(e) => dispatch(setCusCatalogueType(e))} value={cusCatalogueType} defaultValue={catalogueTypeDefault} datalist={productTypeOptions} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                </div>
                <ButtonWidget id='call-cycle-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-tertiary dash-filter-button dash-filter-btn' type="submit" isDisabled={isSalesHistoryFetch} isFetching={true} />
            </ form>
        </ div>
    );
}