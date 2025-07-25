export interface ActivityAnalysis {
    activityID: number,
    subject: string,
    startDate: Date,
    endDate: Date,
    status: string,
    assignedTo: string,
    leadId: number,
    comments: string,
    sentMail: string,
    priority: string,
    sendReminder: string,
    reminderDate: Date,
    pipelineStageID: number,
    activityType: string,
    createdDate: Date,
    createdBy: string,
    lastModifiedDate: Date,
    lastModifiedBy: string,
    custCode: string,
    leadName: string,
    leadStage: string,
    statusDesc: string,
    typeDesc: string,
    noOfActivities: number,
    appointmentId: number,
    delFlag: string,
    endUserCode: string,
    rowCount: number,
    colorCode: string,
    assignedToName: string,
    sampleIssued: string,
    sampleFedbackCode: string,
    sampleFedbackDescription: string,
    turnInOrder: string,
    quantity: string,
    enduserCustDistributor: string,
    isDirty: boolean,
    isNew: boolean,
    totalCount: number,
    primaryDist: string,
}

export interface ActivityAnalysisParameters {
    activityStatus: string;
    originator: string;
    childOriginators: string;
    sStartDate: string;
    sEndDate: string;
    defaultDepartmentId: string;
    orderBy: string;
    sector: string;
    loggedInOriginator: string;
    managerMode: boolean;
    startIndex?: number;
    rowCount?: number;    
    additionalParams: string;
    ignorePagination: boolean;
};