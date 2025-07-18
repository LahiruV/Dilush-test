import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { ClientOpportunity, OpportunityAnalysis, OpportunityAnalysisParameters } from '@peerless/models';
import { OpportunitiesAPI } from '@peerless/utils';

// const fetchAll = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: OpportunityAnalysisParameters } }):
//     Promise<{ data: OpportunityAnalysis[], nextPageParam: { startIndex: number, rowCount: number, payload: OpportunityAnalysisParameters } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<OpportunityAnalysis[]>(`${OpportunitiesAPI.Get_All_Opportunities}?pipelineStageID=${payload.pipelineStageID}`, payload);
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

// export const GetAllOpportunities = (payload: OpportunityAnalysisParameters, pipelineStageID: number, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['opportunity-analysis-list', payload, pipelineStageID],
//         queryFn: fetchAll,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload: { ...payload, pipelineStageID } },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const opportunityAnalysisData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         opportunityAnalysisData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

export const GetAllOpportunities = (payload: OpportunityAnalysisParameters, pipelineStageID: number, isExecute: boolean) => {
    const fetchAll = async (payload: any) => {
        const response = await getAxiosInstance().post<OpportunityAnalysis[]>(`${OpportunitiesAPI.Get_All_Opportunities}?pipelineStageID=${pipelineStageID}`, payload);
        return response.data;
    };
    return useQuery({
        queryKey: ['opportunity-analysis-list', payload, pipelineStageID],
        queryFn: () => fetchAll(payload),
        enabled: isExecute
    });
};

export const GetAllClientOpportunity = (payload: OpportunityAnalysisParameters, pipelineStageID: number, isExecute: boolean) => {

    const getAllClientOpportunity = async (payload: OpportunityAnalysisParameters) => {
        const response = await getAxiosInstance().post<ClientOpportunity[]>(
            `${OpportunitiesAPI.Get_All_Client_Opportunity}?pipelineStageID=${pipelineStageID}`,
            payload
        );
        return response.data;
    };

    const { data: responseData, error, status } = useQuery({
        queryKey: ['all-client-opportunity-analysis-list', payload, pipelineStageID],
        queryFn: () => getAllClientOpportunity(payload),
        enabled: isExecute,
    });

    return {
        responseData,
        error,
        status
    };
};
