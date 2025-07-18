export interface LeaderCustomerOpportunityParameters {
    originator: string;
    childOriginators: string;
    market: string;
    state: string;
    repType: string;
    sStartDate: string;
    sEndDate: string;
    orderBy: string;
    startIndex?: number;
    rowCount?: number;    
    changeValue?: string;
    ignorePagination?: boolean;
};

export interface LeaderCustomerOpportunityCount {
    name: string;
    opportunity: any | null; 
    originator: string;
    amount: number;
    tonnes: number;
    ratio: number;
    count: number;
    won: number;
    total: number;
    stage: string | null;
    catalogCode: string | null;
    state: string | null;
    opportunityId: number;
    repCode: string | null;
    repName: string | null;
    market: string | null;
    leadId: number;
    closeDate: string; 
    customerCode: string | null;
    createdDate: string; 
    marketDescription: string | null;
    endUserCode: string | null;
    isDirty: boolean;
    isNew: boolean;
    totalCount: number;
    createdBy: string | null;
    lastModifiedBy: string | null;
    lastModifiedDate: string;
    primaryDist: string | null;
    rowCount: number;
    sumOfAmount: number;
    sumOfTonnes: number;
}

export interface LeaderCustomerOpportunity {
    name: string;
    opportunity: string;
    originator: string;
    amount: number;
    tonnes: number;
    ratio: number;
    count: number;
    won: number;
    total: number;
    stage: string;
    catalogCode: string | null;
    state: string;
    opportunityId: number;
    repCode: string;
    repName: string;
    market: string | null;
    leadId: number;
    closeDate: string;
    customerCode: string;
    createdDate: string;
    marketDescription: string | null;
    endUserCode: string | null;
    isDirty: boolean;
    isNew: boolean;
    totalCount: number;
    createdBy: string | null;
    lastModifiedBy: string | null;
    lastModifiedDate: string;
    primaryDist: string | null;
    rowCount: number;
}


