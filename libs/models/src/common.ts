export interface RenderStatusContentTable {
    isRenderStatusContentTable: boolean;
    status: any;
    isFetch: boolean;
    error: any;
    setStateFunction: Function;
    isStatusOutput: boolean;
    isHideClickFilterMessage?: boolean;
}

export interface SalesMarket {
    tableID: null | number;
    tableCode: string;
    tableDescription: string;
    description: null | string;
    defaultValue: null | string;
    isDirty: boolean;
    isNew: boolean;
    totalCount: number;
    createdBy: null | string;
    createdDate: string;
    lastModifiedBy: null | string;
    lastModifiedDate: string;
    primaryDist: null | string;
    rowCount: number;
}

export interface StateInfo {
    stateID: number;
    stateName: string;
    countryCode: null | string;
    stateAbbri: null | string;
    stateCode: null | string;
    isDirty: boolean;
    isNew: boolean;
    totalCount: number;
    createdBy: null | string;
    createdDate: string;
    lastModifiedBy: null | string;
    lastModifiedDate: string;
    primaryDist: null | string;
    rowCount: number;
}

export interface GetAllRepsForLookupParameters {
    orderby: string;
    startIndex: number;
    rowCount: number;
    additionalParams?: string;
}

export interface AllRepsForLookup {
    tableID: string | null;
    tableCode: string;
    tableDescription: string;
    description: string | null;
    defaultValue: string | null;
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

export interface GetAllParentCustomersLookupParameters {
    originator: string;
    childOriginators: string;
    defaultDepartmentId: string;
    startIndex: number;
    rowCount: number;
    orderBy: string;
}

export interface AllParentCustomersLookup {
    tableID: string | null;
    tableCode: string;
    tableDescription: string;
    description: string | null;
    defaultValue: string | null;
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

export interface GetGeneralLookupEntriesParameters {
    originator: string;
    childOriginators: string;
    defaultDepartmentId: string;
    startIndex: number;
    rowCount: number;
    sTableID: string;
}

export interface GeneralLookupEntries {
    tableID: string;
    tableCode: string;
    tableDescription: string;
    description: string | null;
    defaultValue: string | null;
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

export interface GetAllMarketForLookupParameters {
    originator: string;
    childOriginators: string;
    defaultDepartmentId: string;
    additionalParams: string;
    orderBy: string;
    startIndex: number;
    rowCount: number;
}

export interface AllMarketForLookup {
    tableID: string | null;
    tableCode: string;
    tableDescription: string;
    description: string | null;
    defaultValue: string | null;
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

export interface GetProductGroupLookupParameters {
    originator: string;
    childOriginators: string;
    defaultDepartmentId: string;
    additionalParams: string;
    orderBy: string;
    startIndex: number;
    rowCount: number;
}

export interface ProductGroupLookup {
    tableID: string | null;
    tableCode: string;
    tableDescription: string;
    description: string | null;
    defaultValue: string | null;
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

export interface GetCustomerLookupParameters {
    additionalParams: string;
    childOriginators: string;
    defaultDepartmentId: string;
    leadStage: string;
    orderBy: string;
    originator: string;
    startIndex: number;
    rowCount: number;
}

export interface CustomerLookup {
    tableID: string | null;
    tableCode: string;
    tableDescription: string;
    description: string;
    defaultValue: string | null;
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

export interface GetAllWareHousesParameters {
    startIndex: number;
    rowCount: number;
    childOriginators: string;
}

export interface WarehouseLookup {
    tableID: string | null;
    tableCode: string;
    tableDescription: string;
    description: string | null;
    defaultValue: string | null;
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

export interface GetCustomerEffectiveDatesParameters {
    customerCode: string;
}









