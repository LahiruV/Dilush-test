import { RootState, setAdministratorRepProxyList } from '@peerless-cms/store';
import { AdministratorRepProxyCheckListDistributer, useCheckedList } from '@peerless/common';
import { DataGrid } from '@peerless/controls';
import { GetProxyForRepParameters } from '@peerless/models';
import { GetProxyForRep } from '@peerless/queries';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface MarketData {
    repCode: string;
    name: string;
    checked: boolean;
}

const AdministratorRepProxyCheckList = () => {
    const dispatch = useDispatch();
    const { administratorRepProxy } = useSelector((state: RootState) => state.administrator);
    const payload: GetProxyForRepParameters = { repCode: administratorRepProxy.value };
    const { data: allMarketForRep } = GetProxyForRep(payload, true);

    const { list, checkedItems, updateCheckedStatus } = useCheckedList<MarketData>({
        initialList: allMarketForRep || [],
        updateAction: setAdministratorRepProxyList,
        idKey: 'repCode',
    });

    useEffect(() => {
        if (allMarketForRep) {
            dispatch(setAdministratorRepProxyList(allMarketForRep as MarketData[]));
        }
    }, [allMarketForRep, dispatch]);

    const administratorRepProxyCheckTable = new AdministratorRepProxyCheckListDistributer();

    return (
        <div>
            <DataGrid
                dataTable={administratorRepProxyCheckTable}
                data={list}
                selectionMode={'multiple'}
                selectedRow={checkedItems}
                setSelectedRow={updateCheckedStatus}
                cssClasses={'sticky-header'}
                isScrollable={true}
                isAutoScrollHeight={true}
                heightOffset={100}
            />
        </div>
    );
};

export default AdministratorRepProxyCheckList;
