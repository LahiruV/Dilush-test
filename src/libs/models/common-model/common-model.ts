import { AxiosError } from "axios";

export interface Response {
    message: string;
    data?: Record<string, unknown>;
}

export interface HandleNotifyResponseProps {
    res: { message: string };
    setNotification: (notification: string) => void;
    setIsSuccessful: (isSuccessful: boolean) => void;
    setOpen: (open: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export interface HandleNotifyAxiosErrorProps {
    err: AxiosError;
    setNotification: (notification: string) => void;
    setIsSuccessful: (isSuccessful: boolean) => void;
    setOpen: (open: boolean) => void;
    setIsLoading: (isLoading: boolean) => void;
}