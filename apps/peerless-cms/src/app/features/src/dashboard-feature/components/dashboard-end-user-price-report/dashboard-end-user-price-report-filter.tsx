import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAsAtDateEndUserPrice, setBaseCodeEndUserPrice, setIsFetchEndUserPriceList, setIsFetchEndUserPriceListReport, setIsPdfView, setRepCodeEndUserPrice, setTriggerEndUserPriceFormSubmit } from '@peerless-cms/store';
import { useEffect, useState } from "react";
import { GetLookup, GetReps } from "@peerless/queries";
import { ButtonWidget, DatePickerWidget, FilterNonButton, MultiColumnComboBoxWidget, ValidationModal } from '@peerless/controls';
import { FilterForm, FilterFormGroup } from '@peerless-cms/features-common-components';
import { DropDownData } from '@peerless/models';
import { dropDownDataConverter } from '@peerless/common';
import { Collapse } from 'react-bootstrap';
import { useFilterForm } from '@peerless-cms/features'

export interface DashBoardEndUserPriceFilterProps {
    isFiltersOpen?: boolean;
    isClearFilters?: boolean;
    setIsActiveFilters?: (isActive: boolean) => void;
    isHandlePDF?: boolean;
    setIsHandlePDF?: (isHandle: boolean) => void;
}

export function DashBoardEndUserPriceFilter(props: DashBoardEndUserPriceFilterProps) {
    const dispatch = useDispatch();
    const { isFetchEndUserPriceList, isFetchEndUserPriceListReport, isFormSubmit } = useSelector((state: RootState) => state.dashboardEndUserPrice);
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

    const { formComponentRef } = useFilterForm({
        isFormSubmit,
        setTriggerSubmit: (value) => dispatch(setTriggerEndUserPriceFormSubmit(value)),
        isClearFilters: props.isClearFilters,
        clearFilters,
        setIsActiveFilters: props.setIsActiveFilters,
        filters: [repCode, baseCode, asAtDate]
    });

    useEffect(() => {
        if (props.isHandlePDF) {
            handlePdfView();
        }
    }, [props.isHandlePDF])

    return (
        <>
            <Collapse in={props.isFiltersOpen}>
                <div className="filters-container">
                    <FilterForm id='filter-form' onSubmit={onFilterClick} ref={formComponentRef}>
                        <div>
                            <FilterFormGroup label='Rep Code'>
                                <MultiColumnComboBoxWidget id={"rep-code-drop-end-user-price"} className={"dashboard-filter filter-form-filter"} setValue={(e) => setRepCode(e)} value={repCode} datalist={allRepsData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='Base Code'>
                                <MultiColumnComboBoxWidget id={"base-code-drop-end-user-price"} className={"dashboard-filter filter-form-filter"} setValue={(e) => setBaseCode(e)} value={baseCode} datalist={allLookupsData} isFilterable={true} textField={"value"} valueField={"text"} columns={[{ field: 'value', header: 'Code', width: '110px' }, { field: 'text', header: 'Name', width: '300px' }]} />
                            </FilterFormGroup>
                        </div>

                        <div>
                            <FilterFormGroup label='As At Date'>
                                <DatePickerWidget id={"as-at-date-end-user-price"} className={"dashboard-filter filter-form-filter"} size={"small"} format={"dd/MM/yyyy"} fillMode={'solid'} value={asAtDate} setValue={(e) => setAsAtDate(e)} />
                            </FilterFormGroup>
                        </div>

                        {/* <ButtonWidget id='end-user-price-filter-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-primary dash-filter-button dash-filter-btn' type='submit' isDisabled={isFetchEndUserPriceList} isFetching={true} /> */}
                        {/* <ButtonWidget id='end-user-price-pdf-button' classNames=' k-button-md k-rounded-md k-button-solid k-button-solid-dark dash-excel-button' isDisabled={isFetchEndUserPriceListReport} Function={handlePdfView} name='Print' /> */}

                        <FilterNonButton type='submit' />
                    </FilterForm>
                </div>
            </Collapse>

            <div>
                {visible && (
                    <ValidationModal title={'Please Confirm'} message={'Rep code and Date are required fields'} setState={setVisible} />
                )}
            </div>
        </>
    );
}

export default DashBoardEndUserPriceFilter;