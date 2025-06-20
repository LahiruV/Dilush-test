import React, { useState } from 'react';
import { BasicButton } from '@zenra/widgets';
import { NavLink } from 'react-router-dom';
import { FinanceFormComponent } from '@zenra/components';
import { AddFinance } from '@zenra/api';
import { handleNotifyError, handleNotifyResponse } from '@zenra/functions';
import { AxiosError } from 'axios';
import { FinancePayload } from '@zenra/model';

export const titleComponentFinanceForm =
    <NavLink style={{ textDecoration: 'none' }} className='height-auto' to='/income'>
        <BasicButton className='top-header-button log-out-button' size='sm' label='Back' />
    </NavLink>

export const FinanceForm: React.FC = () => {

    const { addFinanceMutate } = AddFinance();
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [income, setIncome] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const payload: FinancePayload = {
            date,
            incomeType: income,
            amount,
        };
        setIsLoading(true);
        addFinanceMutate(payload, {
            onSuccess: (res: any) => {
                handleNotifyResponse({
                    res,
                    setNotification,
                    setIsSuccessful,
                    setOpen,
                    setIsLoading,
                });
                setDate(new Date().toISOString().split('T')[0]);
                setIncome('');
                setAmount('');
            },
            onError: (error: AxiosError) => handleNotifyError({
                err: error,
                setNotification,
                setIsSuccessful,
                setOpen,
                setIsLoading,
            }),
        });
    }

    return (
        <>
            <FinanceFormComponent
                handleSubmit={handleSubmit}
                date={date}
                income={income}
                amount={amount}
                setDate={setDate}
                setIncome={setIncome}
                setAmount={setAmount}
                isLoading={isLoading}
                open={open}
                setOpen={() => setOpen(false)}
                notification={notification}
                isSuccessful={isSuccessful}
            />
        </>
    );
};
