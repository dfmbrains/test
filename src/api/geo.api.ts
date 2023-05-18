import {instance} from "./index";
import {IAddress, ICoordinates} from "../models/geo";

const serviceEndpoint = "geo/api";

export const getAddress = async (params: ICoordinates<number>): Promise<IAddress> => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response = await instance.get(`${serviceEndpoint}/Geo/address?${searchParams}`);
   return response.data;
};