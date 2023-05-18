import {IPagination} from "./api";
import {IProfile} from "./profiles";
import {ILaboratory, IPrice, IProfileSpecialization} from "./Dictionaries";

export interface IReferral {
    id: string;
    orderId?: any;
    orderStatus?: any;
    doctor: IProfile;
    patient: IProfile;
    specialization: IProfileSpecialization;
    laboratory: ILaboratory;
    deviceId: string;
    regionCode: string;
    status: number;
    created: Date;
    services: IPrice[];
}

export interface IPatientReferrals extends IPagination {
    results: IReferral[]
}