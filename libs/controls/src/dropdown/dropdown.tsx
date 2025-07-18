import React, { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { ComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent } from '@progress/kendo-react-dropdowns';
import { ListItemProps } from '@progress/kendo-react-dropdowns';

interface PopUpSettings {
    width: string;
    fontSize?: string;
}

interface LabelDrop {
    fontWeight?: string;
    color?: string;
    fontSize?: string;
    name: string;
}

export interface DropDownProps {
    id: string;
    className?: string;
    setValue: Dispatch<SetStateAction<any>>;
    placeholder?: string;
    value: any;
    datalist: any;
    textField?: string;
    dataItemKey?: string;
    fillMode?: 'solid' | 'outline' | 'flat';
    size?: 'small' | 'medium' | 'large';
    isFilterable?: boolean;
    placeHolder?: string;
    isLoading?: boolean;
    popupSettings?: PopUpSettings;
    defaultValue?: any;
    isClearable?: boolean;
    isDisabled?: boolean;
    labelDrop?: LabelDrop;
}

/**
 * DropDown component renders a dropdown list with various customizable properties.
 * 
 * @param {string} id - The unique identifier for the dropdown.
 * @param {string} className - Additional CSS classes to apply to the dropdown.
 * @param {function} setValue - Callback function to set the selected value.
 * @param {string} placeholder - The placeholder text for the dropdown.
 * @param {any} value - The current value of the dropdown.
 * @param {Array<any>} datalist - The list of data items to display in the dropdown.
 * @param {string} textField - The field in the data items to display as the text.
 * @param {string} dataItemKey - The unique key for each data item.
 * @param {string} fillMode - The fill mode of the dropdown (e.g., solid, outline).
 * @param {string} size - The size of the dropdown (e.g., small, medium, large).
 * @param {boolean} isFilterable - Whether the dropdown is filterable. 
 * @param {boolean} isLoading - Whether the dropdown is in a loading state.
 * @param {object} popupSettings - Settings for the dropdown popup.
 * @param {string} popupSettings.width - The width of the popup.
 * @param {string} popupSettings.fontSize - The font size of the popup.
 * @param {any} defaultValue - The default value to set when the clear icon is clicked.
 * @param {boolean} isClearable - Whether the dropdown is clearable.
 * @param {boolean} isDisabled - Whether the dropdown is disabled.
 * @param {object} labelDrop - The label style for the dropdown.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */

export function DropDown({ id, className, setValue, value, datalist, textField, dataItemKey, fillMode, size, isFilterable, isLoading, popupSettings, defaultValue, isClearable, placeholder, isDisabled, labelDrop }: DropDownProps) {

    const [filterValue, setFilterValue] = useState('');

    const filteredData = useMemo(() => {
        if (!filterValue) return datalist;
        return datalist.filter((item: any) =>
            textField && item[textField]?.toLowerCase().includes(filterValue.toLowerCase())
        );
    }, [datalist, filterValue, textField]);

    const handleInputChange = (event: ComboBoxChangeEvent) => {
        setValue(event.value ?? defaultValue ?? null);
    };

    const handleFilterChange = (event: ComboBoxFilterChangeEvent) => {
        setFilterValue(event.filter?.value || '');
    };

    const itemRender = (li: React.ReactElement<HTMLLIElement>, itemProps: ListItemProps) => {
        const itemChildren = (
            <span style={{ fontSize: labelDrop?.fontSize || '12px', }}>
                {li.props.children as any}
            </span>
        );

        return React.cloneElement(li, li.props, itemChildren);
    };

    return (
        <div>
            {labelDrop &&
                <div style={{
                    fontWeight: labelDrop?.fontWeight || 'lighter',
                    color: labelDrop?.color || '#000',
                    fontSize: labelDrop?.fontSize || '11px',
                    paddingBottom: '3px',
                }}>
                    {labelDrop?.name || ''}
                </div>
            }
            <ComboBox
                id={id}
                className={className}
                data={filteredData}
                placeholder={placeholder || 'Select an option...'}
                value={value}
                fillMode={fillMode}
                size={size}
                textField={textField}
                dataItemKey={dataItemKey}
                filterable={isFilterable}
                loading={isLoading}
                popupSettings={{
                    appendTo: document.body,
                    style: { zIndex: 1050, width: popupSettings?.width || 'auto', fontSize: popupSettings?.fontSize || '12px' },
                }}
                clearButton={isClearable}
                onFilterChange={handleFilterChange}
                onChange={handleInputChange}
                disabled={isDisabled}
                itemRender={itemRender}
            />
        </div>
    );
}

export default DropDown;
