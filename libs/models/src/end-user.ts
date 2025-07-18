export interface GetEnduserProdutPriceParameters {
    RepCode: string;
    BaseCode?: string;
    AsAtDate: string;
    nextRecord?: number;
    numberOfRecords?: number;
}

export interface GetEnduserProdutPriceResponse {
    bakeryRepCode: string;
    distributorCode: string;
    distributorName: string;
    endUserCode: string;
    endUserName: string;
    endUserRef: string;
    productCode: string;
    description: string;
    productRef: string;
    distributorEffDate: Date;
    distributorPrice: number;
    endUserEffDate: Date;
    endUserPrice: number;
}