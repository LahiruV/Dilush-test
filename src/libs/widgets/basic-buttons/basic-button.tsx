import * as React from 'react';
import Button from '@mui/joy/Button';
import Box from '@mui/joy/Box';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: '#D1D0FB',
                    100: '#B5B4F8',
                    200: '#8A88F1',
                    300: '#7070F2',
                    400: '#5A58F0',
                    500: '#4A49E0',
                    600: '#403FCA',
                    700: '#3532A4',
                    800: '#2A2680',
                    900: '#1E1B5A',
                },
                neutral: {
                    50: '#F5F5F5',
                    100: '#E5E5E5',
                    200: '#CCCCCC',
                    300: '#B2B2B2',
                    400: '#999999',
                    500: '#7F7F7F',
                    600: '#666666',
                    700: '#4C4C4C',
                    800: '#333333',
                    900: '#191919',
                },
                danger: {
                    50: '#FFE3E3',
                    100: '#FFBDBD',
                    200: '#FF8A8A',
                    300: '#FF5757',
                    400: '#FF3333',
                    500: '#F00',
                    600: '#CC0000',
                    700: '#990000',
                    800: '#660000',
                    900: '#330000',
                },
            },
        },
    },
});

export interface BasicButtonProps {
    id?: string
    isDisabled?: boolean
    isLoading?: boolean
    label?: string
    className?: string
    colors?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning'
    variant?: 'plain' | 'outlined' | 'soft' | 'solid'
    size?: 'sm' | 'md' | 'lg'
    type?: 'button' | 'submit' | 'reset'
    isFullWidth?: boolean
    onClick?: () => void
}

const BasicButton: React.FC<BasicButtonProps> = ({
    id,
    isDisabled,
    isLoading,
    label,
    className,
    colors,
    variant,
    size,
    type,
    isFullWidth,
    onClick,
}) => {
    return (
        <CssVarsProvider theme={theme}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                    id={id || ''}
                    className={className || ''}
                    type={type}
                    disabled={isDisabled}
                    loading={isLoading}
                    color={colors}
                    variant={variant}
                    size={size}
                    fullWidth={isFullWidth}
                    onClick={onClick}
                >
                    {
                        !isLoading ? (label || '') : ('')
                    }
                </Button>
            </Box>
        </CssVarsProvider >
    );
}

export default BasicButton;