import React, { useState, useCallback, useEffect } from 'react';
import {
    Scheduler,
    SchedulerDataChangeEvent,
    DayView,
    WeekView,
    MonthView,
    WorkWeekView,
} from '@progress/kendo-react-scheduler';
import { guid } from '@progress/kendo-react-common';
import { RenderStatusContentTable } from '@peerless/models';
import { statusRenderFunction } from '@peerless/common';
import IndeterminateSpinner from '../indeterminate-spinner/indeterminate-spinner';

interface Resource {
    name: string;
    data: any[];
    field: string;
    valueField: string;
    textField: string;
    colorField?: string;
}

export interface SchedulerWidgetProps {
    id: string;
    data: any[];
    modelFields: Record<string, string>;
    resources?: Resource[];
    defaultDate?: Date;
    editable?: boolean;
    timezone?: string;
    height?: number;
    views?: Array<'day' | 'week' | 'month'>;
    customForm?: React.ComponentType<any>;
    customEditItem?: React.ComponentType<any>;
    onDataChange: (data: any) => void;
    group?: {
        resources: string[];
        orientation: 'horizontal';
    };
    workDayGroup?: {
        workDayStart: string
        workDayEnd: string
    }
    renderStatusContent?: RenderStatusContentTable;
    handleDateChange?: (event: { value: Date }) => void;
    defaultView?: string;
    onViewChange?: (event: any) => void;
}

/**
 * SchedulerWidget
 *
 * A reusable and customizable scheduler widget.
 * @param {string} id - The unique identifier for the scheduler.
 * @param {Array<any>} data - The data for the scheduler.
 * @param {Object} modelFields - Custom model field mappings.
 * @param {Array<Resource>} resources - Resource configurations for grouping and filtering.
 * @param {Date} defaultDate - The initial date to display.
 * @param {boolean} editable - If true, allows data editing.
 * @param {string} timezone - The timezone for the scheduler.
 * @param {number} height - The height of the scheduler widget.
 * @param {Array<string>} views - The views to include in the scheduler.
 * @param {React.ComponentType<any>} customForm - A custom form editor component.
 * @param {React.ComponentType<any>} customEditItem - A custom edit item component.
 * @param {Function} onDataChange - Callback function for handling data changes.
 * @param {Object} group - Grouping configuration for the scheduler.
 * @param {Function} handleDateChange - Callback function for handling date changes.
 * @param {string}defaultView - The default view for the scheduler.
 * @param {Function} onViewChange - Callback function for handling view changes.
 * @author @LahiruV 🐺
 * @date 2024-10-05
 */

export const SchedulerWidget: React.FC<SchedulerWidgetProps> = ({
    id: id,
    data: initialData,
    modelFields,
    resources = [],
    defaultDate = new Date(),
    editable = true,
    timezone = '',
    height = 820,
    customForm,
    customEditItem,
    onDataChange,
    group = {
        resources: [],
        orientation: 'horizontal',
    },
    workDayGroup = {
        workDayStart: '7:00',
        workDayEnd: '23:59'
    },
    renderStatusContent,
    handleDateChange = () => { },
    defaultView,
    onViewChange = () => { },
}) => {

    if (renderStatusContent?.isRenderStatusContentTable) {
        const statusOutput = statusRenderFunction.renderStatusContentTable(renderStatusContent.status, renderStatusContent.isFetch, renderStatusContent.error, renderStatusContent.setStateFunction || (() => { }));
        if (renderStatusContent.isStatusOutput && statusOutput) {
            if (statusOutput === 'Loading...') {
                return (
                    <div className="status-output">
                        <IndeterminateSpinner />
                    </div>
                );
            }
            return (
                <div className="status-output" style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', fontSize: '12px' }}>
                    {statusOutput}
                </div>
            );
        }
    }

    const [heights, setHeights] = useState<number>(height || 820);

    useEffect(() => {
        function calculateHeight() {
            const offset = 200;
            const availableHeight = window.innerHeight - offset;
            setHeights(availableHeight > 400 ? availableHeight : 400);
        }
        calculateHeight();
        window.addEventListener('resize', calculateHeight);
        return () => window.removeEventListener('resize', calculateHeight);
    }, []);

    return (
        <Scheduler
            id={id}
            data={initialData}
            onDataChange={onDataChange}
            onDateChange={handleDateChange}
            height={heights}
            timezone={timezone}
            editable={editable}
            defaultDate={defaultDate}
            modelFields={modelFields}
            resources={resources}
            group={group}
            form={customForm}
            editItem={customEditItem}
            defaultView={defaultView || 'week'}
            onViewChange={onViewChange}
        >
            <MonthView />
            <WeekView />
            <WorkWeekView />
            <DayView workDayStart={workDayGroup.workDayStart} workDayEnd={workDayGroup.workDayEnd} />
        </Scheduler>
    );
};

export default SchedulerWidget;
