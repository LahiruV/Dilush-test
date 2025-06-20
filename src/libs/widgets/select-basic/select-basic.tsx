import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { ColorPaletteProp, FormControl, VariantProp } from '@mui/joy';
import { FormHelperText, FormLabel } from '@mui/material';

export interface SelectBasicProps {
    variant?: VariantProp;
    color?: ColorPaletteProp;
    size?: 'sm' | 'md' | 'lg';
    value?: string | number;
    placeholder?: string;
    className?: string;
    classNameOption?: string;
    classNameHelperText?: string
    classNameLabel?: string
    dataList: { value: string | number; label: string | number }[];
    onChange: (event: React.MouseEvent | React.KeyboardEvent | React.FocusEvent | null, value: string | number) => void;
    label?: string
    labelFontSize?: number
    helperTextColor?: string
    helperText?: string
    labelColor?: string
}

const SelectBasic: React.FC<SelectBasicProps> = ({ variant, color, size, value, placeholder, className, classNameOption, dataList = [], onChange, label, labelFontSize, classNameHelperText, helperText, helperTextColor, classNameLabel, labelColor }) => {
    return (
        <FormControl>
            <FormLabel className={classNameLabel} sx={{ fontSize: `${labelFontSize || 14}px`, paddingBottom: '5px', color: labelColor }}>{label}</FormLabel>
            <Select
                color={color || 'primary'}
                variant={variant || 'solid'}
                size={size || 'sm'}
                value={value}
                placeholder={placeholder || 'Select'}
                className={className}
                onChange={(event, value) => onChange(event, value as string | number)}
            >
                {
                    dataList.map((item) => (
                        <Option className={classNameOption} key={item.value} value={item.value}>{item.label}</Option>
                    ))}
            </Select>
            <FormHelperText className={classNameHelperText || ''} sx={{ color: helperTextColor }}>{helperText}</FormHelperText>
        </FormControl>
    );
}

export default SelectBasic;