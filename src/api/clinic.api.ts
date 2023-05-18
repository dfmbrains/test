import {instance} from "./index";
import {IClinic, ISpecialization} from "../models/Dictionaries";
import {IPagination, IResponseWithStatus, sortTypes} from "../models/api";
import {AxiosResponse} from "axios";
import {IReferralTemplate, ITemplateService} from "../models/clinic";

interface IGetSpecializationsParams {
   name?: string,
   type?: string,
   page?: number,
   size?: number,
   onlyActive?: boolean
}

export interface ISpecializationResponse extends IPagination {
   results: ISpecialization[];
}

interface IGetClinicsParams {
   name?: string;
   RegionCode?: string;
   SortBy?: string;
   SortType?: sortTypes;
   Page?: number;
   PageSize?: number;
}

export interface IClinicsResponse extends IPagination {
   results: IClinic[];
}

export interface IClinicByIdResponse extends IResponseWithStatus {
   value: IClinic;
}

interface IGetReferralTemplatesResponse extends IPagination {
   results: IReferralTemplate[];
}

export interface ICreateReferralTemplateBody {
   deviceId: string,
   name: string,
   created: Date,
   services: ITemplateService[]
}

export interface IUpdateReferralTemplateBody {
   id: string,
   name: string,
   created: Date,
   services: ITemplateService[]
}

const serviceEndpoint = "clinic/api";

export const getSpecializations = async (params: IGetSpecializationsParams): Promise<ISpecializationResponse> => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response = await instance.get(`${serviceEndpoint}/Specializations?${searchParams}`);
   return response.data;
};

export const getSpecializationById = async (id: string): Promise<ISpecialization> => {
   const response = await instance.get(`${serviceEndpoint}/Specializations/byId?id=${id}`);
   return response.data;
};

export const getClinics = async (params: IGetClinicsParams): Promise<IClinicsResponse> => {
   const searchParams = new URLSearchParams(Object.entries(params));

   const response = await instance.get(`${serviceEndpoint}/Clinics/find?${searchParams}`);
   return response.data;
};

export const getClinicById = async (id: string): Promise<IClinic> => {
   const response: AxiosResponse<IClinicByIdResponse> = await instance.get(`${serviceEndpoint}/Clinics/byClinicId?Id=${id}`);
   return response.data.value;
};

export const getReferralTemplates = async (page: string | number, pageSize: string | number): Promise<IGetReferralTemplatesResponse> => {
   const searchParams = new URLSearchParams(Object.entries({page: String(page), pageSize: String(pageSize)}));

   const response = await instance.get(`${serviceEndpoint}/ReferralTemplate/pagedByUser?${searchParams}`);
   return response.data;
};

export const createReferralTemplate = async (template: ICreateReferralTemplateBody): Promise<IReferralTemplate> => {
   const response = await instance.post(`${serviceEndpoint}/ReferralTemplate/register`, template);
   return response.data;
};

export const updateReferralTemplate = async (template: IUpdateReferralTemplateBody): Promise<void> => {
   await instance.put(`${serviceEndpoint}/ReferralTemplate/update`, template);
};

export const deleteReferralTemplate = async (id: string): Promise<IReferralTemplate> => {
   const response = await instance.delete(`${serviceEndpoint}/ReferralTemplate/delete?id=${id}`);
   return response.data;
};