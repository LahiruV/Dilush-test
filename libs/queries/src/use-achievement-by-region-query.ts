import { getAxiosInstance } from '@peerless/services';
import { DashboardAPI } from '@peerless/utils';
import { useQuery } from '@tanstack/react-query';

export const GetSalesAchievement = (sideFilters: string[], type: number, month: number, resultType: number, yearType: number, isExecute: boolean) => {
    const fetchSalesAchievement = async () => {
        const data = await getAxiosInstance().post<any[]>(
            `${DashboardAPI.Get_Sales_Achievement}?type=${type}&month=${month}&resultType=${resultType}&yearType=${yearType}`, sideFilters
        );
        return data.data;
    };
    const { data: responseData, status, error } = useQuery({
        queryKey: ['all-sales-achievement', type, month, resultType, yearType, sideFilters],
        queryFn: () => fetchSalesAchievement(),
        enabled: isExecute,
    });
    return {
        responseData,
        status,
        error
    };
};