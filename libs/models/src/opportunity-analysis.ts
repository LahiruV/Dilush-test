export interface OpportunityAnalysisListResponse {
    items: OpportunityAnalysis[];
}

export interface OpportunityAnalysis {
    opportunityID: number;
    leadID: number;
    originator: string;
    repGroupID: number;
    repGroupName: string;
    name: string;
    closeDate: string; // ISO date
    stage: number;
    probability: number;
    amount: number;
    units: number;
    description: string;
    custCode: string;
    leadName: string;
    business: string;
    industry: string;
    industryDescription: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    leadStage: string;
    pipelineStage: string;
    endUserCode: string;
    tonnes: number;
    rowCount: number;
    amountSum: number;
    unitsSum: number;
    tonnesSum: number;
    isDirty: boolean;
    isNew: boolean;
    totalCount: number;
    createdBy: string;
    createdDate: string; // ISO date
    lastModifiedBy: string;
    lastModifiedDate: string; // ISO date
    primaryDist: string;
}

export interface OpportunityAnalysisParameters {
    childOriginators: string;
    defaultDepartmentId: string;
    originator?: string;
    orderBy: string;
    startIndex?: number;
    rowCount?: number;
    pipelineStageID?: number;
    changeValue?: any;
    sStartDate: any | null;
    additionalParams: string;
    ignorePagination?: boolean;
    opportunityAnalysisFilterPara?: any;
};

export interface ClientOpportunity {
    isDirty?: boolean;
    isNew?: boolean;
    totalCount?: number;
    createdBy?: string;
    createdDate?: string; // ISO date
    lastModifiedBy?: string;
    lastModifiedDate?: string; // ISO date
    primaryDist?: string;
    rowCount?: number;
    opportunityOwner: string;
    count: number;
    value: number;
    tonnes: number;
    units: number;
}
