import { useDispatch, useSelector } from 'react-redux';
import { RootState, setCallCyclesStartDate, setCallCyclesEndDate, setIsCallCyclesAnalysisListFetch, setSelectedOriginatorCallCyclesAnalysis, setChildOriginatorsCallCyclesAnalysis, setisCallCyclesAnalysisListFetchChart, setTriggerCallCycleAnalysisFormSubmit } from '@peerless-cms/store';
import { useEffect, useState } from "react";
import { GetAllCallCyclesExcel } from "@peerless/queries";
import { CallCyclesAnalysisParameters, DropDownData } from "@peerless/models";
import { getDate } from '@peerless/common';
import { DatePickerWidget, DropDown, FilterNonButton } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features';

const durationDataList = [
    { id: 1, text: 'Today', value: 0 },
    { id: 2, text: 'Week', value: 1 },
    { id: 3, text: 'Month', value: 2 },
    { id: 4, text: '3 Months', value: 3 },
    { id: 5, text: '6 Months', value: 4 }
];

export interface DashBoardCallCyclesFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
    isExporting: boolean;
    setIsExporting: (isActive: boolean) => void;
}

export function DashBoardCallCyclesFilter(props: DashBoardCallCyclesFilterProps) {
    const dispatch = useDispatch();
    const [durationData, setDurationData] = useState<DropDownData>(durationDataList[2]);

    const { callCyclesStartDate, callCyclesEndDate, isCallCyclesAnalysisListFetch, selectedOriginatorCallCyclesAnalysis, childOriginatorsCallCyclesAnalysis, isFormSubmit } = useSelector((state: RootState) => state.dashboardCallCyclesAnalysis);
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

    GetAllCallCyclesExcel({ ...payload, rowCount: 1, startIndex: 1 }, props.isExporting, props.setIsExporting, true);

    const onFilterClick = async () => {
        dispatch(setSelectedOriginatorCallCyclesAnalysis(selectedOriginator));
        dispatch(setChildOriginatorsCallCyclesAnalysis(childOriginators));
        dispatch(setIsCallCyclesAnalysisListFetch(true));
        dispatch(setisCallCyclesAnalysisListFetchChart(true));
    };

    const handleExportClick = async () => {
        dispatch(setSelectedOriginatorCallCyclesAnalysis(selectedOriginator));
        dispatch(setChildOriginatorsCallCyclesAnalysis(childOriginators));
        // setIsExporting(true);
    };

    const clearFilters = () => {
        setDurationData(durationDataList[2])
        dispatch(setCallCyclesStartDate(new Date().toISOString()))
        dispatch(setCallCyclesEndDate(new Date().toISOString()))
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
            dispatch(setCallCyclesStartDate(startDate.toISOString()));
            dispatch(setCallCyclesEndDate(endDate.toISOString()));
        }
    }, [durationData, dispatch]);

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerCallCycleAnalysisFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    useEffect(() => {
        if (props.isExporting) {
            handleExportClick();
        }
    }, [props.isExporting])

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>

                        <div>
                            <FilterFormGroup label='Duration'>
                                <DropDown id={"call-cycle-duration-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => setDurationData(e)} value={durationData} defaultValue={durationDataDefault} datalist={durationDataList} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Start Date'>
                                <DatePickerWidget id={"call-cycle-start-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={callCyclesStartDate} setValue={(e) => dispatch(setCallCyclesStartDate(e))} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='End Date'>
                                <DatePickerWidget id={"call-cycle-end-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={callCyclesEndDate} setValue={(e) => dispatch(setCallCyclesEndDate(e))} />
                            </FilterFormGroup>
                        </div>

                        {/* <ButtonWidget id='call-cycle-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isCallCyclesAnalysisListFetch} isFetching={true} /> */}
                        {/* <ButtonWidget id='call-cycle-excel-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' Function={handleExportClick} isDisabled={isExporting} isExporting={true} /> */}

                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashBoardCallCyclesFilter;