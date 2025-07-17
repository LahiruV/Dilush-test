import React, { useEffect, useMemo, useState, forwardRef, ReactElement } from 'react';
import { MultiColumnComboBox, ComboBoxChangeEvent, ComboBoxFilterChangeEvent, ListItemProps } from '@progress/kendo-react-dropdowns';

interface PopUpSettings {
    width: string;
    fontSize?: string;
}

export interface MultiColumnComboBoxWidgetProps {
    id: string; // Unique identifier for the dropdown
    datalist: any[]; // Array of data for the dropdown
    className?: string; // CSS class name
    columns: { field: string; header: string; width?: string }[]; // Columns configuration
    textField: string; // Field to display as the main text
    valueField?: string; // Field to use as the value
    placeholder?: string; // Placeholder text    
    value: any; // Current value
    defaultValue?: any; // Default value
    setValue: (value: any) => void; // Handler for value changes
    fillMode?: 'solid' | 'outline' | 'flat'; // Fill mode of the dropdown
    size?: 'small' | 'medium' | 'large'; // Size of the dropdown
    isClearable?: boolean; // Whether the dropdown is clearable
    dataItemKey?: string; // Unique key for each data item
    isLoading?: boolean; // Loading state of the dropdown
    isFilterable?: boolean; // Whether the dropdown is filterable
    isClearFilter?: any; //call clear filter from parent component
    searchTextCallback?: any; //to set parent value for filtering
    popupSettings?: PopUpSettings; // Settings for the dropdown popup
    isDisabled?: boolean; // Whether the dropdown is disabled
    labelDrop?: any; // Label for the dropdown

}

/**
 * MultiColumnComboBoxWidget is a reusable dropdown component supporting multiple columns.
 *
 * @param {MultiColumnComboBoxWidgetProps} props - Properties for the MultiColumnComboBoxWidget.
 * @param {string} props.id - Unique identifier for the dropdown.
 * @param {any[]} props.data - Data array for the dropdown.
 * @param {string} [props.className] - CSS class name for the dropdown.
 * @param {Array} props.columns - Columns configuration for the dropdown.
 * @param {string} props.textField - Field name to display in the input.
 * @param {string} [props.valueField] - Field name to use as the value.
 * @param {string} [props.placeholder] - Placeholder text for the dropdown.
 * @param {any} props.value - Current value of the dropdown.
 * @param {any} [props.defaultValue] - Default value for the dropdown.
 * @param {function} props.setValue - Callback for handling value changes.
 * @param {'solid' | 'outline' | 'flat'} [props.fillMode] - Fill mode of the dropdown.
 * @param {'small' | 'medium' | 'large'} [props.size] - Size of the dropdown.
 * @param {boolean} [props.isClearable] - Whether the dropdown is clearable.
 * @param {string} [props.dataItemKey] - Unique key for each data item.
 * @param {boolean} [props.isLoading] - Whether the dropdown is in a loading state.
 * @param {boolean} [props.isFilterable] - Whether the dropdown is filterable.
 * @param {object} popupSettings - Settings for the dropdown popup.
 * @param {string} popupSettings.width - The width of the popup.
 * @param {string} popupSettings.fontSize - The font size of the popup.
 * @param {boolean} [props.isDisabled] - Whether the dropdown is disabled.
 * @param {any} [props.labelDrop] - Label for the dropdown.
 * 
 * @author @LahiruV 🐺
 * @date 2024-10-05
 *
 * @returns {JSX.Element} The rendered MultiColumnComboBoxWidget component.
 */
export const MultiColumnComboBoxWidget = forwardRef<HTMLDivElement, MultiColumnComboBoxWidgetProps>(({ id, datalist, className, columns, textField, valueField, placeholder, value, defaultValue, setValue, fillMode, size, isClearable, dataItemKey, isLoading, isFilterable, isClearFilter, searchTextCallback, labelDrop, isDisabled }, ref): JSX.Element => {
    const [filterValue, setFilterValue] = useState('');

    const filteredData = useMemo(() => {
        if (!filterValue) return datalist;

        return datalist.filter((item: any) => {
            const filterValueLower = filterValue.toString().toLowerCase();
            const textMatch = textField && item[textField]?.toString().toLowerCase().includes(filterValueLower);
            const valueMatch = valueField && item[valueField]?.toString().toLowerCase().includes(filterValueLower);
            return textMatch || valueMatch;
        });
    }, [datalist, filterValue, textField, valueField]);


    const handleInputChange = (event: ComboBoxChangeEvent) => {
        setValue(event.value ?? defaultValue ?? null);
    };

    const handleFilterChange = (event: ComboBoxFilterChangeEvent) => {
        setFilterValue(event.filter?.value || '');
        searchTextCallback && searchTextCallback(event.filter?.value || '');
    };

    useEffect(() => {
        if (isClearFilter == true) {
            setFilterValue('');
        }
    }, [isClearFilter]);

    const itemRender = (
        li: React.ReactElement<
            HTMLLIElement,
            string | React.JSXElementConstructor<any>
        >,
        itemProps: ListItemProps
    ) => {
        const isLastItem = itemProps.index === datalist.length - 1;

        const children = columns.map((col, i) => {
            return (
                <span
                    className="k-table-td"
                    style={{ width: col.width, fontSize: labelDrop?.fontSize || '12px', }}
                    key={(col.width || 'auto') + i}
                >
                    {itemProps.dataItem[col.field]}
                </span>
            );
        });

        const { style = {} }: any = li.props;

        return React.cloneElement(li as ReactElement<any>, { ...li.props, style, ref: isLastItem ? ref : null }, children);
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

            <MultiColumnComboBox
                id={id}
                className={className}
                data={filteredData}
                value={value}
                columns={columns}
                textField={textField}
                placeholder={placeholder || 'Select an option...'}
                fillMode={fillMode}
                loading={isLoading}
                dataItemKey={dataItemKey}
                size={size}
                clearButton={isClearable}
                filterable={isFilterable}
                onFilterChange={handleFilterChange}
                onChange={handleInputChange}
                itemRender={itemRender}
                disabled={isDisabled}
            />
        </div>
    );
})

export default MultiColumnComboBoxWidget;
