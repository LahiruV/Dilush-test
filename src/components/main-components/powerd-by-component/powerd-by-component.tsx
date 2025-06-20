import React from 'react';
import { Typography } from '@mui/material';

export interface PoweredByProps {
    company_name: string;
}

const PoweredBy: React.FC<PoweredByProps> = ({ company_name }) => {
    return (
        <Typography variant="caption" className='margin-top-20' style={{ color: '#aaa' }}>
            Powered by <span className="company-name">@ {company_name}</span>
        </Typography>
    );
};

export default PoweredBy;
