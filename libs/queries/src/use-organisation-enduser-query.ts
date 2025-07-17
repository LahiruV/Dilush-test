import { getAxiosInstance } from "@peerless/services";
import { EnduserAPI, OrganisationAPI } from "@peerless/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const getOrgEndusersUrl = EnduserAPI.Get_EndUsers_By_Org;
const insertOrganisationEnduserLinkUrl = OrganisationAPI.Insert_Organisation_Link;
const deleteLinkUrl = OrganisationAPI.Delete_Organisation_Link;

const fetchOrganisationEnduserListData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.StartIndex = startIndex;
  payload.RowCount = rowCount;
  
  try {
    const response = await getAxiosInstance().post<any>(
      getOrgEndusersUrl, 
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

export const getOrganisationEndusersList = (payload: any, initialRowCount = 50) => {  
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
      queryKey: ['org-endusers-list', payload],
      queryFn: fetchOrganisationEnduserListData,
      initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
      getNextPageParam: (lastPage) => lastPage.nextPageParam,  
    }); 
  
    const orgEndusersData = data?.pages.flatMap(page => page.data) || [];

    return {
        orgEndusersData,
        error,
        status,
        isLoading,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage, 
        refetch,
    };
};

export const addOrganisationLink = async (payload: any): Promise<any> => {
    try {
      const response = await getAxiosInstance().post(insertOrganisationEnduserLinkUrl, payload);
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

  export const deleteLink = async (payload: any): Promise<any> => {
    try {
      const response = await getAxiosInstance().post(deleteLinkUrl, payload.LinkID);
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

