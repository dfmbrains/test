import {instance} from "./index";
import {IPrice, serviceTypes} from "../models/Dictionaries";
import {IPagination, sortTypes} from "../models/api";

const serviceEndpoint = "price/api";

export interface IGetPricesResponse extends IPagination {
   results: IPrice[];
}

export interface IGetPricesParams {
   Provider: string,
   ProviderType?: string,
   TypeCode?: serviceTypes,
   GroupCode?: string,
   StrFind?: string,
   ServiceCode?: string,
   regionCode: string,
   sortyBy?: keyof IPrice,
   sortType?: sortTypes,
   page?: string,
   pageSize?: string
}

export const getPrices = async (params: IGetPricesParams): Promise<IGetPricesResponse> => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response = await instance.get(`${serviceEndpoint}/Price/findWithPaging?${searchParams}`);
   return response.data;
};