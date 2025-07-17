import { getAxiosInstance } from "@peerless/services";
import { EnduserAPI, SalesAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";

export const getEnduserSalesCostYears = () => {
    const fetchEnduserSalesCostYears = async () => {
        const response = await getAxiosInstance().get(SalesAPI.Get_Cost_Years);
        return response.data;
    };
    return useQuery({
        queryKey: ['getEnduserSalesCostYears'],
        queryFn: () => fetchEnduserSalesCostYears(),
    });
};

export const getEnduserSalesCostPeriods = (payload: any) => {
    const fetchEnduserSalesCostPeriods = async (payload: any) => {
        const response = await getAxiosInstance().post(SalesAPI.Get_Cost_Period, payload);
        return response.data;
    };
    return useQuery({
        queryKey: ['getEnduserSalesCostPeriods', payload],
        queryFn: () => fetchEnduserSalesCostPeriods(payload),
    });
};

export const getEnduserSalesCurrentCostPeriods = () => {
    const fetchEnduserSalesCurrentCostPeriod = async () => {
        const response = await getAxiosInstance().post(SalesAPI.Get_Current_Cost_Period);
        return response.data;
    };
    return useQuery({
        queryKey: ['getEnduserSalesCurrentCostPeriods'],
        queryFn: () => fetchEnduserSalesCurrentCostPeriod(),
    });
};

export const getEnduserSalesWithAllProducts = (payload: any, isEnabled: boolean) => {
    const fetchEnduserSalesWithAllProducts = async (payload: any) => {
        const response = await getAxiosInstance().post(EnduserAPI.Get_Enduser_Sales_With_All_Products, payload);
        return response.data;
    };
    return useQuery({
        queryKey: ['getEnduserSalesWithAllProducts', payload, isEnabled],
        queryFn: () => fetchEnduserSalesWithAllProducts(payload),
        enabled: isEnabled
    });
};

export const GetAllCostPeriods = (isFetch: boolean) => {
    const fetchGetAllCostPeriod = async () => {
        const data = await getAxiosInstance().post<any[]>(
            SalesAPI.Get_All_Cost_Period
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['gets-all-cost-period'],
        queryFn: () => fetchGetAllCostPeriod(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetAllEndusers = (payload: any, isFetch = true) => {
    const fetchGetAllEndusers = async (payload: any) => {
        const data = await getAxiosInstance().post<any[]>(
            EnduserAPI.Get_All_Endusers, payload
        );
        return data.data;
    };
    const { data, isError, status } = useQuery({
        queryKey: ['gets-all-end-users', payload],
        queryFn: () => fetchGetAllEndusers(payload),
        enabled: isFetch
    });
    return {
        data,
        isError,
        status
    };
};

