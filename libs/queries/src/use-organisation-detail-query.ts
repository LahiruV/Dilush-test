import { getAxiosInstance } from "@peerless/services";
import { OrganisationAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetOrganisationNamesUrl = OrganisationAPI.Get_Organisation_Names;
const GetOrganizationsUrl = OrganisationAPI.Get_Organizations;
const SaveOrganisationUrl = OrganisationAPI.Save_Organisation;
const UpdateOrganisationUrl = OrganisationAPI.Update_Organisation;

export const getOrganisationNames = (payload: any) => {

  const getOrganisationNameList = async (payload: any) => {
    const response = await getAxiosInstance().get<any>(
      `${GetOrganisationNamesUrl}`, {
      params: {
        orgName: payload.orgName
      }
    }
    );
    return response.data;
  };

  const { data: responseData, error, status, isLoading } = useQuery({
    queryKey: ['organisation-names-list', payload],
    queryFn: () => getOrganisationNameList(payload),
    enabled: (payload.orgName != null && payload.orgName.length >= 2)
  });

  return {
    responseData,
    error,
    status,
    isLoading
  };
};

const fetchMainOrganisationListData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }):
  Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.startIndex = startIndex;
  payload.rowCount = rowCount;

  try {
    const response = await getAxiosInstance().post<any>(GetOrganizationsUrl, payload);

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

export const getMainOrganisationList = (payload: any, initialRowCount = 50, isFetched = true) => {
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
    queryKey: ['main-org-list', payload],
    queryFn: fetchMainOrganisationListData,
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    enabled: payload.queryEnabled && isFetched,
  });

  const organisationsData = data?.pages.flatMap(page => page.data) || [];

  return {
    organisationsData,
    error,
    status,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch,
  };
};

/* ----------- Paging for organisation ------------- */

const fetchMainOrganisationList = async (payload: any) => {
  const response = await getAxiosInstance().post(GetOrganizationsUrl, payload);
  return response.data;
};

export const getOrganisationList = (payload: any, isFetched = true) => {
  return useQuery({
    queryKey: ['getOrganisationList', payload],
    queryFn: () => fetchMainOrganisationList(payload),
    enabled: isFetched
  });
};

/* ----------- End paging for organisation ------------ */

export const saveOrganisation = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(SaveOrganisationUrl, payload);
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

export const updateOrganisation = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(UpdateOrganisationUrl, payload.OrganisationEntity);
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