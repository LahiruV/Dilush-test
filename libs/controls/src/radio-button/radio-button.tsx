import { Dispatch, SetStateAction } from 'react';
import { RadioButton } from '@progress/kendo-react-inputs';

export interface RadioButtonWidgetProps {
    id: string;
    className: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    name: string;
    checked: boolean;
    label: string;
}

/**
 * RadioButtonWidget component renders a radio button with specified properties.
 * 
 * @param {RadioButtonWidgetProps} props - The properties for the RadioButtonWidget component.
 * @param {string} props.id - The unique identifier for the radio button.
 * @param {string} props.className - The CSS class name for the radio button.
 * @param {string} props.name - The name attribute for the radio button.
 * @param {string} props.value - The value attribute for the radio button.
 * @param {boolean} props.checked - The checked state of the radio button.
 * @param {string} props.label - The label for the radio button.
 * @param {function} props.setValue - The function to set the value of the radio button.
 * 
 * @returns {JSX.Element} The rendered RadioButtonWidget component.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function RadioButtonWidget(props: RadioButtonWidgetProps) {
    const handleClick = (event: any) => {
        props.setValue(event.target.value);
    }

    return (
        <div>
            <RadioButton
                id={props.id}
                className={props.className}
                name={props.name}
                value={props.value}
                checked={props.checked}
                label={props.label}
                onClick={handleClick}
            />
        </div>
    );
}

export default RadioButtonWidget;