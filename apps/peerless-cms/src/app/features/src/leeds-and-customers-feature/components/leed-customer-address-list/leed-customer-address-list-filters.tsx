import { resetCustomerAddressStatus, resetEnduserStatus, RootState, setCustomerAddressStatus, setEnduserStatus } from "@peerless-cms/store";
import { DropDown } from "@peerless/controls";
import { useDispatch, useSelector } from "react-redux";

export interface LeedCustomerAddressListFiltersProps { }

export function LeedCustomerAddressListFilters(props: LeedCustomerAddressListFiltersProps) {
    const dispatch = useDispatch();
    const statusList: any = [
        { text: 'All', value: ' ' },
        { text: 'Active', value: `status = 'A'` },
        { text: 'Deleted', value: `status = 'D'` }
    ];

    const { customerAddressStatus } = useSelector((state: RootState) => ({
        customerAddressStatus: state.customerPageFilters.customerAddressStatus,
    }));

    const custPopUpSettings = {
        width: '150px'
    }

    return (
        <div className="sales-history-filter-container">
            <span className="filter-title">Filters</span>
            <div className="">
                <div className='dashboard-filter-header'>Address Status </div>
                <DropDown id={"filter-customer-endusers-drop"}
                    className={"filter-combo filter-align-left"}
                    setValue={(e) => (e == null ? dispatch(resetCustomerAddressStatus(e)) : dispatch(setCustomerAddressStatus(e)))}
                    value={customerAddressStatus}
                    datalist={statusList}
                    textField={"text"}
                    dataItemKey={"value"}
                    fillMode={"outline"}
                    size={"small"}
                    popupSettings={custPopUpSettings}
                />
            </div>
            {/* <a href='javascript:void(0)' className='clear-filters-link' onClick={clearFilters}>Clear all filters</a> */}
        </ div>
    );





}