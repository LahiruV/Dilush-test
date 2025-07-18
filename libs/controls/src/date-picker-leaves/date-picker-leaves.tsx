import * as React from 'react';
import {
    DatePicker,
    Calendar,
    CalendarCellProps,
    CalendarProps,
    DatePickerChangeEvent,
    CalendarCell
} from '@progress/kendo-react-dateinputs';
type LeaveType =
    | 'Annual Leave'
    | 'Public'
    | 'Personal Leave'
    | 'Casual Leave'
    | 'Other Leave'
    | 'Long Service Leave';

type LeaveStatus = 'N' | 'X' | 'R';

interface Leave {
    id?: number;
    date: string;
    type: LeaveType;
    leaveStatus?: LeaveStatus;
    description?: string;
}

const leaveColors: Record<LeaveType, string> = {
    'Annual Leave': '#ffc1ff67',
    'Public': '#ff9898',
    'Personal Leave': '#e8e8ffc5',
    'Casual Leave': '#e8e8ffc5',
    'Other Leave': '#c0c0c05b',
    'Long Service Leave': '#ffffb5a6',
};

const leaveStatusColors: Record<LeaveStatus, string> = {
    N: '#3ec263',
    X: '#19c5a8',
    R: '#f455511c',
};

interface DatePickerWithLeaveProps {
    id: string;
    className?: string;
    name?: string;
    value: any;
    onChange: (date: any) => void; // updated signature
    leaves?: Leave[];
    min?: Date;
    max?: Date;
    label?: string;
    isDisabled?: boolean;
}

/**
 * DatePickerWithLeaveColors component renders a date picker with custom colors for leave types.
 */
export const DatePickerWithLeaveColors: React.FC<DatePickerWithLeaveProps> = ({
    id,
    className,
    name,
    value,
    onChange,
    leaves = [],
    min,
    max,
    label,
    isDisabled
}) => {
    const leavesMap = React.useMemo(() => {
        const map = new Map<string, Leave>();
        leaves.forEach((leave) => {
            const parsedDate = new Date(leave.date);
            const isoDate = parsedDate.toISOString().split('T')[0];
            map.set(isoDate, leave);
        });
        return map;
    }, [leaves]);

    const LeaveCell: React.FC<CalendarCellProps> = (props) => {
        const dateStr = props.value.toISOString().split('T')[0];
        const leave = leavesMap.get(dateStr);
        const isSelected = props.isSelected;

        const bgColor = isSelected
            ? ''
            : leave?.leaveStatus && leaveStatusColors[leave.leaveStatus]
                ? leaveStatusColors[leave.leaveStatus]
                : leave?.type
                    ? leaveColors[leave.type]
                    : undefined;

        return (
            <CalendarCell
                {...props}
                title={leave?.description || ''}
                style={{
                    backgroundColor: bgColor,
                    borderRadius: '15%',
                    textAlign: 'center',
                    padding: '0.5em',
                    cursor: 'pointer'
                }}
            // onClick={(e) => props.onClick?.(props.value, e)}
            >
                {props.children}
            </CalendarCell>
        );
    };

    const CalendarWithLeaves = React.forwardRef<any, CalendarProps>((props, ref) => (
        <div>
            <div
                style={{
                    position: 'absolute',
                    top: '3px',
                    left: '212px',
                    width: '57px',
                    height: '36px',
                    background: '#fff',
                    zIndex: 2,
                    borderRadius: '6px',
                }}
            />
            <Calendar  {...props} className={`${props.className} disabled-kendo-date-picker-header`} navigation={false} ref={ref} cell={LeaveCell} />
        </div>
    ));

    const datepickerRef = React.useRef<any>(null);

    React.useEffect(() => {
        const input = datepickerRef.current?.element || datepickerRef.current?.input;
        if (!input) return;
        const handler = (e: Event) => {
            if ((e.target as HTMLInputElement).value.trim() === '') {
                onChange(null);
            }
        };
        input.addEventListener('blur', handler);
        return () => {
            input.removeEventListener('blur', handler);
        };
    }, [onChange, datepickerRef]);

    const handleInputChange = (event: DatePickerChangeEvent) => {
        onChange(event.value);
    };

    return (
        <DatePicker
            id={id}
            className={className || ''}
            name={name}
            value={value ? new Date(value) : null}
            onChange={handleInputChange}
            min={min}
            max={max}
            label={label}
            calendar={CalendarWithLeaves}
            format={"dd/MM/yyyy"}
            disabled={isDisabled}
            ref={datepickerRef}
        />
    );
};
