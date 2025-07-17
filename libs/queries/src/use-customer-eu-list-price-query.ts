import { getAxiosInstance } from "@peerless/services";
import { EnduserAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const GetCustomerEndUserPricing = EnduserAPI.Get_Customer_EndUser_Pricing;
const SaveCustomerPriceListUrl = EnduserAPI.Save_Customer_Price_List;


const fetchCustomerEUPriceListData = async (args: any) => {
    const response = await getAxiosInstance().post(GetCustomerEndUserPricing, args);
    return response.data;
  };
  
  export const useCustomerEUPriceListData = (args: any, enabled: boolean) => {
    return useQuery({
        queryKey: ['customerEUPriceListData', args.CustomerCode],
        queryFn: () => fetchCustomerEUPriceListData(args),
        enabled: enabled
    });
  };

  export const saveCustomerPriceList = async (payload: any) => {
    try {
      const response = await getAxiosInstance().post(SaveCustomerPriceListUrl, payload);
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
  