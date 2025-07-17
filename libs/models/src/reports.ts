export interface GenerateEndUserPricePdfParameters {
    effectiveDate: string;
    originator: string;
    repCode: string;
    baseCode: string;
    produtPriceFilterPara: any;
};

export interface GeneratecontractsalesPdfParameters {
    CustCode: string;
    RepCode: string;
    EnduserCode: string;
    CostYear: number;
    CostPeriod: number;
    CheckArea: number;
};