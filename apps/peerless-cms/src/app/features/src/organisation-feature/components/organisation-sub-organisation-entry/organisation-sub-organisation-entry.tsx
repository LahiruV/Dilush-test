import { pageModeEnum, setOrgDetailPageMode, updateDetails } from "@peerless-cms/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { OrganisationDetails } from "../organisation-details/organisation-details";

export interface OrganisationSubOrganisationEntryProps {}

export function OrganisationSubOrganisationEntry(props: OrganisationSubOrganisationEntryProps) {
    const dispatch = useDispatch();    
    
    useEffect(() => {
        dispatch(updateDetails(false));
        dispatch(setOrgDetailPageMode(pageModeEnum.Edit));      
    }, [dispatch]);

    return (
        <div className="customer-enduser-container">
            {/* <EnduserDetails hideHeader={true} addSelectedCustomerAsDistributor={true} returnOnSuccess={true} isOrganisationEnduser={true} /> */}
            <OrganisationDetails hideHeader={true} isSubOrganisation={true} />
        </div>        
    )
}