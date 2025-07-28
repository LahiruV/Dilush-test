import { useSelector } from "react-redux";
import { ActivityAPI, ContactPersonAPI, CustomerAPI, EnduserAPI, LeadAPI } from "./api-paths";
import { RootState } from "@peerless-cms/store";
import * as fa from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa2 from '@fortawesome/free-solid-svg-icons';

const leadContact = 'lead';
const customerContact = 'customer';
const enduserContact = 'enduser';
const organisationContact = 'organisation';

export enum contactTypeEnum {
  lead = leadContact,
  customer = customerContact,
  enduser = enduserContact,
  organisation = organisationContact,
}

export const contactId: { [key: string]: string } = {
  [leadContact]: 'sourceId',
  [customerContact]: 'customerCode',
  [enduserContact]: 'endUserCode',
  [organisationContact]: 'orgnaisationID',
};

export const mainListAPIPath: { [key: string]: string } = {
  [leadContact]: LeadAPI.Get_Main_Lead_List,
  [customerContact]: LeadAPI.Get_Main_Lead_List,
  [enduserContact]: EnduserAPI.Get_All_Endusers
};

export const contactOrderBy: { [key: string]: string } = {
  [leadContact]: 'first_name ASC',
  [customerContact]: 'contact_no asc',
  [enduserContact]: 'created_date desc'
};

export const homeContactsAPIMap: { [key: string]: string } = {
  [leadContact]: ContactPersonAPI.Get_Contact_Person_By_Origin,
  [customerContact]: ContactPersonAPI.Get_Customer_Contacts,
  [enduserContact]: EnduserAPI.Get_Enduser_Contact_Persons
};

export const sectionPathMap: { [key: string]: string } = {
  [leadContact]: '/leeds-and-customers/lead/',
  [customerContact]: '/leeds-and-customers/customer/',
  [enduserContact]: '/leeds-and-customers/enduser/',
  [organisationContact]: '/organisation/',
};

export const leadCustomerAreaMap: { [key: string]: any } = {
  [leadContact]: [
    { key: 1, path: ``, icon: fa2.faInfoCircle, label: 'Lead Details' },
    { key: 2, path: `/contact-details`, icon: fa.faIdBadge, label: 'Contact Details' },
    { key: 3, path: `/addresses`, icon: fa2.faMapMarkedAlt, label: 'Addresses', additionalPaths: ['/update'] },
    { key: 4, path: `/contact-person`, icon: fa.faUser, label: 'Contact Person', additionalPaths: ['/update'] },
    { key: 5, path: `/activity`, icon: fa2.faClipboardList, label: 'Activity', additionalPaths: ['/update'] },
    { key: 6, path: `/document`, icon: fa.faFileAlt, label: 'Document' },
    { key: 7, path: `/opportunity`, icon: fa2.faBullseye, label: 'Opportunities', additionalPaths: ['/update'] },
  ],
  [customerContact]: [
    { path: ``, icon: fa2.faInfoCircle, label: 'Customer Details' },
    { path: `/sales-history`, icon: fa.faChartLine, label: 'Sales History' },
    { path: `/contact-details`, icon: fa2.faIdBadge, label: 'Contact Details', additionalPaths: ['/update'] },
    { path: `/addresses`, icon: fa.faMapMarkedAlt, label: 'Address', additionalPaths: ['/update'] },
    { path: `/contact-person`, icon: fa2.faUser, label: 'Contact Person', additionalPaths: ['/update'] },
    { path: `/endusers`, icon: fa.faUserCircle, label: 'End User', additionalPaths: ['/update'] },
    { path: `/eu-list-price`, icon: fa2.faReceipt, label: 'EU List Price', additionalPaths: ['/update'] },
    { path: `/activity`, icon: fa.faClipboardList, label: 'Activity', additionalPaths: ['/update'] },
    { path: `/document`, icon: fa.faFileAlt, label: 'Document', additionalPaths: ['/update'] },
    { path: `/opportunity`, icon: fa2.faBullseye, label: 'Opportunities', additionalPaths: ['/update'] },
    { path: `/customer-price`, icon: fa2.faTag, label: 'Customer Price', additionalPaths: ['/update'] },
    { path: `/pantry-list`, icon: fa.faListAlt, label: 'Pantry List' },
    { path: `/crm-orders`, icon: fa.faShoppingCart, label: 'CRM Orders', additionalPaths: ['/update'] }
  ],
  [enduserContact]: [
    { path: ``, icon: fa2.faInfoCircle, label: 'Enduser Details' },
    { path: `/contact-person`, icon: fa2.faUser, label: 'Contact Person', additionalPaths: ['/update'] },
    { path: `/activity`, icon: fa.faClipboardList, label: 'Activity', additionalPaths: ['/update'] },
    { path: `/document`, icon: fa2.faFileAlt, label: 'Document', additionalPaths: ['/update'] },
    { path: `/opportunity`, icon: fa2.faBullseye, label: 'Opportunities', additionalPaths: ['/update'] },
    { path: `/enduser-price`, icon: fa2.faReceipt, label: 'Enduser Price', additionalPaths: ['/update'] },
    { path: `/sales`, icon: fa.faCoins, label: 'Sales' },
    { path: `/pantry-list`, icon: fa.faListAlt, label: 'Pantry List' },
    { path: `/tio-list`, icon: fa.faBox, label: 'TIO List', additionalPaths: ['/update'] }
  ],
  [organisationContact]: [
    { path: ``, icon: fa2.faInfoCircle, label: 'Organisation Details' },
    { path: `/addresses`, icon: fa.faMapMarkedAlt, label: 'Address', additionalPaths: ['/update'] },
    { path: `/contact-person`, icon: fa2.faUser, label: 'Contact Person', additionalPaths: ['/update'] },
    { path: `/activity`, icon: fa.faClipboardList, label: 'Activity', additionalPaths: ['/update'] },
    { path: `/endusers`, icon: fa.faUserCircle, label: 'End User', additionalPaths: ['/update'] },
    { path: `/sub-organisation`, icon: fa.faBuilding, label: 'Organisation', additionalPaths: ['/update'] },
    { path: `/distributor`, icon: fa.faTruck, label: 'Distributor', additionalPaths: ['/update'] },
  ]
}

export const addressId: { [key: string]: string } = {
  [leadContact]: 'leadAddressID',
  [customerContact]: 'assigneeNo',
  [enduserContact]: 'leadAddressID',
  [organisationContact]: 'addressId',
};

export const enduserPriceSubUrl: { [key: string]: string } = {
  [customerContact]: 'eu-list-price',
  [enduserContact]: 'enduser-price'
};

export const enduserPriceTitle: { [key: string]: string } = {
  [customerContact]: 'EU List Price',
  [enduserContact]: 'Enduser Price'
};

export const enduserPriceAddButtonLabel: { [key: string]: string } = {
  [customerContact]: 'Add / Edit Price List',
  [enduserContact]: 'Edit Price List'
};

export const contactTypeName: { [key: string]: string } = {
  [leadContact]: 'Lead',
  [customerContact]: 'Customer',
  [enduserContact]: 'Enduser',
  [organisationContact]: 'Organisation'
};

export const contactName: { [key: string]: string } = {
  [leadContact]: 'name',
  [customerContact]: 'name',
  [enduserContact]: 'name',
  [organisationContact]: 'organisationName',
};