import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import { ApiBaseUrl } from "@zenra/configs"
import { image_base64 } from "@zenra/controller";
import { getAuthenticated, postAuthenticated } from "@zenra/functions";

export const Base64ImageConverter = (file: File, isExecute: boolean) => {
    const formData = new FormData();
    formData.append('imageFile', file);
    const fetchBase64ImageConverter = async () => {
        const data = await axios.post(`${ApiBaseUrl}${image_base64}`, formData)
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['base64-image-convert', file],
        queryFn: () => fetchBase64ImageConverter(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
};

export const fetchProtectedData = async () => {
    try {
        const response = await getAuthenticated('/protected-endpoint');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch protected data', error);
        throw error;
    }
};

interface ProtectedData extends Record<string, unknown> {
    id: number;
    name: string;
}

export const postProtectedData = async (data: ProtectedData) => {
    try {
        const response = await postAuthenticated('/protected-endpoint', data);
        return response.data;
    } catch (error) {
        console.error('Failed to post protected data', error);
        throw error;
    }
};
