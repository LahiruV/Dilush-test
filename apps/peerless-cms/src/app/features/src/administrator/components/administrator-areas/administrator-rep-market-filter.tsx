import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAdministratorRep } from '@peerless-cms/store';
import { GetAllRepsForLookup } from '@peerless/queries';
import { DropDownData, GetAllRepsForLookupParameters } from '@peerless/models';
import { useEffect } from 'react';
import { DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';


export interface AdministratorRepMarketFilterProps { }

export function AdministratorRepMarketFilter(props: AdministratorRepMarketFilterProps) {
    const dispatch = useDispatch();
    const { administratorRep } = useSelector((state: RootState) => state.administrator);
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
        dispatch(setAdministratorRep(dropDownData[0]));
    }

    useEffect(() => {
        if (dropDownData) {
            dispatch(setAdministratorRep(dropDownData[0]));
        }
    }, [allRepsForLookup, dispatch]);

    const popUpSettings = {
        width: '150px'
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <div>
                <div className='administrator-filter-header'> Rep </div>
                <DropDown id={"administrator-rep-market-rep-drop"} className={"administrator-filter"} setValue={(e) => dispatch(setAdministratorRep(e))} value={administratorRep} datalist={dropDownData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
            </div>
        </>
    );
}

export default AdministratorRepMarketFilter;