import { RootState, setAdministratorRepMarketList } from '@peerless-cms/store';
import { AdministratorRepMarketCheckListDistributer, useCheckedList } from '@peerless/common';
import { DataGrid } from '@peerless/controls';
import { GetAllMarketForRepParameters } from '@peerless/models';
import { GetAllMarketForRep } from '@peerless/queries';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface MarketData {
    marketCode: string;
    description: string;
    checked: boolean;
}

const AdministratorRepMarketCheckList = () => {
    const dispatch = useDispatch();
    const { administratorRep } = useSelector((state: RootState) => state.administrator);
    const payload: GetAllMarketForRepParameters = { repCode: administratorRep.value };
    const { allMarketForRep } = GetAllMarketForRep(payload, true);

    const { list, checkedItems, updateCheckedStatus } = useCheckedList<MarketData>({
        initialList: allMarketForRep || [],
        updateAction: setAdministratorRepMarketList,
        idKey: 'marketCode',
    });

    useEffect(() => {
        if (allMarketForRep) {
            dispatch(setAdministratorRepMarketList(allMarketForRep as MarketData[]));
        }
    }, [allMarketForRep, dispatch]);

    const administratorRepMarketCheckTable = new AdministratorRepMarketCheckListDistributer();

    return (
        <div>
            <DataGrid
                dataTable={administratorRepMarketCheckTable}
                data={list}
                selectionMode={'multiple'}
                selectedRow={checkedItems}
                setSelectedRow={updateCheckedStatus}
                isScrollable={true}
                isAutoScrollHeight={true}
                cssClasses={'sticky-header'}
                heightOffset={100}
            />
        </div>
    );
};

export default AdministratorRepMarketCheckList;
