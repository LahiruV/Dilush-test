import React from 'react';
import SettingControl from './setting-controls/setting-controls';

export interface SettingsComponentProps {
    isLoading: boolean;
    onClick: () => void;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
    isLoading,
    onClick
}) => {
    return (
        <SettingControl
            isLoading={isLoading}
            onClick={onClick}
        />
    );
};

export default SettingsComponent;
