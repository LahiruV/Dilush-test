import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import { CommonAPI } from '@peerless/utils';

const getLookupDataUrl = CommonAPI.Get_General_Lookup_Entries;
const getQueryBasedLookups = CommonAPI.Get_Lookups;

const fetchLookupData = async (payload: { sTableID: string, defaultDepartmentId: string }) => {
  const response = await getAxiosInstance().get(getLookupDataUrl + '?sTableID=' + payload.sTableID + '&defaultDeptID=' + payload.defaultDepartmentId);
  return response.data;
};

export const useLookupData = (payload: { sTableID: string, defaultDepartmentId: string }) => {
  return useQuery({
    queryKey: ['lookupData', payload],
    queryFn: () => fetchLookupData(payload),
    enabled: !!payload,
  });
};

const fetchQueryBasedLookupData = async (payload: { lookupSqlKey: string, whereCls: string, parameters: any, args: any, hasArgs: boolean }) => {
  const response = await getAxiosInstance().post(getQueryBasedLookups + '?lookupSqlKey=' + payload.lookupSqlKey + '&whereCls=' + payload.whereCls + '&parameters=' + payload.parameters + '&hasArgs=' + payload.hasArgs, payload.args);
  return response.data;
};

export const useQueryBasedLookupData = (payload: { lookupSqlKey: string, whereCls: string, parameters: any, args: any, hasArgs: boolean }, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['queryBasedLookupData', payload],
    queryFn: () => fetchQueryBasedLookupData(payload),
    enabled: ((!!payload) && enabled),
  });
};