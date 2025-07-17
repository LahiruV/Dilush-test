import { getAxiosInstance } from "@peerless/services";
import { SalesAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";

const GetClaimsUrl = SalesAPI.Get_Claims;
const GetClaimDetailUrl = SalesAPI.Get_Claim_Detai;

const fetchClaimsEnquiryData = async (args: any) => {
    const response = await getAxiosInstance().post(GetClaimsUrl, args);
    return response.data;
};

export const getClaimsEnquiry = (args: any, enabled: boolean) => {
    return useQuery({
        queryKey: ['GetClaimsEnquiry', args],
        queryFn: () => fetchClaimsEnquiryData(args),
        enabled: enabled,
    });
};

const fetchClaimsDetailsData = async (args: any) => {
    const response = await getAxiosInstance().post(GetClaimDetailUrl + "?claimNo=" + args.claimNo);
    return response.data;
};

export const GetClaimDetail = (args: any, enabled: boolean) => {
    return useQuery({
        queryKey: ['GetClaimDetail', args],
        queryFn: () => fetchClaimsDetailsData(args),
        enabled: enabled,
    });
};