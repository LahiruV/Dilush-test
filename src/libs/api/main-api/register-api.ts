import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { RegisterAdminPayload, Response } from "@zenra/model";
import { admin_register } from "@zenra/controller";
import { ApiBaseUrl } from "@zenra/configs";

export const AdminRegister = () => {
    const { mutate: adminRegisterMutate } = useMutation({
        mutationFn: async (payload: RegisterAdminPayload) => {
            const response = await axios.post<Response>(`${ApiBaseUrl}${admin_register}`, payload);
            return response.data;
        },
        onSuccess: (response: Response) => response,
        onError: (err: AxiosError) => err,
    });
    return {
        adminRegisterMutate,
    };
};
