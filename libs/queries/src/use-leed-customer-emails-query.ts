import { getAxiosInstance } from "@peerless/services";
import { contactTypeEnum, CustomerAPI, LeadAPI } from "@peerless/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const GetLeadEmailsUrl = LeadAPI.Get_Lead_Emails;
const GetCustomerEmailsUrl = CustomerAPI.Get_Customer_Emails;

const fetchLeadEmailData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, directoryPath: any, sessionId: any} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, directoryPath: any, sessionId: any } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
        GetLeadEmailsUrl + '?directoryPath=' + payload.directoryPath + '&sessionId=' + payload.sessionId, 
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

const getLeadEmailList = (payload: any, initialRowCount = 50) => {  
    const {
      data,
      error,
      status,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
    } = useInfiniteQuery({
      queryKey: ['lead-email-list', payload.LeadId],
      queryFn: fetchLeadEmailData,
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 

    const leadCustomeEmailData = data?.pages.flatMap(page => page.data) || [];

  return {
    leadCustomeEmailData,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, 
  };
}

const fetchCustomerEmailData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, directoryPath: any, sessionId: any} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, directoryPath: any, sessionId: any } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
        GetCustomerEmailsUrl + '?custCode=' + payload.args.CustomerCode + '&directoryPath=' + payload.directoryPath + '&sessionId=' + payload.sessionId, 
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

const getCustomerEmailList = (payload: any, initialRowCount = 50) => {  
    const {
      data,
      error,
      status,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
    } = useInfiniteQuery({
      queryKey: ['customer-email-list', payload.CustomerCode],
      queryFn: fetchCustomerEmailData,
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 

    const leadCustomeEmailData = data?.pages.flatMap(page => page.data) || [];

  return {
    leadCustomeEmailData,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, 
  };
}

export const getLeadCustomerEmails = (payload: any, contactType: any, initialRowCount = 50) => {  
    if(contactType == contactTypeEnum.lead){
        return getLeadEmailList(payload, initialRowCount);
    }
    else{ // customer
        return getCustomerEmailList(payload, initialRowCount);
    }
}