import { getAxiosInstance } from "@peerless/services";
import { OrganisationAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const getOrganisationsForLookupUrl = OrganisationAPI.Get_Organisations_For_Lookup;
const GetOrganisationsByOrgIdUrl = OrganisationAPI.Get_Organisations_By_OrgId;

const fetchOrganisationSubOrgGridData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.StartIndex = startIndex;
  payload.RowCount = rowCount;
  
  try {
    const response = await getAxiosInstance().post<any>(
      GetOrganisationsByOrgIdUrl, 
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

export const getOrganisationSubOrgGrid = (payload: any, initialRowCount = 50) => {  
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
      queryKey: ['org-Sub-org-grid', payload],
      queryFn: fetchOrganisationSubOrgGridData,
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
      enabled: payload != null
    }); 
  
    const orgSubOrgListData = data?.pages.flatMap(page => page.data) || [];

    return {
        orgSubOrgListData,
        error,
        status,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage, 
        refetch,
    };
};

const fetchOrganisationSubOrgListData = async (payload: any) => {
    const response = await getAxiosInstance().post(getOrganisationsForLookupUrl, payload);
    return response.data;
  };
    
  export const getOrganisationSubOrgList = (payload: any) => {
    return useQuery({
        queryKey: ['org-Sub-org-list', payload],
        queryFn: () => fetchOrganisationSubOrgListData(payload),
        enabled: payload != null
    });
  };

const fetchOrganisationSubOrgListInfinite = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }) => {
  const { startIndex, rowCount, payload: queryPayload } = pageParam;
  
  const updatedPayload = {
    ...queryPayload,
    StartIndex: startIndex,
    RowCount: rowCount
  };
  
  const response = await getAxiosInstance().post(getOrganisationsForLookupUrl, updatedPayload);
  const items = response.data;
  const nextStartIndex = startIndex + 1;
  const hasMoreData = items.length === rowCount;
  
  return {
    data: items,
    nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload: queryPayload } : null,
  };
};

export const getOrganisationSubOrgListInfinite = (payload: any, rowCount = 20, startIndex = 1, isExecute = true) => {
  return useInfiniteQuery({
    queryKey: ['org-Sub-org-list', payload],
    queryFn: fetchOrganisationSubOrgListInfinite,
    initialPageParam: { startIndex, rowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    enabled: isExecute
  });
};