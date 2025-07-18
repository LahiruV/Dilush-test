import { useDispatch, useSelector } from 'react-redux';
import { RootState, setOpportunityConversionStartDate, setOpportunityConversionEndDate, setOpportunityConversionState, setOpportunityConversionMarket, setIsLeaderCustomerOpportunityFetch, setSelectedOriginatorOpportunityConversion, setChildOriginatorsOpportunityConversion, setIsLeaderCustomerOpportunityFetchCount } from '@peerless-cms/store';
import { GetSalesMarkets, useStatesData } from "@peerless/queries";
import { DropDownData } from '@peerless/models';
import { useState } from 'react';
import { dropDownDataConverter } from '@peerless/common';
import { ButtonWidget, ButtonWidgetCollapse, DatePickerWidget, DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

export interface DashBoarOpportunityConversionFilterProps { }

export function DashBoarOpportunityConversionFilter(props: DashBoarOpportunityConversionFilterProps) {
    const dispatch = useDispatch();
    const [openState, setOpenState] = useState(false);
    const [openMarket, setOpenMarket] = useState(false);
    const [openDuration, setOpenDuration] = useState(false);
    const { selectedOriginator, childOriginators } = useSelector((state: RootState) => state.header);
    const { isLeaderCustomerOpportunityFetch, isLeaderCustomerOpportunityFetchCount } = useSelector((state: RootState) => state.dashBoarOpportunityConversion);
    const subtractMonths = (date: Date, months: number): Date => {
        const newDate = new Date(date);
        newDate.setMonth(newDate.getMonth() - months);
        return newDate;
    };
    const endDate = new Date();
    const startDate = subtractMonths(endDate, 12);
    const { data: statesData } = useStatesData();
    const allStatesData = dropDownDataConverter.dropDownDataConverter(statesData || [], 'stateName', 'stateName', 'stateID',);
    const { allSalesMarketData: saleMarketData } = GetSalesMarkets();
    const allSalesMarketData = dropDownDataConverter.dropDownDataConverter(saleMarketData || [], 'tableDescription', 'tableCode');

    const modifiedStatesList = [{ id: 0, text: 'ALL', value: '-ALL-' }, ...(allStatesData || [])];
    const modifiedMarketList = [{ id: 0, text: 'ALL', value: 'ALL' }, ...(allSalesMarketData || [])];
    const [opportunityConversionStateData, setOpportunityConversionStateData] = useState<DropDownData>(modifiedStatesList[0]);
    const [opportunityConversionMarketData, setOpportunityConversionMarketData] = useState<DropDownData>(modifiedMarketList[0]);
    const [opportunityConversionStartDateData, setOpportunityConversionStartDateData] = useState(startDate.toISOString());
    const [opportunityConversionEndDateData, setOpportunityConversionEndDateData] = useState(endDate.toISOString());

    const onFilterClick = async () => {
        dispatch(setSelectedOriginatorOpportunityConversion(selectedOriginator));
        dispatch(setChildOriginatorsOpportunityConversion(childOriginators));
        dispatch(setOpportunityConversionState(opportunityConversionStateData));
        dispatch(setOpportunityConversionMarket(opportunityConversionMarketData));
        dispatch(setOpportunityConversionStartDate(opportunityConversionStartDateData));
        dispatch(setOpportunityConversionEndDate(opportunityConversionEndDateData));
        dispatch(setIsLeaderCustomerOpportunityFetch(true));
        dispatch(setIsLeaderCustomerOpportunityFetchCount(true));
    };

    const clearFilters = () => {
        setOpportunityConversionStateData(modifiedStatesList[0]);
        setOpportunityConversionMarketData(modifiedMarketList[0]);
        setOpportunityConversionStartDateData(startDate.toISOString());
        setOpportunityConversionEndDateData(endDate.toISOString());
    }

    const opportunityConversionStateDataDefault = modifiedStatesList[0];
    const opportunityConversionMarketDataDefault = modifiedMarketList[0];

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
                    <ButtonWidgetCollapse id={"dash-collapse-state"} name={"State"} classNames={"dash-collapse-button"} numSpaces={29} state={openState} setState={setOpenState} />
                </div>
                <Collapse in={openState}> */}
                <div className='paddingBottom-12'>
                    <div className='dashboard-filter-header'> State </div>
                    <DropDown id={"opportunity-conversion-state-drop"} className={"dashboard-filter"} setValue={(e) => setOpportunityConversionStateData(e)} value={opportunityConversionStateData} defaultValue={opportunityConversionStateDataDefault} datalist={modifiedStatesList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                {/* </Collapse> */}
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-collapse-market"} name={"Market"} classNames={"dash-collapse-button"} numSpaces={27} state={openMarket} setState={setOpenMarket} />
                </div>
                <Collapse in={openMarket}> */}
                <div className="paddingBottom-12">
                    <div className='dashboard-filter-header'> Market </div>
                    <DropDown id={"opportunity-conversion-market-drop"} className={"dashboard-filter"} setValue={(e) => setOpportunityConversionMarketData(e)} value={opportunityConversionMarketData} defaultValue={opportunityConversionMarketDataDefault} datalist={modifiedMarketList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>

                {/* </Collapse> */}
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-collapse-duration"} name={"Duration"} classNames={"dash-collapse-button"} numSpaces={24} state={openDuration} setState={setOpenDuration} />
                </div>
                <Collapse in={openDuration}> */}
                <div>
                    <div className="">
                        <div className='dashboard-filter-header'> Start Date </div>
                        <DatePickerWidget id={"opportunity-conversion-start-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={opportunityConversionStartDateData} setValue={(e) => setOpportunityConversionStartDateData(e)} />
                    </div>

                    <div className="paddingTop-12">
                        <div className='dashboard-filter-header'> End Date </div>
                        <DatePickerWidget id={"opportunity-conversion-date-drop"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={opportunityConversionEndDateData} setValue={(e) => setOpportunityConversionEndDateData(e)} />
                    </div>
                </div>
                {/* </Collapse> */}

                <ButtonWidget id='opportunity-conversion-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isLeaderCustomerOpportunityFetch || isLeaderCustomerOpportunityFetchCount} isFetching={true} />
            </form>
        </>
    );
}

export default DashBoarOpportunityConversionFilter;
