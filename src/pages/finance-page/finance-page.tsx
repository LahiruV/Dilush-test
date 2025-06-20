import { GridColDef } from '@mui/x-data-grid';
import { GetFinance } from '@zenra/api';
import { FinanceListTable } from '@zenra/components';
import { BasicButton } from '@zenra/widgets';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const titleComponentFinanceList =
    <NavLink style={{ textDecoration: 'none' }} className='height-auto' to='/newIncome'>
        <BasicButton className='top-header-button log-out-button' size='sm' label='Add Income' />
    </NavLink>

export const Finance: React.FC = () => {
    const { response } = GetFinance(true);

    const rows = [
        { date: '', incomeType: '', amount: 0 },
    ];

    const columns: GridColDef<(typeof rows)[number]>[] = [
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            editable: true,
        },
        {
            field: 'incomeType',
            headerName: 'Income Type',
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
            <FinanceListTable
                rows={response?.data.result}
                columns={columns}
            />
        </div>
    );
};
