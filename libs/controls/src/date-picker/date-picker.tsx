import { Dispatch, SetStateAction } from 'react';
import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs';

export interface DatePickerWidgetProps {
    id: string;
    className?: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    format?: string;
    size?: 'small' | 'medium' | 'large';
    fillMode?: 'solid' | 'outline' | 'flat';
    placeholder?: string;
    label?: any;
    isDisabled?: boolean;
}

/**
 * DatePickerWidget component renders a date picker input field with customizable properties.
 * 
 * @param {DatePickerWidgetProps} props - The properties for the DatePickerWidget component.
 * @param {string} props.id - The unique identifier for the date picker.
 * @param {string} props.className - The CSS class name for the date picker.
 * @param {string} props.placeholder - The placeholder text for the date picker input.
 * @param {string} props.size - The size of the date picker input.
 * @param {string} props.format - The date format for the date picker.
 * @param {string} props.fillMode - The fill mode for the date picker.
 * @param {Date | null} props.value - The current value of the date picker.
 * @param {(value: Date | null) => void} props.setValue - The function to set the value of the date picker.
 * @param {any} props.label - The label style for the date picker.
 * @param {boolean} props.isDisabled - Whether the date picker is disabled.
 * 
 * @returns {JSX.Element} The rendered DatePickerWidget component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function DatePickerWidget(props: DatePickerWidgetProps) {
    const handleInputChange = (event: any) => {
        const rawDate = event.value;
        if (rawDate) {
            const now = new Date();
            rawDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
            props.setValue(rawDate.toISOString());
        }
    };


    return (
        <div>
            {props.label &&
                <div style={{
                    fontWeight: props.label?.fontWeight || 'lighter',
                    color: props.label?.color || '#000',
                    fontSize: props.label?.fontSize || '11px',
                    paddingBottom: '3px',
                }}>
                    {props.label?.name || ''}
                </div>
            }
            <DatePicker
                style={{ fontSize: '12px' }}
                id={props.id}
                className={props.className || ''}
                placeholder={props.placeholder || 'Select date...'}
                size={props.size}
                format={props.format}
                fillMode={props.fillMode}
                disabled={props.isDisabled}
                value={props.value ? new Date(props.value) : null}
                onChange={(e: DatePickerChangeEvent) => {
                    handleInputChange(e);
                }}
            />
        </div>
    );
}

export default DatePickerWidget;
