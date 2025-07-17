export interface LeadAndCustomersMainListResponse{
  items: LeedsAndCustomers[];
}


export interface LeedsAndCustomers {
    "isDirty": boolean;
    "isNew": boolean;
    "totalCount": number;
    "createdBy": string;
    "createdDate": Date;
    "lastModifiedBy": string;
    "lastModifiedDate": Date;
    "primaryDist": string;
    "sourceId": number,
    "name": string;
    "leadCustomerType": number,
    "company": string;
    "business": string;
    "industry": string;
    "industryDescription": string;
    "leadStatus": string;
    "state": string ;
    "city": string;
    "address": string;
    "address1": string;
    "address2": string;
    "postalCode": string;
    "telephone": string;
    "mobile": string;
    "email": string;
    "customerCode": string;
    "endUserCode": string;
    "leadStage": string;
    "fax": string;
    "leadSource": string;
    "originator": string;
    "annualRevenue": number;
    "noOfEmployees": number;
    "rating": number;
    "webiste": string;
    "description": string;
    "businessPotential": string;
    "referredBy": string;
    "country": string;
    "preferredContact": string;
    "preferredContactDescription": string;
    "channelDescription": string;
    "noOfLeadCustomers": number;
    "isDeleted": string;
    "secondaryRepCode": string;
    "rowCount": number,
    "customerName": string;
    "tonnes": number;
    "dollar": number;
    "enrolDate": Date;
    "salesValue": number;
    "salesDate":Date;
    "displayInCrm": boolean;
    "lastActiveDate": Date;
    "grade": string;
    "orgId": number;
    "orgName": string;
    "probability": number;
    "leadStageId": number;
    "litersBy": string;
    "potentialLiters": number;
    "repGroupId": number;
    "leadType": string;
    "delFalg": string;
    "lastCalledDate": Date;
    "repGroupName": string;
}
