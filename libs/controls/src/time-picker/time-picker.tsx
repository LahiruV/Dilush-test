import React from 'react';
import { TimePicker, TimePickerChangeEvent } from '@progress/kendo-react-dateinputs';

export interface TimePickerWidgetProps {
    id: string;
    className?: string;
    setValue: React.Dispatch<React.SetStateAction<Date | null>>;
    value: Date | null;
    size?: 'small' | 'medium' | 'large';
    fillMode?: 'solid' | 'outline' | 'flat';
    placeholder?: string;
    label?: {
        name?: string;
        fontWeight?: string;
        color?: string;
        fontSize?: string;
    };
    isDisabled?: boolean;
    popupSettings?: {
        width: string;
        fontSize?: string;
    };
}

/**
 * TimePickerWidget component renders a customizable time picker.
 *
 * @param {TimePickerWidgetProps} props - The properties for the TimePickerWidget component.
 * @param {string} props.id - The unique identifier for the time picker.
 * @param {string} props.className - The CSS class name for the time picker.
 * @param {function} props.setValue - The function to set the selected time value.
 * @param {Date | null} props.value - The current value of the time picker.
 * @param {string} props.size - The size of the time picker (e.g., small, medium, large).
 * @param {string} props.fillMode - The fill mode of the time picker (e.g., solid, outline).
 * @param {string} props.placeholder - The placeholder text for the time picker input.
 * @param {object} props.label - The label style for the time picker.
 * @param {string} props.label.name - The label text.
 * @param {string} props.label.fontWeight - The font weight of the label.
 * @param {string} props.label.color - The color of the label text.
 * @param {string} props.label.fontSize - The font size of the label text.
 * @param {boolean} props.isDisabled - Whether the time picker is disabled.
 * @param {object} props.popupSettings - The settings for the time picker popup.
 * @param {string} props.popupSettings.width - The width of the popup.
 * @param {string} props.popupSettings.fontSize - The font size of the popup.
 * 
 * @returns {JSX.Element} The rendered TimePickerWidget component.
 *
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */
export function TimePickerWidget({
    id,
    className = '',
    setValue,
    value,
    size = 'small',
    fillMode = 'solid',
    placeholder = 'Select time...',
    label,
    isDisabled = false,
    popupSettings,
}: TimePickerWidgetProps) {
    return (
        <div>
            {label && (
                <div
                    style={{
                        fontWeight: label.fontWeight || 'lighter',
                        color: label.color || '#000',
                        fontSize: label.fontSize || '11px',
                        paddingBottom: '3px',
                    }}
                >
                    {label.name || ''}
                </div>
            )}
            <TimePicker
                id={id}
                className={className}
                placeholder={placeholder}
                size={size}
                fillMode={fillMode}
                disabled={isDisabled}
                value={value}
                onChange={(e: TimePickerChangeEvent) => setValue(e.value || null)}
                popupSettings={{
                    appendTo: document.body,
                    style: { zIndex: 1050, width: popupSettings?.width || 'auto', fontSize: popupSettings?.fontSize || '12px' },
                }}
            />
        </div>
    );
}

export default TimePickerWidget;
