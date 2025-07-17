import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAsAtDateEndUserPrice, setBaseCodeEndUserPrice, setIsFetchEndUserPriceList, setIsFetchEndUserPriceListReport, setIsPdfView, setRepCodeEndUserPrice } from '@peerless-cms/store';
import { useEffect, useState } from "react";
import { GetLookup, GetReps } from "@peerless/queries";
import { ButtonWidget, ButtonWidgetCollapse, DatePickerWidget, DropDown, MultiColumnComboBoxWidget, ValidationModal } from '@peerless/controls';
import { ClearFilterBox } from '@peerless-cms/features-common-components';
import { DropDownData } from '@peerless/models';
import { dropDownDataConverter } from '@peerless/common';
import { Collapse } from 'react-bootstrap';

export interface DashBoardEndUserPriceFilterProps { }

export function DashBoardEndUserPriceFilter(props: DashBoardEndUserPriceFilterProps) {
    const dispatch = useDispatch();
    const { isFetchEndUserPriceList, isFetchEndUserPriceListReport } = useSelector((state: RootState) => state.dashboardEndUserPrice);
    const [repCode, setRepCode] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [baseCode, setBaseCode] = useState({ id: 0, text: '', value: '' } as DropDownData);
    const [asAtDate, setAsAtDate] = useState(new Date().toISOString());
    const { loggedUser } = useSelector((state: RootState) => state.header);
    const { data: allReps } = GetReps(true);
    const { data: allLookups } = GetLookup('BACA', true);
    const allRepsData = dropDownDataConverter.dropDownDataConverter(allReps || [], 'name', 'repCode');
    const allLookupsData = dropDownDataConverter.dropDownDataConverter(allLookups || [], 'description', 'tableCode');
    const [visible, setVisible] = useState(false);

    // const modifiedAllLookupsData = [{ id: 0, text: 'All', value: '' }, ...allLookupsData];
    const popUpSettings = {
        width: '150px'
    }

    // const filterRepCode = () => {
    //     const repsFilter: DropDownData[] = allRepsData.filter((rep: DropDownData) => rep.value === loggedUser.repCode);
    //     return repsFilter[0];
    // }

    // const filterBaseCode = () => {
    //     const baseCodeFilter = modifiedAllLookupsData.filter((baseCode) => baseCode.value === modifiedAllLookupsData[0].value);
    //     return baseCodeFilter[0];
    // }

    const onFilterClick = async () => {
        if (!repCode || repCode.value === '' || !asAtDate || asAtDate === '') {
            setVisible(true);
            return;
        }
        dispatch(setIsPdfView(false));
        dispatch(setRepCodeEndUserPrice(repCode));
        dispatch(setBaseCodeEndUserPrice(baseCode));
        dispatch(setAsAtDateEndUserPrice(asAtDate));
        dispatch(setIsFetchEndUserPriceList(true));
    };

    const clearFilters = () => {
        // setRepCode(filterRepCode());
        // setBaseCode(filterBaseCode());  
        setRepCode({ id: 0, text: '', value: '' });
        setBaseCode({ id: 0, text: '', value: '' });
        setAsAtDate(new Date().toISOString());
    };

    // const repCodeDefault = filterRepCode || allRepsData[0];
    // const baseCodeDefault = filterBaseCode || modifiedAllLookupsData[0];

    const handlePdfView = () => {
        if (!repCode || repCode.value === '' || !asAtDate || asAtDate === '') {
            setVisible(true);
            return;
        }
        dispatch(setRepCodeEndUserPrice(repCode));
        dispatch(setBaseCodeEndUserPrice(baseCode));
        dispatch(setAsAtDateEndUserPrice(asAtDate));
        dispatch(setIsPdfView(true));
        dispatch(setIsFetchEndUserPriceListReport(true));
    }

    // useEffect(() => {
    // if (allRepsData) {
    //     setRepCode(filterRepCode || allRepsData[0]);
    // }
    // if (allLookupsData) {
    //     setBaseCode(filterBaseCode || modifiedAllLookupsData[0]);
    // }
    // }, [allReps, allLookups]);


    return (
        <>
            <hr />
            <ClearFilterBox onClick={clearFilters} />
            <form onSubmit={(e) => {
                e.preventDefault();
                onFilterClick();
            }}>
                <div className='paddingBottom-12'>
                    <div className='dashboard-filter-header'> Rep Code </div>
                    <MultiColumnComboBoxWidget id={"rep-code-drop-end-user-price"} className={"dashboard-filter"} setValue={(e) => setRepCode(e)} value={repCode} datalist={allRepsData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                </div>
                <div className='paddingBottom-12'>
                    <div className='dashboard-filter-header'> Base Code </div>
                    {/* <DropDown id={"base-code-drop-end-user-price"} className={"dashboard-filter"} setValue={(e) => setBaseCode(e)} value={baseCode} datalist={allLookupsData} isFilterable={true} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={popUpSettings} /> */}
                    <MultiColumnComboBoxWidget id={"base-code-drop-end-user-price"} className={"dashboard-filter"} setValue={(e) => setBaseCode(e)} value={baseCode} datalist={allLookupsData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                </div>
                <div>
                    <div className='dashboard-filter-header'> As At Date </div>
                    <DatePickerWidget id={"as-at-date-end-user-price"} className={"dashboard-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'outline'} value={asAtDate} setValue={(e) => setAsAtDate(e)} />
                </div>
                <ButtonWidget id='end-user-price-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isFetchEndUserPriceList} isFetching={true} />
                <ButtonWidget id='end-user-price-pdf-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' isDisabled={isFetchEndUserPriceListReport} Function={handlePdfView} name='Print' />
            </form>
            <div>
                {visible && (
                    <ValidationModal title={'Please Confirm'} message={'Rep code and Date are required fields'} setState={setVisible} />
                )}
            </div>
        </>
    );
}

export default DashBoardEndUserPriceFilter;