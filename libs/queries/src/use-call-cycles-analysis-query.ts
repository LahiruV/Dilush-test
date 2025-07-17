import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { exportToExcel, getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { CallCyclesAnalysis, CallCyclesAnalysisDataColumns, CallCyclesAnalysisParameters } from '@peerless/models';
import { DashboardAPI } from '@peerless/utils';

export const GetAllCallCycles = (payload: CallCyclesAnalysisParameters, isExecute: boolean) => {
    const fetchCallCycles = async (payload: any) => {
        const response = await getAxiosInstance().post<CallCyclesAnalysis[]>(
            DashboardAPI.Get_All_Call_Cycles,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['call-cycles-analysis-list', payload],
        queryFn: () => fetchCallCycles(payload),
        enabled: isExecute
    });
};

// export const GetAllCallCycles = (payload: CallCyclesAnalysisParameters, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['call-cycles-analysis-list', payload],
//         queryFn: fetchCallCycles,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });


//     const callCyclesAnalysisData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         callCyclesAnalysisData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

export const GetAllCallCyclesCountById = (payload: CallCyclesAnalysisParameters, isExecute: boolean) => {
    const getAllCallCyclesCountById = async (payload: CallCyclesAnalysisParameters) => {
        if (payload.childOriginators && payload.childOriginators.length === 0 || payload.childOriginators === " ") {
            return [];
        }
        const response = await getAxiosInstance().post<CallCyclesAnalysis[]>(
            DashboardAPI.Get_All_Call_Cycles_Count_By_Id,
            payload
        );
        return response.data;
    };

    const { data: callCyclesCountByIDData, error, status } = useQuery({
        queryKey: ['call-cycles-analysis-counts', payload],
        queryFn: () => getAllCallCyclesCountById(payload),
        enabled: isExecute,
    });

    return {
        callCyclesCountByIDData,
        error,
        status
    };
};

// const fetchCallCycles = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: CallCyclesAnalysisParameters } }):
//     Promise<{ data: CallCyclesAnalysis[], nextPageParam: { startIndex: number, rowCount: number, payload: CallCyclesAnalysisParameters } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<CallCyclesAnalysis[]>(
//             DashboardAPI.Get_All_Call_Cycles,
//             payload
//         );
//         const items = response.data;
//         const nextStartIndex = startIndex + 1;
//         const hasMoreData = items.length === rowCount;

//         return {
//             data: items,
//             nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
//         };
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Request failed with status:', error.response?.status);
//             console.error('Response data:', error.response?.data);
//         } else {
//             console.error('An unexpected error occurred:', error);
//         }
//         throw error;
//     }
// };

export const GetAllCallCyclesExcel = (e: CallCyclesAnalysisParameters, isExecute: boolean, setState?: Function, isExcel?: boolean) => {
    const fetchData = async () => {
        const data = await getAxiosInstance().post<CallCyclesAnalysis[]>(
            DashboardAPI.Get_All_Call_Cycles, e
        );
        if (setState) {
            if (isExcel) {
                try {
                    await exportToExcel(data.data, CallCyclesAnalysisDataColumns, 'Call Cycles Analysis', '7FFFD4');
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
    const { data: responseData, error, status, } = useQuery({
        queryKey: ['call-cycles-analysis-list-excel'],
        queryFn: () => fetchData(),
        enabled: isExecute,
    });
    return {
        responseData,
        status,
        error,
    };
};