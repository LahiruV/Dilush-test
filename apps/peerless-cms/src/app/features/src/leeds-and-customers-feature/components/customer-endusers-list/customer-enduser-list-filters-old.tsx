import { KendoDropdown } from "@peerless-cms/features-common-components";
import { resetEnduserStatus, RootState, setEnduserStatus } from "@peerless-cms/store";
import { DropDown } from "@peerless/controls";
import { useDispatch, useSelector } from "react-redux";

export interface CustomerEnduserListFiltersProps { }

export function CustomerEnduserListFiltersOld(props: CustomerEnduserListFiltersProps) {
    const dispatch = useDispatch();
    const statusList: any = [{ text: 'All', value: 'ALL' }, { text: 'Active', value: 'Active' }, { text: 'Inactive', value: 'Inactive' }];

    const { enduserStatus } = useSelector((state: RootState) => ({
        enduserStatus: state.customerPageFilters.enduserStatus,
    }));

    const euPopUpSettings = {
        width: '150px'
    }

    return (
        <div className="sales-history-filter-container">
            <span className="filter-title">Filters</span>
            <div className="">
                <div className='dashboard-filter-header'> Status </div>
                <DropDown id={"filter-customer-endusers-drop"}
                    className={"filter-combo filter-align-left"}
                    setValue={(e) => (e == null ? dispatch(resetEnduserStatus(e)) : dispatch(setEnduserStatus(e)))}
                    value={enduserStatus}
                    datalist={statusList}
                    textField={"text"}
                    dataItemKey={"value"}
                    fillMode={"outline"}
                    size={"small"}
                    popupSettings={euPopUpSettings}
                />
            </div>
            {/* <a href='javascript:void(0)' className='clear-filters-link' onClick={clearFilters}>Clear all filters</a> */}
        </ div>
    );





}