import { Dispatch, SetStateAction } from 'react';
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs';

export interface KendoCheckboxProps {
    id: string;
    className?: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    label: string;
    size?: 'small' | 'medium' | 'large';
}

export function KendoCheckbox(props: KendoCheckboxProps) {
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

export default KendoCheckbox;