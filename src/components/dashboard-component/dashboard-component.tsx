import React from 'react';;
import './dashboard-component.css';
import DashBoardCardGrid from './dashboard-card-grid-component/dashboard-card-grid-component';
import DashBoardChartGrid from './dashboard-card-chart-component/dashboard-card-chart-component';
import { CurrentWeekDailyIncomeExpenseResponse, ExpenseMonthResponse, FinanceMonthResponse, FinanceYearResponse, MonthIncomeExpenseResponse } from '@zenra/model';
// import { useSelector } from 'react-redux';
// import { RootState } from '@zenra/store';

export interface DashBoardComponentProps {
    isAuthenticated?: boolean
    thisMonth: FinanceMonthResponse
    lastMonth: FinanceMonthResponse
    thisYear: FinanceYearResponse
    lastYear: FinanceYearResponse
    thisMonthExpense: ExpenseMonthResponse
    todayExpenseCount: number
    allExpenseCount: number
    allFinanceCount: number
    getCurrentWeekDailyIncomeExpense: CurrentWeekDailyIncomeExpenseResponse
    incomeExpenseByYear: MonthIncomeExpenseResponse
}

const DashBoardComponent: React.FC<DashBoardComponentProps> = ({
    thisMonth,
    lastMonth,
    thisYear,
    lastYear,
    thisMonthExpense,
    todayExpenseCount,
    allExpenseCount,
    allFinanceCount,
    getCurrentWeekDailyIncomeExpense,
    incomeExpenseByYear
}) => {

    return (
        <div>
            <DashBoardCardGrid
                thisMonth={thisMonth}
                lastMonth={lastMonth}
                thisYear={thisYear}
                lastYear={lastYear}
                thisMonthExpense={thisMonthExpense}
                todayExpenseCount={todayExpenseCount}
                allExpenseCount={allExpenseCount}
                allFinanceCount={allFinanceCount}
            />
            <div className={`margin-top-20`} />
            <DashBoardChartGrid
                getCurrentWeekDailyIncomeExpense={getCurrentWeekDailyIncomeExpense}
                incomeExpenseByYear={incomeExpenseByYear}
            />
        </div>);
};

export default DashBoardComponent;
