import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { LeaderCustomerOpportunity, LeaderCustomerOpportunityCount, LeaderCustomerOpportunityParameters } from '@peerless/models';
import { DashboardAPI } from '@peerless/utils';

export const GetLeaderCustomerOpportunityCount = (payload: LeaderCustomerOpportunityParameters, initialRowCount = 5, isExecute: boolean) => {
    const {
        data,
        error,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['opportunity-conversion-counts', payload],
        queryFn: fetchLeaderCustomerOpportunityCount,
        initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
        getNextPageParam: (lastPage) => lastPage.nextPageParam,
        enabled: isExecute
    });
    const LeaderCustomerOpportunityCountData = data?.pages.flatMap(page => page.data) || [];
    return {
        LeaderCustomerOpportunityCountData,
        error,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    };
};

// export const GetLeaderCustomerOpportunity = (payload: LeaderCustomerOpportunityParameters, initialRowCount = 5, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['opportunity-conversion', payload],
//         queryFn: fetchLeaderCustomerOpportunity,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });
//     const LeaderCustomerOpportunityData = data?.pages.flatMap(page => page.data) || [];
//     return {
//         LeaderCustomerOpportunityData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

export const GetLeaderCustomerOpportunity = (payload: LeaderCustomerOpportunityParameters, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            DashboardAPI.Get_Leader_Customer_Opportunity,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['opportunity-conversion', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};


const fetchLeaderCustomerOpportunityCount = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: LeaderCustomerOpportunityParameters } }):
    Promise<{ data: LeaderCustomerOpportunityCount[], nextPageParam: { startIndex: number, rowCount: number, payload: LeaderCustomerOpportunityParameters } | null }> => {
    const { startIndex, rowCount, payload } = pageParam;
    payload.startIndex = startIndex;
    payload.rowCount = rowCount;
    try {
        const response = await getAxiosInstance().post<LeaderCustomerOpportunityCount[]>(
            DashboardAPI.Get_Leader_Customer_Opportunity_Count,
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

// const fetchLeaderCustomerOpportunity = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: LeaderCustomerOpportunityParameters } }):
//     Promise<{ data: LeaderCustomerOpportunity[], nextPageParam: { startIndex: number, rowCount: number, payload: LeaderCustomerOpportunityParameters } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;
//     try {
//         const response = await getAxiosInstance().post<LeaderCustomerOpportunity[]>(
//             DashboardAPI.Get_Leader_Customer_Opportunity,
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