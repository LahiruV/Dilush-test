import * as React from 'react';
import Button from '@mui/joy/Button';
import Snackbar from '@mui/joy/Snackbar';
import GppGoodIcon from '@mui/icons-material/GppGood';
import GppBadIcon from '@mui/icons-material/GppBad';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

export interface NotificationWidgetProps {
    id: string
    label: string
    variant: 'solid' | 'outlined' | 'plain' | 'soft'
    isSuccessful?: boolean
    open: boolean
    className?: string
    setOpen: () => void
}

const NotificationWidget: React.FC<NotificationWidgetProps> = ({
    id,
    label,
    variant,
    isSuccessful,
    open,
    className,
    setOpen,
}) => {
    const isErrored = !isSuccessful;
    const color = isErrored ? 'error-notification-color' : isSuccessful ? 'success-notification-color' : '';

    return (
        <React.Fragment>
            <Snackbar
                id={id}
                className={`${className} ${color}`}
                variant={variant}
                open={open}
                onClose={() => setOpen()}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                startDecorator={isErrored ? <GppBadIcon sx={{ fontSize: '22px' }} /> : isSuccessful ? <GppGoodIcon sx={{ fontSize: '22px' }} /> : <NotificationsActiveIcon sx={{ fontSize: '22px' }} />}
                sx={{ opacity: 0.9 }}
                endDecorator={
                    <Button
                        className={`${className} ${color}`}
                        onClick={() => setOpen()}
                        size="sm"
                        variant={variant}
                    >
                        Dismiss
                    </Button>
                }
            >
                {label}
            </Snackbar>
        </React.Fragment >
    );
}

export default NotificationWidget;
