import { pageModeEnum } from "@peerless-cms/store";
import { getAxiosInstance } from "@peerless/services";
import { TIOAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetResponseTimeUrl = TIOAPI.Get_ResponseTime;
const GetTIOResponseTimeUrl = TIOAPI.Get_TIOResponseTime;
const IsTIOAcceptCustomerUrl = TIOAPI.Is_TIO_Accept_Customer;
const GetTIOEndUserPriceUrl = TIOAPI.Get_TIOEndUserPrice;
const SaveTIOrderUrl = TIOAPI.Save_TIOrder;
const UpdateTIOStatusUrl = TIOAPI.Update_TIOStatus;
const GetTIOEndUserPriceForReAssignUrl = TIOAPI.Get_TIOEndUser_Price_For_ReAssignUrl;
const ResendMailUrl = TIOAPI.Resend_Mail;
const DeleteOrderUrl = TIOAPI.Delete_Order;

const fetchAdminResponseTime = async () => {
  const response = await getAxiosInstance().get(GetResponseTimeUrl);
  return response.data;
};

export const getAdminResponseTime = () => {
  return useQuery({
    queryKey: ['getAdminResponseTime'],
    queryFn: () => fetchAdminResponseTime(),
  });
};

const fetchTIOResponseTime = async (tioNo: any) => {
  const params = {
    tioNo: tioNo,
  };
  const response = await getAxiosInstance().get(GetTIOResponseTimeUrl, { params });
  return response.data;
};

export const getTIOResponseTime = (tioNo: any) => {
  return useQuery({
    queryKey: ['GetTIOResponseTime', tioNo],
    queryFn: () => fetchTIOResponseTime(tioNo),
  });
};

export const getResponseTime = (pageMode: any, tioNo: any) => {
  if (pageMode == pageModeEnum.New) {
    return getAdminResponseTime();
  }
  else {
    return getTIOResponseTime(tioNo);
  }
};

const fetchIsTIOAcceptCustomer = async (custCode: any) => {
  const response = await getAxiosInstance().post(IsTIOAcceptCustomerUrl, custCode);
  return response.data;
};

export const isTIOAcceptCustomer = (custCode: any, enabled: boolean) => {
  return useQuery({
    queryKey: ['IsTIOAcceptCustomer', custCode],
    queryFn: () => fetchIsTIOAcceptCustomer(custCode),
    enabled: enabled && (custCode != null),
  });
};

const fetchTIOEndUserPrice = async (args: any) => {
  const response = await getAxiosInstance().post(GetTIOEndUserPriceUrl, args);
  return response.data;
};

export const getTIOEndUserPrice = (args: any, enabled: boolean) => {
  return useQuery({
    queryKey: ['GetTIOEndUserPrice', args],
    queryFn: () => fetchTIOEndUserPrice(args),
    enabled: enabled,
  });
};

const fetchTIOEndUserPriceForReAssign = async (args: any) => {
  const response = await getAxiosInstance().post(GetTIOEndUserPriceForReAssignUrl, args);
  return response.data;
};

export const getTIOEndUserPriceForReAssign = (args: any, enabled: boolean) => {
  return useQuery({
    queryKey: ['GetTIOEndUserPriceForReAssign', args],
    queryFn: () => fetchTIOEndUserPriceForReAssign(args),
    enabled: enabled,
  });
};

export const saveTIOrder = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveTIOrderUrl, payload);
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

export const reAssignTIOrder = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(UpdateTIOStatusUrl, payload);
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

export const reSendMail = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(ResendMailUrl, payload);
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

export const deleteTIOrder = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(DeleteOrderUrl, payload);
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
