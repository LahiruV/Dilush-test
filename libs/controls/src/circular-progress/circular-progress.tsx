import * as React from 'react';
import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';

export interface CircularProgressWidgetProps {
    size?: 'sm' | 'md' | 'lg';
}

export const CircularProgressWidget = ({ size }: CircularProgressWidgetProps) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
            <CircularProgress color="neutral"
                variant="plain" size={size} />
        </Box>
    );
}