import { useDispatch, useSelector } from "react-redux";
import { EnduserDetails } from "../enduser-details/enduser-details";
import { useEffect } from "react";
import { pageModeEnum, RootState, setEnduserDetailPageMode, updateDetails } from "@peerless-cms/store";
import './customer-enduser-entry.css';

export interface CustomersEnduserEntryProps {}

export function CustomerEnduserEntry(props: CustomersEnduserEntryProps) {
    const dispatch = useDispatch();    
    const { selectedLeedOrCustomer, customerEnduserPageMode } = useSelector((state: RootState) => ({    
        selectedLeedOrCustomer: state.leedsAndCustomers.selectedLeedOrCustomer,
        customerEnduserPageMode: state.leedsAndCustomers.customerEnduserPageMode
      }));

    useEffect(() => {
        dispatch(updateDetails(false));
        if(customerEnduserPageMode == pageModeEnum.New){
            dispatch(setEnduserDetailPageMode(pageModeEnum.New));
        }
        else{
            dispatch(setEnduserDetailPageMode(pageModeEnum.Edit));
        }
        
    }, [dispatch, customerEnduserPageMode])

    return (
        <div className="customer-enduser-container">
            <EnduserDetails hideHeader={true} addSelectedCustomerAsDistributor={true} returnOnSuccess={true} isCustomerEnduser={true} />
        </div>
        
    )
}