import * as React from 'react';
import Switch from '@mui/material/Switch';
import './controll-switch.css';

interface ControlledSwitchesProps { }

const ControlledSwitches: React.FC<ControlledSwitchesProps> = () => {
    const [checked, setChecked] = React.useState<boolean>(true);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setChecked(event.target.checked);
    };

    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
        />
    );
};

export default ControlledSwitches;