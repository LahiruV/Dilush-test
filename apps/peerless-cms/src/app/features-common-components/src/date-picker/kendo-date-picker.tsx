import { Dispatch, SetStateAction } from 'react';
import { DatePicker, DatePickerChangeEvent } from '@progress/kendo-react-dateinputs';

export interface KendoDatePickerProps {
    id: string;
    className: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    format?: string; 
    size?: 'small' | 'medium' | 'large';
    fillMode?: 'solid' | 'outline' | 'flat';
}

export function KendoDatePicker(props: KendoDatePickerProps) {
    const handleInputChange = (event: any) => {
        props.setValue(event.value);
    };

    return (
        <div>
            <DatePicker
                style={{ fontSize: '12px' }}
                id={props.id}
                className={props.className}
                placeholder="Choose a date..."
                size={props.size}
                format={props.format}
                fillMode={props.fillMode}
                value={props.value ? new Date(props.value) : null}
                onChange={(e: DatePickerChangeEvent) => {
                    if (e.value) {
                        handleInputChange(e);
                    }
                }}
            />
        </div>
    );
}

export default KendoDatePicker;
