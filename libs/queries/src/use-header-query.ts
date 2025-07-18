
import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import { CommonAPI } from '@peerless/utils';

type OriginatorEntity = {
  originator: string;
  childOriginators: string;
  defaultDepartmentId: string;
  managerMode: boolean;
};

export const useGetChildOriginators = (userNameToQuery: [], isManagerModeActive: boolean) => {

  const getChildOriginators = async (originator: any, managerMode: any) => {
    if (!originator) {
      return {};
    }
    try {
      const response = await getAxiosInstance().get(CommonAPI.Get_Child_Originators, {
        params: {
          originator: originator,
          managerMode: managerMode
        }
      });
      return response.data.res;
    } catch (error) {
      throw error;
    }
  }

  const { data: childOriginators, error, isLoading, isPending, isFetching, refetch } = useQuery({
    queryKey: ['childOriginators', userNameToQuery, isManagerModeActive],
    queryFn: () => getChildOriginators(userNameToQuery, isManagerModeActive),
  });

  return {
    childOriginators,
    error,
    isLoading,
    isPending,
    isFetching,
    refetch,
  };
};

export const GetChildOriginatorsList = (payload: OriginatorEntity, isExecute?: boolean) => {

  const getAllCallCyclesCountById = async (payload: OriginatorEntity) => {
    const response = await getAxiosInstance().post<any[]>(
      CommonAPI.Get_Child_OriginatorsList,
      payload
    );
    return response.data;
  };

  const { data: responseData, error, status } = useQuery({
    queryKey: ['child-originators-list', payload],
    queryFn: () => getAllCallCyclesCountById(payload),
    enabled: isExecute,
  });

  return {
    responseData,
    error,
    status
  };
};