import { FilterFormGroup, KendoDropdown } from "@peerless-cms/features-common-components";
import { resetEnduserStatus, RootState, setEnduserStatus } from "@peerless-cms/store";
import { DropDown } from "@peerless/controls";
import { Collapse } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export interface CustomerEnduserListFiltersProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function CustomerEnduserListFilters(props: CustomerEnduserListFiltersProps) {
    const dispatch = useDispatch();
    const statusList: any = [{ text: 'All', value: 'ALL' }, { text: 'Active', value: 'Active' }, { text: 'Inactive', value: 'Inactive' }];

    const { enduserStatus } = useSelector((state: RootState) => ({
        enduserStatus: state.customerPageFilters.enduserStatus,
    }));

    const euPopUpSettings = {
        width: '208px'
    }

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div>
                    <div style={{ display: "grid", gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', padding: '10px' }}>
                        <FilterFormGroup label="Address Status">
                            <DropDown id={"filter-customer-endusers-drop"}
                                className={"filter-combo filter-align-left filter-form-filter"}
                                setValue={(e) => (e == null ? dispatch(resetEnduserStatus(e)) : dispatch(setEnduserStatus(e)))}
                                value={enduserStatus}
                                datalist={statusList}
                                textField={"text"}
                                dataItemKey={"value"}
                                fillMode={"outline"}
                                size={"small"}
                                popupSettings={euPopUpSettings}
                            />
                        </FilterFormGroup>
                    </div>
                </div>
            </Collapse>
        </>
    );





}