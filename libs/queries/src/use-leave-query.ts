import { exportToExcel, getAxiosInstance } from '@peerless/services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LeaveAPI } from '@peerless/utils';
import {
    Leave,
    Departments,
    LeaveEntryParameters,
    LeaveDataColumns
} from '@peerless/models';

export const GetAllLeaves = (payload: Leave, isFetch: boolean, setState?: Function, isExcel?: boolean) => {
    const fetchAllLeaves = async () => {
        const data = await getAxiosInstance().post<any[]>(
            LeaveAPI.Get_All_Leaves, payload
        );
        if (setState) {
            if (isExcel) {
                try {
                    await exportToExcel(data.data, LeaveDataColumns, 'Leave Excel', '7FFFD4');
                } catch (error) {
                    console.error("Error exporting data:", error);
                } finally {
                    setState(false);
                }
            }
            setState(false);
        }
        return data.data;
    };
    const { data, error, status } = useQuery({
        queryKey: ['get-all-leaves', payload],
        queryFn: () => fetchAllLeaves(),
        enabled: isFetch
    });
    return {
        data,
        error,
        status,
    };
};


export const GetAllOriginatorsByDep = (payload: string, isFetch: boolean) => {

    const fetchAllOriginatorsByDep = async () => {
        if (payload == null || payload === '') {
            return [];
        }
        const data = await getAxiosInstance().post<any[]>(
            `${LeaveAPI.Get_All_Originators_ByDep}?DeptString=${payload}`
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['get-all-originators-by-dep', payload],
        queryFn: () => fetchAllOriginatorsByDep(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};


export const GetDepartments = (payload: Departments, isFetch: boolean) => {

    const fetchAllDepartments = async () => {
        const data = await getAxiosInstance().post<any[]>(
            LeaveAPI.Get_All_Departments, payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['get-all-departments', payload],
        queryFn: () => fetchAllDepartments(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetPublicHolidaysCount = () => {

    const { mutate: getPublicHolidaysCountMutate } = useMutation({
        mutationFn: (payload: any) => getAxiosInstance().post(LeaveAPI.Get_PublicHolidays_Count, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        getPublicHolidaysCountMutate,
    };
};

export const InsertLeave = () => {
    const { mutate: saveLeaveMutate } = useMutation({
        mutationFn: async (payload: LeaveEntryParameters) => getAxiosInstance().post(LeaveAPI.Insert_Leave, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        saveLeaveMutate,
    };
};


export const GetAllLeavesAndPublic = (payload: Leave, isFetch: boolean) => {
    const fetchAllLeaves = async () => {
        const data = await getAxiosInstance().post<any[]>(
            LeaveAPI.Get_All_Leaves_And_Public, payload
        );
        return data.data;
    };
    const { data, error, status } = useQuery({
        queryKey: ['get-all-leaves-and-public', payload],
        queryFn: () => fetchAllLeaves(),
        enabled: isFetch
    });
    return {
        data,
        error,
        status,
    };
};