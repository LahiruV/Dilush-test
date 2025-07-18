import { useDispatch, useSelector } from 'react-redux';
import { RootState, setBusinessSalesEnqGroupBy, setBusinessSalesEnqSortBy, setBusinessSalesEnqSales, setIsBusinessSalesEnqListFetch, setSelectedOriginatorBusinessSalesEnquiry } from '@peerless-cms/store';
import { useState } from 'react';
import { DropDownData } from '@peerless/models';
import { ButtonWidget, ButtonWidgetCollapse, DropDown } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { Collapse } from 'react-bootstrap';

const dropDownDataSales = [
    { text: "Sales in Dollars", value: "D", id: 1 },
    { text: "Sales in Tonnes", value: "T", id: 2 },
    { text: "Sales in Units", value: "U", id: 3 },
];
const dropDownDataSortBy = [
    { text: "MTD (U)", value: "6", id: 1 },
    { text: "YTD (U)", value: "3", id: 2 },
    { text: "MTD ($)", value: "9", id: 3 },
    { text: "YTD ($)", value: "10", id: 4 },
    { text: "Last YTD (U)", value: "11", id: 5 },
    { text: "Last YTD ($)", value: "12", id: 6 },
    { text: "Code", value: "1", id: 7 },
];
const dropDownDataGroupBy = [
    { text: "Bus Area", value: "bus area", id: 1 },
    { text: "Market", value: "market", id: 2 },
    { text: "Brand", value: "brand", id: 3 },
    { text: "Cat Group", value: "cat_group", id: 4 },
    { text: "Sub Group", value: "cat_sub_group", id: 5 },
    { text: "Product", value: "product", id: 6 },
    { text: "Customer", value: "customer", id: 7 },
    { text: "Cust Group", value: "custgroup", id: 8 },
    { text: "Rep. Group", value: "repgroup", id: 9 },
    { text: "Rep", value: "rep", id: 10 },
    { text: "State", value: "state", id: 11 },
    { text: "All Reps", value: "ALL", id: 12 },

];

export interface DashBoardBusinessSalesEnquiryFilterProps { }

export function DashBoardBusinessSalesEnquiryFilter(props: DashBoardBusinessSalesEnquiryFilterProps) {
    const dispatch = useDispatch();
    const [openSortBy, setOpenSortBy] = useState(false);
    const [openSales, setOpenSales] = useState(false);
    const [openGroupBy, setOpenGroupBy] = useState(false);
    const { isBusinessSalesEnqListFetch } = useSelector((state: RootState) => state.dashBoardBusinessSalesEnquiry);
    const { selectedOriginator } = useSelector((state: RootState) => state.header);

    const [salesEnqSales, setSalesEnqSales] = useState<DropDownData>(dropDownDataSales[0]);
    const [salesEnqSortBy, setSalesEnqSortBy] = useState<DropDownData>(dropDownDataSortBy[3]);
    const [salesEnqGroupBy, setSalesEnqGroupBy] = useState<DropDownData>(dropDownDataGroupBy[6]);


    const onFilterClick = async () => {
        dispatch(setSelectedOriginatorBusinessSalesEnquiry(selectedOriginator));
        dispatch(setBusinessSalesEnqSales(salesEnqSales))
        dispatch(setBusinessSalesEnqSortBy(salesEnqSortBy))
        dispatch(setBusinessSalesEnqGroupBy(salesEnqGroupBy))
        dispatch(setIsBusinessSalesEnqListFetch(true));
    };

    const clearFilters = () => {
        setSalesEnqSales(dropDownDataSales[0]);
        setSalesEnqSortBy(dropDownDataSortBy[3]);
        setSalesEnqGroupBy(dropDownDataGroupBy[6]);
    }

    const salesEnqSalesDefault = dropDownDataSales[0];
    const salesEnqSortByDefault = dropDownDataSortBy[3];
    const salesEnqGroupByDefault = dropDownDataGroupBy[6];

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
                    <ButtonWidgetCollapse id={"dash-collapse-sales"} name={"Sales"} classNames={"dash-collapse-button"} numSpaces={29} state={openSales} setState={setOpenSales} />
                </div>
                <Collapse in={openSales}> */}
                <div>
                    <div className='paddingBottom-12'>
                        <div className='dashboard-filter-header'> Sales </div>
                        <DropDown id={"business-sales-enquiry-sales-drop"} className={"dashboard-filter"} setValue={(e) => setSalesEnqSales(e)} value={salesEnqSales} defaultValue={salesEnqSalesDefault} datalist={dropDownDataSales} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                    </div>
                </div>
                {/* </Collapse> */}
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-collapse-sortby"} name={"Sort By"} classNames={"dash-collapse-button"} numSpaces={26} state={openSortBy} setState={setOpenSortBy} />
                </div>
                <Collapse in={openSortBy}> */}
                <div className='paddingBottom-12'>
                    <div className='dashboard-filter-header'> Sort By </div>
                    <DropDown id={"business-sales-enquiry-sort-by-drop"} className={"dashboard-filter"} setValue={(e) => setSalesEnqSortBy(e)} value={salesEnqSortBy} defaultValue={salesEnqSortByDefault} datalist={dropDownDataSortBy} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                {/* </Collapse> */}
                {/* <div>
                    <ButtonWidgetCollapse id={"dash-collapse-groupby"} name={"Group By"} classNames={"dash-collapse-button"} numSpaces={23} state={openGroupBy} setState={setOpenGroupBy} />
                </div>
                <Collapse in={openGroupBy}> */}
                <div>
                    <div className='dashboard-filter-header'> Group By </div>
                    <DropDown id={"business-sales-enquiry-group-by-drop"} className={"dashboard-filter"} setValue={(e) => setSalesEnqGroupBy(e)} value={salesEnqGroupBy} defaultValue={salesEnqGroupByDefault} datalist={dropDownDataGroupBy} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} />
                </div>
                {/* </Collapse> */}
                <ButtonWidget id='business-sales-enquiry-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isBusinessSalesEnqListFetch} isFetching={true} />
            </form>
        </>
    );
}

export default DashBoardBusinessSalesEnquiryFilter;
