import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { exportToExcel, getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { ActivityAnalysis, ActivityAnalysisParameters, ActivityDataColumns } from '@peerless/models';
import { ActivityAPI } from '@peerless/utils';

// export const getAllActivitiesByType = (payload: ActivityAnalysisParameters, initialRowCount = 10, isExecute: boolean) => {

//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['activity-analysis-list', payload],
//         queryFn: fetchAllActivitiesByType,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const activityAnalysisData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         activityAnalysisData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

/**
 * Fetches all activities by type with pagination support.
 *
 * @param {Object} pageParam - The pagination parameters.
 * @param {number} pageParam.startIndex - The starting index for fetching activities.
 * @param {number} pageParam.rowCount - The number of activities to fetch per page.
 * @param {ActivityAnalysisParameters} pageParam.payload - The payload containing additional parameters for the activity analysis.
 * @returns {Promise<Object>} A promise that resolves to an object containing the fetched activities and the next page parameters.
 * @returns {Promise<ActivityAnalysis[]>} return.data - The fetched activities.
 * @returns {Promise<Object|null>} return.nextPageParam - The parameters for the next page, or null if there are no more pages.
 * @throws {Error} Throws an error if the request fails.
 */

export const getAllActivitiesByType = (payload: ActivityAnalysisParameters, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            ActivityAPI.Get_All_Activities_By_Type,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['activity-analysis-list', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};

export const GetAllActivitiesByTypeExcel = (e: ActivityAnalysisParameters, isExecute: boolean, setState?: Function, isExcel?: boolean) => {
    const fetchSalesAchievement = async () => {
        const data = await getAxiosInstance().post<ActivityAnalysis[]>(
            ActivityAPI.Get_All_Activities_By_Type, e
        );
        if (setState) {
            if (isExcel) {
                try {
                    await exportToExcel(data.data, ActivityDataColumns, 'Activity Analysis', '7FFFD4');
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
        queryKey: ['activity-analysis-list-excel'],
        queryFn: () => fetchSalesAchievement(),
        enabled: isExecute,
    });
    return {
        responseData,
        status,
        error,
    };
};