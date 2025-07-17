import { Navigation } from '@peerless/models';
import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import { ContactPersonAPI, homeContactsAPIMap } from '@peerless/utils';

const getContactPersonByOriginUrl = ContactPersonAPI.Get_Contact_Person_By_Origin; 

const fetchContactsByOrigin = async (payload: {args: any, includeChildReps: boolean}, contactType: string) => {
  let apiPath = '';
  if(contactType.toLocaleLowerCase() == 'lead')
    apiPath = homeContactsAPIMap[contactType] + '?includeChildReps=' + payload.includeChildReps;
  else if(contactType.toLocaleLowerCase() == 'customer')
    apiPath = homeContactsAPIMap[contactType] + '?sCustCode='+ payload.args.CustomerCode +'&includeChildReps=' + payload.includeChildReps + '&clientType=' + payload.args.ClientType + '&includeChildReps=true';
  else
    apiPath = homeContactsAPIMap[contactType];

  const response = await getAxiosInstance().post(apiPath, payload.args);
  return response.data;
};

export const useContactsByOrigin = (payload: {args: any, includeChildReps: boolean}, contactType: string) => {
  return useQuery({
    queryKey: ['contactsByOrigin', payload.args.LeadId, payload.args.CustomerCode, payload.args.EnduserCode],
    queryFn: () => fetchContactsByOrigin(payload, contactType),
    enabled: !!payload,
  });
};




