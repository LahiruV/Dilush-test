import { Args } from "./args";

export interface LeadEntryParameters {
    LeadName: string;
    Originator: string;
    LeadSource: string;
    Company: string;
    Business: string;
    Rating: number;
    Website: string;
    Industry: string;
    NoOfEmployees: number;
    AnnualRevenue: number;
    LeadStatus: string;
    Telephone: string;
    Fax: string;
    Mobile: string;
    EmailAddress: string;
    Address: string;
    City: string;
    State: string;
    PostCode: string;
    ReferredBy: string;
    Probability: number;
    Description: string;
    PreferredContact: string;
    BusinessPotential: string;
    Country: string;
    LastModifiedBy: string;
    LastModifiedDate: Date;
    LeadStageID: number;
    CustCode: string;
    LitersBy: string;
    PotentialLiters: number;
    RepGroupID: number;
    LeadID: number;
    LeadType: string;
    OrgId: number;
    CreatedBy: string;
    CreatedDate: Date;
    DelFalg: string;
    LastCalledDate?: Date; 
    RepGroupName: string;
    Args: Args;
  }
  