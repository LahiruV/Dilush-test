import { useInfiniteQuery } from '@tanstack/react-query';
import { getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { DashboardAPI } from '@peerless/utils';
import { SalesInfoDetail, SalesInfoDetailParameters } from '@peerless/models';

export const GetSalesInfoDetailViewState = (payload: SalesInfoDetailParameters, initialRowCount = 10, isExecute: boolean) => {
    const {
        data,
        error,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['business-sales-enquiry-list', payload],
        queryFn: fetchSalesInfoDetailViewState,
        initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
        getNextPageParam: (lastPage) => lastPage.nextPageParam,
        enabled: isExecute
    });

    const businessSalesEnqSalesData = data?.pages.flatMap(page => page.data) || [];

    return {
        businessSalesEnqSalesData,
        error,
        status,
        fetchNextPage,
        isFetchingNextPage,
        hasNextPage,
    };
};

const fetchSalesInfoDetailViewState = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }):
    Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
    const { startIndex, rowCount, payload } = pageParam;
    payload.startIndex = startIndex;
    payload.rowCount = rowCount;

    try {
        const response = await getAxiosInstance().post<SalesInfoDetail[]>(
            DashboardAPI.Get_Sales_Info_Detail_View_State,
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