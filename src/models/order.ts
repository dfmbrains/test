import {IAdditionalService, IPrice} from "./Dictionaries";
import {IProfile} from "./profiles";
import {ICampaign} from "./campaings";
import {paymentMethodsTypes} from "./billing";

export type orderTypes = 'laboratory' | 'consultation'

export type TOrderStatuses = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface IOrder {
    id: string;
    providerType?: any;
    provider?: any;
    deviceId?: any;
    userId: string;
    patientId?: any;
    doctorId?: any;
    code: string;
    operationId: string;
    inHouse: boolean;
    address: string;
    punkt: string;
    isForAnotherPatient: boolean;
    paymentMethod: paymentMethodsTypes;
    paymentCardType?: any;
    paymentId?: any;
    providerOrderId?: any;
    providerOrderNumber?: any;
    status: TOrderStatuses;
    total: number;
    created: Date;
    patient: IProfile;
    doctor?: any;
    useBonuses: boolean;
    type: string;
    selectedServices: IPrice[];
    additionalServices: IAdditionalService[];
    campaign?: ICampaign;
}