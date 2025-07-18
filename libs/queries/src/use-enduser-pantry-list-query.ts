import { getAxiosInstance } from "@peerless/services";
import { CatalogAPI, CommonAPI, contactTypeEnum } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCustomerPantryList } from "./use-customer-pantry-list-query";

const GetCustomerPantrylistUrl = CatalogAPI.Get_Customer_Pantry_List;
const UpdateCustomerPantrylistItemUrl = CatalogAPI.Update_Customer_Pantry_List_Item;

const fetchEnduserPantryList = async (payload: any) => {
    const response = await getAxiosInstance().post(GetCustomerPantrylistUrl, payload);
    return response.data;
};

const getEnduserPantryList = (payload: any) => {       
    return useQuery({
        queryKey: ['EnduserPantryList', payload],
        queryFn: () => fetchEnduserPantryList(payload),
    });
};

export const getPantryList = (payload: any, contactType: any) => {       
  if(contactType == contactTypeEnum.customer){
    return getCustomerPantryList(payload);
  }
  else{ //enduser
    return getEnduserPantryList(payload);
  }
};

export const updateCustomerPantrylistItem = async (payload: any) => {
    try {
      const response = await getAxiosInstance().post(UpdateCustomerPantrylistItemUrl + '?catlogCode=' + payload.catlogCode + '&isUsed=' + payload.isUsed, payload.pantrylistId);
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