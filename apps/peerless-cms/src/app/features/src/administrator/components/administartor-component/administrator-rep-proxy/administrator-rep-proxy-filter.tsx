import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAdministratorRepProxy } from '@peerless-cms/store';
import { GetAllRepsForLookup } from '@peerless/queries';
import { DropDownData, GetAllRepsForLookupParameters } from '@peerless/models';
import { useEffect } from 'react';
import { DropDown } from '@peerless/controls';
import { FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

export interface AdministratorRepProxyFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function AdministratorRepProxyFilter(props: AdministratorRepProxyFilterProps) {
    const dispatch = useDispatch();
    const { administratorRepProxy } = useSelector((state: RootState) => state.administrator);
    const payload: GetAllRepsForLookupParameters = {
        orderby: 'rep_code asc',
        startIndex: 1,
        rowCount: 1000,
    }
    const { data: allRepsForLookup } = GetAllRepsForLookup(payload, true);
    const dropDownData = allRepsForLookup?.map((state, index) => ({
        id: index + 1,
        text: state.tableCode + ' - ' + state.tableDescription,
        value: state.tableCode,
    })) as DropDownData[];

    const clearFilters = () => {
        dispatch(setAdministratorRepProxy(dropDownData[0]));
    }

    const administratorRepProxyDefaultValue = dropDownData ? dropDownData[0] : undefined;

    useEffect(() => {
        if (dropDownData) {
            dispatch(setAdministratorRepProxy(dropDownData[0]));
        }
    }, [allRepsForLookup, dispatch]);

    const popUpSettings = {
        width: '208px'
    }

    useEffect(() => {
        if (props.isClearFilters) {
            clearFilters?.();
        }
    }, [props.isClearFilters])

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div>
                    <div style={{ padding: '10px' }}>
                        <FilterFormGroup label='Rep'>
                            <DropDown id={"administrator-rep-market-rep-drop"} className={"administrator-filter filter-form-filter"} setValue={(e) => dispatch(setAdministratorRepProxy(e))} value={administratorRepProxy} defaultValue={administratorRepProxyDefaultValue} datalist={dropDownData} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                        </FilterFormGroup>
                    </div>
                </div>
            </Collapse>
        </>
    );
}

export default AdministratorRepProxyFilter;