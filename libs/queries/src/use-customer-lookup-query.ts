import { getAxiosInstance } from "@peerless/services";
import { CustomerAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";

const GetCustomerLookupForEnduserEntryUrl = CustomerAPI.Get_Customer_Lookup_For_Enduser_Entry;

const fetchCustomerLookupData = async (payload: any) => {
    const response = await getAxiosInstance().post(GetCustomerLookupForEnduserEntryUrl, payload);
    return response.data;
};

export const getCustomerLookupData = (payload: any, isEnabled = true) => {
    return useQuery({
        queryKey: ['getCustomerLookupData', payload],
        queryFn: () => fetchCustomerLookupData(payload),
        enabled: isEnabled
    });
};