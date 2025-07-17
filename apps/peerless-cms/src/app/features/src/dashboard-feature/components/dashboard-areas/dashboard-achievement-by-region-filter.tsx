import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAcByRegAchievementRadio, setAcByRegFiltersReq, setAcByRegMonthDropdown, setAcByRegSalesDropdown, setAcByRegYearDropdown, setIsAcByRegFilters, } from '@peerless-cms/store';
import { useState } from 'react';
import { ButtonWidget, ButtonWidgetCollapse, DropDown, RadioButtonWidget } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

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

export interface DashAchievementByRegionFilterProps { }

export function DashAchievementByRegionFilter(props: DashAchievementByRegionFilterProps) {
    const dispatch = useDispatch();
    const [openSales, setOpenSales] = useState(false);
    const [openZone, setOpenZone] = useState(false);
    const { isAcByRegFilters, acByRegFilters } = useSelector((state: RootState) => state.dashboardAchievementByRegion);
    const [salesDropDown, setSalesDropDown] = useState(dropDownDataSales[0]);
    const [monthDropDown, setMonthDropDown] = useState(monthDropData[0]);
    const [yearDropDown, setYearDropDown] = useState(yearDropData[0]);
    const [radio, setRadio] = useState("1");


    const clearFilters = () => {
        setSalesDropDown(dropDownDataSales[0]);
        setMonthDropDown(monthDropData[0]);
        setYearDropDown(yearDropData[0]);
        setRadio("1");
    }

    const salesDropDownDefault = dropDownDataSales[0];
    const monthDropDownDefault = monthDropData[0];
    const yearDropDownDefault = yearDropData[0];

    const loadSalesAchievement = async () => {
        dispatch(setAcByRegSalesDropdown(salesDropDown));
        dispatch(setAcByRegMonthDropdown(monthDropDown));
        dispatch(setAcByRegYearDropdown(yearDropDown));
        dispatch(setAcByRegAchievementRadio(radio))
        dispatch(setAcByRegFiltersReq(acByRegFilters))
        dispatch(setIsAcByRegFilters(true));
    }

    const popUpSettings = {
        width: '150px'
    }

    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                loadSalesAchievement();
            }}>
                <div className='achievement-by-region-filters'>
                    {/* <div>
                        <ButtonWidgetCollapse id={"dash-collapse-sales"} name={"Sales"} classNames={"dash-collapse-button"} numSpaces={29} state={openSales} setState={setOpenSales} />
                    </div>
                    <Collapse in={openSales}> */}
                    <div className='paddingBottom-12'>
                        <div className='dashboard-filter-header'> Sales </div>
                        <DropDown id={"achievement-by-region-sales-drop"} className={"dashboard-filter"} setValue={(e) => setSalesDropDown(e)} value={salesDropDown} defaultValue={salesDropDownDefault} datalist={dropDownDataSales} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                    </div>
                    {/* </Collapse> */}
                    {/* <div>
                        <ButtonWidgetCollapse id={"dash-collapse-timezone"} name={"Time Zone"} classNames={"dash-collapse-button"} numSpaces={21} state={openZone} setState={setOpenZone} />
                    </div>
                    <Collapse in={openZone}> */}
                    <div>
                        {
                            radio === "1" ?
                                <div>
                                    <div className='dashboard-filter-header'> Month </div>
                                    <DropDown id={"achievement-by-region-month-drop"} className={"dashboard-filter"} setValue={(e) => setMonthDropDown(e)} value={monthDropDown} defaultValue={monthDropDownDefault} datalist={monthDropData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                                </div>
                                :
                                <div className="paddingTop-12">
                                    <div className='dashboard-filter-header'> Year </div>
                                    <DropDown id={"achievement-by-region-year-drop"} className={"dashboard-filter"} setValue={(e) => setYearDropDown(e)} value={yearDropDown} defaultValue={yearDropDownDefault} datalist={yearDropData} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                                </div>
                        }
                        <div className="paddingTop-12">
                            <div className='dashboard-filter-header'> Month </div>
                            <RadioButtonWidget id='achievement-by-region-radio-monthly' className="dash-radio-button-area" name="chartType2" value="1" checked={radio === "1"} label={"Monthly"} setValue={(e) => setRadio(e)} />
                            <RadioButtonWidget id='achievement-by-region-radio-yearly' className="dash-radio-button-area" name="chartType2" value="2" checked={radio === "2"} label={"Yearly"} setValue={(e) => setRadio(e)} />
                        </div>
                    </div>
                    {/* </Collapse> */}
                </div>
                <ButtonWidget id='achievement-by-region-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isAcByRegFilters} isFetching={true} />
            </form>
        </>
    );
}

export default DashAchievementByRegionFilter;