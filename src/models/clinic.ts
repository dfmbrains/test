export enum applicationsStatuses {
   created = 0,
   accepted = 6,
   rejected = 7,
   cancelled = 9,
}

export interface IReferralTemplate {
   id: string;
   name: string;
   userId: string;
   created: Date;
   services: ITemplateService[];
}

export interface ITemplateService {
   code: string;
   name: string;
}