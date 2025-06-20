import { GridColDef } from '@mui/x-data-grid';
import { GetExpense } from '@zenra/api';
import { ExpensesListTable } from '@zenra/components';
import { BasicButton } from '@zenra/widgets';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const titleComponentExpensesList =
    <NavLink style={{ textDecoration: 'none' }} className='height-auto' to='/newExpenses'>
        <BasicButton className='top-header-button log-out-button' size='sm' label='Add Expense' />
    </NavLink>

export const Expenses: React.FC = () => {
    const { response } = GetExpense(true);

    const rows = [
        { date: '', expenseType: '', amount: 0 },
    ];

    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: true,
        },
        {
            field: 'expenseType',
            headerName: 'Expense Type',
            width: 150,
            editable: true,
        },
        {
            field: 'amount',
            headerName: 'Amount (LKR)',
            type: 'number',
            width: 110,
            editable: true,
        },
    ];

    return (
        <div>
            <ExpensesListTable
                rows={response?.data.result}
                columns={columns}
            />
        </div>
    );
};
