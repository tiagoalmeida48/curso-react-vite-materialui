export interface IUser {
    id: number;
    name: string;
    email: string;
    cityId: number;
}

export interface IDetailUser {
    id: number;
    name: string;
    email: string;
    cityId: number;
    password?: string;
}