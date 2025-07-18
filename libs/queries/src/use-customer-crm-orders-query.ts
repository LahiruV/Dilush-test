import { getAxiosInstance } from "@peerless/services";
import { contactTypeEnum, CustomerOrderAPI, TIOAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { any } from "zod";

const GetCustomerOrdersUrl = CustomerOrderAPI.Get_Customer_Orders;
const GetCustomerOrderDetailsUrl = CustomerOrderAPI.Get_Customer_Order_Details;
const GetAddressesUrl = CustomerOrderAPI.Get_Addresses;
const GetCustomerOrderEndUserPriceUrl = CustomerOrderAPI.Get_Customer_Order_EndUser_Price;
const SaveCustomerOrderUrl = CustomerOrderAPI.Save_Customer_Order;
const CompleteCustomerOrderUrl = CustomerOrderAPI.Complete_Customer_Order;
const GetTIOrdersUrl = TIOAPI.Get_TIOrders;
const GetTIODetailsUrl = TIOAPI.Get_TIODetails;
const GetTIOEmailsUrl = TIOAPI.Get_TIOEmails;


const fetchCustomerCrmOrderList = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: { args: any } } }):
  Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;

  try {
    const response = await getAxiosInstance().post<any>(
      GetCustomerOrdersUrl,
      payload.args
    );

    const items = response.data;
    const nextStartIndex = startIndex + 1;
    const hasMoreData = items.length === rowCount;

    return {
      data: items,
      nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
    };
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

export const getCustomerCrmOrderList = (payload: any, initialRowCount = 50) => {
  const {
    data,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['customer-crm-order-list', payload],
    queryFn: fetchCustomerCrmOrderList,
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  });

  const customerCrmOrderData = data?.pages.flatMap(page => page.data) || [];

  return {
    customerCrmOrderData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};

const fetchEnduserTIOrderList = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: { args: any } } }):
  Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;

  try {
    const response = await getAxiosInstance().post<any>(
      GetTIOrdersUrl,
      payload.args
    );

    const items = response.data;
    const nextStartIndex = startIndex + 1;
    const hasMoreData = items.length === rowCount;

    return {
      data: items,
      nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
    };
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

export const getEnduserTIOrderList = (payload: any, initialRowCount = 50) => {
  const {
    data,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['enduser-tio-order-list', payload],
    queryFn: fetchEnduserTIOrderList,
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  });

  const customerCrmOrderData: any = data?.pages.flatMap(page => page.data) || [];

  return {
    customerCrmOrderData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};

export const getOrderList = (payload: any, initialRowCount = 50, contactType: any) => {
  if (contactType == contactTypeEnum.customer) {
    return getCustomerCrmOrderList(payload, initialRowCount);
  }
  else { //enduser
    return getEnduserTIOrderList(payload, initialRowCount);
  }
};

const fetchCustomerOrderDetails = async (args: any) => {
  const response = await getAxiosInstance().get(GetCustomerOrderDetailsUrl, {
    params: {
      oderNumber: args.oderNumber
    }
  });
  return response.data;
};

export const useCustomerOrderDetails = (args: any) => {
  return useQuery({
    queryKey: ['getCustomerOrderDetails', args],
    queryFn: () => fetchCustomerOrderDetails(args),
    enabled: args.oderNumber != -1
  });
};

const fetchEnduserTIOrderDetails = async (args: any) => {
  const response = await getAxiosInstance().post(GetTIODetailsUrl, args.oderNumber);
  return response.data;
};

export const useEnduserTIOrderDetails = (args: any) => {
  return useQuery({
    queryKey: ['useEnduserTIOrderDetails', args],
    queryFn: () => fetchEnduserTIOrderDetails(args),
    enabled: args.oderNumber != -1
  });
};

export const useOrderDetails = (args: any, contactType: any) => {
  if (contactType == contactTypeEnum.customer) {
    return useCustomerOrderDetails(args);
  }
  else { //enduser
    return useEnduserTIOrderDetails(args);
  }
};

const fetchCustomerAddressData = async (args: any) => {
  const response = await getAxiosInstance().get(GetAddressesUrl, {
    params: {
      custCode: args.custCode
    }
  });
  return response.data;
};



export const useCustomerAddressData = (args: any) => {
  return useQuery({
    queryKey: ['getCustomerAddressData', args],
    queryFn: () => fetchCustomerAddressData(args),
  });
};

const fetchEnduserEmailAddressData = async (args: any) => {
  const response = await getAxiosInstance().post(GetTIOEmailsUrl, args);
  return response.data;
};

export const useEnduserEmailAddressData = (args: any) => {
  return useQuery({
    queryKey: ['getEnduserEmailAddressData', args],
    queryFn: () => fetchEnduserEmailAddressData(args),
  });
};

export const getEmailAddresses = (args: any, contactType: any) => {
  if (contactType == contactTypeEnum.customer) {
    return useCustomerAddressData(args);
  }
  else { //enduser
    return useEnduserEmailAddressData(args);
  }
};

const fetchCustomerEnduserPriceData = async (args: any) => {
  const response = await getAxiosInstance().get(GetCustomerOrderEndUserPriceUrl + '?custCode=' + args.custCode + '&repCode=' + args.repCode + '&oderNumber=' + args.oderNumber);
  return response.data;
};

export const useCustomerEnduserPriceData = (args: any, enabled: boolean) => {
  return useQuery({
    queryKey: ['getCustomerEnduserPriceData', args],
    queryFn: () => fetchCustomerEnduserPriceData(args),
    enabled: enabled
  });
};

export const saveCustomerOrder = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveCustomerOrderUrl, payload);
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

export const completeCustomerOrder = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(CompleteCustomerOrderUrl, payload);
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
