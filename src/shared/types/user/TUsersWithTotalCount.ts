import type { IUser } from "../../interfaces/user/IUser";

export type TUsersWithTotalCount = {
    data: IUser[];
    totalCount: number;
};