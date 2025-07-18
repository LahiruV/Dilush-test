import { Dispatch, SetStateAction } from 'react';
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs';

export interface CheckBoxProps {
    id: string;
    className?: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    label?: string;
    size?: 'small' | 'medium' | 'large';
}

/**
 * CheckBox component renders a checkbox input with customizable properties.
 * 
 * @param {CheckBoxProps} props - The properties for the CheckBox component.
 * @param {string} props.id - The unique identifier for the checkbox.
 * @param {string} props.className - The CSS class name for styling the checkbox.
 * @param {string} props.size - The size of the checkbox.
 * @param {string} props.label - The label displayed next to the checkbox.
 * @param {boolean} props.value - The checked state of the checkbox.
 * @param {(value: boolean) => void} props.setValue - The function to update the checked state.
 * 
 * @returns {JSX.Element} The rendered CheckBox component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function CheckBox(props: CheckBoxProps) {
    const handleChange = (event: CheckboxChangeEvent) => {
        props.setValue(event.value);
    }

    return (
        <div>
            <Checkbox
                id={props.id}
                className={props.className}
                size={props.size}
                label={props.label}
                checked={props.value}
                onChange={handleChange}
            />
        </div>
    );
}

export default CheckBox;