import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAcByRegAchievementRadio, setAcByRegFiltersReq, setAcByRegMonthDropdown, setAcByRegSalesDropdown, setAcByRegYearDropdown, setIsAcByRegFilters, setTriggerAcByRegFormSubmit, } from '@peerless-cms/store';
import { useEffect, useState } from 'react';
import { ButtonWidget, DropDown, FilterNonButton, RadioButtonWidget } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features';

const dropDownDataSales = [
    { text: "Sales in Tonnes", value: 2, id: 1 },
    { text: "Sales in Dollars", value: 1, id: 2 },
];
const monthDropData = [
    { text: "July", value: 7, id: 1 },
    { text: "August", value: 8, id: 2 },
    { text: "September", value: 9, id: 3 },
    { text: "October", value: 10, id: 4 },
    { text: "November", value: 11, id: 5 },
    { text: "December", value: 12, id: 6 },
    { text: "January", value: 1, id: 7 },
    { text: "February", value: 2, id: 8 },
    { text: "March", value: 3, id: 9 },
    { text: "April", value: 4, id: 10 },
    { text: "May", value: 5, id: 11 },
    { text: "June", value: 6, id: 12 },
];
const yearDropData = [
    { text: "This Year", value: 1, id: 1 },
    { text: "Last Year", value: 2, id: 2 },
]

export interface DashAchievementByRegionFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
}

export function DashAchievementByRegionFilter(props: DashAchievementByRegionFilterProps) {
    const dispatch = useDispatch();
    const { acByRegFilters, isFormSubmit, acByRegSalesDropdown, acByRegMonthDropdown, acByRegYearDropdown, acByRegAchievementRadio } = useSelector((state: RootState) => state.dashboardAchievementByRegion);
    // const [salesDropDown, setSalesDropDown] = useState(dropDownDataSales[0]);
    // const [monthDropDown, setMonthDropDown] = useState(monthDropData[0]);
    // const [yearDropDown, setYearDropDown] = useState(yearDropData[0]);
    // const [radio, setRadio] = useState("1");


    useEffect(() => {
        dispatch(setAcByRegSalesDropdown(dropDownDataSales[0]));
        dispatch(setAcByRegMonthDropdown(monthDropData[0]));
        dispatch(setAcByRegYearDropdown(yearDropData[0]));
        dispatch(setAcByRegAchievementRadio("1"));
    }, [dispatch]);


    const clearFilters = () => {
        dispatch(setAcByRegSalesDropdown(dropDownDataSales[0]));
        dispatch(setAcByRegMonthDropdown(monthDropData[0]));
        dispatch(setAcByRegYearDropdown(yearDropData[0]));
        dispatch(setAcByRegAchievementRadio("1"));
    }

    const salesDropDownDefault = dropDownDataSales[0];
    const monthDropDownDefault = monthDropData[0];
    const yearDropDownDefault = yearDropData[0];

    const loadSalesAchievement = async () => {
        dispatch(setAcByRegFiltersReq(acByRegFilters))
        dispatch(setIsAcByRegFilters(true));
    }

    const popUpSettings = {
        width: '208px'
    }

    const { formComponentRef } = useFilterForm({ isFormSubmit, setTriggerSubmit: (value) => dispatch(setTriggerAcByRegFormSubmit(value)), isClearFilters: props.isClearFilters, clearFilters });

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={loadSalesAchievement} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Sales'>
                                <DropDown id={"achievement-by-region-sales-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setAcByRegSalesDropdown(e))} value={acByRegSalesDropdown} defaultValue={salesDropDownDefault} datalist={dropDownDataSales} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                            </FilterFormGroup>
                        </div>

                        {
                            acByRegAchievementRadio === "1" ?
                                <div>
                                    <FilterFormGroup label='Month'>
                                        <DropDown id={"achievement-by-region-month-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setAcByRegMonthDropdown(e))} value={acByRegMonthDropdown} defaultValue={monthDropDownDefault} datalist={monthDropData} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                                    </FilterFormGroup>
                                </div>
                                :
                                <div>
                                    <FilterFormGroup label='Year'>
                                        <DropDown id={"achievement-by-region-year-drop"} className={"dashboard-filter filter-form-filter"} setValue={(e) => dispatch(setAcByRegYearDropdown(e))} value={acByRegYearDropdown} defaultValue={yearDropDownDefault} datalist={yearDropData} textField={"text"} dataItemKey={"value"} fillMode={"solid"} size={"small"} popupSettings={popUpSettings} />
                                    </FilterFormGroup>
                                </div>
                        }

                        <div>
                            <FilterFormGroup label='Month' hasColumns>
                                <RadioButtonWidget id='achievement-by-region-radio-monthly' className="dash-radio-button-area" name="chartType2" value="1" checked={acByRegAchievementRadio === "1"} label={"Monthly"} setValue={(e) => dispatch(setAcByRegAchievementRadio(e))} />
                                <RadioButtonWidget id='achievement-by-region-radio-yearly' className="dash-radio-button-area" name="chartType2" value="2" checked={acByRegAchievementRadio === "2"} label={"Yearly"} setValue={(e) => dispatch(setAcByRegAchievementRadio(e))} />
                            </FilterFormGroup>
                        </div>

                        {/* <ButtonWidget id='achievement-by-region-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isAcByRegFilters} isFetching={true} /> */}

                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>
        </>
    );
}

export default DashAchievementByRegionFilter;