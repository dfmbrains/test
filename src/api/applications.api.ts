import {instance} from "./index";
import {applicationsStatuses} from "../models/clinic";
import {AxiosResponse} from "axios";

export interface ICreateApplicationBody {
   deviceId: string;
   regionCode: string;
   specializationId: string;
   clinicId: string;
   experience: number | "";
}

// export interface ICreateApplicationResponse {
//    id: string
//    deviceId: string
//    regionCode: string
//    profile: IProfile,
//    clinic: IClinic,
//    specialization: IProfileSpecialization
//    experience: number
//    documents: any
//    reason: any
//    status: number
//    created: string
//    isView: boolean
// }

export interface IProfileApplication {
   id: string;
   managerUserId: any;
   deviceId: string;
   userId: string;
   specializationId: string;
   clinicId: string;
   regionCode: string;
   experience: number;
   status: applicationsStatuses;
   reason: any;
   isActive: boolean;
   created: string;
   updated: string;
   isView: boolean;
}

const serviceEndpoint = "clinic/api";

export const createApplication = async (body: ICreateApplicationBody): Promise<IProfileApplication> => {
   const response = await instance.post(`${serviceEndpoint}/Applications`, body);
   return response.data;
};

export const getProfileApplication = async (): Promise<IProfileApplication> => {
   const response: AxiosResponse<IProfileApplication> = await instance.get(`${serviceEndpoint}/Applications`);

   return response.data;
};