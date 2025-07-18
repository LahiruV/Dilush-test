export interface GetAllCallCyclesListParameters {
    orderBy: string;
    additionalParams: string;
    childOriginators: string;
    startIndex: number;
    rowCount: number;
};

export interface CallCycleSaveParameters {
    description: string;
    dueOn: Date;
    comments: string;
    callCycleID: number;
    createdBy: string;
    createdDate: Date;
    delFlag: string;
    ccType: string;
    originator: string;
    contact: {
        callCycleID: number; //0
        customerCode: string;  //enduser
        endUserCode: string;
        orgId: number;
        leadId: number;
        leadStage: string;
    }[];
}

export interface GetCallCycleContactsParameters {
    orderBy: string;
    additionalParams: string;
    childOriginators: string;
    startIndex: number;
    rowCount: number;
    originator: string;
    callCycleID: number;
    callCycleName: string;
};

export interface DeactivateCallCycleParameters {
    callCycleId: number;
    isDelete: string;
}

export interface GetScheduledCallCycleContactsParameters {
    orderBy: string;
    additionalParams: string;
    childOriginators: string;
    startIndex: number;
    rowCount: number;
    originator: string;
    callCycleID: number;
    callCycleName: string;
}

export interface ShiftScheduleParameters {
    callCycleID: number;
    customerCode: string;
    endUserCode: string;
    orgId: number;
    leadId: number;
    leadStage: string;
    weekDay: number;
}

export interface CreateCallCycleActivitiesFromTemplateParameters {
    callCycleContact: {
        day: number;
        startTime: string;
        dueOn: string;
        originator: string;
        repeatTime: number;
        repeatWeek: number;
        callCycleId: number;
        callCycleDescription: string;
        callCycleContacts: {
            callCycleID: number;
            customerCode: string;
            endUserCode: string;
            orgId: number;
            leadId: number;
            leadStage: string;
            name: string;
            displayName: string;
            weekDay: number;
            dayPrder: number;
            recordID: number;
        }[];
    }[];
}