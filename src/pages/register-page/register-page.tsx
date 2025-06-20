import React, { useEffect, useState } from 'react';
import { RegisterComponent } from '@zenra/components';
import { RegisterAdminPayload, Response } from '@zenra/model';
import { AdminRegister, Base64ImageConverter } from '@zenra/api';
import { handleNotifyError, handleNotifyResponse } from '@zenra/functions';
import { AxiosError } from 'axios';

/**
 * Register component for handling user registration.
 * 
 * @component
 * 
 * @returns {JSX.Element} The rendered Register component.
 * 
 * @remarks
 * This component handles the registration process for an admin user. It includes form validation,
 * image upload and conversion, and submission of registration data.
 * 
 * @example
 * ```tsx
 * <Register />
 * ```
 * 
 * @typedef {Object} RegisterAdminPayload
 * @property {string} name - The name of the admin user.
 * @property {string} email - The email of the admin user.
 * @property {string} password - The password of the admin user.
 * @property {string} image - The base64 encoded profile image of the admin user.
 * 
 * @typedef {Object} Response
 * @property {string} message - The response message from the server.
 * 
 * @typedef {Object} AxiosError
 * @property {string} message - The error message from the server.
 * 
 * @typedef {Object} Base64ImageResponse
 * @property {string} base64Image - The base64 encoded image.
 * 
 * @typedef {Object} Base64ImageConverterResult
 * @property {Base64ImageResponse} data - The data containing the base64 encoded image.
 * @property {string} status - The status of the image conversion ('success' or 'error').
 * 
 * @typedef {Object} AdminRegisterResult
 * @property {Function} adminRegisterMutate - The function to mutate the registration data.
 * 
 * @function validation
 * @description Validates the form inputs.
 * @returns {boolean} True if the form inputs are valid, otherwise false.
 * 
 * @function handleSubmit
 * @description Handles the form submission.
 * @param {React.FormEvent} e - The form event.
 * 
 * @param {string} name - The name of the admin user.
 * @param {Function} setName - The function to set the name state.
 * @param {string} email - The email of the admin user.
 * @param {Function} setEmail - The function to set the email state.
 * @param {string} password - The password of the admin user.
 * @param {Function} setPassword - The function to set the password state.
 * @param {File} file - The profile image file.
 * @param {Function} setFile - The function to set the file state.
 * @param {boolean} isFileUploaded - Indicates if the file has been uploaded.
 * @param {Function} setIsFileUploaded - The function to set the isFileUploaded state.
 * @param {boolean} isFileConverted - Indicates if the file has been converted.
 * @param {string} error - The error message.
 * @param {Function} setError - The function to set the error state.
 * @param {boolean} isLoading - Indicates if the form is in a loading state.
 * @param {boolean} open - Indicates if the notification is open.
 * @param {Function} setOpen - The function to set the open state.
 * @param {string} notification - The notification message.
 * @param {boolean} isSuccessful - Indicates if the registration was successful.
 * @param {Base64ImageConverterResult} response - The response from the image converter.
 * @param {string} status - The status of the image conversion.
 * @param {AdminRegisterResult} adminRegisterMutate - The function to mutate the registration data.
 * @author Lahiru Vimukthi
 */

export const Register: React.FC = () => {
    const { adminRegisterMutate } = AdminRegister();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [file, setFile] = useState<File>({ name: '', size: 0, type: '' } as File);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [isFileConverted, setIsFileConverted] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState('');
    const [isSuccessful, setIsSuccessful] = useState(false);
    const { response, status } = Base64ImageConverter(file, isFileUploaded);

    useEffect(() => {
        if (status === 'success') {
            setNotification(response?.data.message);
            setIsSuccessful(true);
            setOpen(true);
            setIsFileUploaded(false);
            setIsFileConverted(true);
            setError('');
        }
        if (status === 'error') {
            setNotification(response?.data.message || 'FAILED TO UPLOAD IMAGE.');
            setIsSuccessful(false);
            setOpen(true);
            setIsFileUploaded(false);
            setIsFileConverted(false);
        }
    }, [status, file]);

    const validation = () => {
        if (!name) {
            setError('Name cannot be empty.');
        } else if (!email) {
            setError('Email cannot be empty.');
        } else if (!password) {
            setError('Password cannot be empty.');
        } else if (password.length < 8) {
            setError('Password must be at least 8 characters long.');
        }
        else if (!file) {
            setError('Please upload a profile image.');
        }
        else if (!response) {
            setError('Please upload a profile image.');
        }
        else {
            return true;
        }
        setIsLoading(false);
        return false;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        if (!validation()) return;
        setError('');
        const payload: RegisterAdminPayload = {
            name,
            email,
            password,
            profile: response?.data.result
        };
        adminRegisterMutate(payload, {
            onSuccess: (res: Response) => handleNotifyResponse({
                res,
                setNotification,
                setIsSuccessful,
                setOpen,
                setIsLoading,
            }),
            onError: (error: AxiosError) => handleNotifyError({
                err: error,
                setNotification,
                setIsSuccessful,
                setOpen,
                setIsLoading,
            }),
        });
    };


    return (
        <RegisterComponent
            name={name}
            email={email}
            password={password}
            file={file}
            isFileUploaded={isFileUploaded}
            error={error}
            isLoading={isLoading}
            isFileConverted={isFileConverted}
            open={open}
            notification={notification}
            isSuccessful={isSuccessful}
            setOpen={() => setOpen(false)}
            setError={setError}
            handleSubmit={handleSubmit}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setFile={setFile}
            setIsFileUploaded={setIsFileUploaded}
        />
    );
};
