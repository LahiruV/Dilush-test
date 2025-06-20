export interface LoggedUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    nic: string;
    password?: string;
    profile: string;
    createdAt: string;
    token?: string;
}