import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { LeedsAndCustomers, LeadEntryParameters } from '@peerless/models';
import { getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { EnduserAPI, LeadAPI, mainListAPIPath } from '@peerless/utils';

const SaveLeadUrl = LeadAPI.Save_Lead;
const ConvertLeadToCustomerUrl = LeadAPI.Convert_Lead_To_Customer;

type LeadParameters = {
  Originator: string;
  ChildOriginator: string;
  DefaultDepId: string;
  OrderBy: string;
  AddParams: string;
  LeadStageId: number;
  RetreiveActive: boolean;
  IsReqSentVisible: boolean;
  LeadStage: string;
  DisplayInCRM: boolean;
  startDate: string;
  endDate: string;
  additionalParams?: string;
  startIndex: number;
  rowCount: number;
  repType?: string;
  isNew: boolean;
};

const fetchMainLeadListData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: LeadParameters } }):
  Promise<{ data: LeedsAndCustomers[], nextPageParam: { startIndex: number, rowCount: number, payload: LeadParameters } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.startIndex = startIndex;
  payload.rowCount = rowCount;

  try {
    const response = await getAxiosInstance().post<LeedsAndCustomers[]>(
      mainListAPIPath[payload.LeadStage],
      payload
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

export const getMainLeadList = (payload: any, initialRowCount = 50, isFetched = true) => {
  // console.log(payload);
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
    queryKey: ['main-lead-list', payload.Originator, payload.AddParams, payload.LeadStage, payload.repType, payload.DisplayInCRM, payload.IsReqSentVisible, payload.IsShowLeastActive, payload.OrderBy],
    queryFn: fetchMainLeadListData,
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    enabled: isFetched,
  });


  const leedsAndCustomersData = data?.pages.flatMap(page => page.data) || [];

  return {
    leedsAndCustomersData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};

//--------------paging for main lead list-----------------

const fetchMainLeadCustomerList = async (payload: any) => {
  if (Object.keys(payload.ChildOriginators).length === 0 || Object.keys(payload.ChildOriginator).length === 0) {
    return [];
  }
  const response = await getAxiosInstance().post(mainListAPIPath[payload.LeadStage], payload);
  return response.data;
};

export const getMainLeadCustomerList = (payload: any, isFetched = true) => {
  return useQuery({
    queryKey: ['getMainLeadCustomerList', payload.Originator, payload.AddParams, payload.LeadStage, payload.repType, payload.DisplayInCRM, payload.IsReqSentVisible, payload.IsShowLeastActive, payload.OrderBy, payload.StartIndex, payload.isManagerMode, payload.ChildOriginators, payload.ChildOriginator],
    queryFn: () => fetchMainLeadCustomerList(payload),
    enabled: isFetched
  });
};

//--------------end paging for main lead list-----------------

const fetchEnduserList = async (payload: any) => {
  const response = await getAxiosInstance().post(EnduserAPI.Get_All_Endusers, payload);
  return response.data;
};

export const getEnduserList = (payload: any) => {
  return useQuery({
    queryKey: ['getEnduserList', payload],
    queryFn: () => fetchEnduserList(payload),
  });
};

const fetchEnduserListInfinite = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }) => {
  const { startIndex, rowCount, payload: queryPayload } = pageParam;
  
  const updatedPayload = {
    ...queryPayload,
    StartIndex: startIndex,
    RowCount: rowCount
  };
  
  const response = await getAxiosInstance().post(EnduserAPI.Get_All_Endusers, updatedPayload);
  const items = response.data;
  const nextStartIndex = startIndex + 1;
  const hasMoreData = items.length === rowCount;
  
  return {
    data: items,
    nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload: queryPayload } : null,
  };
};

export const getEnduserListInfinite = (payload: any, rowCount = 20, startIndex = 1, isExecute = true) => {
  return useInfiniteQuery({
    queryKey: ['getEnduserList', payload],
    queryFn: fetchEnduserListInfinite,
    initialPageParam: { startIndex, rowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    enabled: isExecute
  });
};

export const saveLead = async (payload: LeadEntryParameters): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(SaveLeadUrl, payload);
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

export const convertLeadToCustomer = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(ConvertLeadToCustomerUrl, payload);
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