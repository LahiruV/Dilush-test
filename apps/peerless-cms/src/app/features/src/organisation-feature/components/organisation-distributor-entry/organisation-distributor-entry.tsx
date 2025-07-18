import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CustomersDetails } from "../../../leeds-and-customers-feature/components";
import { updateDetails } from "@peerless-cms/store";

export interface OrganisationDistributorEntryProps {}

export function OrganisationDistributorEntry(props: OrganisationDistributorEntryProps) {
    const dispatch = useDispatch();    
    
    useEffect(() => {
        dispatch(updateDetails(false));
        // dispatch(setOrganisationEnduserPageMode(pageModeEnum.Edit));       
    }, [dispatch]);

    return (
        <div className="customer-enduser-container">
            <CustomersDetails hideHeader={true} isFromOrganisation={true} />
        </div>        
    )

}