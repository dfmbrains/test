export type TProviderTypes = "Clinic" | "Lab"

export interface ISpecialization {
   id?: any;
   language?: any;
   type?: any;
   name: string;
}

export interface IProfileSpecialization extends ISpecialization {
   procedures: IProcedure | null;
}

export interface ILaboratory {
   id: string;
   code: string;
   name: string;
   logo: string;
   description: string;
   regionCode: string;
   isDeparture: boolean;
   connectionParametr?: any;
}

export interface IPrice {
   regionCode?: any;
   providerType: TProviderTypes;
   provider: string;
   code: string;
   name: string;
   amount: number;
   isAdditional: boolean;
   additionalService?: any;
   typeCode?: any;
   additionalServices?: IAdditionalService[];
   notAnExit: boolean;
}

export interface IService {
   id: string
   providerType: TProviderTypes
   name: string
   code: string
   type: string
   group: string
   tags: string
}

export interface IAdditionalService {
   providerType: string;
   provider: string;
   code: string;
   name: string;
   amount: number;
}

export interface IClinic {
   id: string;
   name: string;
   address: string;
   cityCode: string;
   lat: number;
   lon: number;
   image: string;
   regionCode: any;
}

export interface IProcedure {
   id: string;
   language: string;
   code: string;
   type: any;
   description: string;
}

export type serviceTypes = "research" | "package" | "additionalService"
