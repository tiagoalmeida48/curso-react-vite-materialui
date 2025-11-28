import type { ICity } from "../../interfaces/city/ICity";

export type TCitiesWithTotalCount = {
    data: ICity[];
    totalCount: number;
};