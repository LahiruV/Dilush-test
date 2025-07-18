export interface GetPlistTemplateDetailParameters {
    searchTerm: string;
}

export interface PlistTemplateDetail {
    templateId: number,
    catalogCode: string,
    description: string,
}

export interface GetProxyForRepParameters {
    repCode: string;
}

export interface ProxyForRep {
    repCode: string;
    name: string;
    proxyRepCode: string | null;
    checked: boolean;
    isDirty: boolean;
    isNew: boolean;
    totalCount: number;
    createdBy: string | null;
    createdDate: string;
    lastModifiedBy: string | null;
    lastModifiedDate: string;
    primaryDist: string | null;
    rowCount: number;
}

export interface GetAllMarketForRepParameters {
    repCode: string;
}

export interface AllMarketForRep {
    marketCode: string,
    description: string,
    checked: boolean
}

export interface InsertRepMarketParameters {
    repCode: string;
    repMarkets: string[];
}

export interface InsertRepProxyParameters {
    repCode: string;
    repMarkets: string[];
}

export interface SaveResponseTimeParameters {
    time: number;
}

export interface InsertPlistTemplateHeaderParameters {
    templateId: number;
    name: string;
    type: string;
    businessType: string;
    templateDetails: any[];
}

export interface PlistTemplate {
    templateId: number;
    name: string;
    type: string;
    businessType: string;
    templateDetails: string | null;
}
