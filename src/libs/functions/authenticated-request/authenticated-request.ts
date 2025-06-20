import axios from 'axios';
import { ApiBaseUrl } from '@zenra/configs';
import { authService } from '@zenra/services';
import { reset_redux } from '../reset-redux-function/reset-redux-function';

const authenticatedRequest = axios.create({
    baseURL: ApiBaseUrl,
    headers: {
        "ngrok-skip-browser-warning": "69420"
    }
});

authenticatedRequest.interceptors.request.use(
    (config) => {
        const token = authService.getToken();
        if (!token) {
            reset_redux();
            window.location.href = '/';
        }
        const tokenExpiry = authService.expireToken();
        if (tokenExpiry) {
            authService.clearToken();
            reset_redux();
            window.location.href = '/';
        }
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const getAuthenticated = async (url: string, params = {}) => {
    return authenticatedRequest.get(url, { params });
};

export const postAuthenticated = async (url: string, data: Record<string, unknown>) => {
    return authenticatedRequest.post(url, data);
};
