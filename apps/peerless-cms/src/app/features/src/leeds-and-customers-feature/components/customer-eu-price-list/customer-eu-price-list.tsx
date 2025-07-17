import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setCustomerEUListPricePageMode, setcustomerEUPriceList, setIsEnduserPriceFilterQueryEnabled } from "@peerless-cms/store";
import { contactId, contactTypeEnum } from "@peerless/utils";
import { getEnduserPriceList, useCustomerEUPriceListData } from "@peerless/queries";
import { format } from "date-fns";
import './customer-eu-price-list.css'
import { CustomerEUPriceListTable } from "@peerless-cms/features";
import { useEffect, useState } from "react";

export interface CustomerEUPriceListProps {}

export function CustomerEUPriceList(props: CustomerEUPriceListProps) {
    const dispatch = useDispatch();
    const [isCustomerEUPriceQueryEnabled, setIsCustomerEUPriceQueryEnabled] = useState(false);
    const { selectedLeedOrCustomer, contactType, isEUPriceQueryEnabled, childOriginators, originator, selectedDistributor } = useSelector((state: RootState) => ({
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,         
        contactType: state.leedsAndCustomers.selectedContactType,
        isEUPriceQueryEnabled: state.enduserPriceFilters.isEUPriceQueryEnabled,
        childOriginators: state.header.childOriginators,
        originator: state.header.selectedOriginator,
        selectedDistributor: state.enduserPriceFilters.selectedDistributor,
    }));

    useEffect(() => {
        if(dispatch)
            dispatch(setCustomerEUListPricePageMode(pageModeEnum.List))
            //dispatch(setIsEnduserPriceFilterQueryEnabled(false));
            //dispatch(setcustomerEUPriceList(null));
    }, [dispatch]);

    useEffect(() => {
        if(contactType){
            if(contactType == contactTypeEnum.customer){
                setIsCustomerEUPriceQueryEnabled(true);
                dispatch(setIsEnduserPriceFilterQueryEnabled(false));
            }
            else{
                setIsCustomerEUPriceQueryEnabled(false);                
            }
        }            
    }, [contactType]);
    
    let customerArgs = {
        CustomerCode: selectedLeedOrCustomer.customerCode,
        ManagerMode: true,
        CustomerType: "EndUser",
        EffectiveDate: format(new Date(), 'dd-MMM-yyyy'),
        StartIndex: 1,
        RowCount: 1000
    }

    const { data: customerEUPriceListData, status: customerStatus, error: customerEUPriceListDataError, isLoading: isCustomerEUPriceListDataLoading } = useCustomerEUPriceListData(customerArgs, isCustomerEUPriceQueryEnabled); //for customer

    let enduserArgs = {
        ChildOriginators: childOriginators,
        DefaultDepartmentId: originator.defaultDepartmentId,
        Originator: originator.userName,
        CustomerCode: selectedDistributor.value,
        EnduserCode: selectedLeedOrCustomer.endUserCode,
        ManagerMode: true,
        CustomerType: 'EndUser',
        EffectiveDate: format(new Date(), 'dd-MMM-yyyy'),
        StartIndex: 1,
        RowCount: 1000,
        OrderBy: 'catlog_code ASC'
    }

    const { data: enduserPriceListData, status: enduserStatus, error: enduserPriceListDataError, isLoading: isEnduserPriceListDataLoading } = getEnduserPriceList(enduserArgs, isEUPriceQueryEnabled); //for enduser
                
    useEffect(() => {
        if(contactType == contactTypeEnum.customer){
            if(!isCustomerEUPriceListDataLoading && customerEUPriceListData){
                dispatch(setcustomerEUPriceList(customerEUPriceListData));
            }
        }
        else{ //enduser
            if(!isEnduserPriceListDataLoading && enduserPriceListData){
                dispatch(setcustomerEUPriceList(enduserPriceListData));
            }
        }        
    }, [customerEUPriceListData, enduserPriceListData, contactType]);

    const getDataView = () => {
        let tableContent: any = null;
        if (contactType == contactTypeEnum.customer) {
            tableContent = (<CustomerEUPriceListTable isLoading={isCustomerEUPriceListDataLoading} status={customerStatus} error={customerEUPriceListDataError} />);
        }
        else{
            if(isEUPriceQueryEnabled){
                tableContent = (<CustomerEUPriceListTable isLoading={isEnduserPriceListDataLoading} status={enduserStatus} error={enduserPriceListDataError} />);
            }
            else{
                tableContent = (<div className="empty-table">Click on filter to view and edit price list</ div>);
            }
        }
        return tableContent;
    }
   
    const effectiveDate = (
        (contactType == contactTypeEnum.customer)? (customerEUPriceListData && customerEUPriceListData.length > 0 && customerEUPriceListData[0].effectiveDateString)
        : (enduserPriceListData && enduserPriceListData.length > 0 && enduserPriceListData[0].effectiveDateString)
    );

    const lastUpdatedDate = (
        (contactType == contactTypeEnum.customer)? (customerEUPriceListData && customerEUPriceListData.length > 0 && customerEUPriceListData[0].lastUpdatedString)
        : (enduserPriceListData && enduserPriceListData.length > 0 && enduserPriceListData[0].lastUpdatedString)
    );

    return (
        <div>
            <span className="eu-date-string">Effective Date : </span> <span className="eu-date-string-data">{effectiveDate} </span>
            <span className="eu-date-string">Last Updated : </span> <span className="eu-date-string-data">{lastUpdatedDate}</span>
            {getDataView()}
        </div>
    )
}


