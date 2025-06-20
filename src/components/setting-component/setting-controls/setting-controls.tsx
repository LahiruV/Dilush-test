import React from 'react';
import { BasicButton, BasicCard } from '@zenra/widgets';

export interface SettingControlProps {
    isLoading: boolean;
    onClick: () => void;
}

const SettingControl: React.FC<SettingControlProps> = ({
    isLoading,
    onClick
}) => {
    return (
        <BasicCard
            className='height-auto'
            size='sm'
            isHeader={false}
            content={
                <div>
                    <BasicButton
                        className='login-button-main font-13 width-190'
                        variant='solid'
                        colors='success'
                        size='sm'
                        onClick={onClick}
                        label='Docker Backup Generator'
                        isLoading={isLoading}
                    />
                </div>
            }
        />
    );
};

export default SettingControl;
