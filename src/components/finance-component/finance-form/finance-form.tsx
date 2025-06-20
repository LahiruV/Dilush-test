import { Card } from "@mui/material";
import { BasicButton, InputField, NotificationWidget } from "@zenra/widgets";

export interface FinanceFormComponentProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    date: string;
    income: string;
    amount: string;
    setDate: (value: string) => void;
    setIncome: (value: string) => void;
    setAmount: (value: string) => void
    isLoading: boolean;
    open: boolean;
    setOpen: () => void;
    notification: string;
    isSuccessful: boolean;
}

const FinanceFormComponent: React.FC<FinanceFormComponentProps> = ({
    handleSubmit,
    isLoading,
    date,
    income,
    amount,
    setDate,
    setIncome,
    setAmount,
    open,
    setOpen,
    notification,
    isSuccessful
}) => {

    return (
        <div>
            <Card className='width-max'>
                <form onSubmit={handleSubmit} className="padding-20">
                    <div className="flex justify-content-between padding-20">
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='date'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={date}
                                setState={(value: string | number) => setDate(String(value))}
                                label='Date'
                                placeholder=''
                                type='date'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""} />
                        </div>
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='income'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={income}
                                setState={(value: string | number) => setIncome(String(value))}
                                label='Income Type'
                                placeholder='Salary'
                                type='text'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""} />
                        </div>
                        <div style={{ width: '243px' }}>
                            <InputField
                                id='amount'
                                classNameHelperText='font-12'
                                className='font-12 light-background'
                                value={amount}
                                setState={(value: string | number) => setAmount(String(value))}
                                label='Amount'
                                placeholder='2000'
                                type='number'
                                required
                                variant='outlined'
                                size='md'
                                isFullWidth
                                labelFontSize={12} name={""} description={""} />
                        </div>
                    </div>
                    <div className="flex justify-content-between">
                        <div></div>
                        <BasicButton
                            id='login'
                            className='margin-top-20 width-100 font-12'
                            label='Submit'
                            variant='solid'
                            size='sm'
                            type="submit"
                            isFullWidth
                            colors='primary'
                            isLoading={isLoading}
                        />
                    </div>
                </form>
            </Card>
            <NotificationWidget
                id='finance-notification'
                className='font-12'
                label={notification}
                variant='solid'
                isSuccessful={isSuccessful}
                open={open}
                setOpen={setOpen}
            />
        </div>
    );
};

export default FinanceFormComponent;