import { getAxiosInstance } from "@peerless/services";
import { CustomerAPI, EnduserAPI, OrganisationAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetDistributorsByOrgUrl = OrganisationAPI.Get_Distributors_By_Org;
const GetCustomerLookupForOrgUrl = CustomerAPI.Get_Customer_Lookup_For_Enduser_Entry;

const fetchOrganisationDistributorGridData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.StartIndex = startIndex;
  payload.RowCount = rowCount;
  
  try {
    const response = await getAxiosInstance().post<any>(
      GetDistributorsByOrgUrl, 
      payload 
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

export const getOrganisationDistributorGrid = (payload: any, initialRowCount = 50) => {  
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
      queryKey: ['org-distributor-grid', payload],
      queryFn: fetchOrganisationDistributorGridData,
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
      enabled: payload != null
    }); 
  
    const orgDistributorListData = data?.pages.flatMap(page => page.data) || [];

    return {
        orgDistributorListData,
        error,
        status,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage, 
        refetch,
    };
};

const fetchOrganisationDistributorListData = async (payload: any) => {
    const response = await getAxiosInstance().post(GetCustomerLookupForOrgUrl, payload);
    return response.data;
  };
    
  export const getOrganisationDistributorList = (payload: any) => {
    return useQuery({
        queryKey: ['org-distributor-lookup-list', payload],
        queryFn: () => fetchOrganisationDistributorListData(payload),
        enabled: payload != null
    });
  };

  const fetchOrganisationDistributorListInfinite = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }) => {
    const { startIndex, rowCount, payload: queryPayload } = pageParam;
    
    const updatedPayload = {
      ...queryPayload,
      StartIndex: startIndex,
      RowCount: rowCount
    };
    
    const response = await getAxiosInstance().post(GetCustomerLookupForOrgUrl, updatedPayload);
    const items = response.data;
    const nextStartIndex = startIndex + 1;
    const hasMoreData = items.length === rowCount;
    
    return {
      data: items,
      nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload: queryPayload } : null,
    };
  };
  
  export const getOrganisationDistributorListInfinite = (payload: any, rowCount = 20, startIndex = 1, isExecute = true) => {
    return useInfiniteQuery({
      queryKey: ['org-distributor-lookup-list', payload],
      queryFn: fetchOrganisationDistributorListInfinite,
      initialPageParam: { startIndex, rowCount, payload },
      getNextPageParam: (lastPage) => lastPage.nextPageParam,
      enabled: isExecute
    });
  };