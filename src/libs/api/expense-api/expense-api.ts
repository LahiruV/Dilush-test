import { useMutation, useQuery } from "@tanstack/react-query";
import { add_expense, get_all_expenses_count, get_current_week_daily_expense_count, get_current_week_daily_income_expense_count, get_expense, get_expense_by_year, get_income_expense_by_year, get_this_monthly_expense_count, get_today_expenses_count } from "@zenra/controller";
import { getAuthenticated, postAuthenticated } from "@zenra/functions";
import { AxiosError } from "axios";

export const AddExpense = () => {
    const { mutate: addExpenseMutate } = useMutation({
        mutationFn: async (payload: any) => {
            const response = await postAuthenticated(add_expense, payload);
            return response.data;
        },
        onSuccess: (response: Response) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        addExpenseMutate,
    };
}

export const GetExpense = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_expense);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-expense'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
};

export const GetThisMonthlyExpensesCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_this_monthly_expense_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-this-monthly-expense-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetTodayExpensesCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_today_expenses_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-today-expenses-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetAllExpensesCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_all_expenses_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-all-expenses-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetCurrentWeekDailyExpenseCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_current_week_daily_expense_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-current-week-daily-expense-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetExpenseByYear = (year: string, isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_expense_by_year + `/${year}`);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-expense-by-year', year],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetCurrentWeekDailyIncomeExpenseCount = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_current_week_daily_income_expense_count);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-current-week-daily-income-expense-count'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}

export const GetIncomeExpenseByYear = (year: string, isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(get_income_expense_by_year + `/${year}`);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-income-expense-by-year', year],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
}