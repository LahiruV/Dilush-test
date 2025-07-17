import { getApiBaseURL, getCrystalApiBaseURL } from '@peerless/common';
import { useAuthContext } from '@peerless/providers';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { useDispatch } from 'react-redux';
import { resetState } from '@peerless-cms/store';


let axiosInstance: AxiosInstance;

export const getAxiosInstance = () => {
  if (!axiosInstance) {
    axiosInstance = axios.create({
      baseURL: getApiBaseURL(),
    });

    axiosInstance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        if (config.headers) {
          config.headers['Content-Type'] = 'application/json';
          config.headers['Cookie'] = undefined;
        }

        // Check if user has a valid session before sending the request
        // if (hasAuth()) await checkValidSession(true);
        // console.log('AXIOS-HEADER: ', config);

        // Check if the request is for a login or token refresh
        const isLoginOrRefreshRequest = config.url === '/User/Authenticate' || config.url === '/User/RefreshToken';
        if (isLoginOrRefreshRequest) {
          // Skip token refresh logic for login and token refresh requests
          return config;
        }

        if (isTokenExpired()) {
          // Token refresh logic
          await refreshToken(dispatchInstance, logoutInstance);
        }

        const token = localStorage.getItem('token');
        if (token) {
          // Set the JWT token in the request headers
          config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
      }
    );
  }

  return axiosInstance;
};

// Function to check if token is expired
const isTokenExpired = () => {
  const tokenValidTo = localStorage.getItem('tokenValidTo');
  if (!tokenValidTo) {
    // Token expiry time is not available, consider it as expired
    return true;
  }

  try {
    const expirationTime = new Date(tokenValidTo).getTime(); // Convert token expiry time to milliseconds

    // Compare expiration time with current time
    const currentTime = Date.now();
    return currentTime >= expirationTime;
  } catch (error) {
    console.error('Error parsing token expiry time');
    // If there's an error parsing the token expiry time, consider it as expired
    return true;
  }
};

// Function to refresh token
const refreshToken = async (dispatch: any, handleLogout: any) => {  
  try {
    const tokenResponse = {
      jwttoken: localStorage.getItem('token'),
      refreshtoken: localStorage.getItem('refreshToken'),
      validTo: localStorage.getItem('tokenValidTo')
    }

    if (tokenResponse.jwttoken == null)
      return;

    // Make a request to refresh the token
    const response = await axiosInstance.post('/User/RefreshToken', tokenResponse);
    //const newToken = response.data.token;

    // Update the stored token
    localStorage.setItem('token', response.data.jwttoken);
    localStorage.setItem('refreshToken', response.data.refreshtoken);
    localStorage.setItem('tokenValidTo', response.data.validTo);

    // Retry failed requests
    // Implement retry logic here
  } catch (error) {
    // Handle token refresh failure
    console.error('Token refresh failed');
    dispatch(resetState());
    handleLogout();
  }
};

export const getAxiosReportInstance = () => {
  return axios.create({
    baseURL: getCrystalApiBaseURL(),
  });
}

export const AxiosProvider = () => {
  const dispatch = useDispatch();
  const { handleLogout } = useAuthContext();

  // Pass these to the axios instance or refresh logic
  dispatchInstance = dispatch;
  logoutInstance = handleLogout;

  return null; // Used for context or initialization only
};

let dispatchInstance: any;
let logoutInstance: any;