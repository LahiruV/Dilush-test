import { getAxiosInstance } from "@peerless/services";
import { contactTypeEnum, OpportunitiesAPI } from "@peerless/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const GetOpportunitiesUrl = OpportunitiesAPI.Get_Opportunities;
const GetOpportunityProducts = OpportunitiesAPI.Get_Opportunity_Products;
const SaveOpportunity = OpportunitiesAPI.Save_Opportunity;
const DeleteOpportunityUrl = OpportunitiesAPI.Delete_Opportunity;
const GetOpportunitiesForCustomer = OpportunitiesAPI.Get_Opportunities_For_Customer;
const GetOpportunitiesForEndUserUrl = OpportunitiesAPI.Get_Opportunities_For_EndUser;

const fetchLeadOpportunityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, contactID: number} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, contactID: number } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
        GetOpportunitiesUrl + '?contactID=' + payload.contactID, 
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

const getLeadOpportunityList = (payload: any, initialRowCount = 10) => {
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
    queryKey: ['lead-opportunity-list', payload.args],
    queryFn: fetchLeadOpportunityData, 
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
    getNextPageParam: (lastPage) => lastPage.nextPageParam,  
  }); 
      
  const leadCustomerOpportunityData = data?.pages.flatMap(page => page.data) || [];

  return {
    leadCustomerOpportunityData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, 
    refetch
  };
}

const fetchCustomerOpportunityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, contactID: number} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, contactID: number } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
        GetOpportunitiesForCustomer + '?customerCode=' + payload.contactID, 
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

const getCustomerOpportunityList = (payload: any, initialRowCount = 10) => {
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
    queryKey: ['customer-opportunity-list', payload.args],
    queryFn: fetchCustomerOpportunityData, 
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
    getNextPageParam: (lastPage) => lastPage.nextPageParam,  
  }); 
      
  const leadCustomerOpportunityData = data?.pages.flatMap(page => page.data) || [];

  return {
    leadCustomerOpportunityData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, 
    refetch
  };
}

//enduser

const fetchEnduserOpportunityData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, contactID: number} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, contactID: number } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
      GetOpportunitiesForEndUserUrl, payload.args
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

const getEnduserOpportunityList = (payload: any, initialRowCount = 10) => {
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
    queryKey: ['enduser-opportunity-list', payload.args],
    queryFn: fetchEnduserOpportunityData, 
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
    getNextPageParam: (lastPage) => lastPage.nextPageParam,  
  }); 
      
  const leadCustomerOpportunityData = data?.pages.flatMap(page => page.data) || [];

  return {
    leadCustomerOpportunityData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, 
    refetch
  };
}

export const getLeadCustomerOpportunityList = (payload: any, contactType: any, initialRowCount = 10) => {  
      if(contactType == contactTypeEnum.lead){
        return getLeadOpportunityList(payload, initialRowCount);
      }
      else if(contactType == contactTypeEnum.customer){ //customer
        return getCustomerOpportunityList(payload, initialRowCount);
      }
      else{ //enduser
        return getEnduserOpportunityList(payload, initialRowCount);
      }
};


const fetchLeadCustomerOpportunityProductstata = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number,payload: { args: any, opportunityId: number} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, opportunityId: number } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
        GetOpportunityProducts + '?opportunityId=' + payload.opportunityId, 
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

export const getLeadCustomerOpportunityProductList = (payload: any, initialRowCount = 50) => {    
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
    queryKey: ['lead-opportunity-product-list', payload],
    queryFn: fetchLeadCustomerOpportunityProductstata, 
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
    getNextPageParam: (lastPage) => lastPage.nextPageParam,  
  }); 
  
  const leadCustomerOpportunityProductsData = data?.pages.flatMap(page => page.data) || [];

  return {
    leadCustomerOpportunityProductsData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage, 
    refetch
  };
};

export const saveLeadOpportunity = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(SaveOpportunity, payload);
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

export const deleteLeadOpportunity = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(DeleteOpportunityUrl, payload);
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


