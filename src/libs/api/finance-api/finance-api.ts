import { useMutation, useQuery } from "@tanstack/react-query";
import { add_finance, get_all_finances_count, get_current_week_daily_finance_count, get_finance, get_finance_by_year, get_last_monthly_finance_count, get_last_year_finance_count, get_this_monthly_finance_count, get_this_year_finance_count } from "@zenra/controller";
import { getAuthenticated, postAuthenticated } from "@zenra/functions";
import { AxiosError } from "axios";

export const AddFinance = () => {
    const { mutate: addFinanceMutate } = useMutation({
        mutationFn: async (payload: any) => {
            const response = await postAuthenticated(add_finance, payload);
            return response.data;
        },
        onSuccess: (response: Response) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        addFinanceMutate,
    };
}

export const GetFinance = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_finance);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-finance'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
};

export const GetThisMonthlyFinanceCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_this_monthly_finance_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-this-monthly-finance-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetLastMonthlyFinanceCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_last_monthly_finance_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-last-monthly-finance-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetThisYearFinanceCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_this_year_finance_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-this-year-finance-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetLastYearFinanceCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_last_year_finance_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-last-year-finance-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetFinanceByYear = (year: string, isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_finance_by_year + `/${year}`);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-finance-by-year', year],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetCurrentWeekDailyFinanceCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_current_week_daily_finance_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-current-week-daily-finance-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetAllFinancesCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_all_finances_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-all-finances-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

