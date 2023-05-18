import {instanceLogin} from "./index";
import {
   IConnectTokenRootResponse,
   IPostVerificationBody,
   IPutResendVerificationBody,
   IVerificationRootResponse
} from "../models/auth";

export const sendVerificationCode = async (body: IPostVerificationBody): Promise<IVerificationRootResponse> => {
   const response = await instanceLogin.post("api/verification", body);
   return response.data;
};

export const reSendVerificationCode = async (body: IPutResendVerificationBody): Promise<IVerificationRootResponse> => {
   const response = await instanceLogin.put("api/verification", body);
   return response.data;
};

export const postConnectToken = async (body: URLSearchParams): Promise<IConnectTokenRootResponse> => {
   const response = await instanceLogin.post("connect/token", body);
   return response.data;
};