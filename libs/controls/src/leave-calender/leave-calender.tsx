import React from 'react';
import { Calendar, CalendarCellProps } from '@progress/kendo-react-dateinputs';
import '@progress/kendo-theme-default/dist/all.css';
import './leave-calender.css'

export type LeaveType =
    | 'Annual Leave'
    | 'Public'
    | 'Personal Leave'
    | 'Casual Leave'
    | 'Other Leave'
    | 'Long Service Leave';

export type LeaveStatus = 'N' | 'X' | 'R';

export interface Leave {
    id?: number;
    date: string; // ISO format
    type: LeaveType;
    leaveStatus?: LeaveStatus;
    description?: string;
}

interface LeaveCalendarProps {
    leaves: Leave[];
    showMonth?: Date;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    isRemoveToday?: boolean;
}

const leaveColors: Record<LeaveType, string> = {
    'Annual Leave': '#be6ebe',
    'Public': '#ff9898',
    'Personal Leave': '#7e7ece',
    'Casual Leave': '#e8e8ffc5',
    'Other Leave': '#696868',
    'Long Service Leave': '#ffffb5a6',
};

const leaveStatusColors: Record<LeaveStatus, string> = {
    N: '#3ec263',
    X: '#19c5a8',
    R: '#f45551',
};

/**
 * LeaveCalendar component renders a calendar with custom colors for leave types.
 * 
 * @param {Leave[]} leaves - Array of leave objects to display.
 * @param {Date} showMonth - The month to display in the calendar.
 * @param {boolean} disabled - Whether the calendar is disabled.
 * @param {Date} minDate - Minimum selectable date.
 * @param {Date} maxDate - Maximum selectable date.
 * 
 * @returns {JSX.Element} The rendered LeaveCalendar component. 
 * 
 * @author Lahiru Vimukthi 🐺
 * @date 2025-15-05
 */
export const LeaveCalendar: React.FC<LeaveCalendarProps> = ({
    leaves,
    showMonth,
    disabled,
    minDate,
    maxDate,
    isRemoveToday
}) => {
    // Map leave data to ISO date string for fast lookup
    const leavesMap = React.useMemo(() => {
        const map = new Map<
            string,
            { type: LeaveType; leaveStatus?: LeaveStatus; description?: string }
        >();
        leaves.forEach((leave) => {
            const parsedDate = new Date(leave.date);
            const isoDate = parsedDate.toISOString().split('T')[0];
            map.set(isoDate, {
                type: leave.type,
                leaveStatus: leave.leaveStatus,
                description: leave.description,
            });
        });
        return map;
    }, [leaves]);

    // Custom calendar cell rendering
    const LeaveCell: React.FC<CalendarCellProps> = (props) => {
        const { value, className, children } = props;

        // Month and year to show
        const calendarMonth = (showMonth ?? new Date()).getMonth();
        const calendarYear = (showMonth ?? new Date()).getFullYear();

        // Hide days from other months
        if (
            value.getMonth() !== calendarMonth ||
            value.getFullYear() !== calendarYear
        ) {
            // Render blank cell for other months
            return <td className={className} style={{ background: '#fff' }} />;
        }

        // Always show Saturday (6) and Sunday (0) with white background
        const day = value.getDay();
        if (day === 0 || day === 6) {
            return (
                <td
                    className={className}
                    style={{
                        background: '#fff',
                        textAlign: 'center',
                        padding: '0.5em',
                        cursor: 'pointer'
                    }}
                >
                    {children}
                </td>
            );
        }

        // Show leave/status colors for Mon–Fri (1–5)
        const dateStr = value.toISOString().split('T')[0];
        const leaveInfo = leavesMap.get(dateStr);

        const bgColor =
            leaveInfo?.leaveStatus && leaveStatusColors[leaveInfo.leaveStatus]
                ? leaveStatusColors[leaveInfo.leaveStatus]
                : leaveInfo?.type
                    ? leaveColors[leaveInfo.type]
                    : undefined;

        return (
            <td
                className={className}
                style={{
                    backgroundColor: bgColor,
                    textAlign: 'center',
                    padding: '0.5em',
                    cursor: 'pointer'
                }}
                title={leaveInfo?.description || ''}
            >
                {children}
            </td>
        );
    };

    return (
        <>
            <div style={{ position: 'relative', display: 'inline-block' }}>
                {isRemoveToday && (
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
                )}
                <Calendar
                    className='disabled-kendo-date-picker-header'
                    disabled={disabled}
                    cell={LeaveCell}
                    value={showMonth}
                    defaultActiveView="month"
                    navigation={false}
                    min={minDate}
                    max={maxDate}
                    bottomView="month"
                />
            </div>
        </>
    );

};

export default LeaveCalendar;
