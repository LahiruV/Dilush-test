import { Dispatch, SetStateAction } from 'react';
import { Input } from '@progress/kendo-react-inputs';


export interface InputWidgetProps {
    id: string;
    className: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    type?: string;
    placeholder?: string;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
}

/**
 * InputWidget component renders an input field with specified properties and handles input changes.
 * 
 * @param {InputWidgetProps} props - The properties for the InputWidget component.
 * @param {string} props.id - The id for the input element.
 * @param {string} props.className - The class name for the input element.
 * @param {Function} props.setValue - The function to set the value of the input.
 * @param {string} props.value - The current value of the input.
 * @param {string} [props.type] - The type of the input element. Default is 'text'.
 * @param {string} [props.placeholder] - The placeholder for the input element.
 * @param {number} [props.maxLength] - The maximum length of the input element.
 * @param {number} [props.minLength] - The minimum length of the input element.
 * @param {boolean} [props.required] - Whether the input is required or not.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function InputWidget({ id, className, setValue, value, type, placeholder, maxLength, minLength, required }: InputWidgetProps) {

    const handleInputChange = (event: any) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <Input
                id={id}
                className={className}
                onChange={handleInputChange}
                value={value}
                type={type || 'text'}
                placeholder={placeholder || ''}
                maxLength={maxLength || 255}
                minLength={minLength || 1}
                min={minLength || 1}
                max={maxLength || 255}
                required={required || false}
            />
        </div>
    );
}

export default InputWidget;