import { useInfiniteQuery } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { CallCycleSaveParameters, DeactivateCallCycleParameters, GetAllCallCyclesListParameters, GetCallCycleContactsParameters, GetScheduledCallCycleContactsParameters, ShiftScheduleParameters } from '@peerless/models';
import { CallCycleAPI } from '@peerless/utils';

export const GetAllCallCyclesList = (payload: GetAllCallCyclesListParameters, initialRowCount = 10, isExecute: boolean) => {
    const {
        data,
        error,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        refetch
    } = useInfiniteQuery({
        queryKey: ['all-call-cycles-list', payload],
        queryFn: fetchAllCallCyclesList,
        initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
        getNextPageParam: (lastPage) => lastPage.nextPageParam,
        enabled: isExecute,
    });

    const callCycleListData = data?.pages.flatMap(page => page.data) || [];

    return {
        callCycleListData,
        error,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
        isLoading,
        refetch
    };
};

const fetchAllCallCyclesList = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: GetAllCallCyclesListParameters } }):
    Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: GetAllCallCyclesListParameters } | null }> => {
    const { startIndex, rowCount, payload } = pageParam;
    payload.startIndex = startIndex;
    payload.rowCount = rowCount;

    try {
        const response = await getAxiosInstance().post<any[]>(
            CallCycleAPI.Get_All_Call_Cycles_List,
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
            console.error('Response data:', error.response?.data);
        } else {
            console.error('An unexpected error occurred:', error);
        }
        throw error;
    }
};

export const SaveCallCycle = () => {
    const { mutate: saveCallCycleMutate } = useMutation({
        mutationKey: ['save-call-cycle'],
        mutationFn: async (payload: CallCycleSaveParameters) => {
            try {
                const response = await getAxiosInstance().post(CallCycleAPI.Call_Cycle_Save, payload);
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                } else {
                    throw new Error(`API Error: ${response.statusText}`);
                }
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        saveCallCycleMutate,
    };
};

export const DeactivateCallCycle = () => {
    const { mutate: deactivateCallCycle } = useMutation({
        mutationFn: async (payload: DeactivateCallCycleParameters) => {
            const { callCycleId, isDelete } = payload;
            return getAxiosInstance().post(`${CallCycleAPI.Deactivate_Call_Cycle}?callCycleId=${callCycleId}&isDelete=${isDelete}`);
        },
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        deactivateCallCycle,
    };
};

export const GetCallCycleContacts = (payload: GetCallCycleContactsParameters, isFetch: boolean) => {
    const fetchLookup = async () => {
        if (!payload.childOriginators) {
            return [];
        }
        const data = await getAxiosInstance().post<any[]>(
            CallCycleAPI.Get_Call_Cycle_Contacts, payload
        );
        return data.data;
    };
    const { data, isError, status } = useQuery({
        queryKey: ['get-call-cycle-contacts', payload],
        queryFn: () => fetchLookup(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        status
    };
};

export const GetScheduledCallCycleContacts = (payload: GetScheduledCallCycleContactsParameters, isFetch: boolean) => {
    const fetchFunction = async () => {
        if (!payload.childOriginators) {
            return [];
        }
        const data = await getAxiosInstance().post<any[]>(
            CallCycleAPI.Get_Scheduled_Call_Cycle_Contacts, payload
        );
        return data.data;
    };
    const { data, isError, status } = useQuery({
        queryKey: ['get-sheduled-call-cycle-contacts', payload],
        queryFn: () => fetchFunction(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        status
    };
};

export const ShiftSchedule = () => {
    const { mutate: saveShiftSchedule } = useMutation({
        mutationKey: ['save-shift-schedule'],
        mutationFn: async (payload: ShiftScheduleParameters) => {
            try {
                const response = await getAxiosInstance().post(CallCycleAPI.Shift_Schedule, payload);
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                } else {
                    throw new Error(`API Error: ${response.statusText}`);
                }
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        saveShiftSchedule,
    };
};

export const CreateCallCycleActivitiesFromTemplate = () => {
    const { mutate: createCallCycleActivitiesFromTemplate } = useMutation({
        mutationKey: ['create-call-cycle-activities-from-template'],
        mutationFn: async (payload: any) => {
            try {
                const response = await getAxiosInstance().post(CallCycleAPI.Create_Call_Cycl_eActivities_From_Template, payload);
                if (response.status >= 200 && response.status < 300) {
                    return response.data;
                } else {
                    throw new Error(`API Error: ${response.statusText}`);
                }
            } catch (error) {
                throw error;
            }
        },
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        createCallCycleActivitiesFromTemplate,
    };
};