import { getAxiosInstance } from '@peerless/services';
export interface Auth {
  userName: string;
  password: string;
}
export const useLoginQuery = (credencials: Auth) => {  
  return getAxiosInstance().post(`User/Authenticate`, credencials);
};
