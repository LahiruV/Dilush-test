export interface EndUserTransferLog {
    isDirty: boolean,
    isNew: boolean,
    totalCount: number,
    createdBy: string,
    createdDate: Date,
    lastModifiedBy: string,
    lastModifiedDate: Date,
    primaryDist: string,
    rowCount: number,
    enduserCode: string,
    enduserName: string,
    transferredOn: string,
    oldCustomer: string,
    newCustomer: string,
    originator: string,
}

export interface EndUserTransferLogParameters {
    originator: string;
    childOriginators: string;
    defaultDepartmentId: string;
    repType: string;
    isNew: boolean;
    startDate:Date | string;
    endDate:Date | string;
    additionalParams:string
    changeValueDashEndUser?: any;
    startIndex?: number;
    rowCount?: number;
    ignorePagination?: boolean;
}