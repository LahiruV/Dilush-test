import { getAxiosInstance } from "@peerless/services";
import { EnduserAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetEndUserCustomersUrl = EnduserAPI.Get_EndUser_Customers;
const SaveEnduserUrl = EnduserAPI.Save_Enduser;
const IsEndUserCodeExistUrl = EnduserAPI.Is_EndUser_Code_Exist;

const fetchEnduserCustomerData = async (payload: any) => {
    const response = await getAxiosInstance().post(GetEndUserCustomersUrl, payload.args);
    return response.data;
};

export const getEnduserCustomerData = (payload: any) => {    
    return useQuery({
        queryKey: ['GetEnduserCustomerData', payload],
        queryFn: () => fetchEnduserCustomerData(payload),
        enabled: payload.enabled,
    });
};

export const saveEnduser = async (payload: any) => {
    try {
      const response = await getAxiosInstance().post(SaveEnduserUrl, payload);
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

const fetchIsEndUserCodeExist = async (payload: any) => {
  const response = await getAxiosInstance().post(IsEndUserCodeExistUrl, payload.args);
  return response.data;
};

export const getIsEndUserCodeExist = (payload: any) => {  
  return useQuery({
      queryKey: ['GetIsEndUserCodeExist', payload],
      queryFn: () => fetchIsEndUserCodeExist(payload),
      enabled: payload.enabled,
  });
};
