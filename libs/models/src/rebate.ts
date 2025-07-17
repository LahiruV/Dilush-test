export interface GetParentCustomerParameters {
    originator: string;
    childOriginators: string;
    defaultDepartmentId: string;
    startIndex: number;
    rowCount: number;
    orderBy: string;
    isBrowsAvailable: boolean;
}

export interface GetReportNumbersParameters {
    startIndex: number;
    rowCount: number;
    additionalParams: string;
}