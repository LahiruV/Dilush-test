import { getAxiosInstance } from "@peerless/services";
import { contactTypeEnum, CustomerAPI, LeadAPI, OrganisationAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetLeadAddressesUrl = LeadAPI.Get_Lead_Addresses;
const SaveLeadAddressesUrl = LeadAPI.Save_Lead_Address;
const GetCustomerAddressesUrl = CustomerAPI.Get_Customer_Addresses;
const SaveCustomerAddressUrl = CustomerAPI.Save_Customer_Address;
const GetOrganisationAddressesUrl = OrganisationAPI.Get_Organisation_Addresses;
const SaveOrganisationAddressUrl = OrganisationAPI.Save_Address;

const fetchLeadAddressData = async (payload: { leadId: number }) => {
  const response = await getAxiosInstance().get(GetLeadAddressesUrl + '?leadId=' + payload.leadId);
  return response.data;
};

const fetchCustomerAddressData = async (payload: { custCode: number, args: any }) => {
  const response = await getAxiosInstance().post(GetCustomerAddressesUrl + '?customerCode=' + payload.custCode, payload.args);
  return response.data;
};

const fetchOrganisationAddressData = async (payload: any) => {
  const response = await getAxiosInstance().get(GetOrganisationAddressesUrl, {
    params: {
      OrgId: payload.OrgId
    }
  });
  return response.data;
};

export const useLeadCustomerAddressData = (payload: any) => {
  let fetchAddresses: any;
  if (payload.contactType == contactTypeEnum.lead) {
    fetchAddresses = fetchLeadAddressData;
  }
  else if (payload.contactType == contactTypeEnum.customer) {
    fetchAddresses = fetchCustomerAddressData;
  }
  else { //organisation
    fetchAddresses = fetchOrganisationAddressData;
  }
  return useQuery({
    queryKey: ['GetLeadCustomerAddresses', payload],
    queryFn: () => fetchAddresses(payload),
    enabled: !!payload,
  });
};

const saveLeadAddress = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveLeadAddressesUrl + '?leadAddressId=' + payload.LeadAddressID, payload);
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

const saveCustomerAddress = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveCustomerAddressUrl, payload);
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

const saveOrganisationAddress = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveOrganisationAddressUrl, payload);
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

export const saveLeadCustomerAddress = async ({ payload, contactType }: { payload: any; contactType: string }): Promise<any> => {
  if (contactType == contactTypeEnum.lead) {
    return saveLeadAddress(payload);
  }
  else if (contactType == contactTypeEnum.customer) {
    return saveCustomerAddress(payload);
  }
  else { //organisation
    return saveOrganisationAddress(payload);
  }
};

