export interface UpdateActivityFromPlannerParameters {
    subject?: string;
    comments?: string;
    startDate: string;
    endDate: string;
    activityType: string;
    status: string;
    lastModifiedBy: string;
    lastModifiedDate: string;
    activityID: number;
    leadID: number;
    customerCode?: string;
    endUserCode?: string;
    sendReminder?: string;
    reminderDate?: string;
};

export interface SaveOtherActivityParameters {
    subject: string;
    startDate: string;
    endDate: string;
    comments?: string;
    originator: string;
};