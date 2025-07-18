import React, { useEffect } from 'react';
import Snackbar from '@mui/joy/Snackbar';
import Button from '@mui/joy/Button';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';

import './toast-message.css';

export interface ToastMessageProps {
    status: string;
    labelText: string;
    state: boolean;
    setState: (value: boolean) => void;
    triggerKey: number;
    timeToWait?: number;
}

/**
 * CustomToastMessage component displays a toast notification with a specified status and label text.
 *
 * @param {ToastMessageProps} props - The properties for the CustomToastMessage component.
 * @param {string} props.status - The severity level of the toast message (e.g., 'success', 'error').
 * @param {string} props.labelText - The text to be displayed in the toast message.
 * @param {boolean} props.state - Controls whether the toast is visible or not.
 * @param {(value: boolean) => void} props.setState - Function to update the visibility state of the toast.
 * @param {number} props.triggerKey - A unique key to re-trigger the toast.
 * @param {number} [props.timeToWait=1500] - The duration in milliseconds to wait before automatically closing the toast. Defaults to 1500ms.
 * 
 * @description This component uses the Snackbar component from MUI Joy to display a toast message.
 * It automatically opens when the labelText is provided and closes after a specified timeout.
 * The toast message can be dismissed by clicking the "Dismiss" button.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 *
 * @returns {JSX.Element} The rendered CustomToastMessage component.
 */
export function CustomToastMessage({ status, labelText, state, setState, triggerKey, timeToWait }: ToastMessageProps) {
    useEffect(() => {
        if (labelText && triggerKey) {
            setState(true); // Open the Snackbar
            const timer = setTimeout(() => {
                setState(false); // Close the Snackbar after the timeout
            }, timeToWait || 1500);

            return () => clearTimeout(timer); // Cleanup timeout on component unmount or key change
        }
    }, [labelText, triggerKey, setState]);

    return (
        <div className="card flex justify-content-center">
            <Snackbar
                variant="solid"
                className={status}
                open={state}
                onClose={() => setState(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                startDecorator={
                    status === 'success-notification-color' ? (
                        <GppGoodIcon sx={{ color: '#fff' }} />
                    ) : (
                        <GppBadIcon sx={{ color: '#fff' }} />
                    )
                }
                sx={{
                    padding: '10px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                }}
                endDecorator={
                    <Button
                        onClick={() => setState(false)}
                        size="sm"
                        variant="solid"
                        className={status}
                        sx={{
                            marginLeft: '10px',
                        }}
                    >
                        Dismiss
                    </Button>
                }
            >
                {labelText}
            </Snackbar>
        </div>
    );
}
