import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCallCyclesStartDate, setCallCyclesEndDate, setIsCallCyclesAnalysisListFetch, setSelectedOriginatorCallCyclesAnalysis, setChildOriginatorsCallCyclesAnalysis, setisCallCyclesAnalysisListFetchChart } from '@peerless-cms/store';
import { useEffect, useState } from "react";
import { GetAllCallCyclesExcel } from "@peerless/queries";
import { CallCyclesAnalysisParameters, DropDownData } from "@peerless/models";
import { getDate } from '@peerless/common';
import { ButtonWidget, ButtonWidgetCollapse, DatePickerWidget, DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

const durationDataList = [
    { id: 1, text: 'Today', value: 0 },
    { id: 2, text: 'Week', value: 1 },
    { id: 3, text: 'Month', value: 2 },
    { id: 4, text: '3 Months', value: 3 },
    { id: 5, text: '6 Months', value: 4 }
];

export interface DashBoardCallCyclesFilterProps { }

export function DashBoardCallCyclesFilter(props: DashBoardCallCyclesFilterProps) {
    const dispatch = useDispatch();
    const [openDuration, setOpenDuration] = useState(false);
    const [durationData, setDurationData] = useState<DropDownData>(durationDataList[2]);
    const { callCyclesStartDate, callCyclesEndDate, isCallCyclesAnalysisListFetch, selectedOriginatorCallCyclesAnalysis, childOriginatorsCallCyclesAnalysis } = useSelector((state: RootState) => state.dashboardCallCyclesAnalysis);
    const { selectedOriginator, childOriginators } = useSelector((state: RootState) => state.header);
    const payload: CallCyclesAnalysisParameters = {
        originator: selectedOriginatorCallCyclesAnalysis.userName,
        sStartDate: getDate(new Date(callCyclesStartDate)),
        sEndDate: getDate(new Date(callCyclesEndDate)),
        repType: selectedOriginatorCallCyclesAnalysis.repType,
        isIncludeContact: false,
        orderBy: 'lead_name ASC',
        additionalParams: ``,
        childOriginators: ` ${childOriginatorsCallCyclesAnalysis}`,
        leadId: 0,
        ignorePagination: true,
    };
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isExporting, setIsExporting] = useState(false);

    GetAllCallCyclesExcel({ ...payload, rowCount: 1, startIndex: 1 }, isExporting, setIsExporting, true);

    const onFilterClick = async () => {
        dispatch(setSelectedOriginatorCallCyclesAnalysis(selectedOriginator));
        dispatch(setChildOriginatorsCallCyclesAnalysis(childOriginators));
        dispatch(setCallCyclesStartDate(startDate));
        dispatch(setCallCyclesEndDate(endDate));
        dispatch(setIsCallCyclesAnalysisListFetch(true));
        dispatch(setisCallCyclesAnalysisListFetchChart(true));
    };

    const handleExportClick = async () => {
        dispatch(setSelectedOriginatorCallCyclesAnalysis(selectedOriginator));
        dispatch(setChildOriginatorsCallCyclesAnalysis(childOriginators));
        dispatch(setCallCyclesStartDate(startDate));
        dispatch(setCallCyclesEndDate(endDate));
        setIsExporting(true);
    };

    const clearFilters = () => {
        setDurationData(durationDataList[2])
    };

    const durationDataDefault = durationDataList[2];

    useEffect(() => {
        if (durationData) {
            const today = new Date();
            const startDate = new Date(today);
            const endDate = new Date(today);

            switch (durationData.value) {
                case 0:
                    break;
                case 1:
                    startDate.setDate(today.getDate() - 7);
                    break;
                case 2:
                    startDate.setMonth(today.getMonth() - 1);
                    break;
                case 3:
                    startDate.setMonth(today.getMonth() - 3);
                    break;
                case 4:
                    startDate.setMonth(today.getMonth() - 6);
                    break;
                default:
                    break;
            }
            setStartDate(startDate.toISOString());
            setEndDate(endDate.toISOString());
        }
    }, [durationData, dispatch]);

    const popUpSettings = {
        width: '150px'
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-collapse-duration"} name={"Duration"} classNames={"dash-collapse-button"} numSpaces={24} state={openDuration} setState={setOpenDuration} />
                </div>
                <Collapse in={openDuration}> */}
                <div>
                    <div>
                        <div className='dashboard-filter-header'> Duration </div>
                        <DropDown id={"call-cycle-duration-drop"} className={"dashboard-filter"} setValue={(e) => setDurationData(e)} value={durationData} defaultValue={durationDataDefault} datalist={durationDataList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                    </div>
                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> Start Date </div>
                        <DatePickerWidget id={"call-cycle-start-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={startDate} setValue={(e) => setStartDate(e)} />
                    </div>
                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> End Date </div>
                        <DatePickerWidget id={"call-cycle-end-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={endDate} setValue={(e) => setEndDate(e)} />
                    </div>
                </div>
                {/* </Collapse> */}
                <ButtonWidget id='call-cycle-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isCallCyclesAnalysisListFetch} isFetching={true} />
                <ButtonWidget id='call-cycle-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} />
            </form>
        </>
    );
}

export default DashBoardCallCyclesFilter;