import axios from 'axios';
import { getAxiosInstance } from "@peerless/services";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GetEnduserProdutPriceParameters } from "@peerless/models";
import { EnduserAPI } from "@peerless/utils";

export const GetEnduserProdutPrice = (payload: any, isExecute: boolean, count?: any) => {
    const fetchEnduserProdutPrice = async (payload: any) => {
        payload.count = count;
        const response = await getAxiosInstance().post<any>(
            EnduserAPI.Get_Enduser_Produt_Price, payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['get-end-user-product-price', payload],
        queryFn: () => fetchEnduserProdutPrice(payload),
        enabled: isExecute
    });
};

// export const GetEnduserProdutPrice = (payload: GetEnduserProdutPriceParameters, initialRowCount = 10, isExecute: boolean) => {

//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['get-end-user-product-price', payload],
//         queryFn: fetchEnduserProdutPrice,
//         initialPageParam: { startIndex: 0, rowCount: initialRowCount, payload },
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


// const fetchEnduserProdutPrice = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: GetEnduserProdutPriceParameters } }):
//     Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: GetEnduserProdutPriceParameters } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.nextRecord = startIndex;
//     payload.numberOfRecords = rowCount;

//     try {
//         const response = await getAxiosInstance().post<any[]>(
//             EnduserAPI.Get_Enduser_Produt_Price, payload
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