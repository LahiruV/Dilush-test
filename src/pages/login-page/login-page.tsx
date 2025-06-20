import React, { useState } from 'react';
import { LoginComponent } from '@zenra/components';
import { LoginAdminPayload, LoginAdminResponse } from '@zenra/model';
import { AdminLogin } from '@zenra/api';
import { AxiosError } from 'axios';
import { handleNotifyError, handleNotifyResponse } from '@zenra/functions';
import { authService, useInitialService } from '@zenra/services';
import { setLoggedUser } from '@zenra/store';

/**
 * Login component for handling user authentication.
 *
 * @component
 * @returns {React.FC} The Login component.
 *
 * @typedef {Object} LoginAdminPayload
 * @property {string} email - The email of the admin.
 * @property {string} password - The password of the admin.
 *
 * @typedef {Object} LoginAdminResponse
 * @property {string} token - The authentication token.
 * @property {Object} user - The authenticated user object.
 *
 * @typedef {Object} AxiosError
 * @property {string} message - The error message.
 *
 * @function isValidForm
 * @description Validates the form inputs.
 * @returns {boolean} True if the form is valid, otherwise false.
 *
 * @function handleSubmit
 * @description Handles the form submission.
 * @param {React.FormEvent} e - The form event.
 *
 * @constant {string} email - The email state.
 * @constant {Function} setEmail - The function to set the email state.
 * 
 * @constant {string} password - The password state.
 * @constant {Function} setPassword - The function to set the password state.
 * 
 * @constant {string} error - The error state.
 * @constant {Function} setError - The function to set the error state.
 * 
 * @constant {boolean} isLoading - The loading state.
 * @constant {Function} setIsLoading - The function to set the loading state.
 * 
 * @constant {string} notification - The notification state.
 * @constant {Function} setNotification - The function to set the notification state.
 * 
 * @constant {boolean} isSuccessful - The success state.
 * @constant {Function} setIsSuccessful - The function to set the success state.
 * 
 * @constant {boolean} open - The open state for the notification.
 * @constant {Function} setOpen - The function to set the open state.
 * @author Lahiru Vimukthi
 */

export const Login: React.FC = () => {
    const initialService = useInitialService();
    const { adminLoginMutate } = AdminLogin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [notification, setNotification] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [open, setOpen] = useState(false);

    const isValidForm = (): boolean => {
        if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
            setIsLoading(false);
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!isValidForm()) return;
        setError('');

        const payload: LoginAdminPayload = {
            email,
            password,
        };

        adminLoginMutate(payload, {
            onSuccess: (res: LoginAdminResponse) => {
                if (res.result) {
                    authService.setToken(res.result.token ?? '');
                    initialService.dispatch(setLoggedUser(res.result));
                }
                handleNotifyResponse({
                    res,
                    setNotification,
                    setIsSuccessful,
                    setOpen,
                    setIsLoading,
                });
                initialService.navigate('/dashboard');
            },
            onError: (error: AxiosError) => {
                handleNotifyError({
                    err: error,
                    setNotification,
                    setIsSuccessful,
                    setOpen,
                    setIsLoading,
                });
            },
        });
    };

    return (
        <LoginComponent
            email={email}
            password={password}
            notification={notification}
            isSuccessful={isSuccessful}
            open={open}
            isLoading={isLoading}
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            setError={setError}
            handleSubmit={handleSubmit}
            setOpen={() => setOpen(!open)}
        />
    );
};