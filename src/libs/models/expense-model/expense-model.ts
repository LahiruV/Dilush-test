export interface ExpensePayload {
    date: string;
    expenseType: string;
    amount: string;
}

export interface ExpenseMonthResponse {
    month: string;
    amount: number;
}

export interface ExpenseYearResponse {
    year: string;
    amount: number;
}

export interface ExpenseCurrentWeekDailyResponse {
    day: string;
    amount: number;
}

export interface CurrentWeekDailyIncomeExpenseResponse {
    day: string;
    amountIncome: number;
    amountExpense: number;

}

export interface MonthIncomeExpenseResponse {
    month: string;
    amountIncome: number;
    amountExpense: number;
}