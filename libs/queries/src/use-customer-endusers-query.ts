import { getAxiosInstance } from "@peerless/services";
import { CustomerAPI, EnduserAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetCustomerEndusersUrl = EnduserAPI.Get_Customer_EndUsers;
const GetNewCustomerDataAndCountUrl = CustomerAPI.Get_New_Customer_Data_And_Count;
const SaveEndUserTransferUrl = EnduserAPI.Save_EndUser_Transfer;

const fetchMainLeadListData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: {args: any, status: string} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: {args: any, status: string} } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {
    const response = await getAxiosInstance().post<any>(
      GetCustomerEndusersUrl + '?sStatus=' + payload.status, 
      payload.args 
    );

    const  items = response.data;
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

export const getCustomerEndusersList = (payload: any, initialRowCount = 50) => {  
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
      queryKey: ['customer-endusers-list', payload],
      queryFn: fetchMainLeadListData,
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
  
    const customerEndusersData = data?.pages.flatMap(page => page.data) || [];

    return {
        customerEndusersData,
        error,
        status,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage, 
        refetch,
    };
};

const fetchNewCustomerLookupData = async (payload: {args: any}) => {
  const response = await getAxiosInstance().post(GetNewCustomerDataAndCountUrl, payload.args);
  return response.data;
};

export const useNewCustomerData = (payload: {args: any}) => {
  return useQuery({
    queryKey: ['queryBasedLookupData', payload],
    queryFn: () => fetchNewCustomerLookupData(payload),
    enabled: !!payload,
  });
};

export const saveEnduserTransfer = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveEndUserTransferUrl, payload);
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