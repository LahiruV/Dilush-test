import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { exportToExcel, getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { EndUserTransferLogAPI } from '@peerless/utils';
import { EndUserTransferLogParameters, EndUserTransferLog, EndUserTransferLogsDataColumns } from '@peerless/models';

export const GetEndUserTransferLog = (payload: EndUserTransferLogParameters, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            EndUserTransferLogAPI.Get_End_user_Transfer_Log,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['end-user-transfer-logs-list', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};

// export const GetEndUserTransferLog = (payload: EndUserTransferLogParameters, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['end-user-transfer-logs-list', payload],
//         queryFn: fetchEndUserTransferLog,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const endUserTransferLogsData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         endUserTransferLogsData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

// const fetchEndUserTransferLog = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: EndUserTransferLogParameters } }):
//     Promise<{ data: EndUserTransferLog[], nextPageParam: { startIndex: number, rowCount: number, payload: EndUserTransferLogParameters } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<EndUserTransferLog[]>(
//             EndUserTransferLogAPI.Get_End_user_Transfer_Log,
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
//             console.error('Response data');
//         } else {
//             console.error('An unexpected error occurred');
//         }
//         throw error;
//     }
// };

export const GetEndUserTransferLogsExcel = (e: EndUserTransferLogParameters, isExecute: boolean, setState?: Function, isExcel?: boolean) => {
    const fetchData = async () => {
        const data = await getAxiosInstance().post<EndUserTransferLog[]>(
            EndUserTransferLogAPI.Get_End_user_Transfer_Log, e
        );
        if (setState) {
            if (isExcel) {
                try {
                    await exportToExcel(data.data, EndUserTransferLogsDataColumns, 'End User Transfer Logs', '7FFFD4');
                } catch (error) {
                    console.error("Error exporting data");
                } finally {
                    setState(false);
                }
            }
            setState(false);
        }
        return data.data;
    };
    const { data: responseData, error, status, } = useQuery({
        queryKey: ['end-user-transfer-logs-list-excel'],
        queryFn: () => fetchData(),
        enabled: isExecute,
    });
    return {
        responseData,
        status,
        error,
    };
};