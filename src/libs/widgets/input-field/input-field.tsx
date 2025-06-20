import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import './input-field.css';

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
            },
        },
    },
});

export interface InputFieldProps {
    id: string
    label?: string
    placeholder?: string
    helperText?: string
    type?: string
    required?: boolean
    variant?: 'solid' | 'soft' | 'outlined' | 'plain'
    size?: 'sm' | 'md' | 'lg'
    isFullWidth?: boolean
    className?: string
    classNameHelperText?: string
    value: any
    helperTextColor?: string
    setState: (value: string | number) => void
    labelFontSize?: number
    name: string
    description: string
}

const InputField: React.FC<InputFieldProps> = ({
    id,
    label,
    placeholder,
    helperText,
    type,
    required,
    variant,
    size,
    isFullWidth,
    className,
    value,
    helperTextColor,
    classNameHelperText,
    setState,
    labelFontSize,
    name,
    description,
}) => {
    return (
        <CssVarsProvider theme={theme}>
            <FormControl>
                <FormLabel sx={{ fontSize: `${labelFontSize || 14}px` }}>{label}</FormLabel>
                <Input
                    id={id}
                    className={className || ''}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    variant={variant}
                    size={size}
                    fullWidth={isFullWidth}
                    value={value}
                    onChange={(e) => setState(e.target.value)}
                    name={name}
                    description={description}
                />
                <FormHelperText className={classNameHelperText || ''} sx={{ color: helperTextColor }}>{helperText}</FormHelperText>
            </FormControl>
        </CssVarsProvider>
    );
}

export default InputField;