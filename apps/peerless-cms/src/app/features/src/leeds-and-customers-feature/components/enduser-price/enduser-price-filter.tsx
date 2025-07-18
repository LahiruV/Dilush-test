import { RootState, setEnduserPriceFilterDistributor, setIsEnduserPriceFilterQueryEnabled } from "@peerless-cms/store";
import { DropDown } from "@peerless/controls";
import { getEnduserCustomerData } from "@peerless/queries";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export interface EnduserPriceFilterProps { }

export function EnduserPriceFilters(props: EnduserPriceFilterProps) {
    const dispatch = useDispatch();
    const [selectedDistributor, setSelectedDistributor] = useState({ text: 'Loading...', value: '' });
    const [defaultDistributor, setDefaultDistributor] = useState<any>();

    const { selectedLeedOrCustomer, originator, childOriginators, selectedEUPDistributor } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        originator: state.header.selectedOriginator,
        childOriginators: state.header.childOriginators,
        selectedEUPDistributor: state.enduserPriceFilters.selectedDistributor,
    }));

    let distributorList: any = [];
    let euCustPayload = {
        args: {
            ChildOriginators: childOriginators,
            DefaultDepartmentId: originator.defaultDepartmentId,
            Originator: originator.userName,
            CustomerCode: selectedLeedOrCustomer.customerCode,
            EnduserCode: selectedLeedOrCustomer.endUserCode,
            StartIndex: 1,
            RowCount: 1000
        },
        enabled: (childOriginators != null && originator != null && selectedLeedOrCustomer != null)
    }
    const { data: enduserCustomerData, error, isLoading } = getEnduserCustomerData(euCustPayload);

    if (isLoading)
        distributorList = [];

    if (enduserCustomerData) {
        distributorList = enduserCustomerData.map((item: any) => ({
            text: item.name,
            value: item.customerCode,
        }));
    }

    useEffect(() => {
        if (enduserCustomerData) {
            let primaryDist = enduserCustomerData.find((item: any) => item.primaryDist == 'Y');
            let defaultDist = distributorList.find((item: any) => item.value == primaryDist.customerCode);
            if (selectedEUPDistributor == null || selectedEUPDistributor.text == undefined) {
                setSelectedDistributor(defaultDist);
            }
            else {
                setSelectedDistributor(selectedEUPDistributor);
            }
            setDefaultDistributor(defaultDist);
        }
    }, [enduserCustomerData, selectedEUPDistributor]);

    const onFilterClick = () => { //just to fire the event      
        dispatch(setEnduserPriceFilterDistributor(selectedDistributor));
        dispatch(setIsEnduserPriceFilterQueryEnabled(true));
    }

    const euPricePopUpSettings = {
        width: '150px'
    }

    return (
        <div className="sales-history-filter-container">
            <span className="filter-title">Filters</span>
            <div>
                <div className='dashboard-filter-header'> Distributor </div>
                <DropDown id={"activity-rep-drop"} className={"dashboard-filter"} setValue={(e) => (e == null ? setSelectedDistributor(defaultDistributor) : setSelectedDistributor(e))} value={selectedDistributor}
                    datalist={distributorList} textField={"text"} dataItemKey={"value"} fillMode={"outline"} size={"small"} popupSettings={euPricePopUpSettings} />
            </div>
            <button
                id="activity-filter-button"
                className={'k-button-md k-rounded-md k-button-solid k-button-solid-tertiary dash-filter-button dash-filter-btn'}
                onClick={onFilterClick}>
                Filter
            </button>

        </ div>
    );

}