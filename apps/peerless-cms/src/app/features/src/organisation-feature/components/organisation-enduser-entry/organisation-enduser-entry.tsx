import { useEffect } from "react";
import { EnduserDetails } from "../../../leeds-and-customers-feature/components";
import { useDispatch, useSelector } from "react-redux";
import { pageModeEnum, RootState, setEnduserDetailPageMode, setOrganisationEnduserPageMode, updateDetails } from "@peerless-cms/store";

export interface OrganisationEnduserEntryProps {}

export function OrganisationEnduserEntry(props: OrganisationEnduserEntryProps) {
    const dispatch = useDispatch();    
    
    useEffect(() => {
        dispatch(updateDetails(false));
        dispatch(setEnduserDetailPageMode(pageModeEnum.Edit));     
        dispatch(setOrganisationEnduserPageMode(pageModeEnum.Edit));       
    }, [dispatch]);

    return (
        <div className="customer-enduser-container">
            <EnduserDetails hideHeader={true} addSelectedCustomerAsDistributor={true} returnOnSuccess={true} isOrganisationEnduser={true} />
        </div>        
    )
}