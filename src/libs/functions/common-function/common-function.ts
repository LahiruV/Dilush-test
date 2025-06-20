import { HandleNotifyAxiosErrorProps, HandleNotifyResponseProps } from "@zenra/model";

export const handleNotifyError = ({ err, setNotification, setIsSuccessful, setOpen, setIsLoading }: HandleNotifyAxiosErrorProps) => {
    if (err.response && err.response.data && typeof err.response.data === 'object' && 'message' in err.response.data) {
        setNotification((err.response?.data as { message: string }).message.toUpperCase());
    } else {
        setNotification('An unexpected error occurred.');
    }
    setIsSuccessful(false);
    setOpen(true);
    setIsLoading(false);
}

export const handleNotifyResponse = ({ res, setNotification, setIsSuccessful, setOpen, setIsLoading }: HandleNotifyResponseProps) => {
    setNotification(res.message.toUpperCase());
    setIsSuccessful(true);
    setOpen(true);
    setIsLoading(false)
}
