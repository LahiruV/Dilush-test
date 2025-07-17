import { Dispatch, SetStateAction } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';

export interface KendoDropdownProps {
    id: string;
    className: string;
    setValue: Dispatch<SetStateAction<any>>;
    value: any;
    datalist: any;
    textField?: string;
    dataItemKey?: string;
    fillMode?: 'solid' | 'outline' | 'flat';
    size?: 'small' | 'medium' | 'large';
    isFilterable?: boolean;
    filterChangeCallback?: any;
    placeHolder?: string;
    isLoading?: boolean;
    disabled?: boolean;
}

export function KendoDropdown(props: KendoDropdownProps) {
    const handleInputChange = (event: any) => {
        props.setValue(event.target.value);
    };

    return (
        <div>
            <DropDownList                
                id={props.id}
                className={props.className}
                data={props.datalist}
                onChange={handleInputChange}
                value={props.value}
                fillMode={props.fillMode}
                size={props.size}
                textField={props.textField}
                dataItemKey={props.dataItemKey}
                filterable={props.isFilterable}
                onFilterChange={props.filterChangeCallback}
                loading={props.isLoading}
                popupSettings={{
                    // Increase the z-index to ensure it always appears above the parent container
                    appendTo: document.body,
                    style: { zIndex: 1050 } 
                }}
                disabled={props.disabled}
            />
        </div>
    );
}

export default KendoDropdown;