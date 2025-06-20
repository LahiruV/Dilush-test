import { LoggedUser } from "../user-model/user-model";

export interface LoginAdminPayload {
    email: string;
    password: string;
}

export interface LoginAdminResponse {
    result: LoggedUser;
    message: string;
}

export interface AdminUser {
    _id: string;
    name: string;
    email: string;
    password: string;
    image: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}