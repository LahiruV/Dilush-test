import { getAxiosInstance } from "@peerless/services";
import { EnduserAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetEndUserPricingUrl = EnduserAPI.Get_EndUser_Pricing;
const GetEndUserPricingHistoryUrl = EnduserAPI.Get_EndUser_Pricing_History
const SavePriceListUrl = EnduserAPI.Save_Price_List;

const fetchEnduserPriceList = async (payload: any) => {
    const response = await getAxiosInstance().post(GetEndUserPricingUrl, payload);
    return response.data;
};

export const getEnduserPriceList = (payload: any, enabled: boolean) => {       
    return useQuery({
        queryKey: ['GetEnduserPriceList', payload],
        queryFn: () => fetchEnduserPriceList(payload),
        enabled: enabled
    });
};

const fetchEnduserPriceListHistory = async (payload: any) => {
    const response = await getAxiosInstance().post(GetEndUserPricingHistoryUrl, payload);
    return response.data;
};

export const getEnduserPriceListHistory = (payload: any) => {       
    return useQuery({
        queryKey: ['GetEnduserPriceListHistory', payload],
        queryFn: () => fetchEnduserPriceListHistory(payload),
    });
};

export const saveEnduserPricelist = async (payload: any) => {
    try {
      const response = await getAxiosInstance().post(SavePriceListUrl, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Request failed with status:', error.response?.status);
        console.error('Response data');
      } else {
        console.error('An unexpected error occurred');
      }
      throw error;
    }
}