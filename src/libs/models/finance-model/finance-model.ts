export interface FinancePayload {
    date: string;
    incomeType: string;
    amount: string;
}

export interface FinanceMonthResponse {
    month: string;
    amount: number;
}

export interface FinanceYearResponse {
    year: string;
    amount: number;
}

export interface FinanceCurrentWeekDailyResponse {
    day: string;
    amount: number;
}