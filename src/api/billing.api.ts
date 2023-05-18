import {instance} from "./index";

const serviceEndpoint = "billing/api";

export const getCurrentProfileBonuses = async (): Promise<number> => {
   const response = await instance.get(`${serviceEndpoint}/Balance/bonuses`, {headers: {"api-version": "2.0"}});
   return response.data[0].balance;
};