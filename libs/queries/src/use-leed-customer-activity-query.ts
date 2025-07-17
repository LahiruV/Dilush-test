import { getAxiosInstance } from "@peerless/services";
import { ActivityAPI, contactTypeEnum, OrganisationAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetLeadActivityListUrl = ActivityAPI.Get_Related_Activity;  
const SaveLeadActivity = ActivityAPI.Save_Lead_Activity;
const GetCustomerActivityListUrl = ActivityAPI.Get_Activities_For_Customer;  
const GetActivitiesForEndUserUrl = ActivityAPI.Get_Activities_For_EndUser;
const GetActivitiesForOrganisationUrl = OrganisationAPI.Get_Activity_By_Organisation;

const fetchLeadRelatedActivityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any} } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
      GetLeadActivityListUrl, 
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

const fetchCustomerRelatedActivityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any} } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
      GetCustomerActivityListUrl, 
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

const fetchEnduserRelatedActivityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any} } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
      GetActivitiesForEndUserUrl, 
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

const fetchOrganisationRelatedActivityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any} } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
      GetActivitiesForOrganisationUrl, 
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

const getLeadRelatedActivityList = (payload: any, contactType: any, initialRowCount = 1000) => {    
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
      queryKey: ['lead-activity-list', payload.args.LeadId],
      queryFn: fetchLeadRelatedActivityData, 
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
      
    const leadCustomerRelatedActivityData = data?.pages.flatMap(page => page.data) || [];
  
    return {
      leadCustomerRelatedActivityData,
      error,
      status,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
      refetch,
    };
  };

  const getCustomerActivityList = (payload: any, contactType: any, initialRowCount = 10) => {    
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
      queryKey: ['customer-activity-list', payload.args.CustomerCode],
      queryFn: fetchCustomerRelatedActivityData, 
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
      
    const leadCustomerRelatedActivityData = data?.pages.flatMap(page => page.data) || [];
  
    return {
      leadCustomerRelatedActivityData,
      error,
      status,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
      refetch,
    };
  };

  const getEnduserActivityList = (payload: any, contactType: any, initialRowCount = 10) => {    
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
      queryKey: ['enduser-activity-list', payload.args.EnduserCode],
      queryFn: fetchEnduserRelatedActivityData, 
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
      
    const leadCustomerRelatedActivityData = data?.pages.flatMap(page => page.data) || [];
  
    return {
      leadCustomerRelatedActivityData,
      error,
      status,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
      refetch,
    };
  };

  const getOrganisationActivityList = (payload: any, contactType: any, initialRowCount = 10) => {    
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
      queryKey: ['org-activity-list', payload.args.OrgID],
      queryFn: fetchOrganisationRelatedActivityData, 
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
      
    const leadCustomerRelatedActivityData = data?.pages.flatMap(page => page.data) || [];
  
    return {
      leadCustomerRelatedActivityData,
      error,
      status,
      isLoading,
      fetchNextPage,
      isFetchingNextPage,
      hasNextPage, 
      refetch,
    };
  };

  export const getLeadCustomerActivityList = (payload: any, contactType: any, initialRowCount = 10) => {      
    if(contactType == contactTypeEnum.lead){
      return getLeadRelatedActivityList(payload, contactType);
    }
    else if(contactType == contactTypeEnum.customer){ //customer
      return getCustomerActivityList(payload, contactType, initialRowCount);
    }
    else if(contactType == contactTypeEnum.enduser){ //enduser
      return getEnduserActivityList(payload, contactType);
    }
    else{ //organisation
      return getOrganisationActivityList(payload, contactType);
    }
  }

export const saveLeadActivity = async (payload: any): Promise<any> => {
    try {
      const response = await getAxiosInstance().post(SaveLeadActivity, payload);
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


  