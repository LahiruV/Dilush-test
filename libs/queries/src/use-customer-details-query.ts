import { Customer } from '@peerless/models';
import { getAxiosInstance } from '@peerless/services';
import { contactTypeEnum, CustomerAPI, EnduserAPI, LeadAPI } from '@peerless/utils';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getCustomerUrl = CustomerAPI.Get_Customer;
const updateCustomerUrl = CustomerAPI.Save_TIO_Email;
const hideCustomerUrl = CustomerAPI.Hide_Customer;
const setActiveStatusUrl = EnduserAPI.Set_Active_Status;
const changeLeadStatusUrl = LeadAPI.Change_Lead_Status;

const fetchCustomer = async (payload: { customerCode: string }) => {
  const response = await getAxiosInstance().get<Customer>(getCustomerUrl + '?customerCode=' + payload.customerCode);
  return response.data;
};

export const getCustomer = (payload: { customerCode: string }) => {
  return useQuery({
    queryKey: ['getCustomerByCode', payload],
    queryFn: () => fetchCustomer(payload),
    enabled: !!payload,
  });
};

export const updateCustomer = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(updateCustomerUrl + '?custCode=' + payload.CustCode + '&emails=' + payload.Emails + '&grade=' + payload.Grade + '&originator=' + payload.Originator);
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
};

const toggleCustomerActiveStatus = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(hideCustomerUrl, payload);
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
};

const toggleEnduserActiveStatus = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(setActiveStatusUrl, payload);
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
};

const toggleLeadActiveStatus = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(changeLeadStatusUrl, payload);
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
};

export const toggleUserActiveStatus = async (payload: any): Promise<any> => {
  if (payload.contactType == contactTypeEnum.customer) {
    return toggleCustomerActiveStatus(payload.args);
  }
  else if (payload.contactType == contactTypeEnum.lead) {
    //lead
    return toggleLeadActiveStatus(payload.args);
  }
  else {
    //enduser
    return toggleEnduserActiveStatus(payload.args);
  }
};