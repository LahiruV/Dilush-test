import { useDispatch, useSelector } from 'react-redux';
import { RootState, setOpportunityConversionStartDate, setOpportunityConversionEndDate, setOpportunityConversionState, setOpportunityConversionMarket, setIsLeaderCustomerOpportunityFetch, setSelectedOriginatorOpportunityConversion, setChildOriginatorsOpportunityConversion, setIsLeaderCustomerOpportunityFetchCount, setTriggerOpportunityConversionFormSubmit } from '@peerless-cms/store';
import { GetSalesMarkets, useStatesData } from "@peerless/queries";
import { useEffect } from 'react';
import { dropDownDataConverter } from '@peerless/common';
import { DatePickerWidget, DropDown, FilterNonButton } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features'

export interface DashBoarOpportunityConversionFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function DashBoarOpportunityConversionFilter(props: DashBoarOpportunityConversionFilterProps) {
    const dispatch = useDispatch();
    const { selectedOriginator, childOriginators } = useSelector((state: RootState) => state.header);
    const { isFormSubmit, opportunityConversionState, opportunityConversionMarket, opportunityConversionStartDate, opportunityConversionEndDate } = useSelector((state: RootState) => state.dashBoarOpportunityConversion);
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

    const onFilterClick = async () => {
        dispatch(setSelectedOriginatorOpportunityConversion(selectedOriginator));
        dispatch(setChildOriginatorsOpportunityConversion(childOriginators));
        dispatch(setIsLeaderCustomerOpportunityFetch(true));
        dispatch(setIsLeaderCustomerOpportunityFetchCount(true));
    };

    const clearFilters = () => {
        dispatch(setOpportunityConversionState(modifiedStatesList[0]));
        dispatch(setOpportunityConversionMarket(modifiedMarketList[0]));
        dispatch(setOpportunityConversionStartDate(startDate.toISOString()));
        dispatch(setOpportunityConversionEndDate(endDate.toISOString()));
    }

    const opportunityConversionStateDataDefault = modifiedStatesList[0];
    const opportunityConversionMarketDataDefault = modifiedMarketList[0];

    const popUpSettings = {
        width: '208px'
    }

    useEffect(() => {
        dispatch(setOpportunityConversionStartDate(startDate.toISOString()));
        dispatch(setOpportunityConversionEndDate(endDate.toISOString()));
        dispatch(setOpportunityConversionState(modifiedStatesList[0]));
        dispatch(setOpportunityConversionMarket(modifiedMarketList[0]));
    }, [dispatch, statesData, saleMarketData]);

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerOpportunityConversionFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='State'>
                                <DropDown id={"opportunity-conversion-state-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOpportunityConversionState(e))} value={opportunityConversionState} defaultValue={opportunityConversionStateDataDefault} datalist={modifiedStatesList} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Market'>
                                <DropDown id={"opportunity-conversion-market-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setOpportunityConversionMarket(e))} value={opportunityConversionMarket} defaultValue={opportunityConversionMarketDataDefault} datalist={modifiedMarketList} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Start Date'>
                                <DatePickerWidget id={"opportunity-conversion-start-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={opportunityConversionStartDate} setValue={(e) => dispatch(setOpportunityConversionStartDate(e))} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='End Date'>
                                <DatePickerWidget id={"opportunity-conversion-date-drop"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={opportunityConversionEndDate} setValue={(e) => dispatch(setOpportunityConversionEndDate(e))} />
                            </FilterFormGroup>
                        </div>
                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashBoarOpportunityConversionFilter;
