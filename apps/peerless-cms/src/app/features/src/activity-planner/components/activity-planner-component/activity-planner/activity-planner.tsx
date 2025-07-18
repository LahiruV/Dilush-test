import React, { useEffect, useState } from 'react';
import { guid } from '@progress/kendo-react-common';
import { SchedulerWidget } from '@peerless/controls';
import { SchedulerDataChangeEvent } from '@progress/kendo-react-scheduler';
import { GetAllActivities, SaveOtherActivity, UpdateActivityFromPlanner } from '@peerless/queries';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setIsFetchActivityPlanner } from '@peerless-cms/store';
import { customer_color, enduser_color, lead_color, organisation_color, other_activity_color } from '@peerless-cms/theme'
import { SchedulerEditItem, SchedulerEditItemProps } from '@progress/kendo-react-scheduler';
import Stack from '@mui/material/Stack';
import { RenderStatusContentTable, SaveOtherActivityParameters, UpdateActivityFromPlannerParameters } from '@peerless/models';
import { FormWithCustomEditor } from './custom-form';

interface ActivityPlannerScheduleProps {
    height?: number;
}

const ActivityPlannerSchedule: React.FC<ActivityPlannerScheduleProps> = ({ height }) => {
    const dispatch = useDispatch();
    const { updateActivityFromPlannerMutate } = UpdateActivityFromPlanner();
    const { saveOtherActivityMutate } = SaveOtherActivity();
    const { loggedUser, childOriginators } = useSelector((state: RootState) => state.header);
    const { activityPlannerType } = useSelector((state: RootState) => state.activityPlanner);
    const { activityPlannerTerritory, activityPlannerStatus, isFetchActivityPlanner } = useSelector((state: RootState) => state.activityPlanner);
    const [data, setData] = React.useState<any[]>([]);
    const [startDate, setStartDate] = useState(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), 1)));
    const [endDate, setEndDate] = useState(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59)));
    const [displayDate, setDisplayDate] = useState(new Date());
    const [update, setUpdate] = useState("");
    const [viewType, setViewType] = useState("work-week");

    const customModelFields = {
        id: 'AppointmentID',
        description: 'Description',
        start: 'Start',
        end: 'End',
        title: 'Title',
        recurrenceRule: 'RecurrenceRule',
        recurrenceId: 'RecurrenceID',
        recurrenceExceptions: 'RecurrenceException'
    };

    const users = [
        { value: 'Lead', name: "Lead", color: lead_color },
        { value: 'End User', name: "End User", color: enduser_color },
        { value: 'Customer', name: "Customer", color: customer_color },
        { value: 'Organisation', name: "Organisation", color: organisation_color },
        { value: '', name: "Other", color: other_activity_color }
    ];

    const payload = {
        Originator: loggedUser.userName,
        ChildOriginators: childOriginators,
        SToday: "",
        SStartDate: startDate.toISOString(),
        SEndDate: endDate.toISOString(),
        SSource: "Planner",
        Status: activityPlannerStatus.value,
        DefaultDepartmentId: loggedUser.defaultDepartmentId,
        repTerritory: activityPlannerTerritory.value,
        update: update,
    };

    const { allActivities, status, error } = GetAllActivities(payload, isFetchActivityPlanner);

    const EditItemWithDynamicTitle = (props: SchedulerEditItemProps) => {
        return (
            <SchedulerEditItem
                {...props}
                title={generateTitle(props.dataItem)}
                removeItem={false}
            />
        );
    };

    const generateTitle = (dataItem: any) => {
        const titleData = data.find(
            (p) =>
                p.activityID === dataItem.activityID ||
                p.AppointmentID === dataItem.AppointmentID
        );

        if (!titleData) {
            return "New Item";
        }

        return titleData.leadName
            ? `${titleData.leadName} - ${titleData.Subject || titleData.subject || "No Subject"}`
            : titleData.Subject || titleData.subject || "No Subject";
    };

    const handleDateChange = (event: { value: Date }) => {
        dispatch(setIsFetchActivityPlanner(true));
        const currentMonth = event.value.getMonth() + 1;
        const currentYear = event.value.getFullYear();
        const startDate = new Date(Date.UTC(currentYear, currentMonth - 2, 1));
        const endDate = new Date(Date.UTC(currentYear, currentMonth + 1, 0, 23, 59, 59));
        setDisplayDate(event.value);
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleDataChange = async ({ created = [], updated = [], deleted = [] }: SchedulerDataChangeEvent) => {
        setData((prevData) => {
            // Remove deleted items
            const dataAfterDeletion = prevData.filter(
                (item) => !deleted.some((deletedItem) => deletedItem.AppointmentID === item.AppointmentID)
            );

            // Add created items
            const dataAfterAddition = [
                ...dataAfterDeletion,
                ...created.map((item) => ({
                    ...item,
                    activityID: item.activityID || 0,
                    AppointmentID: guid(),
                    Subject: item.Subject || "Empty",
                    Start: item.Start,
                    End: item.End,
                    Description: item.Description || "Empty",
                    leadName: item.leadName || "",
                    leadStage: item.leadStage || "",
                    isAllDay: item.AllDayChecked,
                })),
            ];

            if (dataAfterAddition[dataAfterAddition.length - 1].activityID === 0) {
                if (dataAfterAddition[dataAfterAddition.length - 1].isAllDay) {
                    // Clone date objects to avoid mutation side effects
                    const startDate = new Date(dataAfterAddition[dataAfterAddition.length - 1].Start);
                    const endDate = new Date(dataAfterAddition[dataAfterAddition.length - 1].End);

                    // Set time for All Day event
                    startDate.setHours(0, 0, 0, 0);          // 12:00 AM
                    endDate.setDate(startDate.getDate() + 1);
                    endDate.setHours(0, 0, 0, 0);

                    dataAfterAddition[dataAfterAddition.length - 1].Start = startDate;
                    dataAfterAddition[dataAfterAddition.length - 1].End = endDate;
                }
                const payload: SaveOtherActivityParameters = {
                    subject: dataAfterAddition[dataAfterAddition.length - 1].Subject,
                    comments: dataAfterAddition[dataAfterAddition.length - 1].Description,
                    originator: loggedUser.userName,
                    startDate: dataAfterAddition[dataAfterAddition.length - 1].Start,
                    endDate: dataAfterAddition[dataAfterAddition.length - 1].End
                }
                saveOtherActivityMutate(payload);
            }

            // Update existing items
            const finalData = dataAfterAddition.map((item) => {
                const updatedItem = updated.find((u) => u.AppointmentID === item.AppointmentID);
                if (updatedItem) {
                    if (updatedItem.FollowUpChecked) {
                        const payload: UpdateActivityFromPlannerParameters = {
                            subject: updatedItem.Subject,
                            comments: updatedItem.Description,
                            startDate: updatedItem.Start,
                            endDate: updatedItem.End,
                            activityType: updatedItem.activityType,
                            status: updatedItem.status,
                            lastModifiedBy: loggedUser.userName,
                            lastModifiedDate: new Date().toISOString(),
                            activityID: updatedItem.activityID,
                            leadID: updatedItem.leadId,
                            customerCode: updatedItem.custCode,
                            endUserCode: updatedItem.endUserCode,
                            sendReminder: "Y",
                            reminderDate: updatedItem.FollowUp
                        }
                        updateActivityFromPlannerMutate(payload);
                    }
                    else {
                        const payload: UpdateActivityFromPlannerParameters = {
                            subject: updatedItem.Subject,
                            comments: updatedItem.Description,
                            startDate: updatedItem.Start,
                            endDate: updatedItem.End,
                            activityType: updatedItem.activityType,
                            status: updatedItem.status,
                            lastModifiedBy: loggedUser.userName,
                            lastModifiedDate: new Date().toISOString(),
                            activityID: updatedItem.activityID,
                            leadID: updatedItem.leadId,
                            customerCode: updatedItem.custCode,
                            endUserCode: updatedItem.endUserCode,
                            sendReminder: "N",
                            reminderDate: updatedItem.FollowUp
                        }
                        updateActivityFromPlannerMutate(payload);
                    }
                }
                return updatedItem ? { ...item, ...updatedItem } : item;
            });
            EditItemWithDynamicTitle
            return finalData;
        });

        setUpdate(new Date().getTime().toString());
        dispatch(setIsFetchActivityPlanner(true));
    };

    useEffect(() => {
        if (allActivities) {
            if (activityPlannerType.value !== 'All') {
                const sampleDataWithCustomSchema = allActivities
                    .filter(dataItem => dataItem.typeDesc === activityPlannerType.value)
                    .map(dataItem => ({
                        ...dataItem,
                        AppointmentID: guid(),
                        Subject: dataItem.subject,
                        Start: new Date(dataItem.startDate + '.000Z'),
                        End: new Date(dataItem.endDate + '.000Z'),
                        Description: dataItem.comments,
                        FollowUpChecked: false,
                        FollowUp: new Date(),
                        isAllDay: dataItem.isAllDay || false,
                    }));
                setData(sampleDataWithCustomSchema);
                return;
            }
            const sampleDataWithCustomSchema = allActivities.map(dataItem => ({
                ...dataItem,
                AppointmentID: guid(),
                Subject: dataItem.subject,
                Start: new Date(dataItem.startDate + '.000Z'),
                End: new Date(dataItem.endDate + '.000Z'),
                Description: dataItem.comments,
                FollowUpChecked: false,
                FollowUp: new Date(),
                isAllDay: dataItem.isAllDay || false,
            }));
            setData(sampleDataWithCustomSchema);
        }
    }, [allActivities, activityPlannerType]);

    const renderStatusContent = {
        isRenderStatusContentTable: true,
        status: status,
        isFetch: isFetchActivityPlanner,
        error: error,
        setStateFunction: setIsFetchActivityPlanner,
        isStatusOutput: true
    } as RenderStatusContentTable;

    useEffect(() => {
        dispatch(setIsFetchActivityPlanner(true));
    }, []);

    return (
        <div>
            <div>
                <div>
                    <SchedulerWidget
                        id="activityPlanner"
                        modelFields={customModelFields}
                        defaultDate={displayDate}
                        data={data}
                        resources={[
                            { name: '', data: users, field: 'leadStage', valueField: 'value', textField: 'name', colorField: 'color' },
                        ]}
                        handleDateChange={handleDateChange}
                        onDataChange={handleDataChange}
                        customEditItem={EditItemWithDynamicTitle}
                        renderStatusContent={renderStatusContent}
                        customForm={FormWithCustomEditor}
                        height={height}
                        defaultView={viewType}
                        onViewChange={(e) => {
                            setViewType(e.value);
                        }}
                    />
                </div>
            </div>
        </div>
    );

};

export default ActivityPlannerSchedule;