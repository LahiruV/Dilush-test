import { useDispatch, useSelector } from 'react-redux';
import { RootState, setResponseTimeHrs } from '@peerless-cms/store';
import { DropDown } from '@peerless/controls';
import { DropDownData } from '@peerless/models';
import AdministratorSettingsListCard from './administrator-settings-list-card';
import { GetResponseTime } from '@peerless/queries';
import { useEffect } from 'react';

const AdministratorSettingsList = () => {
    const dispatch = useDispatch();
    const { responseTimeHrs } = useSelector((state: RootState) => state.administratorSettings);
    const { data: responseTime } = GetResponseTime(true);
    const responseTimeHrsData = [
        { id: 1, text: '4', value: 4 },
        { id: 2, text: '8', value: 8 },
        { id: 3, text: '12', value: 12 },
        { id: 4, text: '24', value: 24 },
        { id: 5, text: '48', value: 48 },
    ] as DropDownData[];

    const filteredResponseTime = responseTimeHrsData.find(item => item.value === responseTime);
    const popUpSettings = {
        width: '240px'
    }
    useEffect(() => {
        if (filteredResponseTime) {
            dispatch(setResponseTimeHrs(filteredResponseTime));
        }
    }, [responseTime]);
    const cardsData = [
        { title: 'Response Time (Hrs)', content: <DropDown id={"administrator-rep-market-rep-drop"} isClearable={false} className={"administrator-settings-filter"} setValue={(e) => dispatch(setResponseTimeHrs(e))} value={responseTimeHrs} datalist={responseTimeHrsData} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} /> },
    ];
    return (
        <div className="administrator-card-container">
            <AdministratorSettingsListCard cardsData={cardsData} />
        </div>
    );
};

export default AdministratorSettingsList;
