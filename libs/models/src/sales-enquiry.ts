export interface DealEnquiryParameters {
    childOriginators: string;
    defaultDepartmentId: string;
    originator: string;
    market: string;
    asAtDate: string;
    showForwardDeals: boolean;
    parentCustomer: string;
    rep: string;
    subParent: string;
    subParentGroup: string;
    priceGroup: string;
    // state: string;
    catalogueType:string;
    orderBy: string;
    additionalParams: string;
    ignorePagination: boolean;
    startIndex: number;
    rowCount: number;
}

export interface DealEnquiry {
    customerCode: string;
    name: string;
    product: string;
    description: string;
    effectiveFrom: string;
    effectiveTo: string;
    minQty: number;
    dealPrice: number;
    dealDiscount: number;
    netPrice: number;
    dealName: string;
    status: string;
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

export interface GetInvoiceEnquiryParameters {
    cutomerCode: string;
    catalogueType: string;
    // state: string;
    customerRep: number;
    invoicedRep: number;
    fromDate: Date | string;
    toDate: Date | string;
    // productGroup: string;
    warehouse: string;
    invoiceNo: number;
    invoiceCreditNotesStatus: string;
    parent: string;
    // custGroup: string;
    subGroup: string;
    priceGroup: string;
    market: string;
    // brand: string;
    orderBy: string;
    additionalParams: string;
    // repCode: string;
    loggedUserRepCode: string;
    childReps: string;
    clientType: string;
    nextRecord: number;
    numberOfRecords: number;
    repCodeDelection: string;
    // parentCustomer: string;
    subParentGroup: string;
}

export interface GetCustomerPricelistParameters {
    type: string;
    code: string;
    custCode: string;
    effectiveDate?: string;
    asAtDate: string | Date;
    additionalParams: string;
    orderBy: string;
    ignorePagination: boolean;
    startIndex: number;
    rowCount: number;
    filterPara: any
    endDate: string
}

export interface CustomerPricelist {
    catlogCode: string;
    description: string;
    minQty: number;
    listPrice: number;
    discPercentage: number;
    dealFrom: string;
    dealTo: string;
    price: number;
    netPrice: number;
    dealPrice: number;
    dealDiscPercentage: number;
    dealFromDate: string;
    dealToDate: string;
    pricingPolicy: string;
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


