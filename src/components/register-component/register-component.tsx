import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { BasicButton, InputField, InputFileUpload, NotificationWidget } from '@zenra/widgets';
import { power_by } from '@zenra/configs';
import { PoweredBy } from '@zenra/components';
import { useInitialService } from '@zenra/services';

export interface RegisterComponentProps {
    name: string;
    email: string;
    password: string;
    file: File;
    error: string;
    isLoading: boolean;
    isFileUploaded: boolean;
    isFileConverted: boolean;
    open: boolean;
    notification: string;
    isSuccessful: boolean;
    setOpen: () => void;
    setError: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void;
    setName: React.Dispatch<React.SetStateAction<string>>;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    setFile: React.Dispatch<React.SetStateAction<File>>;
    setIsFileUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterComponent: React.FC<RegisterComponentProps> = ({
    name,
    email,
    file,
    password,
    error,
    isLoading,
    isFileUploaded,
    isFileConverted,
    open,
    notification,
    isSuccessful,
    setOpen,
    handleSubmit,
    setName,
    setEmail,
    setFile,
    setIsFileUploaded,
    setPassword,
}) => {
    const initialService = useInitialService();
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
        setIsFileUploaded(true);
    }
    const login = () => {
        initialService.navigate('/');
    }

    return (
        <Container maxWidth="xs">
            <Box className='flex flex-direction-column align-items-end' mt={4}>
                <Typography className='margin-bottom-20 bolder light-font' variant="h4" gutterBottom>
                    Register
                </Typography>
                <form onSubmit={handleSubmit} className='width-max'>
                    <div>
                        <InputField
                            id='name'
                            classNameHelperText='font-12'
                            className='font-14'
                            value={name}
                            setState={(value: string | number) => setName(String(value))}
                            label='Name'
                            placeholder='Enter your name'
                            helperText='John Doe'
                            type='text'
                            required
                            variant='outlined'
                            size='md'
                            isFullWidth
                            helperTextColor={'#4a8d63'}
                        />
                    </div>
                    <div className='margin-top-10'>
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
                            helperTextColor={'#4a8d63'}
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

                    <InputFileUpload
                        id='profile-image'
                        className='margin-top-10 upload-button font-11'
                        label="Upload Profile Image"
                        afterLabel="Uploaded"
                        file={file}
                        loading={isFileUploaded}
                        isFileUploaded={isFileConverted}
                        onChange={handleFileChange}
                    />

                    {error && (
                        <Typography color="error" variant="body2" className='margin-top-10'>
                            {error}
                        </Typography>
                    )}
                    <BasicButton
                        id='register'
                        className='margin-top-20 login-button-main'
                        label='REGISTER'
                        variant='solid'
                        size='md'
                        type="submit"
                        colors='success'
                        isLoading={isLoading}
                        isFullWidth
                    />
                </form>
                <div className='font-14 underline italic cursor padding-top-5 align-items-end' onClick={login}>
                    Login
                </div>
                <PoweredBy company_name={power_by} />
                <NotificationWidget
                    id='register-notification'
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

export default RegisterComponent;
