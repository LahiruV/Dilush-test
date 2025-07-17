import { getAxiosInstance } from "@peerless/services";
import { ContactPersonAPI, contactTypeEnum, CustomerAPI, EnduserAPI, OrganisationAPI } from "@peerless/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetLeadContactsUrl = ContactPersonAPI.Get_Contact_Person_By_Origin;
const SaveLeadContactPersonUrl = ContactPersonAPI.Save_Contact_Person;
const SaveLeadContactPersonImageUrl = ContactPersonAPI.Save_Contact_Person_Image;
const GetCustomerContactsUrl = ContactPersonAPI.Get_Customer_Contacts;
const SaveCustomerContactUrl = ContactPersonAPI.Save_Customer_Contact;
const GetEndUserContactPersonsUrl = EnduserAPI.Get_Enduser_Contact_Persons;
const SaveEndUserContactUrl = EnduserAPI.Save_EndUser_Contact;
const RetireCustomerContactUrl = ContactPersonAPI.Retire_Customer_Contact;
const GetOrganisationContactPersonsUrl = OrganisationAPI.Get_Contacts_By_OrgId;

const fetchContactPersonListForLeadsByOrigin = async (payload: { args: any, includeChildReps: boolean, contactType: string, custCode: string }) => {
  const response = await getAxiosInstance().post(GetLeadContactsUrl + '?includeChildReps=' + payload.includeChildReps, payload.args);
  return response.data;
};

const fetchContactPersonListForCustomersByOrigin = async (payload: { args: any, includeChildReps: boolean, contactType: string, custCode: string }) => {
  const response = await getAxiosInstance().post(GetCustomerContactsUrl + '?sCustCode=' + payload.custCode + '&clientType=' + payload.args.ClientType + '&includeChildReps=' + payload.includeChildReps, payload.args);
  return response.data;
};

const fetchContactPersonListForEndusersByOrigin = async (payload: { args: any, includeChildReps: boolean, contactType: string, custCode: string }) => {
  const response = await getAxiosInstance().post(GetEndUserContactPersonsUrl, payload.args);
  return response.data;
};

const fetchContactPersonListForOrganisationByOrg = async (payload: any) => {
  const response = await getAxiosInstance().get(GetOrganisationContactPersonsUrl, {
    params: {
      OrgId: payload.OrgId
    }
  });
  return response.data;
};

export const useLeadCustomerContactPersonData = (payload: { args: any, includeChildReps: boolean, contactType: string, custCode: string }) => {
  let fetchMethod = fetchContactPersonListForLeadsByOrigin;

  if (payload.contactType == contactTypeEnum.customer)
    fetchMethod = fetchContactPersonListForCustomersByOrigin
  else if (payload.contactType == contactTypeEnum.enduser)
    fetchMethod = fetchContactPersonListForEndusersByOrigin
  else if (payload.contactType == contactTypeEnum.organisation)
    fetchMethod = fetchContactPersonListForOrganisationByOrg

  return useQuery({
    queryKey: ['GetContactsByOrigin', payload],
    queryFn: () => fetchMethod(payload),
    enabled: !!payload,
  });
};

const saveLeadContactPerson = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveLeadContactPersonUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data');
    } else {
      console.error('An unexpected error occurred');
    }
    throw error;
  }
}

const saveCustomerContactPerson = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveCustomerContactUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data');
    } else {
      console.error('An unexpected error occurred');
    }
    throw error;
  }
}

const saveEnduserContactPerson = async (payload: any) => {
  try {
    const response = await getAxiosInstance().post(SaveEndUserContactUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data');
    } else {
      console.error('An unexpected error occurred');
    }
    throw error;
  }
}

export const saveLeadCustomerContactPerson = async ({ payload, contactType }: { payload: any; contactType: string }): Promise<any> => {
  if (contactType == contactTypeEnum.lead || contactType == contactTypeEnum.organisation) { //lead or organisation
    return saveLeadContactPerson(payload);
  }
  else if (contactType == contactTypeEnum.customer) { //customer
    return saveCustomerContactPerson(payload);
  }
  else { //enduser
    return saveEnduserContactPerson(payload);
  }
};

export const saveLeadContactPersonImage = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(SaveLeadContactPersonImageUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data');
    } else {
      console.error('An unexpected error occurred');
    }
    throw error;
  }
};

export const retireContactPerson = async (payload: any): Promise<any> => {
  try {
    const response = await getAxiosInstance().post(RetireCustomerContactUrl, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data');
    } else {
      console.error('An unexpected error occurred');
    }
    throw error;
  }
};
