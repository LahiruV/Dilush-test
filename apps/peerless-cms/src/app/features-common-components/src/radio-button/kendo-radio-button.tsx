import { Dispatch, SetStateAction } from 'react';
import { RadioButton } from '@progress/kendo-react-inputs';

export interface KendoRadioButtonProps {
    id: string;
    className: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    name: string;
    checked: boolean;
    label: string;
}

export function KendoRadioButton(props: KendoRadioButtonProps) {
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

export default KendoRadioButton;