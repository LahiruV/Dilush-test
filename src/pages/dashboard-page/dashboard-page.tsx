import { GetAllExpensesCount, GetAllFinancesCount, GetCurrentWeekDailyIncomeExpenseCount, GetIncomeExpenseByYear, GetLastMonthlyFinanceCount, GetLastYearFinanceCount, GetThisMonthlyExpensesCount, GetThisMonthlyFinanceCount, GetThisYearFinanceCount, GetTodayExpensesCount } from '@zenra/api';
import { DashboardComponent } from '@zenra/components';
import { CurrentWeekDailyIncomeExpenseResponse, ExpenseMonthResponse, FinanceMonthResponse, FinanceYearResponse, MonthIncomeExpenseResponse } from '@zenra/model';
import { RootState } from '@zenra/store';
import React from 'react';
import { useSelector } from 'react-redux';

const incomeExpenseByYearData = [
    { amountIncome: 0, amountExpense: 0, month: 'January' },
    { amountIncome: 0, amountExpense: 0, month: 'February' },
    { amountIncome: 0, amountExpense: 0, month: 'March' },
    { amountIncome: 0, amountExpense: 0, month: 'April' },
    { amountIncome: 0, amountExpense: 0, month: 'May' },
    { amountIncome: 0, amountExpense: 0, month: 'June' },
    { amountIncome: 0, amountExpense: 0, month: 'July' },
    { amountIncome: 0, amountExpense: 0, month: 'August' },
    { amountIncome: 0, amountExpense: 0, month: 'September' },
    { amountIncome: 0, amountExpense: 0, month: 'October' },
    { amountIncome: 0, amountExpense: 0, month: 'November' },
    { amountIncome: 0, amountExpense: 0, month: 'December' },
];

const currrentWeekDailyIncomeExpenseData =
    [
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Sun',
        },
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Mon',
        },
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Tue',
        },
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Wed',
        },
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Thu',
        },
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Fri',
        },
        {
            amountIncome: 0,
            amountExpense: 0,
            day: 'Sat',
        }
    ]

export const Dashboard: React.FC = () => {
    const { monthWiseYear } = useSelector((state: RootState) => state.dashboard);
    const thisMonth = GetThisMonthlyFinanceCount(true)?.response?.data || ({} as FinanceMonthResponse);
    const lastMonth = GetLastMonthlyFinanceCount(true)?.response?.data || ({} as FinanceMonthResponse);
    const thisYear = GetThisYearFinanceCount(true)?.response?.data || ({} as FinanceYearResponse);
    const lastYear = GetLastYearFinanceCount(true)?.response?.data || ({} as FinanceYearResponse);
    const thisMonthExpense = GetThisMonthlyExpensesCount(true)?.response?.data || ({} as ExpenseMonthResponse);
    const todayExpenseCount = GetTodayExpensesCount(true)?.response?.data || 0;
    const allExpenseCount = GetAllExpensesCount(true)?.response?.data || 0;
    const allFinanceCount = GetAllFinancesCount(true)?.response?.data || 0;
    const incomeExpenseByYear = GetIncomeExpenseByYear(monthWiseYear, true)?.response?.data || ({} as MonthIncomeExpenseResponse);
    const getCurrentWeekDailyIncomeExpense = GetCurrentWeekDailyIncomeExpenseCount(true)?.response?.data || ({} as CurrentWeekDailyIncomeExpenseResponse);

    return (
        <DashboardComponent
            thisMonth={thisMonth.result}
            lastMonth={lastMonth.result}
            thisYear={thisYear.result}
            lastYear={lastYear.result}
            thisMonthExpense={thisMonthExpense.result}
            todayExpenseCount={todayExpenseCount.result}
            allExpenseCount={allExpenseCount.result}
            allFinanceCount={allFinanceCount.result}
            getCurrentWeekDailyIncomeExpense={getCurrentWeekDailyIncomeExpense?.result || currrentWeekDailyIncomeExpenseData}
            incomeExpenseByYear={incomeExpenseByYear?.result || incomeExpenseByYearData}
            isAuthenticated={true}
        />
    );
};
