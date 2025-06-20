import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { LoginAdminPayload, LoginAdminResponse } from "@zenra/model";
import { admin_get_user_info, admin_login } from "@zenra/controller";
import { ApiBaseUrl } from "@zenra/configs";
import { getAuthenticated } from "@zenra/functions";

export const AdminLogin = () => {
    const { mutate: adminLoginMutate } = useMutation({
        mutationFn: async (payload: LoginAdminPayload) => {
            const response = await axios.post<LoginAdminResponse>(`${ApiBaseUrl}${admin_login}`, payload);
            return response.data;
        },
        onSuccess: (response: LoginAdminResponse) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        adminLoginMutate,
    };
};

export const GetUserInfo = (isExecute: boolean) => {
    const fetch = async () => {
        const data = await getAuthenticated(admin_get_user_info);
        return data;
    };
    const { data: response, status, error } = useQuery({
        queryKey: ['get-user-info'],
        queryFn: () => fetch(),
        enabled: isExecute,
    });
    return {
        response,
        status,
        error
    };
};
