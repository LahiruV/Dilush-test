import { useDispatch, useSelector } from "react-redux";
import { Collapse } from "react-bootstrap";
import { FilterFormGroup } from "@peerless-cms/features-common-components";
import { resetCustomerAddressStatus, resetEnduserStatus, RootState, setCustomerAddressStatus, setEnduserStatus } from "@peerless-cms/store";
import { DropDown } from "@peerless/controls";

export interface LeedCustomerAddressListFiltersProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

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
        width: '208px'
    }

    return (
        <Collapse in={props.isFiltersOpen}>
            <div>
                <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', padding: '10px' }}>
                    <FilterFormGroup label="Address Status">
                        <DropDown id={"filter-customer-endusers-drop"}
                            className={"filter-combo filter-align-left filter-form-filter"}
                            setValue={(e) => (e == null ? dispatch(resetCustomerAddressStatus(e)) : dispatch(setCustomerAddressStatus(e)))}
                            value={customerAddressStatus}
                            datalist={statusList}
                            textField={"text"}
                            dataItemKey={"value"}
                            fillMode={"outline"}
                            size={"small"}
                            popupSettings={custPopUpSettings}
                        />
                    </FilterFormGroup>
                </div>
            </div>
        </Collapse>
    );





}