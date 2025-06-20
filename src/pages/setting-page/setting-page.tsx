import { DockerExcelGenerator } from '@zenra/api';
import { SettingsComponent } from '@zenra/components';
import { handleNotifyError, handleNotifyResponse } from '@zenra/functions';
import { NotificationWidget } from '@zenra/widgets';
import { AxiosError } from 'axios';
import { FC, useState } from 'react';

export const Setting: FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState('');

    const { dockerExcelGeneratorMutate } = DockerExcelGenerator({ payload: {} });

    const generateDockerBackup = () => {
        setIsLoading(true);
        dockerExcelGeneratorMutate(undefined, {
            onSuccess: (res: any) => {
                handleNotifyResponse({
                    res,
                    setNotification,
                    setIsSuccessful,
                    setOpen,
                    setIsLoading,
                });
            },
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
        <div>
            <SettingsComponent
                isLoading={isLoading}
                onClick={generateDockerBackup}
            />
            <NotificationWidget
                id='expenses-notification'
                className='font-12'
                label={notification}
                variant='solid'
                isSuccessful={isSuccessful}
                open={open}
                setOpen={() => setOpen(false)}
            />
        </div>
    );
};
