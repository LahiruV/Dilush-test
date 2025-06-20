import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { BasicButton, InputField, NotificationWidget } from '@zenra/widgets';
import { power_by } from '@zenra/configs';
import { PoweredBy } from '@zenra/components';
import { useInitialService } from '@zenra/services';

export interface LoginComponentProps {
    email: string;
    password: string;
    error: string;
    notification: string;
    isSuccessful: boolean;
    open: boolean;
    isLoading: boolean;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    setOpen: () => void;
}

const LoginComponent: React.FC<LoginComponentProps> = ({
    email,
    password,
    error,
    notification,
    isSuccessful,
    open,
    isLoading,
    setEmail,
    setPassword,
    handleSubmit,
    setOpen,
}) => {
    const initialService = useInitialService();
    const register = () => {
        initialService.navigate('/register');
    }
    return (
        <Container maxWidth="xs">
            <Box className='flex flex-direction-column align-items-end' mt={4}>
                <Typography className='margin-bottom-20 bolder light-font' variant="h4" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit} className='width-max'>
                    <div>
                        <InputField
                            id='email'
                            classNameHelperText='font-12'
                            className='font-14'
                            value={email}
                            setState={(value: string | number) => setEmail(String(value))}
                            label='Email'
                            placeholder='Enter your email'
                            helperText='john@gmail.com'
                            type='email'
                            required
                            variant='outlined'
                            size='md'
                            isFullWidth
                            helperTextColor={"#4a8d63"}
                        />
                    </div>
                    <div className='margin-top-10'>
                        <InputField
                            id='password'
                            classNameHelperText='font-12'
                            className='font-14'
                            value={password}
                            setState={(value: string | number) => setPassword(String(value))}
                            label='Password'
                            placeholder='Enter your password'
                            helperText='********'
                            type='password'
                            required
                            variant='outlined'
                            size='md'
                            isFullWidth
                            helperTextColor={'#4a8d63'}
                        />
                    </div>
                    {error && (
                        <Typography color="error" variant="body2" className='margin-top-10'>
                            {error}
                        </Typography>
                    )}
                    <BasicButton
                        id='login'
                        className='margin-top-20 login-button-main'
                        label='LOGIN'
                        variant='solid'
                        size='md'
                        type="submit"
                        isFullWidth
                        colors='success'
                        isLoading={isLoading}
                    />
                </form>
                <div className='font-14 underline italic cursor padding-top-5 align-items-end' onClick={register}>
                    Register
                </div>
                <PoweredBy company_name={power_by} />
                <NotificationWidget
                    id='login-notification'
                    className='font-12'
                    label={notification}
                    variant='solid'
                    isSuccessful={isSuccessful}
                    open={open}
                    setOpen={setOpen}
                />
            </Box>
        </Container>
    );
};

export default LoginComponent;
