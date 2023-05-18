import axios from "axios";
import {BASE_URL, IDENTITY_URL} from "../helpers/enviroment";
import {getLocalStorageCredentials} from "../helpers/utils";

export const instanceLogin = axios.create({
   baseURL: IDENTITY_URL
});

export let instance = axios.create({
   baseURL: BASE_URL
});

instance.interceptors.request.use((config) => {
   const credentials = getLocalStorageCredentials();
   if (credentials) {
      config.headers.set("authorization", `${credentials.token_type} ${credentials.access_token}`);
   }
   config.headers.set("language", "ru");

   return config;
});