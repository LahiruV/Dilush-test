import { getAxiosInstance } from "@peerless/services";
import { SalesAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";

const GetStockEnquiryUrl = SalesAPI.Get_Stock_Enquiry;

const fetchStockEnquiryData = async (args: any) => {
    const response = await getAxiosInstance().post(GetStockEnquiryUrl, args);
    return response.data;
};

export const getStockEnquiry = (args: any, enabled: boolean) => {
    return useQuery({
        queryKey: ['GetClaimsEnquiry', args],
        queryFn: () => fetchStockEnquiryData(args),
        enabled: enabled,
    });
};